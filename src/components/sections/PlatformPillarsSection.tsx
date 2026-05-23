'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { Radio, Cpu, Signal, CheckCircle, ArrowRight, Monitor } from 'lucide-react';

/* ── Mini flow diagram ───────────────────────────────────── */
function FlowDiagram({
  nodes, color,
}: {
  nodes: string[];
  color: string;
}) {
  return (
    <div className="flex items-center gap-1.5 mt-5 pt-4 border-t border-white/5">
      {nodes.map((label, i) => (
        <div key={label} className="flex items-center gap-1.5">
          <div
            className="px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-medium whitespace-nowrap"
            style={{
              background: i === Math.floor(nodes.length / 2) ? `${color}20` : 'rgba(255,255,255,0.04)',
              border: `1px solid ${i === Math.floor(nodes.length / 2) ? `${color}40` : 'rgba(255,255,255,0.06)'}`,
              color: i === Math.floor(nodes.length / 2) ? color : '#94a3b8',
            }}
          >
            {label}
          </div>
          {i < nodes.length - 1 && (
            <ArrowRight size={10} style={{ color, opacity: 0.4, flexShrink: 0 }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Pillar card ─────────────────────────────────────────── */
type PillarCardProps = {
  id: string;
  icon: React.ElementType;
  title: string;
  desc: string;
  points: string[];
  diagramNodes: string[];
  color: string;
  categoryLabel: string;
  delay: number;
  inView: boolean;
};

function PillarCard({
  id, icon: Icon, title, desc, points, diagramNodes, color, categoryLabel, delay, inView,
}: PillarCardProps) {
  const t = useTranslations('platformPillars');

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl p-6 flex flex-col cursor-default overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid ${color}20`,
        backdropFilter: 'blur(16px)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${color}50`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 50px ${color}12, 0 20px 40px rgba(0,0,0,0.3)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${color}20`;
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Top gradient glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${color}50, transparent)` }}
      />

      {/* Background ambient */}
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: `radial-gradient(circle, ${color}08 0%, transparent 70%)` }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}15`, border: `1px solid ${color}25` }}
        >
          <Icon size={22} style={{ color }} />
        </div>
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium"
          style={{ background: `${color}10`, color, border: `1px solid ${color}20` }}
        >
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
          {categoryLabel}
        </div>
      </div>

      {/* Title + desc */}
      <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-5">{desc}</p>

      {/* Points */}
      <ul className="space-y-2 flex-1">
        {points.map((point, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: delay + 0.15 + i * 0.06 }}
            className="flex items-center gap-2.5 text-sm text-slate-300"
          >
            <CheckCircle size={14} style={{ color, flexShrink: 0 }} className="opacity-70" />
            {point}
          </motion.li>
        ))}
      </ul>

      {/* Flow diagram */}
      <FlowDiagram nodes={diagramNodes} color={color} />

      {/* Learn more */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.4 }}
        className="mt-4 flex items-center gap-1.5 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ color }}
      >
        {t('learnMore')}
        <ArrowRight size={12} />
      </motion.div>
    </motion.div>
  );
}

/* ── Main section ────────────────────────────────────────── */
export default function PlatformPillarsSection() {
  const t = useTranslations('platformPillars');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const pillars = [
    {
      id: 'communication',
      icon: Radio,
      color: '#06b6d4',
      categoryLabel: 'Communication',
      title: t('commTitle'),
      desc: t('commDesc'),
      points: [
        t('commPoint1'), t('commPoint2'), t('commPoint3'), t('commPoint4'), t('commPoint5'),
      ],
      diagramNodes: [t('commDiag1'), t('commDiag2'), t('commDiag3')],
    },
    {
      id: 'monitoring',
      icon: Monitor,
      color: '#3b82f6',
      categoryLabel: 'Monitoring',
      title: t('monTitle'),
      desc: t('monDesc'),
      points: [
        t('monPoint1'), t('monPoint2'), t('monPoint3'), t('monPoint4'), t('monPoint5'),
      ],
      diagramNodes: [t('monDiag1'), t('monDiag2'), t('monDiag3')],
    },
    {
      id: 'lorawan',
      icon: Signal,
      color: '#a855f7',
      categoryLabel: 'LoRaWAN',
      title: t('loraTitle'),
      desc: t('loraDesc'),
      points: [
        t('loraPoint1'), t('loraPoint2'), t('loraPoint3'), t('loraPoint4'), t('loraPoint5'),
      ],
      diagramNodes: [t('loraDiag1'), t('loraDiag2'), t('loraDiag3')],
    },
  ];

  return (
    <section id="platform" className="relative section-padding bg-[#030712] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25" />

      {/* Ambient glows */}
      <div className="absolute top-1/2 left-1/6 w-64 h-64 bg-cyan-500/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/6 w-64 h-64 bg-purple-500/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div ref={ref} className="relative container-width">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 glass border border-cyan-500/20 rounded-full mb-4"
          >
            <Cpu size={12} className="text-cyan-400" />
            <span className="text-xs font-medium text-cyan-400 tracking-widest uppercase">{t('badge')}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-3xl mx-auto"
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

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <PillarCard
              key={pillar.id}
              {...pillar}
              delay={0.15 + i * 0.12}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
