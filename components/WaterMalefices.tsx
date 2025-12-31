import React, { useState } from 'react';
import { 
  Home, 
  User, 
  Baby, 
  Dog, 
  AlertTriangle, 
  Droplets,
  HeartCrack,
  ShieldAlert,
  RotateCcw,
  Maximize2
} from 'lucide-react';
import { Language, translations } from '../utils/i18n';
import { motion } from 'framer-motion';

interface WaterMaleficesProps {
  lang: Language;
}

const CategoryCard: React.FC<{ cat: any; lang: Language }> = ({ cat, lang }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const tAction = translations[lang].malefices.flipAction;

  return (
    <div 
      className="perspective-1000 h-[520px] md:h-[620px] w-full cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-700 preserve-3d shadow-2xl rounded-3xl"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front Side */}
        <div className={`absolute inset-0 backface-hidden ${cat.bgColor} ${cat.borderColor} border-2 rounded-3xl p-6 md:p-10 flex flex-col z-20`}>
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <div className="bg-white p-3 md:p-4 rounded-2xl shadow-sm shrink-0">
              {cat.icon}
            </div>
            <h3 className="text-xl md:text-3xl font-black text-slate-800 leading-tight uppercase tracking-tighter">{cat.title}</h3>
          </div>
          
          <ul className="space-y-4 md:space-y-6 flex-1">
            {cat.items.map((item: string, i: number) => (
              <li key={i} className="flex gap-4 text-slate-700">
                <div className="mt-1 shrink-0">
                  <HeartCrack size={18} className="text-red-500" />
                </div>
                <span className="text-sm md:text-base font-semibold leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-center gap-2 text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest animate-pulse border-t border-slate-200 pt-6">
            <RotateCcw size={14} />
            {tAction}
          </div>
        </div>

        {/* Back Side (Realidade Oculta) */}
        <div 
          className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden bg-slate-950 flex flex-col z-10"
          style={{ transform: 'rotateY(180deg)' }}
        >
          {/* HD Image Section */}
          <div className="h-2/5 relative overflow-hidden">
            <img 
              src={cat.imageUrl} 
              alt={cat.title} 
              className="w-full h-full object-cover filter contrast-125 saturate-150 grayscale-[30%] hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
            <div className="absolute top-4 right-4 bg-red-600/90 text-white p-2 rounded-full shadow-lg">
               <Maximize2 size={16} />
            </div>
            <div className="absolute bottom-4 left-6 flex items-center gap-2">
                <div className="bg-red-600 p-1.5 rounded-lg">
                    <AlertTriangle size={14} className="text-white" />
                </div>
                <span className="text-white font-black uppercase text-[10px] tracking-widest">{cat.impactLabel}</span>
            </div>
          </div>

          {/* Fear Trigger Section */}
          <div className="flex-1 p-6 md:p-10 flex flex-col justify-center bg-slate-950">
             <h4 className="text-red-500 text-sm md:text-lg font-black uppercase tracking-[0.2em] mb-4 border-b border-red-500/20 pb-2">
               {cat.backTitle}
             </h4>
             <p className="text-slate-100 text-sm md:text-xl font-bold leading-relaxed italic border-l-4 border-red-600 pl-4 py-2 bg-white/5 rounded-r-xl">
               "{cat.fearTrigger}"
             </p>
             
             <button className="mt-8 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest mx-auto transition-all border border-white/10">
               Toque para Voltar
             </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const WaterMalefices: React.FC<WaterMaleficesProps> = ({ lang }) => {
  const t = translations[lang].malefices;

  const categories = [
    {
      icon: <Home size={36} className="text-amber-500" />,
      title: t.home.title,
      items: [t.home.m1, t.home.m2, t.home.m3],
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      imageUrl: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&q=100&w=1200', 
      backTitle: t.home.backTitle,
      fearTrigger: t.home.fearTrigger,
      impactLabel: t.home.impactLabel
    },
    {
      icon: <User size={36} className="text-blue-500" />,
      title: t.adults.title,
      items: [t.adults.m1, t.adults.m2, t.adults.m3],
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      imageUrl: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=100&w=1200', 
      backTitle: t.adults.backTitle,
      fearTrigger: t.adults.fearTrigger,
      impactLabel: t.adults.impactLabel
    },
    {
      icon: <Baby size={36} className="text-pink-500" />,
      title: t.children.title,
      items: [t.children.m1, t.children.m2, t.children.m3],
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      imageUrl: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=100&w=1200',
      backTitle: t.children.backTitle,
      fearTrigger: t.children.fearTrigger,
      impactLabel: t.children.impactLabel
    },
    {
      icon: <Dog size={36} className="text-emerald-500" />,
      title: t.pets.title,
      items: [t.pets.m1, t.pets.m2, t.pets.m3],
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=100&w=1200', 
      backTitle: t.pets.backTitle,
      fearTrigger: t.pets.fearTrigger,
      impactLabel: t.pets.impactLabel
    }
  ];

  return (
    <section className="py-16 md:py-32 bg-slate-50 px-4 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-20 opacity-[0.03] pointer-events-none hidden lg:block">
        <ShieldAlert size={500} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-red-200 shadow-sm">
            <AlertTriangle size={16} />
            <span>Alerta Crítico de Bio-Segurança</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-serif font-black text-slate-900 mb-8 px-2 tracking-tighter leading-tight">
            {t.title}
          </h2>
          <p className="text-slate-500 max-w-3xl mx-auto text-lg md:text-2xl px-4 leading-relaxed font-medium">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
          {categories.map((cat, idx) => (
            <CategoryCard key={idx} cat={cat} lang={lang} />
          ))}
        </div>

        <div className="mt-20 md:mt-32 bg-slate-900 rounded-[3rem] p-10 md:p-20 text-center text-white relative overflow-hidden group shadow-2xl border border-white/5">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <div className="relative z-10">
            <div className="bg-aqua-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-10 animate-float shadow-[0_0_50px_rgba(14,165,233,0.3)]">
                <Droplets className="text-aqua-400 w-12 h-12" size={48} />
            </div>
            <p className="text-2xl md:text-4xl font-serif font-bold max-w-5xl mx-auto italic leading-relaxed px-4 text-slate-100 drop-shadow-lg">
              "{t.quote}"
            </p>
            <div className="mt-12 h-1.5 w-32 bg-gradient-to-r from-red-600 to-amber-500 mx-auto rounded-full shadow-lg"></div>
          </div>
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
};