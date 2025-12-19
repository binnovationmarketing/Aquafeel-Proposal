import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Droplets, 
  AlertTriangle, 
  Zap, 
  CheckCircle2, 
  Gift, 
  Calendar, 
  DollarSign,
  Phone
} from 'lucide-react';

interface ComparisonCalculatorProps {
  onSelectPlan: (planId: string) => void;
}

export const ComparisonCalculator: React.FC<ComparisonCalculatorProps> = ({ onSelectPlan }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('180x');

  const plans = [
    { id: '180x', label: '180x', sub: 'Meses', amount: 111, icon: Calendar },
    { id: '120x', label: '120x', sub: 'Meses', amount: 131, icon: Calendar },
    { id: '60x', label: '60x', sub: 'Meses', amount: 200, icon: Calendar }, 
    { id: 'cash', label: 'À Vista', sub: 'Economia Max', amount: 7790, icon: DollarSign, isFull: true },
  ];

  const currentPlan = plans.find(p => p.id === selectedPlan) || plans[0];

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4 relative z-20">
      <div className="grid md:grid-cols-2 gap-0 shadow-2xl rounded-3xl overflow-hidden">
        
        {/* LEFT SIDE: THE PROBLEM (Walmart/Waste) */}
        <div className="bg-white p-6 md:p-10 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-between">
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-danger-600 uppercase tracking-tight">O Custo do Desperdício</h2>
              <p className="text-xs font-bold text-danger-400 tracking-widest uppercase mt-1">O Caminho do Consumo Eterno</p>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center py-4 border-b border-dashed border-gray-200">
                <div className="flex items-center gap-3">
                  <Droplets className="text-blue-400" />
                  <span className="text-lg font-semibold text-gray-700">Água Engarrafada</span>
                </div>
                <span className="text-xl font-bold text-gray-800">$90</span>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-dashed border-gray-200">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="text-purple-400" />
                  <span className="text-lg font-semibold text-gray-700">Produtos Químicos</span>
                </div>
                <span className="text-xl font-bold text-gray-800">$100</span>
              </div>
            </div>

            <div className="bg-danger-50 rounded-2xl p-6 mt-8 text-center border border-danger-100">
              <p className="text-sm text-gray-500 font-semibold mb-2">TOTAL JOGADO NO LIXO (MENSAL)</p>
              <div className="text-6xl font-black text-danger-600 tracking-tighter">
                $190
              </div>
              <p className="text-xs font-bold text-danger-400 mt-2 uppercase tracking-wider">Dinheiro Queimado Para Sempre</p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="border border-red-100 rounded-xl p-4 bg-white shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-danger-600 font-bold">
                <AlertTriangle size={18} />
                <h3>Problemas de Saúde</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                <li>Queda de cabelo e pele ressecada</li>
                <li>Dermatites, Eczemas e Alergias</li>
                <li>Ingestão de microplásticos e metais pesados</li>
              </ul>
            </div>
            
            <div className="border border-orange-100 rounded-xl p-4 bg-white shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-orange-600 font-bold">
                <Zap size={18} />
                <h3>Danos à Casa</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                <li>Degradação acelerada de eletrodomésticos</li>
                <li>Aumento na conta de energia (Scaling)</li>
                <li>Manchas eternas em roupas e louças</li>
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: THE SOLUTION (Aquafeel) */}
        <div className="bg-aqua-950 text-white p-6 md:p-10 flex flex-col relative overflow-hidden">
           {/* Background decorative shine */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-aqua-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-white uppercase tracking-tight">Aquafeel Solutions</h2>
              <p className="text-xs font-bold text-emerald-400 tracking-widest uppercase mt-1">Oportunidade Única • Programa Fidelidade</p>
            </div>

            <div className="text-center mb-8">
              <p className="text-sm text-aqua-200 font-medium mb-2 uppercase tracking-wider">Investimento Selecionado</p>
              <div className="text-7xl font-black text-white tracking-tighter flex justify-center items-start gap-1">
                <span className="text-3xl mt-2">$</span>
                {currentPlan.isFull ? currentPlan.amount.toLocaleString() : currentPlan.amount}
              </div>
              <p className="text-lg text-aqua-200 font-medium mt-1">
                {currentPlan.isFull ? 'Pagamento Único' : `/mês (${currentPlan.label})`}
              </p>
            </div>

            {/* Plan Selector */}
            <div className="grid grid-cols-4 gap-2 mb-8">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => {
                    setSelectedPlan(plan.id);
                    onSelectPlan(plan.id);
                  }}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 ${
                    selectedPlan === plan.id 
                      ? 'bg-aqua-500 border-aqua-400 text-white shadow-lg shadow-aqua-900/50 scale-105' 
                      : 'bg-aqua-900/50 border-aqua-800 text-aqua-300 hover:bg-aqua-800 hover:text-white'
                  }`}
                >
                  <plan.icon size={16} className="mb-1" />
                  <span className="text-sm font-bold">{plan.label}</span>
                  {!plan.isFull && <span className="text-[10px] opacity-75 hidden sm:block">Meses</span>}
                </button>
              ))}
            </div>

            {/* Benefits List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm mb-8">
              <div className="flex items-center gap-2 text-aqua-100">
                <CheckCircle2 className="text-emerald-400 shrink-0" size={18} />
                <span>Água Alcalina & Purificada</span>
              </div>
              <div className="flex items-center gap-2 text-aqua-100">
                <Gift className="text-blue-400 shrink-0" size={18} />
                <span>0% Tax (Imposto)</span>
              </div>
              <div className="flex items-center gap-2 text-aqua-100">
                <CheckCircle2 className="text-emerald-400 shrink-0" size={18} />
                <span>Saúde, Beleza & Cuidados</span>
              </div>
              <div className="flex items-center gap-2 text-aqua-100">
                <Gift className="text-blue-400 shrink-0" size={18} />
                <span>$0 Downpayment (Entrada)</span>
              </div>
              <div className="flex items-center gap-2 text-aqua-100">
                <CheckCircle2 className="text-emerald-400 shrink-0" size={18} />
                <span>Garantia 25 Anos Sistema</span>
              </div>
              <div className="flex items-center gap-2 text-aqua-100">
                <Gift className="text-blue-400 shrink-0" size={18} />
                <span>$0 Custo Instalação</span>
              </div>
              <div className="flex items-center gap-2 text-aqua-100">
                <CheckCircle2 className="text-emerald-400 shrink-0" size={18} />
                <span>Garantia 25 Anos Sabão</span>
              </div>
              <div className="flex items-center gap-2 text-aqua-100">
                <Calendar className="text-blue-400 shrink-0" size={18} />
                <span className="font-bold text-white bg-blue-600/30 px-2 py-0.5 rounded">1º Pagamento: Março 2026</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto space-y-4">
              <a 
                href="https://wa.me/12407806473?text=Ol%C3%A1%20Henrique%2C%20sou%20Aline%2FSinval%20e%20decidi%20garantir%20o%20desconto%20de%20%241000%20e%20os%202%20meses%20gr%C3%A1tis%20antes%20do%20dia%2020."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black text-lg py-5 rounded-2xl shadow-lg shadow-emerald-900/20 transform transition-all hover:-translate-y-1 flex items-center justify-center gap-3 cursor-pointer group"
              >
                <Phone className="group-hover:animate-pulse" size={24} />
                FALAR COM HENRIQUE
              </a>
              <p className="text-center text-aqua-300/60 text-xs">
                Ao clicar, você será direcionado ao WhatsApp pessoal do consultor.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};