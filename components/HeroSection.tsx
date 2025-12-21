import React from 'react';
import { ShieldCheck, Star, Award, Sparkles, Home } from 'lucide-react';

interface HeroSectionProps {
  clientName: string;
  spouseName?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ clientName, spouseName }) => {
  const displayName = spouseName ? `${clientName} & ${spouseName}` : clientName;

  return (
    <div className="relative bg-[#0B1120] text-white pb-24 pt-16 px-4 overflow-hidden">
      {/* Sophisticated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] to-[#0B1120]"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>

      <div className="max-w-5xl mx-auto relative z-10 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 mb-8 bg-amber-500/10 backdrop-blur-sm border border-amber-500/30 px-6 py-2 rounded-full shadow-2xl">
          <Star size={16} className="text-amber-400 fill-amber-400" /> 
          <span className="text-sm font-bold tracking-[0.2em] uppercase text-amber-100">Cliente Platinum Return</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight tracking-tight text-white drop-shadow-lg">
          Bem-vindos à Casa Nova, <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-aqua-200 to-aqua-400">{displayName}</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-300 font-light mb-10 max-w-3xl mx-auto leading-relaxed">
          Vocês já conhecem a importância de uma água pura. <br/>
          Para o novo lar, preparamos o nosso sistema mais avançado: <span className="text-white font-medium">Tanque Duplo + Osmose Reversa.</span>
        </p>

        <div className="flex flex-wrap justify-center gap-3 md:gap-6">
          <div className="flex items-center gap-3 bg-white/5 border border-white/5 px-5 py-3 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default min-w-[200px]">
            <div className="bg-emerald-500/20 p-2 rounded-full text-emerald-400">
                <ShieldCheck size={20} />
            </div>
            <div className="text-left">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Garantia</div>
                <div className="font-semibold text-white">Vitalícia</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 border border-white/5 px-5 py-3 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default min-w-[200px]">
            <div className="bg-amber-500/20 p-2 rounded-full text-amber-400">
                <Sparkles size={20} />
            </div>
            <div className="text-left">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Desconto VIP</div>
                <div className="font-semibold text-white">-$1.000,00</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white/5 border border-white/5 px-5 py-3 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default min-w-[200px]">
            <div className="bg-blue-500/20 p-2 rounded-full text-blue-400">
                <Home size={20} />
            </div>
            <div className="text-left">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Instalação</div>
                <div className="font-semibold text-white">Grátis (0 Custo)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
