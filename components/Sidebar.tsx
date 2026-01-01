
import React, { useState } from 'react';
import { 
  Home, 
  Droplets, 
  Leaf, 
  Users, 
  HelpCircle, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X,
  Lock,
  LayoutDashboard,
  Zap
} from 'lucide-react';
import AquaFeelLogo from './AquaFeelLogo';
import { Language } from '../utils/i18n';

interface SidebarProps {
  lang: Language;
  clientName: string;
  onNavigate: (sectionId: string) => void;
  onLogout: () => void;
  onOpenManager: () => void;
  currentSection: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  lang, 
  clientName, 
  onNavigate, 
  onLogout, 
  onOpenManager,
  currentSection 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'hero', label: lang === 'pt' ? 'Início' : 'Home', icon: Home },
    { id: 'malefices', label: lang === 'pt' ? 'Riscos' : 'Risks', icon: ShieldCheck },
    { id: 'logic', label: lang === 'pt' ? 'Lógica' : 'Logic', icon: Droplets },
    { id: 'soap', label: 'Pure Selects', icon: Leaf },
    { id: 'proposal', label: lang === 'pt' ? 'Proposta' : 'Proposal', icon: Zap },
    { id: 'testimonials', label: lang === 'pt' ? 'Famílias' : 'Families', icon: Users },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ];

  return (
    <>
      {/* Botão Mobile (Hambúrguer) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-[60] p-3 bg-slate-900/90 text-white rounded-xl backdrop-blur-md border border-white/10 md:hidden shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Backdrop Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-[50] md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Container da Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-[#020d1a] border-r border-white/5 z-[55]
        transition-transform duration-300 ease-in-out w-[260px]
        flex flex-col shadow-2xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        
        {/* Logo Area */}
        <div className="p-6 border-b border-white/5 flex flex-col items-center justify-center">
          <AquaFeelLogo width="140px" variant="white" />
          <div className="mt-4 flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-500/20">
            <Lock size={10} /> Ambiente Seguro
          </div>
        </div>

        {/* Client Info */}
        <div className="px-4 py-6">
            <div className="bg-gradient-to-br from-white/5 to-white/0 p-4 rounded-2xl border border-white/5">
                <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-1">VIP Guest:</p>
                <p className="text-white font-bold truncate text-sm">{clientName}</p>
            </div>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 space-y-1 custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all uppercase tracking-wide
                ${currentSection === item.id 
                  ? 'bg-aqua-600/10 text-aqua-400 border border-aqua-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'}
              `}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/5 space-y-2 bg-[#010810]">
          <button 
            onClick={onOpenManager}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white hover:bg-white/5 transition-all"
          >
             <LayoutDashboard size={14} /> Área do Gestor
          </button>
          
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
          >
             <LogOut size={14} /> {lang === 'pt' ? 'Sair' : 'Exit'}
          </button>
        </div>
      </aside>
    </>
  );
};
