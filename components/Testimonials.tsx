import React from 'react';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
            Famílias Que Escolheram o Melhor
          </h2>
          <p className="text-slate-500 mt-4">
            Veja o que outros clientes exigentes dizem sobre a mudança de vida.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative group hover:shadow-xl transition-all duration-300">
                <Quote className="absolute top-6 right-6 text-slate-100 group-hover:text-amber-100 transition-colors" size={40} />
                <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-slate-600 mb-6 leading-relaxed italic">
                    "Eu duvidei que faria diferença na minha pele, mas em 2 semanas meu cabelo mudou completamente. E o melhor: meus boxes de vidro continuam brilhando como novos há meses."
                </p>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold">MJ</div>
                    <div>
                        <p className="font-bold text-slate-900 text-sm">Mariana J.</p>
                        <p className="text-xs text-slate-400">Cliente há 2 anos • New Jersey</p>
                    </div>
                </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-amber-400 relative transform md:-translate-y-4">
                <Quote className="absolute top-6 right-6 text-slate-100" size={40} />
                <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-slate-600 mb-6 leading-relaxed italic">
                    "Acabamos de comprar nossa casa dos sonhos e não queríamos estragar as tubulações com a água da cidade. O atendimento da equipe foi impecável, parecia hotel 5 estrelas."
                </p>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-aqua-100 rounded-full flex items-center justify-center text-aqua-700 font-bold">RC</div>
                    <div>
                        <p className="font-bold text-slate-900 text-sm">Roberto & Carla</p>
                        <p className="text-xs text-slate-400">Casa Nova • Pennsylvania</p>
                    </div>
                </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative group hover:shadow-xl transition-all duration-300">
                <Quote className="absolute top-6 right-6 text-slate-100 group-hover:text-amber-100 transition-colors" size={40} />
                <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-slate-600 mb-6 leading-relaxed italic">
                    "O sabão que eles dão dura uma eternidade e é ótimo. Só a economia de supermercado já pagou metade da parcela. Recomendo de olhos fechados."
                </p>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold">AL</div>
                    <div>
                        <p className="font-bold text-slate-900 text-sm">Ana Lucia</p>
                        <p className="text-xs text-slate-400">Cliente Fidelidade</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};