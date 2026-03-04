import React from 'react';
import { Sparkles, Layout as LayoutIcon, MessageSquare, Mic, Github, Twitter } from 'lucide-react';
import { motion } from 'motion/react';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b-4 border-brand-primary">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-brand-primary rounded-none flex items-center justify-center text-white -rotate-3 border-2 border-white">
            <Sparkles size={20} />
          </div>
          <span className="font-display font-black text-2xl tracking-tighter italic">UNFORGETTABLE<span className="text-brand-accent">.</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <NavLink icon={<LayoutIcon size={16} />} label="Showcase" active />
          <NavLink icon={<MessageSquare size={16} />} label="Chat AI" />
          <NavLink icon={<Mic size={16} />} label="Voice Live" />
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 text-stone-500 hover:text-stone-900 transition-colors">
            <Twitter size={20} />
          </button>
          <button className="p-2 text-stone-500 hover:text-stone-900 transition-colors">
            <Github size={20} />
          </button>
          <button className="ml-2 btn-primary !py-2 !px-4 text-sm">
            Suscribirse
          </button>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <a 
      href="#" 
      className={`flex items-center gap-2 text-sm font-medium transition-colors ${
        active ? 'text-brand-primary' : 'text-stone-500 hover:text-stone-900'
      }`}
    >
      {icon}
      {label}
    </a>
  );
}
