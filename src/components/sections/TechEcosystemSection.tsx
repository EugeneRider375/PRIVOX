'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import {
  Radio, Wifi, MapPin, Cpu, Globe, Cloud,
  Smartphone, Signal, MessageCircle, Zap
} from 'lucide-react';

const technologies = [
  { label: 'Android PoC Radios', icon: Radio, color: '#06b6d4', delay: 0 },
  { label: 'LTE / 4G', icon: Signal, color: '#3b82f6', delay: 0.05 },
  { label: 'Wi-Fi', icon: Wifi, color: '#22c55e', delay: 0.1 },
  { label: 'GPS', icon: MapPin, color: '#f59e0b', delay: 0.15 },
  { label: 'LoRaWAN', icon: Radio, color: '#a855f7', delay: 0.2 },
  { label: 'ESP32', icon: Cpu, color: '#06b6d4', delay: 0.25 },
  { label: 'MQTT', icon: Globe, color: '#f97316', delay: 0.3 },
  { label: 'WebRTC', icon: Globe, color: '#3b82f6', delay: 0.35 },
  { label: 'Telegram API', icon: MessageCircle, color: '#06b6d4', delay: 0.4 },
  { label: 'Cloud Infra', icon: Cloud, color: '#64748b', delay: 0.45 },
];

function FloatingTechBadge({
  label, icon: Icon, color, delay, style,
}: {
  label: string;
  icon: React.ElementType;
  color: string;
  delay: number;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: 'backOut' }}
      whileHover={{ scale: 1.08, y: -3 }}
      className="flex items-center gap-2.5 px-4 py-3 rounded-xl cursor-default"
      style={{
        background: `${color}08`,
        border: `1px solid ${color}25`,
        backdropFilter: 'blur(12px)',
        boxShadow: `0 4px 20px rgba(0,0,0,0.3)`,
        ...style,
      }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}15` }}
      >
        <Icon size={16} style={{ color }} />
      </div>
      <span className="text-sm font-medium text-slate-200 whitespace-nowrap">{label}</span>
      <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
    </motion.div>
  );
}

export default function TechEcosystemSection() {
  const t = useTranslations('tech');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="technology" className="relative section-padding overflow-hidden" style={{ background: 'linear-gradient(to bottom, #020510, #030712)' }}>
      <div className="absolute inset-0 grid-bg opacity-25" />

      {/* Center pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {[1, 2, 3].map((ring) => (
          <div
            key={ring}
            className="absolute rounded-full border border-cyan-500/10"
            style={{
              width: `${ring * 280}px`,
              height: `${ring * 280}px`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animation: `ping ${2 + ring}s cubic-bezier(0, 0, 0.2, 1) ${ring * 0.5}s infinite`,
              animationIterationCount: 'infinite',
            }}
          />
        ))}
      </div>

      <div ref={ref} className="relative container-width">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 glass border border-cyan-500/20 rounded-full mb-4"
          >
            <Zap size={12} className="text-cyan-400" />
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

        {/* Tech Grid — centered floating layout */}
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {technologies.map((tech) => (
            <FloatingTechBadge key={tech.label} {...tech} />
          ))}
        </div>

        {/* Connection lines visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 flex items-center justify-center"
        >
          <div className="flex items-center gap-4 px-6 py-4 glass border border-cyan-500/20 rounded-2xl">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-xs text-slate-400 font-mono">PROTOCOL BRIDGE ACTIVE</span>
            </div>
            <div className="w-px h-4 bg-slate-700" />
            <div className="flex gap-1.5">
              {['MQTT', 'REST', 'WS', 'WebRTC'].map((p) => (
                <span key={p} className="text-[10px] text-cyan-400 font-mono bg-cyan-500/10 px-2 py-0.5 rounded">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
