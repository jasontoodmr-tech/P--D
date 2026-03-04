import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, Sparkles, Zap, Heart, Music } from 'lucide-react';

export function InteractiveExperienceCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto mb-20">
      <motion.div 
        layout
        onClick={() => setIsExpanded(!isExpanded)}
        className="brutal-card cursor-pointer relative overflow-hidden group"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="text-brand-primary" size={24} />
            <h3 className="font-display font-black text-2xl italic uppercase tracking-tighter">
              {isExpanded ? 'La Experiencia Completa' : 'Dylan en una Cápsula'}
            </h3>
          </div>
          <motion.div 
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="w-10 h-10 bg-brand-primary text-white flex items-center justify-center border-2 border-black"
          >
            {isExpanded ? <Minus size={20} /> : <Plus size={20} />}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <p className="font-mono text-lg leading-tight">
                18 años, 3 empleos, fe inquebrantable y un ritmo que no para. Dylan es proactividad pura y comunicación sin filtros.
              </p>
              <div className="flex gap-4">
                <span className="px-3 py-1 bg-brand-accent text-black font-black text-[10px] uppercase italic">#Diferente</span>
                <span className="px-3 py-1 bg-brand-primary text-white font-black text-[10px] uppercase italic">#Proactivo</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-display font-black text-brand-primary italic uppercase">Trayectoria Relámpago</h4>
                  <p className="font-mono text-sm text-stone-600">
                    En solo 12 meses, he navegado por 3 entornos laborales distintos. Cada uno me enseñó a adaptarme, a resolver y a ser el primero en levantar la mano.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-display font-black text-brand-accent italic uppercase">Voz en la Tormenta</h4>
                  <p className="font-mono text-sm text-stone-600">
                    No me callo cuando las cosas se ponen feas. Creo que la comunicación honesta es el único camino para salir adelante, sin importar el caos.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-display font-black text-brand-primary italic uppercase">El Ritmo de la Fe</h4>
                  <p className="font-mono text-sm text-stone-600">
                    Mi vida suena a música y se apoya en Dios. Son mis dos motores innegociables que me mantienen enfocado y con energía.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-display font-black text-brand-accent italic uppercase">ADN Maverick</h4>
                  <p className="font-mono text-sm text-stone-600">
                    Ser convencional es aburrido. Busco lo diferente, lo que rompe el molde y lo que realmente deja una huella auténtica.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t-2 border-stone-100">
                <h3 className="font-display font-black text-2xl italic uppercase tracking-tighter mb-2 text-brand-primary">Conóceme Más</h3>
                <p className="font-mono text-sm text-stone-600 leading-relaxed">
                  Soy alguien que no se detiene ante la adversidad. Mi personalidad proactiva me impulsa a tomar la iniciativa en cualquier situación, y mi compromiso con la comunicación asegura que siempre haya un puente tendido, incluso en los momentos más complejos. Soy un muchacho de 18 años que entiende que el valor real está en la acción y en la palabra honesta.
                </p>
              </div>

              <div className="pt-4 border-t-2 border-stone-100 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase font-bold text-stone-400 italic">Haz clic para cerrar la cápsula</span>
                <Zap className="text-brand-primary animate-pulse" size={20} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
