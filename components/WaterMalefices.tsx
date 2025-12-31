import React from 'react';
import { 
  Home, 
  User, 
  Baby, 
  Dog, 
  AlertTriangle, 
  Droplets,
  HeartCrack,
  ShieldAlert,
  Skull,
  Trash2,
  ZapOff,
  Stethoscope,
  XCircle,
  Construction,
  Waves
} from 'lucide-react';
import { Language, translations } from '../utils/i18n';

interface WaterMaleficesProps {
  lang: Language;
}

export const WaterMalefices: React.FC<WaterMaleficesProps> = ({ lang }) => {
  const t = translations[lang].malefices;
  const ts = translations[lang].sins;

  const categories = [
    {
      icon: <Home size={28} className="text-amber-500" />,
      title: t.home.title,
      items: [t.home.m1, t.home.m2, t.home.m3],
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
    },
    {
      icon: <User size={28} className="text-blue-500" />,
      title: t.adults.title,
      items: [t.adults.m1, t.adults.m2, t.adults.m3],
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: <Baby size={28} className="text-pink-500" />,
      title: t.children.title,
      items: [t.children.m1, t.children.m2, t.children.m3],
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200'
    },
    {
      icon: <Dog size={28} className="text-emerald-500" />,
      title: t.pets.title,
      items: [t.pets.m1, t.pets.m2, t.pets.m3],
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    }
  ];

  const sins = [
    { icon: <Skull size={20} className="text-red-500" />, text: ts.s1 },
    { icon: <Waves size={20} className="text-red-500" />, text: ts.s2 },
    { icon: <Stethoscope size={20} className="text-red-500" />, text: ts.s3 },
    { icon: <Construction size={20} className="text-red-500" />, text: ts.s4 },
    { icon: <ZapOff size={20} className="text-red-500" />, text: ts.s5 },
    { icon: <XCircle size={20} className="text-red-500" />, text: ts.s6 },
    { icon: <Trash2 size={20} className="text-red-500" />, text: ts.s7 },
  ];

  return (
    <section className="py-16 md:py-20 bg-slate-50 px-4 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none hidden md:block">
        <ShieldAlert size={400} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 border border-red-200">
            <AlertTriangle size={14} />
            <span>Alerta de Saúde</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4 px-2">
            {t.title}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg px-4">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-20">
          {categories.map((cat, idx) => (
            <div key={idx} className={`${cat.bgColor} ${cat.borderColor} border-2 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
              <div className="flex items-center gap-4 mb-4 md:mb-6">
                <div className="bg-white p-3 rounded-xl md:rounded-2xl shadow-sm shrink-0">
                  {cat.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-800 leading-tight">{cat.title}</h3>
              </div>
              <ul className="space-y-3 md:space-y-4">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-700">
                    <div className="mt-1 shrink-0">
                      <HeartCrack size={14} className="text-red-400" />
                    </div>
                    <span className="text-sm font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 7 Capital Sins Section */}
        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-red-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
             <Skull size={300} />
          </div>
          <div className="text-center mb-10 relative z-10">
             <h3 className="text-2xl md:text-4xl font-serif font-bold text-red-600 mb-2">{ts.title}</h3>
             <p className="text-slate-500 font-medium tracking-wide">{ts.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-1 gap-4 relative z-10">
             {sins.map((sin, idx) => (
               <div key={idx} className="flex items-start gap-4 p-4 bg-red-50 rounded-2xl border border-red-100/50 hover:bg-red-100 transition-colors group">
                  <div className="bg-white p-2 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                    {sin.icon}
                  </div>
                  <p className="text-slate-800 font-bold text-sm md:text-base">{sin.text}</p>
               </div>
             ))}
          </div>
        </div>

        <div className="mt-12 md:mt-16 bg-slate-900 rounded-2xl md:rounded-3xl p-6 md:p-10 text-center text-white relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="relative z-10">
            <Droplets className="mx-auto mb-4 text-aqua-400 w-10 h-10 md:w-12 md:h-12" size={48} />
            <p className="text-base md:text-xl font-medium max-w-2xl mx-auto italic leading-relaxed px-2">
              "{t.quote}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};