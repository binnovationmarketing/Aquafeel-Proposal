import React from 'react';
import { Skull, FlaskConical, Droplets, AlertTriangle } from 'lucide-react';

export const ContaminantTruths: React.FC = () => {
  return (
    <div className="bg-slate-900 py-20 px-4 text-white relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-[100px]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-amber-500 font-bold text-sm tracking-widest uppercase mb-4">
                <AlertTriangle size={18} />
                <span>Alerta ao Consumidor</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
                O Que Você <span className="text-red-500 italic">Não Sabe</span> Está Te Custando Caro
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                Você investiu em uma casa linda, mas ainda traz "inimigos" para dentro dela através das compras de supermercado.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            
            {/* Box 1: Bottled Water */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="flex items-start justify-between mb-6">
                    <div className="bg-blue-500/20 p-4 rounded-2xl">
                        <Droplets size={32} className="text-blue-400" />
                    </div>
                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Perigo Invisível</span>
                </div>
                
                <h3 className="text-2xl font-bold mb-4">A Farsa da Água Engarrafada</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                    Você paga caro por água que, muitas vezes, é apenas água da torneira filtrada. Pior ainda: o plástico libera <strong>Ftalatos e BPA</strong> quando exposto ao calor (no transporte ou armazenamento), agindo como disruptores hormonais no seu corpo.
                </p>
                <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>Microplásticos presentes em 93% das marcas líderes.</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>Acidez elevada (pH ácido) que rouba minerais do corpo.</span>
                    </li>
                </ul>
            </div>

            {/* Box 2: Soaps */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="flex items-start justify-between mb-6">
                    <div className="bg-purple-500/20 p-4 rounded-2xl">
                        <FlaskConical size={32} className="text-purple-400" />
                    </div>
                    <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Química Nociva</span>
                </div>
                
                <h3 className="text-2xl font-bold mb-4">O Veneno na Lavanderia</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                    Sabões tradicionais de mercado (Tide, Gain, etc.) são feitos à base de petróleo e gordura animal. Eles não limpam; eles "mascaram" a sujeira com branqueadores ópticos e fragrâncias sintéticas que causam alergias e dermatites.
                </p>
                <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span>Resíduos químicos ficam nas roupas e entram pelos poros.</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span>Desgaste acelerado das fibras das roupas caras.</span>
                    </li>
                </ul>
            </div>

        </div>

        <div className="mt-12 text-center bg-gradient-to-r from-emerald-900/50 to-emerald-800/50 border border-emerald-500/30 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <Skull className="text-emerald-400" size={32} />
                <p className="text-emerald-100 font-medium text-lg">
                    Com Aquafeel + Pure Selects, você elimina <span className="text-white font-bold underline decoration-emerald-500">100%</span> desses riscos imediatamente.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};