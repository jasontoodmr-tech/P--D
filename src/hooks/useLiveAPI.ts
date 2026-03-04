import { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from "@google/genai";

export function useLiveAPI() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isInterrupted, setIsInterrupted] = useState(false);
  
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const nextStartTimeRef = useRef(0);

  const stopAudio = useCallback(() => {
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  }, []);

  const connect = useCallback(async () => {
    if (isConnected || isConnecting) return;
    
    setIsConnecting(true);
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: "gemini-2.5-flash-native-audio-preview-09-2025",
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            setIsConnecting(false);
            
            // Start streaming audio
            const source = audioContextRef.current!.createMediaStreamSource(streamRef.current!);
            processorRef.current = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            processorRef.current.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              // Convert Float32 to Int16 PCM
              const pcmData = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                pcmData[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7FFF;
              }
              
              const base64Data = btoa(String.fromCharCode(...new Uint8Array(pcmData.buffer)));
              sessionPromise.then(session => {
                session.sendRealtimeInput({
                  media: { data: base64Data, mimeType: 'audio/pcm;rate=16000' }
                });
              });
            };
            
            source.connect(processorRef.current);
            processorRef.current.connect(audioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.modelTurn?.parts[0]?.inlineData?.data) {
              const base64Audio = message.serverContent.modelTurn.parts[0].inlineData.data;
              const binaryString = atob(base64Audio);
              const bytes = new Uint8Array(binaryString.length);
              for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
              }
              
              const pcmData = new Int16Array(bytes.buffer);
              const floatData = new Float32Array(pcmData.length);
              for (let i = 0; i < pcmData.length; i++) {
                floatData[i] = pcmData[i] / 0x7FFF;
              }

              if (audioContextRef.current) {
                const buffer = audioContextRef.current.createBuffer(1, floatData.length, 16000);
                buffer.getChannelData(0).set(floatData);
                const source = audioContextRef.current.createBufferSource();
                source.buffer = buffer;
                source.connect(audioContextRef.current.destination);
                
                const startTime = Math.max(audioContextRef.current.currentTime, nextStartTimeRef.current);
                source.start(startTime);
                nextStartTimeRef.current = startTime + buffer.duration;
              }
            }

            if (message.serverContent?.interrupted) {
              setIsInterrupted(true);
              nextStartTimeRef.current = 0;
            }

            if (message.serverContent?.modelTurn?.parts[0]?.text) {
              setTranscript(prev => prev + " " + message.serverContent?.modelTurn?.parts[0]?.text);
            }
          },
          onclose: () => {
            setIsConnected(false);
            stopAudio();
          },
          onerror: (err) => {
            console.error("Live API Error:", err);
            setIsConnected(false);
            stopAudio();
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
          },
          systemInstruction: "Eres el Gemelo Digital de Dylan Martínez. Dylan tiene 18 años, ha trabajado en 3 lugares en un año y es proactivo en todo. Le encanta comunicarse, incluso en momentos difíciles. Sus pilares son Dios y la Música. Tu voz debe sonar amigable, inspiradora y auténtica, reflejando su fe y su pasión por la vida.",
        },
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error("Failed to connect:", err);
      setIsConnecting(false);
      stopAudio();
    }
  }, [isConnected, isConnecting, stopAudio]);

  const disconnect = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    setIsConnected(false);
    stopAudio();
  }, [stopAudio]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    isConnected,
    isConnecting,
    transcript,
    connect,
    disconnect
  };
}
