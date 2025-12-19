import React from 'react';
import { Clock, Tag, CalendarDays } from 'lucide-react';

export const UrgencyBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-y border-amber-200 py-8 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left bg-white p-6 rounded-2xl shadow-sm border border-amber-100">
        <div className="flex items-center gap-4">
            <div className="bg-amber-500 text-white p-4 rounded-xl shadow-lg shadow-amber-500/30 animate-pulse">
                <Tag size={32} />
            </div>
            <div>
                <h3 className="font-bold text-slate-900 text-xl">Última Chamada: Cliente VIP</h3>
                <p className="text-slate-600 mt-1">
                   Bônus de <span className="font-black text-amber-600 underline decoration-wavy">$1,000.00 OFF</span> + <span className="font-black text-amber-600">2 Meses Grátis</span>.
                </p>
            </div>
        </div>
        
        <div className="flex flex-col items-center md:items-end">
            <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg border border-red-100 flex items-center gap-2 font-bold mb-2">
                <CalendarDays size={20} />
                <span>EXPIRA: 20 DE DEZEMBRO, 2025</span>
            </div>
            <p className="text-xs text-slate-400 font-medium max-w-[200px] text-center md:text-right">
                Após esta data, a proposta retorna ao valor original de mercado sem exceções.
            </p>
        </div>
      </div>
    </div>
  );
};