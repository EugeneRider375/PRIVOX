'use client';

import { useRef, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import {
  MapPin, Bell, Radio, Activity, Thermometer,
  AlertTriangle, CheckCircle, Clock, Wifi, Battery, Signal
} from 'lucide-react';

/* ── Live Alert Feed ─────────────────────────────────────── */
function AlertFeed({ labels }: {
  labels: { water: string; temp: string; ptt: string; lora: string };
}) {
  const alerts = [
    { icon: AlertTriangle, color: '#f97316', text: labels.water, time: '0:12', level: 'WARN' },
    { icon: Thermometer, color: '#ef4444', text: labels.temp, time: '0:47', level: 'CRIT' },
    { icon: Radio, color: '#22c55e', text: labels.ptt, time: '1:05', level: 'INFO' },
    { icon: Signal, color: '#a855f7', text: labels.lora, time: '2:18', level: 'INFO' },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveIndex((v) => (v + 1) % alerts.length), 2200);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-1.5">
      {alerts.map(({ icon: Icon, color, text, time, level }, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: i === activeIndex ? 1 : 0.4,
            x: i === activeIndex ? 0 : -2,
          }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2.5 p-2.5 rounded-lg"
          style={{
            background: i === activeIndex ? `${color}10` : 'rgba(255,255,255,0.02)',
            border: `1px solid ${i === activeIndex ? `${color}25` : 'rgba(255,255,255,0.04)'}`,
          }}
        >
          <Icon size={11} style={{ color, flexShrink: 0 }} />
          <span className="text-[11px] text-slate-300 flex-1 leading-snug truncate">{text}</span>
          <span
            className="text-[9px] font-mono px-1.5 py-0.5 rounded flex-shrink-0"
            style={{ background: `${color}15`, color }}
          >
            {level}
          </span>
          <span className="text-[10px] text-slate-600 font-mono flex-shrink-0 tabular-nums">{time}m</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ── GPS Map Preview ─────────────────────────────────────── */
function MapPreview({ label, tracking }: { label: string; tracking: string }) {
  const units = [
    { id: '3', x: 28, y: 38, active: true, color: '#22c55e' },
    { id: '7', x: 58, y: 22, active: true, color: '#06b6d4' },
    { id: '12', x: 72, y: 62, active: false, color: '#64748b' },
    { id: '5', x: 18, y: 68, active: true, color: '#22c55e' },
    { id: 'G1', x: 45, y: 50, active: true, color: '#a855f7' },
  ];

  return (
    <div
      className="relative rounded-xl overflow-hidden"
      style={{
        height: '190px',
        background: 'rgba(6,182,212,0.02)',
        border: '1px solid rgba(6,182,212,0.1)',
      }}
    >
      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Horizontal scan line */}
      <div
        className="absolute left-0 right-0 h-px opacity-25"
        style={{
          background: 'linear-gradient(to right, transparent, #06b6d4, transparent)',
          animation: 'scanLine 5s linear infinite',
        }}
      />

      {/* Radius ring from center */}
      <div
        className="absolute rounded-full border border-cyan-500/10"
        style={{
          width: '60%', height: '80%',
          top: '10%', left: '20%',
          animation: 'ping 6s cubic-bezier(0,0,0.2,1) infinite',
        }}
      />

      {/* Route line */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.25 }}>
        <polyline
          points="28%,38% 58%,22% 72%,62%"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="1"
          strokeDasharray="5 3"
        />
      </svg>

      {/* Units */}
      {units.map((unit) => (
        <div
          key={unit.id}
          className="absolute flex items-center gap-1"
          style={{ left: `${unit.x}%`, top: `${unit.y}%`, transform: 'translate(-50%,-50%)' }}
        >
          <div className="relative">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: unit.color }}
            />
            {unit.active && (
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: unit.color,
                  animation: 'ping 2.5s cubic-bezier(0,0,0.2,1) infinite',
                  animationDelay: `${Math.random() * 1.5}s`,
                }}
              />
            )}
          </div>
          <span
            className="text-[8px] font-mono px-1 rounded"
            style={{ color: unit.color, background: 'rgba(3,7,18,0.7)' }}
          >
            {unit.id}
          </span>
        </div>
      ))}

      <div className="absolute bottom-2 left-2 text-[9px] text-slate-600 font-mono">{label}</div>
      <div
        className="absolute top-2 right-2 flex items-center gap-1 text-[9px] font-mono"
        style={{ color: '#22c55e' }}
      >
        <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
        {tracking}
      </div>
    </div>
  );
}

/* ── Sensor Grid ─────────────────────────────────────────── */
function SensorGrid() {
  const sensors = [
    { label: 'Temp', value: '21.4°C', status: 'ok', icon: Thermometer },
    { label: 'Humid', value: '62%', status: 'ok', icon: Activity },
    { label: 'Water', value: 'Clear', status: 'ok', icon: CheckCircle },
    { label: 'Motion', value: 'Zone B', status: 'warn', icon: AlertTriangle },
    { label: 'Power', value: '98%', status: 'ok', icon: Battery },
    { label: 'Signal', value: '−72dBm', status: 'ok', icon: Wifi },
  ];

  return (
    <div className="grid grid-cols-3 gap-1.5">
      {sensors.map(({ label, value, status, icon: Icon }) => (
        <div
          key={label}
          className="p-2 rounded-lg text-center"
          style={{
            background: status === 'warn' ? 'rgba(249,115,22,0.08)' : 'rgba(255,255,255,0.02)',
            border: `1px solid ${status === 'warn' ? 'rgba(249,115,22,0.2)' : 'rgba(255,255,255,0.05)'}`,
          }}
        >
          <Icon
            size={10}
            className={`mx-auto mb-1 ${status === 'warn' ? 'text-orange-400' : 'text-slate-500'}`}
          />
          <div className="text-[10px] font-bold text-white">{value}</div>
          <div className="text-[9px] text-slate-600 font-mono">{label}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Voice Channels ──────────────────────────────────────── */
function VoiceChannels() {
  const channels = [
    { name: 'Alpha-1', users: 3, active: true },
    { name: 'Bravo-2', users: 2, active: false },
    { name: 'Charlie', users: 5, active: true },
  ];

  return (
    <div className="space-y-2">
      {channels.map(({ name, users, active }) => (
        <div
          key={name}
          className="flex items-center gap-3 px-3 py-2 rounded-lg"
          style={{
            background: active ? 'rgba(6,182,212,0.06)' : 'rgba(255,255,255,0.02)',
            border: `1px solid ${active ? 'rgba(6,182,212,0.18)' : 'rgba(255,255,255,0.04)'}`,
          }}
        >
          <Radio size={11} className={active ? 'text-cyan-400' : 'text-slate-600'} />
          <span className="text-[11px] text-slate-300 flex-1 font-mono">{name}</span>
          <div className="flex gap-0.5 items-end h-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-0.5 rounded-full"
                style={{
                  height: active ? `${Math.abs(Math.sin(Date.now() * 0.002 + i)) * 10 + 4}px` : '3px',
                  background: active ? '#06b6d4' : '#334155',
                }}
              />
            ))}
          </div>
          <span className="text-[10px] text-slate-500">{users}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Bottom Status Cards ─────────────────────────────────── */
function StatusCards({ t }: { t: ReturnType<typeof useTranslations<'dashboard'>> }) {
  const cards = [
    {
      label: t('statusRadiosLabel'),
      value: t('statusRadiosVal'),
      color: '#22c55e',
      icon: Radio,
    },
    {
      label: t('statusSensorsLabel'),
      value: t('statusSensorsVal'),
      color: '#06b6d4',
      icon: Activity,
    },
    {
      label: t('statusAlertsLabel'),
      value: t('statusAlertsVal'),
      color: '#f97316',
      icon: Bell,
    },
    {
      label: t('statusGatewaysLabel'),
      value: t('statusGatewaysVal'),
      color: '#a855f7',
      icon: Signal,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-5 pb-5">
      {cards.map(({ label, value, color, icon: Icon }) => (
        <div
          key={label}
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{
            background: `${color}08`,
            border: `1px solid ${color}20`,
          }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${color}15` }}
          >
            <Icon size={14} style={{ color }} />
          </div>
          <div>
            <div className="text-sm font-bold text-white tabular-nums">{value}</div>
            <div className="text-[10px] text-slate-500 font-mono leading-tight">{label}</div>
          </div>
          <div
            className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse"
            style={{ background: color }}
          />
        </div>
      ))}
    </div>
  );
}

/* ── Main Dashboard Section ──────────────────────────────── */
export default function DashboardPreviewSection() {
  const t = useTranslations('dashboard');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="dashboard" className="relative section-padding bg-[#030712] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="relative container-width">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 glass border border-cyan-500/20 rounded-full mb-4"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
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

        {/* Dashboard mock */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(3,7,18,0.97)',
            border: '1px solid rgba(6,182,212,0.18)',
            boxShadow: '0 0 60px rgba(6,182,212,0.07), 0 40px 80px rgba(0,0,0,0.6)',
          }}
        >
          {/* Top glow border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

          {/* Title bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {['#ef4444', '#f59e0b', '#22c55e'].map((c) => (
                  <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                ))}
              </div>
              <span className="text-xs text-slate-400 font-mono">PRIVOX Operations Center v2</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-green-400 font-mono">LIVE</span>
              </div>
              <Clock size={12} className="text-slate-600" />
              <span className="text-[10px] text-slate-600 font-mono tabular-nums">14:32:07</span>
            </div>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-5">

            {/* Map */}
            <div className="lg:col-span-2">
              <div className="text-[10px] text-slate-600 font-mono uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin size={9} className="text-slate-600" /> {t('liveMap')}
              </div>
              <MapPreview label={t('mapLabel')} tracking={t('tracking')} />
            </div>

            {/* Alerts */}
            <div>
              <div className="text-[10px] text-slate-600 font-mono uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Bell size={9} className="text-slate-600" /> {t('alertFeed')}
              </div>
              <AlertFeed labels={{
                water: t('alertWater'),
                temp: t('alertTemp'),
                ptt: t('alertPtt'),
                lora: t('alertLora'),
              }} />
            </div>

            {/* Sensors */}
            <div>
              <div className="text-[10px] text-slate-600 font-mono uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Activity size={9} className="text-slate-600" /> {t('sensors')}
              </div>
              <SensorGrid />
            </div>

            {/* Channels */}
            <div className="lg:col-span-2">
              <div className="text-[10px] text-slate-600 font-mono uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Radio size={9} className="text-slate-600" /> {t('comms')}
              </div>
              <VoiceChannels />
            </div>
          </div>

          {/* Status row */}
          <div className="border-t border-white/5">
            <StatusCards t={t} />
          </div>

          {/* Footer bar */}
          <div className="px-5 py-2 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-600">
              <div className="w-1 h-1 rounded-full bg-green-500" />
              {t('online')}
            </div>
            <div className="text-[10px] font-mono text-slate-700">privox.tech</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
