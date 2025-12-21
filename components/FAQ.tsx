import React from 'react';
import { Plus, HelpCircle } from 'lucide-react';

interface FAQProps {
  spouseName?: string;
}

export const FAQ: React.FC<FAQProps> = ({ spouseName }) => {
  // Usa o nome do cônjuge se existir, senão usa "minha esposa/marido"
  const objectionName = spouseName ? spouseName : "Minha família";

  return (
    <section className="py-20 bg-white px-4 border-t border-slate-100">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest mb-2 border border-slate-200 px-3 py-1 rounded-full">
                <HelpCircle size={14} />
                <span>Transparência Total</span>
            </div>
          <h2 className="text-3xl font-serif font-bold text-slate-900">
            Por que NÃO fechar agora?
          </h2>
          <p className="text-slate-500 mt-2">
            Respondemos as dúvidas que ninguém tem coragem de perguntar.
          </p>
        </div>

        <div className="space-y-4">
            <details className="group bg-slate-50 rounded-xl overflow-hidden transition-all duration-300 open:bg-white open:shadow-lg open:ring-1 open:ring-slate-200">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-bold text-slate-800">"Minha água parece limpa, será que preciso mesmo?"</span>
                    <Plus className="text-slate-400 group-open:rotate-45 transition-transform duration-300" />
                </summary>
                <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100/0 group-open:border-slate-100 pt-4 mt-2">
                    Visualmente, sim. Mas os contaminantes modernos como PFAS, microplásticos e metais pesados são invisíveis. Além disso, a "dureza" da água (cálcio/magnésio) destrói tubulações e eletrodomésticos silenciosamente. Instalar o sistema é como um seguro de saúde para sua família e para o patrimônio da sua casa nova.
                </div>
            </details>

            <details className="group bg-slate-50 rounded-xl overflow-hidden transition-all duration-300 open:bg-white open:shadow-lg open:ring-1 open:ring-slate-200">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-bold text-slate-800">"Posso encontrar algo mais barato no Home Depot?"</span>
                    <Plus className="text-slate-400 group-open:rotate-45 transition-transform duration-300" />
                </summary>
                <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100/0 group-open:border-slate-100 pt-4 mt-2">
                    Com certeza. Existem filtros amadores no mercado. A diferença é que o sistema Aquafeel é um tratamento de grau industrial miniaturizado para residências. Garantia vitalícia, manutenção inclusa, sabão grátis por 25 anos e instalação VIP não são encontrados em prateleiras de loja. O barato sai caro quando você precisa trocar o sistema a cada 3 anos.
                </div>
            </details>

            <details className="group bg-slate-50 rounded-xl overflow-hidden transition-all duration-300 open:bg-white open:shadow-lg open:ring-1 open:ring-slate-200">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-bold text-slate-800">"{objectionName} não quer mais uma conta mensal agora."</span>
                    <Plus className="text-slate-400 group-open:rotate-45 transition-transform duration-300" />
                </summary>
                <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100/0 group-open:border-slate-100 pt-4 mt-2">
                    Nós entendemos perfeitamente. Por isso, estruturamos essa oferta VIP para que o primeiro pagamento seja apenas em <strong>Março de 2026</strong>. Além disso, o valor que vocês deixarão de gastar no supermercado com água engarrafada e produtos de limpeza (que nós fornecemos) cobre praticamente todo o investimento. É uma troca de despesa, não uma nova conta.
                </div>
            </details>

            <details className="group bg-slate-50 rounded-xl overflow-hidden transition-all duration-300 open:bg-white open:shadow-lg open:ring-1 open:ring-slate-200">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-bold text-slate-800">"E se eu mudar de casa de novo?"</span>
                    <Plus className="text-slate-400 group-open:rotate-45 transition-transform duration-300" />
                </summary>
                <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100/0 group-open:border-slate-100 pt-4 mt-2">
                    O sistema Aquafeel valoriza o imóvel na venda, mas é totalmente móvel. Se vocês mudarem, nós movemos o sistema para a próxima casa. O investimento acompanha a família, não as paredes.
                </div>
            </details>
        </div>
      </div>
    </section>
  );
};
