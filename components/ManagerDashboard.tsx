
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Search, 
  Download, 
  RefreshCw,
  LogOut,
  Calendar,
  MapPin,
  Mail,
  User,
  ShieldCheck,
  Lock,
  CloudLightning
} from 'lucide-react';
import AquaFeelLogo from './AquaFeelLogo';

// Tipos
interface Lead {
  date: string;
  name: string;
  spouse: string;
  email: string;
  zip: string;
  analyst?: string; // Para filtro
  status: 'New' | 'Contacted' | 'Closed';
}

const MANAGERS = [
  "Todos",
  "Jorge Martinez",
  "Freddy Silva",
  "Sonia Aguilar",
  "Carlos Henrique"
];

// Dados Mockados para demonstração inicial (fallback)
const MOCK_LEADS: Lead[] = [
  { date: new Date().toLocaleDateString(), name: "Exemplo: João Silva", spouse: "Maria", email: "joao@gmail.com", zip: "19111", analyst: "Jorge Martinez", status: "New" },
];

export const ManagerDashboard: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedManager, setSelectedManager] = useState("Todos");
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [connectionStatus, setConnectionStatus] = useState<'offline' | 'online'>('offline');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Senha simples para demonstração
    if (password === "admin" || password === "Henrique1307") {
      setIsAuthenticated(true);
      // Tenta buscar dados automaticamente ao logar
      setTimeout(fetchLeads, 500);
    } else {
      alert("Senha incorreta");
    }
  };

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      // URL do Google Script fornecida
      const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxn0tChpNSHiduCB4rryU5aEQAGGls8fLGfjw4VrsF_Zxohc98jQ5G-AYgIVW11I9w/exec';
      
      const response = await fetch(SCRIPT_URL);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        // Formatar datas ou garantir campos se necessário
        const formattedData = data.map((item: any) => ({
            ...item,
            // Garante que existe status e analista, senão usa padrão
            status: item.status || 'New',
            analyst: item.analyst || 'Não Atribuído'
        }));
        
        setLeads(formattedData);
        setConnectionStatus('online');
      }
    } catch (error) {
      console.error("Erro ao buscar leads da nuvem", error);
      // Não sobrescreve com erro, mantém o estado anterior ou mock
      alert("Não foi possível conectar à planilha. Verifique se a função 'doGet' foi publicada no Google Script.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesManager = selectedManager === "Todos" || (lead.analyst === selectedManager) || (!lead.analyst && selectedManager === "Todos");
    const nameMatch = lead.name ? lead.name.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const emailMatch = lead.email ? lead.email.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const zipMatch = lead.zip ? lead.zip.includes(searchTerm) : false;
    
    return matchesManager && (nameMatch || emailMatch || zipMatch);
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020d1a] flex items-center justify-center p-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl">
          <div className="flex justify-center mb-8">
            <AquaFeelLogo width="180px" variant="white" />
          </div>
          <h2 className="text-white text-xl font-black uppercase text-center mb-6 tracking-widest">Acesso Restrito</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2 block">Senha de Gestor</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-aqua-500 outline-none"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="w-full bg-aqua-600 hover:bg-aqua-500 text-white font-black py-4 rounded-xl uppercase tracking-widest transition-all">
              Entrar
            </button>
            <button type="button" onClick={onExit} className="w-full text-slate-500 text-xs font-bold uppercase tracking-widest hover:text-white py-2">
              Voltar ao Site
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar do Dashboard */}
      <aside className="w-64 bg-[#020d1a] text-white flex-col hidden md:flex border-r border-white/5">
        <div className="p-6 border-b border-white/5 flex justify-center">
           <AquaFeelLogo width="140px" variant="white" />
        </div>
        
        <div className="p-4">
           <div className="bg-gradient-to-r from-aqua-600 to-blue-600 p-4 rounded-xl mb-6 shadow-lg">
              <p className="text-[10px] uppercase font-black opacity-80 mb-1">Total de Leads</p>
              <p className="text-3xl font-black">{leads.length}</p>
              {connectionStatus === 'online' && (
                 <div className="flex items-center gap-1 mt-2 text-[10px] text-emerald-300 font-bold">
                    <CloudLightning size={12} /> Live Sync Active
                 </div>
              )}
           </div>

           <nav className="space-y-1">
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl text-xs font-bold text-white border border-white/10">
                 <LayoutDashboard size={16} /> Dashboard Geral
              </button>
           </nav>
        </div>

        <div className="mt-auto p-4 border-t border-white/5">
           <button onClick={onExit} className="flex items-center gap-2 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
              <LogOut size={14} /> Sair do Sistema
           </button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-auto h-screen">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center sticky top-0 z-20">
           <div>
              <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Painel do Gestor</h1>
              <p className="text-xs text-slate-500 font-medium mt-1">Visão geral de leads e performance</p>
           </div>
           
           <div className="flex items-center gap-4">
              <button 
                onClick={fetchLeads} 
                className="p-2 text-slate-400 hover:text-aqua-600 hover:bg-aqua-50 rounded-lg transition-all"
                title="Atualizar Dados"
              >
                 <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
              </button>
              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                 AD
              </div>
           </div>
        </header>

        <div className="p-8">
           
           {/* Filtros */}
           <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                 {MANAGERS.map(manager => (
                    <button
                       key={manager}
                       onClick={() => setSelectedManager(manager)}
                       className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-all ${
                          selectedManager === manager 
                          ? 'bg-slate-900 text-white shadow-lg' 
                          : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100'
                       }`}
                    >
                       {manager}
                    </button>
                 ))}
              </div>

              <div className="relative w-full md:w-64">
                 <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input 
                    type="text" 
                    placeholder="Buscar nome, email..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-aqua-500 outline-none text-sm"
                 />
              </div>
           </div>

           {/* Tabela de Leads */}
           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="bg-slate-50 border-b border-slate-100">
                          <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Data</th>
                          <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cliente</th>
                          <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contato</th>
                          <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Local</th>
                          <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Analista</th>
                          <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {filteredLeads.length > 0 ? (
                          filteredLeads.map((lead, idx) => (
                             <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                                <td className="p-4 text-xs font-medium text-slate-600">
                                   <div className="flex items-center gap-2">
                                      <Calendar size={14} className="text-slate-400" />
                                      {lead.date ? new Date(lead.date).toLocaleDateString() : 'N/A'}
                                   </div>
                                </td>
                                <td className="p-4">
                                   <div className="font-bold text-slate-900 text-sm">{lead.name}</div>
                                   {lead.spouse && <div className="text-xs text-slate-500">+ {lead.spouse}</div>}
                                </td>
                                <td className="p-4">
                                   <div className="flex items-center gap-2 text-xs text-slate-600 mb-1">
                                      <Mail size={12} className="text-aqua-500" /> {lead.email}
                                   </div>
                                </td>
                                <td className="p-4">
                                   <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-md w-fit">
                                      <MapPin size={12} /> {lead.zip}
                                   </div>
                                </td>
                                <td className="p-4">
                                   {lead.analyst ? (
                                      <div className="text-xs font-semibold text-blue-600">{lead.analyst}</div>
                                   ) : (
                                      <span className="text-xs text-slate-400 italic">--</span>
                                   )}
                                </td>
                                <td className="p-4 text-center">
                                   <span className={`inline-block px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                      lead.status === 'New' ? 'bg-emerald-100 text-emerald-600' : 
                                      lead.status === 'Contacted' ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-600'
                                   }`}>
                                      {lead.status}
                                   </span>
                                </td>
                             </tr>
                          ))
                       ) : (
                          <tr>
                             <td colSpan={6} className="p-8 text-center text-slate-400 text-sm">
                                {isLoading ? (
                                    <div className="flex justify-center items-center gap-2">
                                        <RefreshCw className="animate-spin text-aqua-600" size={20} />
                                        <span>Carregando dados da nuvem...</span>
                                    </div>
                                ) : "Nenhum lead encontrado."}
                             </td>
                          </tr>
                       )}
                    </tbody>
                 </table>
              </div>
           </div>

           <div className="mt-4 text-right">
              <button className="text-xs font-bold text-aqua-600 hover:text-aqua-700 flex items-center gap-1 ml-auto">
                 <Download size={14} /> Exportar CSV
              </button>
           </div>
        </div>
      </main>
    </div>
  );
};
