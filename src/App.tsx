/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Check, 
  Users, 
  Calendar, 
  CreditCard, 
  MessageCircle, 
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Info,
  Menu,
  X,
  Star,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface PlanData {
  pessoas: number;
  nome: string;
  avista: number;
  cartao: number;
  recorrente: number;
  entrada: number;
  entradaParcelas: string;
  saldo: string;
  diarias: number;
}

type PaymentMethod = 'avista' | 'cartao' | 'recorrente';

// --- Constants ---
const WHATSAPP_NUMBER = "556435136230";

const PLANOS: PlanData[] = [
  {
    pessoas: 1,
    nome: "Título 1 Pessoa Vitalício",
    avista: 2526.30,
    cartao: 2666.65,
    recorrente: 2807.00,
    entrada: 401.00,
    entradaParcelas: "5x de R$ 80,20",
    saldo: "30x de R$ 80,20",
    diarias: 4
  },
  {
    pessoas: 2,
    nome: "Título 2 Pessoas Vitalício",
    avista: 4421.00,
    cartao: 4667.35,
    recorrente: 4913.00,
    entrada: 701.86,
    entradaParcelas: "5x de R$ 140,37",
    saldo: "30x de R$ 140,37",
    diarias: 4
  },
  {
    pessoas: 3,
    nome: "Título 3 Pessoas Vitalício",
    avista: 6317.10,
    cartao: 6668.05,
    recorrente: 7019.00,
    entrada: 1002.71,
    entradaParcelas: "5x de R$ 200,54",
    saldo: "30x de R$ 200,54",
    diarias: 4
  },
  {
    pessoas: 4,
    nome: "Título 4 Pessoas Vitalício",
    avista: 7520.40,
    cartao: 7958.20,
    recorrente: 8356.00,
    entrada: 1193.71,
    entradaParcelas: "5x de R$ 238,74",
    saldo: "30x de R$ 238,74",
    diarias: 4
  },
  {
    pessoas: 5,
    nome: "Título 5 Pessoas Vitalício",
    avista: 8442.20,
    cartao: 8890.10,
    recorrente: 9358.00,
    entrada: 1336.86,
    entradaParcelas: "5x de R$ 267,37",
    saldo: "30x de R$ 267,37",
    diarias: 5
  },
  {
    pessoas: 6,
    nome: "Título 6 Pessoas Vitalício",
    avista: 8843.40,
    cartao: 9334.70,
    recorrente: 9826.00,
    entrada: 1403.70,
    entradaParcelas: "5x de R$ 280,74",
    saldo: "30x de R$ 280,74",
    diarias: 6
  }
];

// --- Specific Type Helpers for missing icons ---
const CardMembership = ({ size }: { size: number }) => <CreditCard size={size} />;
const Smartphone = ({ size }: { size: number }) => <ShoppingBag size={size} />;

const BENEFICIOS_DETALHADOS = [
  { text: "1º ano de carteirinha grátis", icon: <CardMembership size={18} /> },
  { text: "02 convites mensais (após quitação)", icon: <Users size={18} /> },
  { text: "Convites não cumulativos", icon: <Info size={18} /> },
  { text: "50% de desconto no estacionamento", icon: <Smartphone size={18} /> },
  { text: "Diárias de domingo a quinta", icon: <Calendar size={18} /> },
  { text: "Exceto férias e feriados", icon: <ShieldCheck size={18} /> },
];

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

const PlanCard: React.FC<{ plan: PlanData }> = ({ plan }) => {
  const contactMessage = () => {
    let msg = `Olá! Escolhi meu produto pelo site Lagoa Lovers.\n\n`;
    msg += `Produto escolhido: ${plan.nome}\n`;
    msg += `Quantidade: ${plan.pessoas} pessoa(s)\n`;
    msg += `Valor recorrente: ${formatCurrency(plan.recorrente)}\n`;
    msg += `Entrada: ${formatCurrency(plan.entrada)} em até ${plan.entradaParcelas}\n`;
    msg += `Saldo: ${plan.saldo}\n`;
    msg += `Condição exclusiva à vista: ${formatCurrency(plan.avista)}\n`;
    msg += `Cartão de crédito direto: ${formatCurrency(plan.cartao)}\n\n`;
    msg += `Gostaria de dar continuidade na contratação.`;
    return encodeURIComponent(msg);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="premium-card-light w-full max-w-2xl mx-auto p-6 md:p-10 flex flex-col lg:flex-row gap-10"
    >
      {/* Left: Info & Benefits */}
      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <span className="inline-block px-3 py-1 bg-pool-blue/10 text-pool-blue text-[10px] font-black uppercase tracking-widest rounded-full">
            Título Vitalício
          </span>
          <h3 className="text-3xl font-serif font-black text-deep-blue leading-tight uppercase">
            {plan.nome}
          </h3>
          <div className="flex items-center gap-4 text-grey-text">
            <span className="flex items-center gap-1.5 text-sm font-bold">
              <Users size={16} className="text-turquoise" />
              {plan.pessoas} {plan.pessoas === 1 ? 'Pessoa' : 'Pessoas'}
            </span>
            <span className="flex items-center gap-1.5 text-sm font-bold">
              <Calendar size={16} className="text-turquoise" />
              {plan.diarias} Diárias
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-black uppercase tracking-widest text-navy-dark/40">Sua Experiência Inclusa</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BENEFICIOS_DETALHADOS.map((b, i) => (
              <div key={i} className="flex items-start gap-3 group">
                <div className="mt-0.5 text-turquoise group-hover:scale-110 transition-transform">
                  <Check size={16} strokeWidth={3} />
                </div>
                <span className="text-[15px] leading-tight text-grey-text font-medium">{b.text}</span>
              </div>
            ))}
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-turquoise">
                <Check size={16} strokeWidth={3} />
              </div>
              <span className="text-[15px] leading-tight text-grey-text font-medium">Utilização única diárias boas-vindas</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-grey-text/50 italic flex items-center gap-2">
          <ShieldCheck size={14} className="text-pool-blue" />
          Preços sujeitos a alteração sem aviso prévio
        </p>
      </div>

      {/* Right: Pricing & CTA */}
      <div className="lg:w-80 bg-ice-blue/50 rounded-2xl p-6 flex flex-col border border-pool-blue/5">
        <div className="mb-6">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pool-blue">Crédito Recorrente</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-bold text-deep-blue">R$</span>
            <span className="text-5xl font-serif font-black text-deep-blue tracking-tighter">
              {plan.recorrente.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="mt-3 space-y-1">
            <p className="text-xs font-bold text-grey-text">Entrada: {formatCurrency(plan.entrada)} em até {plan.entradaParcelas}</p>
            <p className="text-xs font-bold text-grey-text">Saldo: {plan.saldo}</p>
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-pool-blue/10">
          <div className="p-3 bg-white rounded-xl border border-pool-blue/10">
            <span className="text-[9px] font-black uppercase tracking-widest text-turquoise">Condição Exclusiva À Vista</span>
            <p className="text-2xl font-serif font-black text-navy-dark mt-0.5">
              {formatCurrency(plan.avista)}
            </p>
          </div>

          <div className="px-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-grey-text/60">Cartão de Crédito Direto</span>
            <p className="text-sm font-bold text-navy-dark">A partir de 12x de {formatCurrency(plan.cartao / 12)}</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${contactMessage()}`, '_blank')}
          className="mt-8 w-full py-5 btn-primary rounded-xl flex items-center justify-center gap-2 text-sm uppercase tracking-widest font-black shadow-[0_10px_20px_rgba(0,174,239,0.2)]"
        >
          <MessageCircle size={18} />
          Quero meu Lagoa
        </motion.button>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [selectedPessoas, setSelectedPessoas] = useState<number>(6);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const selectedPlan = useMemo(() => 
    PLANOS.find(p => p.pessoas === selectedPessoas) || PLANOS[PLANOS.length - 1],
    [selectedPessoas]
  );

  const scrollToSelector = () => {
    document.getElementById('selector-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans selection:bg-pool-blue/20 selection:text-deep-blue">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-pool-blue/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-serif font-black text-deep-blue uppercase tracking-tighter">
              Lagoa <span className="italic text-pool-blue">Lovers</span>
            </span>
            <span className="hidden sm:block h-4 w-px bg-pool-blue/20 mx-2" />
            <span className="hidden sm:block text-[10px] font-black uppercase tracking-[0.3em] text-pool-blue/60 mt-1">
              Títulos Vitalícios
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {['WhatsApp'].map((item) => (
              <a 
                key={item} 
                href={`https://wa.me/${WHATSAPP_NUMBER}`} 
                className="text-xs font-black uppercase tracking-widest text-navy-dark/60 hover:text-pool-blue transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                {item}
              </a>
            ))}
          </nav>

          <button className="md:hidden text-deep-blue" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 hero-wave overflow-hidden relative">
        <div className="bubble w-20 h-20 top-20 left-[10%]" />
        <div className="bubble w-32 h-32 bottom-20 right-[15%] opacity-10" />
        
        <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <span className="text-xs font-black uppercase tracking-[0.4em] text-turquoise">Viva a Experiência Lagoa</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-black text-deep-blue leading-[1.1] tracking-tighter uppercase">
              Adquira agora <br />
              <span className="text-pool-blue italic">seu Lagoa Lovers</span>
            </h1>
            <p className="text-lg md:text-xl text-grey-text max-w-2xl mx-auto font-medium">
              O título vitalício feito para você e sua família viverem momentos inesquecíveis com exclusividade e economia no coração do Lagoa.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={scrollToSelector}
            className="px-10 py-5 btn-primary rounded-2xl shadow-xl text-base uppercase tracking-widest font-black"
          >
            Escolher meu título
          </motion.button>
        </div>
      </section>

      {/* Selector Section */}
      <section id="selector-section" className="py-20 px-6 bg-white border-t border-pool-blue/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-serif font-black text-deep-blue uppercase tracking-tight">
              Selecione o plano ideal
            </h2>
            <p className="text-grey-text font-medium">Escolha a quantidade de pessoas para o seu título</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <button
                key={num}
                onClick={() => setSelectedPessoas(num)}
                className={`
                  h-[52px] px-8 rounded-2xl text-[15px] font-black uppercase tracking-widest transition-all duration-300
                  ${selectedPessoas === num 
                    ? 'bg-pool-blue text-white shadow-lg shadow-pool-blue/20 scale-105' 
                    : 'bg-white border-2 border-pool-blue/10 text-pool-blue hover:border-pool-blue/30 hover:bg-ice-blue'}
                `}
              >
                {num} {num === 1 ? 'Pessoa' : 'Pessoas'}
              </button>
            ))}
          </div>

          {/* Main Card */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <PlanCard key={selectedPessoas} plan={selectedPlan} />
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Mini Cards / Resumo */}
      <section className="py-20 bg-ice-blue/30 border-t border-pool-blue/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {PLANOS.map((p) => (
              <button
                key={p.pessoas}
                onClick={() => {
                  setSelectedPessoas(p.pessoas);
                  scrollToSelector();
                }}
                className={`
                  p-5 rounded-3xl text-left border transition-all duration-300
                  ${selectedPessoas === p.pessoas 
                    ? 'bg-deep-blue text-white border-deep-blue shadow-xl' 
                    : 'bg-white border-pool-blue/10 hover:border-pool-blue/30 hover:shadow-md'}
                `}
              >
                <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">
                  {p.pessoas} {p.pessoas === 1 ? 'Pessoa' : 'Pessoas'}
                </div>
                <div className="text-lg font-serif font-black mb-1 leading-tight">
                  {p.pessoas} Vitalício
                </div>
                <div className="text-xs font-bold opacity-80">
                  {formatCurrency(p.recorrente)}
                </div>
                <div className="mt-4 flex items-center gap-1 text-[9px] font-black uppercase tracking-widest">
                  Selecionar <ArrowRight size={10} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-dark py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 font-bold uppercase tracking-widest text-center md:text-left">
          <div className="space-y-4">
            <span className="text-3xl font-serif font-black text-white uppercase tracking-tighter">
              Lagoa <span className="italic text-pool-blue">Lovers</span>
            </span>
            <p className="text-[10px] text-white/40 leading-relaxed max-w-xs">
              © 2026 Lagoa Lovers. Grupo Lagoa Parque & Hotéis. <br /> Rua Lagoa Quente, Caldas Novas, GO.
            </p>
          </div>
          
          <div className="text-[11px] text-white/60 space-y-2">
            <p>Atendimento Comercial: (64) 3513-6230</p>
          </div>

          <div className="flex gap-8 text-[11px] text-white/40">
            <a href="#" className="hover:text-pool-blue transition-colors">Termos</a>
            <a href="#" className="hover:text-pool-blue transition-colors">Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

