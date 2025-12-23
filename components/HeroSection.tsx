import React from 'react';
import { 
  ShieldCheck, 
  Gift, 
  Sparkles, 
  Droplets, 
  Calendar, 
  CreditCard, 
  Microscope, 
  CheckCircle2,
  Gem,
  Zap
} from 'lucide-react';
import { Language, translations } from '../utils/i18n';

interface HeroSectionProps {
  clientName: string;
  spouseName?: string;
  lang: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ clientName, spouseName, lang }) => {
  const displayName = spouseName ? `${clientName} & ${spouseName}` : clientName;
  const t = translations[lang].hero;

  const benefits = [
    {
      icon: <Gift className="text-red-500" size={24} />,
      title: t.cashbackTitle,
      sub: t.cashbackValue,
      highlight: true
    },
    {
      icon: <ShieldCheck className="text-gold-500" size={24} />,
      title: t.warrantyTitle,
      sub: t.warrantySub
    },
    {
      icon: <Gem className="text-aqua-400" size={24} />,
      title: t.installTitle,
      sub: t.installSub
    },
    {
      icon: <Sparkles className="text-emerald-400" size={24} />,
      title: t.soapTitle,
      sub: t.soapSub
    },
    {
      icon: <Calendar className="text-blue-400" size={24} />,
      title: t.paymentTitle,
      sub: t.paymentSub
    },
    {
      icon: <CreditCard className="text-purple-400" size={24} />,
      title: t.penaltyTitle,
      sub: t.penaltySub
    },
    {
      icon: <Microscope className="text-teal-400" size={24} />,
      title: t.analysisTitle,
      sub: t.analysisSub
    }
  ];

  return (
    <div className="relative bg-aqua-950 text-white pt-24 pb-40 px-4 overflow-hidden">
      {/* Background de Luxo Profundo */}
      <div className="absolute inset-0 bg-[#020d1a]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-aqua-900/20 to-transparent opacity-50"></div>
      <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[150px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[800px] h-[800px] bg-aqua-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center flex flex-col items-center mb-16">
          <div className="inline-flex items-center gap-3 mb-10 bg-gradient-to-r from-red-600 to-red-800 text-white px-10 py-3 rounded-full shadow-[0_0_50px_rgba(220,38,38,0.3)] border border-white/10">
            <Gift size={22} className="fill-white" /> 
            <span className="text-sm font-black tracking-[0.3em] uppercase">{t.platinum}</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter text-white font-sans">
            <span className="opacity-70 text-2xl md:text-4xl block mb-2 font-light tracking-widest">{t.welcomeHome}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-slate-400 block drop-shadow-sm uppercase">
              {displayName}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 font-light mb-16 max-w-4xl mx-auto leading-relaxed tracking-wide">
            {t.subtitle} <br className="hidden md:block" />
            <span className="text-white font-bold inline-flex items-center gap-2 mt-4 px-4 py-2 border-b-2 border-red-500">
               {t.systemName}
            </span>
          </p>
        </div>

        {/* Grid de Benefícios de Luxo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className={`glass-card p-6 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/5 flex flex-col items-center text-center group ${benefit.highlight ? 'ring-2 ring-red-500/50 bg-red-500/5' : ''}`}
            >
              <div className="mb-4 bg-white/5 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                {benefit.icon}
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] mb-1">
                  {benefit.title}
                </h4>
                <p className={`text-xl font-bold tracking-tight ${benefit.highlight ? 'text-red-400' : 'text-white'}`}>
                  {benefit.sub}
                </p>
              </div>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <CheckCircle2 size={16} className="text-slate-600" />
              </div>
            </div>
          ))}
          
          {/* Card Final de Convite Visual */}
          <div className="hidden lg:flex flex-col items-center justify-center p-6 rounded-3xl bg-gradient-to-br from-aqua-600/20 to-aqua-900/40 border border-aqua-400/20">
             <Zap size={48} className="text-aqua-400 mb-4 animate-pulse" fill="currentColor" />
             <p className="text-xs font-bold text-aqua-200 uppercase tracking-widest text-center">
                Aquafeel Intelligence System
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};