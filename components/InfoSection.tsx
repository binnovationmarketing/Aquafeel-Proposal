import React from 'react';
import { ExternalLink, Microscope, AlertOctagon, MapPin } from 'lucide-react';

export const InfoSection: React.FC = () => {
  return (
    <section className="py-20 bg-white px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-aqua-600 font-bold tracking-wider uppercase text-sm">Fatos Reais, Dados Públicos</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-2">
            O Que Está Realmente na Sua Água?
          </h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
            A água municipal cumpre regulamentos básicos, mas "legal" não significa "saudável". 
            Sua nova casa merece proteção contra os contaminantes modernos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Card 1 */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-white hover:border-red-100 cursor-default group">
             <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-100 p-3 rounded-full text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                    <MapPin size={24} />
                </div>
                <h3 className="font-bold text-xl text-slate-800">New Jersey & PA Alert</h3>
             </div>
             <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                Estudos recentes indicam altos níveis de <strong>PFAS (Químicos Eternos)</strong>, Chumbo e Cloro nas redes de abastecimento da região. Estes compostos se acumulam no corpo e nos encanamentos da sua casa nova.
             </p>
             <div className="space-y-3">
                <a href="https://www.ewg.org/tapwater/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all group/link border border-slate-100">
                    <span className="text-sm font-semibold text-slate-700">Ver Base de Dados EWG</span>
                    <ExternalLink size={16} className="text-aqua-500 group-hover/link:translate-x-1 transition-transform" />
                </a>
                <a href="https://www.epa.gov/ground-water-and-drinking-water" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all group/link border border-slate-100">
                    <span className="text-sm font-semibold text-slate-700">Relatórios EPA Oficiais</span>
                    <ExternalLink size={16} className="text-aqua-500 group-hover/link:translate-x-1 transition-transform" />
                </a>
             </div>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-white hover:border-blue-100 cursor-default group">
             <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <Microscope size={24} />
                </div>
                <h3 className="font-bold text-xl text-slate-800">Análise Aquafeel</h3>
             </div>
             <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                Nosso sistema de <strong>Tanque Duplo + Osmose Reversa</strong> é a única barreira física real entre sua família e estes contaminantes. 
             </p>
             <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-slate-700">
                    <AlertOctagon size={16} className="text-red-500 mt-1 shrink-0" />
                    <span>Elimina 99.9% de Vírus e Bactérias</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                    <AlertOctagon size={16} className="text-red-500 mt-1 shrink-0" />
                    <span>Remove Metais Pesados (Chumbo, Mercúrio)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                    <AlertOctagon size={16} className="text-red-500 mt-1 shrink-0" />
                    <span>Neutraliza Cloro e Cloraminas (Pele/Cabelo)</span>
                </li>
             </ul>
          </div>
        </div>
      </div>
    </section>
  );
};