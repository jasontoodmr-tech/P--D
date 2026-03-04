import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ChatInterface } from './components/ChatInterface';
import { VoiceInterface } from './components/VoiceInterface';
import { InteractiveExperienceCard } from './components/InteractiveExperienceCard';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Zap, 
  MessageSquare, 
  Mic, 
  ArrowRight,
  Star,
  Rocket,
  Heart,
  Smile,
  Music,
  Cross,
  Briefcase,
  MessageCircle
} from 'lucide-react';

export default function App() {
  const [activeMode, setActiveMode] = useState<'chat' | 'voice'>('chat');

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      
      {/* Marquee Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 flex flex-col justify-around py-20 opacity-20">
        <div className="marquee-text animate-marquee">DIOS • MÚSICA • COMUNICACIÓN • PROACTIVIDAD • </div>
        <div className="marquee-text animate-marquee-reverse">NO CONVENCIONAL • DYLAN • 18 AÑOS • EXPERIENCIA • </div>
        <div className="marquee-text animate-marquee">DIOS • MÚSICA • COMUNICACIÓN • PROACTIVIDAD • </div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 pt-32 pb-24">
        {/* Hero Section */}
        <section className="mb-32 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-4 bg-brand-primary text-white font-black uppercase tracking-[0.3em] mb-8 border-4 border-white shadow-[8px_8px_0px_0px_rgba(0,242,255,1)]"
          >
            DYLAN MARTÍNEZ • 18 AÑOS • PROACTIVO
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-[10vw] font-display font-black leading-[0.85] mb-12 tracking-tighter italic"
          >
            CONDENADAMENTE <span className="text-brand-primary">DIFERENTE</span>. <br />
            SIEMPRE <span className="text-brand-accent underline decoration-8">CONECTADO</span>.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl font-mono text-stone-400 max-w-3xl mx-auto mb-16"
          >
            Tengo 18 años y ya he recorrido 3 mundos laborales en un solo año. No soy lo que esperas. Mi motor es Dios, mi lenguaje es la Música y mi fuerza es la comunicación constante, incluso en la tormenta.
          </motion.p>

          <div className="flex flex-wrap justify-center gap-6">
            <button 
              onClick={() => setActiveMode('chat')}
              className={`btn-primary text-xl ${activeMode === 'chat' ? 'bg-white text-brand-primary' : ''}`}
            >
              Chatea con mi Clon
            </button>
            <button 
              onClick={() => setActiveMode('voice')}
              className={`btn-secondary text-xl ${activeMode === 'voice' ? 'bg-brand-accent text-black' : ''}`}
            >
              Habla con mi Clon (Voz)
            </button>
          </div>
        </section>

        {/* Core Pillars Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          <PersonalityCard 
            icon={<Briefcase className="text-brand-primary" size={40} />}
            title="3 EMPLEOS / 1 AÑO"
            description="Adaptabilidad extrema. He aprendido más en un año que muchos en una década. Proactividad en estado puro."
          />
          <PersonalityCard 
            icon={<MessageCircle className="text-brand-accent" size={40} />}
            title="COMUNICADOR"
            description="Hablo, escucho y conecto. Especialmente cuando las cosas se ponen difíciles. La comunicación es mi paz."
          />
          <PersonalityCard 
            icon={<Music className="text-brand-primary" size={40} />}
            title="PASIÓN MUSICAL"
            description="La música no es un hobby, es mi esencia. Ritmo, melodía y alma en todo lo que hago."
          />
          <PersonalityCard 
            icon={<Heart className="text-brand-accent" size={40} />}
            title="FE EN DIOS"
            description="Mi brújula y mi cimiento. Todo lo que soy y lo que hago tiene un propósito mayor."
          />
        </section>

        {/* Interactive Card */}
        <InteractiveExperienceCard />

        {/* Interactive Experience */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32">
          <div className="lg:col-span-7">
            <motion.div
              key={activeMode}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-brand-primary/20 blur-3xl rounded-full" />
              {activeMode === 'chat' ? <ChatInterface /> : <VoiceInterface />}
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <div className="brutal-card mb-8">
              <h2 className="text-4xl font-black mb-4 italic">MI FILOSOFÍA</h2>
              <p className="font-mono text-sm leading-relaxed">
                No sigo el camino marcado. Soy proactivo, busco soluciones donde otros ven problemas y siempre mantengo la línea de comunicación abierta. Mi vida es una mezcla de fe, ritmo y trabajo duro.
              </p>
            </div>
            
            <div className="space-y-4">
              <SkillItem label="Proactividad Total" progress={100} />
              <SkillItem label="Resiliencia Comunicativa" progress={98} />
              <SkillItem label="Adaptabilidad Laboral" progress={95} />
              <SkillItem label="Vibras Musicales" progress={100} />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t-4 border-brand-primary pt-16 pb-8 text-center">
          <h3 className="text-6xl md:text-9xl font-display font-black italic mb-12 tracking-tighter">
            DYLAN <span className="text-brand-primary">MARTÍNEZ</span>.
          </h3>
          <div className="flex justify-center gap-8 mb-12">
            <SocialLink href="#" label="DIOS" />
            <SocialLink href="#" label="MÚSICA" />
            <SocialLink href="#" label="TRABAJO" />
          </div>
          <p className="font-mono text-stone-500 text-sm">
            © 2026 DYLAN MARTÍNEZ • CONDENADAMENTE DIFERENTE.
          </p>
        </footer>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
        }
      `}} />
    </div>
  );
}

function PersonalityCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="brutal-card flex flex-col items-center text-center">
      <div className="mb-6">{icon}</div>
      <h3 className="text-2xl font-black mb-4 italic">{title}</h3>
      <p className="font-mono text-sm text-stone-600">{description}</p>
    </div>
  );
}

function SkillItem({ label, progress }: { label: string, progress: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between font-mono text-xs uppercase font-bold">
        <span>{label}</span>
        <span>{progress}%</span>
      </div>
      <div className="h-4 bg-stone-800 border-2 border-white">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.min(progress, 100)}%` }}
          className="h-full bg-brand-accent"
        />
      </div>
    </div>
  );
}

function SocialLink({ href, label }: { href: string, label: string }) {
  return (
    <a href={href} className="font-display font-black text-xl hover:text-brand-primary transition-colors italic underline decoration-4 underline-offset-4">
      {label}
    </a>
  );
}


