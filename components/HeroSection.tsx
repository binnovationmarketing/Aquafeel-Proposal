import React from 'react';
import { ShieldCheck, Star, Award, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-[#0B1120] text-white pb-24 pt-16 px-4 overflow-hidden">
      {/* Sophisticated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] to-[#0B1120]"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>

      <div className="max-w-5xl mx-auto relative z-10 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 mb-8 bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-1.5 rounded-full shadow-2xl">
          <Star size={14} className="text-amber-400 fill-amber-400" /> 
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-300">Cliente Platinum Return</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight tracking-tight text-white drop-shadow-lg">
          Bem-vindos, <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">Aline & Sinval</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-400 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
          Sua nova casa é uma conquista. <span className="text-white font-medium">O sistema de água deve estar à altura.</span><br/>
          Preparamos a configuração definitiva para o seu novo lar.
        </p>

        <div className="flex flex-wrap justify-center gap-3 md:gap-6">
          <div className="flex items-center gap-3 bg-white/5 border border-white/5 px-5 py-3 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
            <div className="bg-emerald-500/20 p-2 rounded-full text-emerald-400">
                <ShieldCheck size={20} />
            </div>
            <div className="text-left">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Garantia</div>
                <div className="font-semibold">Vitalícia & Transferível</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 border border-white/5 px-5 py-3 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
            <div className="bg-amber-500/20 p-2 rounded-full text-amber-400">
                <Sparkles size={20} />
            </div>
            <div className="text-left">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Qualidade</div>
                <div className="font-semibold">Pureza Cristalina</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white/5 border border-white/5 px-5 py-3 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
            <div className="bg-blue-500/20 p-2 rounded-full text-blue-400">
                <Award size={20} />
            </div>
            <div className="text-left">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Tecnologia</div>
                <div className="font-semibold">Dual Tank System</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};