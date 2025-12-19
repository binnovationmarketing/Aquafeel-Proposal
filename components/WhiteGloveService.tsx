import React from 'react';
import { Crown, Sparkles, Clock, ShieldCheck } from 'lucide-react';

export const WhiteGloveService: React.FC = () => {
  return (
    <div className="bg-white py-20 px-4 border-t border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
            
            <div className="flex-1 space-y-8">
                <div>
                    <div className="flex items-center gap-2 text-amber-500 font-bold text-sm tracking-widest uppercase mb-2">
                        <Crown size={18} />
                        <span>Experiência VIP</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
                        Instalação "White Glove"
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        Aline, sabemos que obras e instalações podem ser estressantes. Por isso, para clientes Platinum, oferecemos o protocolo <strong>Luva Branca</strong>. 
                        Nossa equipe elite cuida de tudo.
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="flex gap-4 group">
                        <div className="bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center text-slate-900 shadow-sm border border-slate-100 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                            <Sparkles size={22} />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-lg">Limpeza Absoluta</h4>
                            <p className="text-slate-500 text-sm mt-1">Nós garantimos que o local da instalação ficará mais limpo do que quando chegamos. Zero poeira, zero resíduos.</p>
                        </div>
                    </div>

                    <div className="flex gap-4 group">
                        <div className="bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center text-slate-900 shadow-sm border border-slate-100 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                            <Clock size={22} />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-lg">Agendamento Prioritário</h4>
                            <p className="text-slate-500 text-sm mt-1">Sua instalação fura a fila. Adaptamos nossa agenda à sua disponibilidade, inclusive aos finais de semana se necessário.</p>
                        </div>
                    </div>

                    <div className="flex gap-4 group">
                        <div className="bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center text-slate-900 shadow-sm border border-slate-100 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                            <ShieldCheck size={22} />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-lg">Garantia Estética</h4>
                            <p className="text-slate-500 text-sm mt-1">Instalação discreta e profissional que preserva o design e a estética da sua nova casa.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-200 to-amber-100 rounded-2xl transform rotate-3 scale-95 opacity-50"></div>
                <div className="relative bg-slate-900 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
                    <Crown size={48} className="text-amber-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold mb-4">Acesso Vitalício ao Clube</h3>
                    <p className="text-slate-300 mb-8">
                        Além da instalação, você ganha acesso direto ao Whatsapp pessoal do gerente para qualquer necessidade futura. Sem 0800, sem espera.
                    </p>
                    <div className="inline-block border border-white/20 rounded-lg px-4 py-2 text-sm text-slate-400">
                        Incluso no Pacote Aline & Sinval
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};