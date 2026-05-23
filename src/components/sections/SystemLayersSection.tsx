'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { Radio, Droplets, Signal, ArrowRight, Cpu, Monitor, Bell, MapPin } from 'lucide-react';

/* ── Communication Layer Diagram ─────────────────────────── */
function CommDiagram({ color }: { color: string }) {
  const t = useTranslations('systemLayers');
  const nodes = [
    { icon: Radio, label: t('commLabel1'), sub: 'LTE/Wi-Fi' },
    { icon: Cpu, label: t('commLabel2'), sub: 'Core', highlight: true },
    { icon: Monitor, label: t('commLabel3'), sub: 'OPS' },
  ];
  return <LayerDiagram nodes={nodes} color={color} />;
}

/* ── Monitoring Layer Diagram ────────────────────────────── */
function MonDiagram({ color }: { color: string }) {
  const t = useTranslations('systemLayers');
  const nodes = [
    { icon: Droplets, label: t('monLabel1'), sub: 'Field' },
    { icon: Cpu, label: t('monLabel2'), sub: 'Core', highlight: true },
    { icon: Bell, label: t('monLabel3'), sub: 'Alerts' },
  ];
  return <LayerDiagram nodes={nodes} color={color} />;
}

/* ── LoRaWAN Layer Diagram ───────────────────────────────── */
function LoraDiagram({ color }: { color: string }) {
  const t = useTranslations('systemLayers');
  const nodes = [
    { icon: Signal, label: t('loraLabel1'), sub: 'Remote' },
    { icon: Radio, label: t('loraLabel2'), sub: 'GW' },
    { icon: Cpu, label: t('loraLabel3'), sub: 'Core', highlight: true },
    { icon: MapPin, label: t('loraLabel4'), sub: 'Team' },
  ];
  return <LayerDiagram nodes={nodes} color={color} />;
}

/* ── Generic Diagram ─────────────────────────────────────── */
type DiagramNode = {
  icon: React.ElementType;
  label: string;
  sub: string;
  highlight?: boolean;
};

function LayerDiagram({ nodes, color }: { nodes: DiagramNode[]; color: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2 justify-center lg:justify-start">
      {nodes.map(({ icon: Icon, label, sub, highlight }, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
              style={{
                background: highlight ? `${color}18` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${highlight ? `${color}40` : 'rgba(255,255,255,0.08)'}`,
                boxShadow: highlight ? `0 0 20px ${color}20` : 'none',
              }}
            >
              <Icon size={18} style={{ color: highlight ? color : '#64748b' }} />
            </div>
            <div className="text-center">
              <div
                className="text-[9px] font-semibold font-mono"
                style={{ color: highlight ? color : '#94a3b8' }}
              >
                {label.toUpperCase().split(' ').slice(0, 2).join(' ')}
              </div>
              <div className="text-[8px] text-slate-600 font-mono">{sub}</div>
            </div>
          </div>
          {i < nodes.length - 1 && (
            <div className="flex flex-col items-center gap-0.5 pb-4">
              <div className="w-6 h-px" style={{ background: `linear-gradient(to right, ${color}40, ${color}20)` }} />
              <ArrowRight size={10} style={{ color, opacity: 0.4 }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Individual Layer Block ──────────────────────────────── */
type LayerBlockProps = {
  title: string;
  text: string;
  status: string;
  color: string;
  accentLabel: string;
  diagram: React.ReactNode;
  reverse?: boolean;
  delay: number;
  inView: boolean;
  index: number;
};

function LayerBlock({
  title, text, status, color, accentLabel, diagram, reverse, delay, inView, index,
}: LayerBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index > 0 ? 'mt-6' : ''}`}
    >
      {/* Text side */}
      <div className={`${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
        <div className="flex items-center gap-3 mb-4">
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold tracking-wider"
            style={{ background: `${color}12`, color, border: `1px solid ${color}25` }}
          >
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
            {accentLabel}
          </div>
        </div>
        <h3 className="text-white font-bold text-2xl sm:text-3xl mb-3">{title}</h3>
        <p className="text-slate-400 text-base leading-relaxed mb-5">{text}</p>
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-mono text-slate-500"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
          {status}
        </div>
      </div>

      {/* Diagram side */}
      <div className={`${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
        <div
          className="p-6 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${color}05 0%, rgba(3,7,18,0.8) 100%)`,
            border: `1px solid ${color}15`,
            boxShadow: `0 0 30px ${color}06`,
          }}
        >
          {/* Scan effect */}
          <div className="relative overflow-hidden rounded-lg mb-4">
            <div
              className="absolute left-0 right-0 h-px opacity-30"
              style={{
                background: `linear-gradient(to right, transparent, ${color}, transparent)`,
                animation: 'scanLine 4s linear infinite',
              }}
            />
          </div>
          {diagram}
          {/* Status bar */}
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
              <span className="text-[10px] text-slate-500 font-mono">OPERATIONAL</span>
            </div>
            <div
              className="text-[10px] font-mono px-2 py-0.5 rounded"
              style={{ background: `${color}10`, color }}
            >
              PRIVOX CORE
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Section ────────────────────────────────────────── */
export default function SystemLayersSection() {
  const t = useTranslations('systemLayers');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const layers = [
    {
      accentLabel: 'Communication',
      title: t('commTitle'),
      text: t('commText'),
      status: t('commStatus'),
      color: '#06b6d4',
      reverse: false,
      diagram: <CommDiagram color="#06b6d4" />,
    },
    {
      accentLabel: 'Monitoring',
      title: t('monTitle'),
      text: t('monText'),
      status: t('monStatus'),
      color: '#3b82f6',
      reverse: true,
      diagram: <MonDiagram color="#3b82f6" />,
    },
    {
      accentLabel: 'LoRaWAN',
      title: t('loraTitle'),
      text: t('loraText'),
      status: t('loraStatus'),
      color: '#a855f7',
      reverse: false,
      diagram: <LoraDiagram color="#a855f7" />,
    },
  ];

  return (
    <section id="system-layers" className="relative section-padding overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #030712, #020510, #030712)' }}>
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />

      <div ref={ref} className="relative container-width">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 glass border border-cyan-500/20 rounded-full mb-4"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-xs font-medium text-cyan-400 tracking-widest uppercase">{t('badge')}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            {t('title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* Vertical divider line on desktop */}
        <div className="relative space-y-16 lg:space-y-20">
          {/* Connecting line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/20 via-blue-500/20 to-purple-500/20 -translate-x-1/2 pointer-events-none" />

          {layers.map((layer, i) => (
            <LayerBlock
              key={layer.accentLabel}
              {...layer}
              delay={0.2 + i * 0.15}
              inView={inView}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
