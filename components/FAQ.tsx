import React from 'react';
import { Plus, HelpCircle } from 'lucide-react';
import { Language, translations } from '../utils/i18n';

interface FAQProps {
  spouseName?: string;
  lang: Language;
}

export const FAQ: React.FC<FAQProps> = ({ spouseName, lang }) => {
  // Usa o nome do cônjuge se existir, senão usa "minha família" dependendo da lingua
  const familyText = lang === 'pt' ? 'Minha família' : (lang === 'en' ? 'My family' : 'Mi familia');
  const objectionName = spouseName ? spouseName : familyText;
  const t = translations[lang].faq;

  return (
    <section className="py-20 bg-white px-4 border-t border-slate-100">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest mb-2 border border-slate-200 px-3 py-1 rounded-full">
                <HelpCircle size={14} />
                <span>{t.transparency}</span>
            </div>
          <h2 className="text-3xl font-serif font-bold text-slate-900">
            {t.title}
          </h2>
          <p className="text-slate-500 mt-2">
            {t.subtitle}
          </p>
        </div>

        <div className="space-y-4">
            <details className="group bg-slate-50 rounded-xl overflow-hidden transition-all duration-300 open:bg-white open:shadow-lg open:ring-1 open:ring-slate-200">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-bold text-slate-800">"{t.q1}"</span>
                    <Plus className="text-slate-400 group-open:rotate-45 transition-transform duration-300" />
                </summary>
                <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100/0 group-open:border-slate-100 pt-4 mt-2">
                    {t.a1}
                </div>
            </details>

            <details className="group bg-slate-50 rounded-xl overflow-hidden transition-all duration-300 open:bg-white open:shadow-lg open:ring-1 open:ring-slate-200">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-bold text-slate-800">"{t.q2}"</span>
                    <Plus className="text-slate-400 group-open:rotate-45 transition-transform duration-300" />
                </summary>
                <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100/0 group-open:border-slate-100 pt-4 mt-2">
                    {t.a2}
                </div>
            </details>

            <details className="group bg-slate-50 rounded-xl overflow-hidden transition-all duration-300 open:bg-white open:shadow-lg open:ring-1 open:ring-slate-200">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-bold text-slate-800">"{objectionName} {t.q3}"</span>
                    <Plus className="text-slate-400 group-open:rotate-45 transition-transform duration-300" />
                </summary>
                <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100/0 group-open:border-slate-100 pt-4 mt-2">
                    {t.a3}
                </div>
            </details>

            <details className="group bg-slate-50 rounded-xl overflow-hidden transition-all duration-300 open:bg-white open:shadow-lg open:ring-1 open:ring-slate-200">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-bold text-slate-800">"{t.q4}"</span>
                    <Plus className="text-slate-400 group-open:rotate-45 transition-transform duration-300" />
                </summary>
                <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100/0 group-open:border-slate-100 pt-4 mt-2">
                    {t.a4}
                </div>
            </details>
        </div>
      </div>
    </section>
  );
};
