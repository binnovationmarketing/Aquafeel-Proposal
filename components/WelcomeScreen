import React, { useState } from 'react';
import { Lock, ChevronRight, ShieldCheck } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: (clientName: string, spouseName: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [spouse, setSpouse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor, identifique-se para acessar a proposta.');
      return;
    }
    onComplete(name, spouse);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px] animate-pulse"></div>

      <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl mb-6 shadow-lg shadow-amber-500/20">
            <Lock size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Área Restrita</h1>
          <p className="text-slate-400 text-sm">
            Sistema de Propostas VIP - Aquafeel Solutions<br/>
            Identifique-se para liberar o acesso.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">
              Seu Nome
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="Ex: João Silva"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">
              Nome do Cônjuge (Opcional)
            </label>
            <input
              type="text"
              value={spouse}
              onChange={(e) => setSpouse(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="Ex: Maria Silva"
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center font-medium bg-red-400/10 py-2 rounded-lg border border-red-400/20">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 group transition-all transform hover:-translate-y-1"
          >
            <span>ACESSAR PROPOSTA</span>
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>Ambiente Criptografado e Seguro</span>
          </div>
        </div>
      </div>
    </div>
  );
};
