import React from 'react';
import { Mic, MicOff, Volume2, Sparkles, Loader2 } from 'lucide-react';
import { useLiveAPI } from '../hooks/useLiveAPI';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export function VoiceInterface() {
  const { isConnected, isConnecting, transcript, connect, disconnect } = useLiveAPI();

  return (
    <div className="flex flex-col h-[600px] glass-panel rounded-2xl overflow-hidden relative">
      <div className="p-4 border-b-4 border-brand-primary bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-accent flex items-center justify-center text-black">
            <Volume2 size={18} />
          </div>
          <div>
            <h3 className="font-display font-black text-sm italic">SESIÓN DE VOZ LIVE</h3>
            <p className="text-[10px] text-stone-500 uppercase tracking-wider font-bold">Directo a mi cerebro</p>
          </div>
        </div>
        {isConnected && (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase text-brand-primary">ON AIR</span>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-stone-50 to-white overflow-hidden">
        <AnimatePresence mode="wait">
          {!isConnected ? (
            <motion.div 
              key="idle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-stone-100 flex items-center justify-center mb-6 relative group">
                <div className="absolute inset-0 rounded-full bg-emerald-500/10 scale-0 group-hover:scale-125 transition-transform duration-500" />
                <Mic className="text-stone-400 group-hover:text-emerald-500 transition-colors" size={40} />
              </div>
              <h4 className="font-display text-xl font-bold mb-2">Conecta con Dylan</h4>
              <p className="text-sm text-stone-500 max-w-xs mb-8">
                Inicia una sesión de voz. Dylan Martínez tiene 18 años y una visión que te dejará sin palabras.
              </p>
              <button
                onClick={connect}
                disabled={isConnecting}
                className="btn-primary flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Conectando...
                  </>
                ) : (
                  <>
                    <Mic size={20} />
                    Comenzar Sesión
                  </>
                )}
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col items-center justify-center"
            >
              <div className="relative mb-12">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.1, 0.3]
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-emerald-500 rounded-full blur-2xl"
                />
                <div className="relative w-32 h-32 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-emerald-50">
                  <div className="flex gap-1 items-end h-8">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [8, 24, 12, 32, 8] }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 1, 
                          delay: i * 0.1,
                          ease: "easeInOut"
                        }}
                        className="w-1.5 bg-emerald-500 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full max-w-md bg-white/50 backdrop-blur p-4 rounded-xl border border-stone-200 mb-8 max-h-32 overflow-y-auto">
                <p className="text-xs text-stone-400 uppercase tracking-widest mb-2 font-bold">Transcripción en tiempo real</p>
                <p className="text-sm text-stone-700 italic">
                  {transcript || "Escuchando..."}
                </p>
              </div>

              <button
                onClick={disconnect}
                className="btn-secondary flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50"
              >
                <MicOff size={20} />
                Finalizar Sesión
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 bg-stone-900 text-white text-[10px] uppercase tracking-[0.2em] text-center font-bold">
        Powered by Gemini 2.5 Native Audio
      </div>
    </div>
  );
}
