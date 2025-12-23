import React, { useState, useEffect } from 'react';
import { Clock, AlertOctagon, Ban } from 'lucide-react';
import { Language, translations } from '../utils/i18n';

interface UrgencyBannerProps {
  expirationDate: Date;
  lang: Language;
  isExpired?: boolean;
  whatsappMessage?: string;
}

export const UrgencyBanner: React.FC<UrgencyBannerProps> = ({ 
    expirationDate, 
    lang, 
    isExpired = false,
    whatsappMessage 
}) => {
  const t = translations[lang].urgency;
  
  // Função auxiliar para cálculo do tempo
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = expirationDate.getTime() - now.getTime();

    if (difference > 0) {
      return {
        hours: Math.floor((difference / (1000 * 60 * 60))),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (isExpired) return;
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expirationDate, isExpired]);

  // Formatação de data adaptada para cada idioma
  const formattedDate = expirationDate.toLocaleDateString(
    lang === 'en' ? 'en-US' : lang === 'es' ? 'es-ES' : 'pt-BR', 
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
  );

  // RENDERIZAÇÃO QUANDO EXPIRADO (ZONA VERMELHA)
  if (isExpired) {
    return (
        <div className="bg-red-700 border-t-4 border-red-500 py-6 px-4 sticky bottom-0 z-50 md:relative shadow-[0_-10px_40px_rgba(220,38,38,0.3)] animate-in slide-in-from-bottom duration-700">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                <div className="flex items-center gap-5">
                    <div className="bg-white text-red-600 p-3 rounded-full shadow-lg">
                        <Ban size={32} strokeWidth={3} />
                    </div>
                    <div>
                        <h3 className="font-black text-white text-xl md:text-3xl uppercase tracking-tight drop-shadow-md">
                        {t.expiredTitle}
                        </h3>
                        <p className="text-red-100 mt-1 text-sm md:text-base font-medium max-w-lg">
                        {t.expiredText}
                        </p>
                    </div>
                </div>
                
                <a 
                    href={`https://wa.me/12407806473?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-red-700 hover:bg-red-50 px-8 py-3 rounded-full font-black uppercase tracking-wide text-sm shadow-xl transform transition-all hover:scale-105 active:scale-95"
                >
                    {t.expiredButton}
                </a>
            </div>
        </div>
    );
  }

  // RENDERIZAÇÃO NORMAL (CONTAGEM REGRESSIVA)
  return (
    <div className="bg-slate-900 border-y-4 border-amber-500 py-6 px-4 sticky bottom-0 z-50 md:relative shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        <div className="flex items-center gap-5">
            <div className="bg-amber-500 text-slate-900 p-3 rounded-full animate-pulse hidden md:block shadow-lg shadow-amber-500/50">
                <Clock size={32} strokeWidth={2.5} />
            </div>
            <div>
                <h3 className="font-bold text-white text-xl md:text-2xl uppercase tracking-tight drop-shadow-md">
                  {t.expires} <span className="text-amber-400 font-mono tracking-wider">{String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s</span>
                </h3>
                <p className="text-slate-400 mt-1 text-sm md:text-base hidden md:block">
                   {t.commission}
                </p>
            </div>
        </div>
        
        <div className="flex flex-col items-center md:items-end bg-white/5 p-4 rounded-lg border border-white/10 w-full md:w-auto backdrop-blur-sm">
            <div className="text-amber-400 font-bold flex items-center gap-2 mb-1">
                <AlertOctagon size={18} />
                <span className="uppercase text-sm md:text-base tracking-wide">{t.limit} {formattedDate.toUpperCase()}</span>
            </div>
            <p className="text-xs text-slate-400 max-w-[300px] text-center md:text-right">
                {t.footer}
            </p>
        </div>
      </div>
    </div>
  );
};