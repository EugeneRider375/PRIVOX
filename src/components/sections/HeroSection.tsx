'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  AlertTriangle, MapPin, Radio, Signal,
  Activity, ArrowRight, Zap
} from 'lucide-react';

/* ── Particle Network Canvas ─────────────────────────────── */
function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 90);
    const nodes = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.4 + 0.15,
      type: Math.random() > 0.82 ? 'active' : 'normal',
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.015 + Math.random() * 0.015,
    }));

    let raf: number;
    const MAX_DIST = 150;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const opacity = (1 - dist / MAX_DIST) * 0.18;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const isActive = nodes[i].type === 'active' || nodes[j].type === 'active';
            ctx.strokeStyle = isActive
              ? `rgba(6, 182, 212, ${opacity * 1.5})`
              : `rgba(99, 179, 237, ${opacity})`;
            ctx.lineWidth = isActive ? 0.8 : 0.4;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        const pAlpha = n.type === 'active'
          ? n.alpha * (0.65 + 0.35 * Math.sin(n.pulse))
          : n.alpha;

        if (n.type === 'active') {
          const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 8);
          grad.addColorStop(0, `rgba(6, 182, 212, ${pAlpha * 0.45})`);
          grad.addColorStop(1, 'rgba(6, 182, 212, 0)');
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 8, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.type === 'active'
          ? `rgba(34, 211, 238, ${pAlpha})`
          : `rgba(99, 179, 237, ${pAlpha})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.55 }}
    />
  );
}

/* ── Floating Operational Card ────────────────────────────── */
function FloatCard({
  children, delay = 0, className = '', floatDuration = 5,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  floatDuration?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: delay + 1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute glass rounded-xl p-3 shadow-glass pointer-events-none ${className}`}
      style={{ animation: `float ${floatDuration}s ease-in-out ${delay * 0.5}s infinite` }}
    >
      {children}
    </motion.div>
  );
}

/* ── Main Hero Section ────────────────────────────────────── */
export default function HeroSection() {
  const t = useTranslations('hero');
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((v) => v + 1), 1800);
    return () => clearInterval(id);
  }, []);

  const stats = [
    { value: '2,847', label: t('statsNodes') },
    { value: '14K+', label: t('statsAlerts') },
    { value: '99.9%', label: t('statsUptime') },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#030712]">

      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-100" />

      {/* Radial glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, rgba(59,130,246,0.04) 40%, transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        {/* Corner glows */}
        <div className="absolute top-20 right-32 w-48 h-48 bg-blue-600/5 rounded-full blur-2xl" />
        <div className="absolute bottom-32 left-24 w-40 h-40 bg-purple-600/5 rounded-full blur-2xl" />
      </div>

      {/* Particle Network */}
      <ParticleNetwork />

      {/* ── Floating Card: Water Alert ── */}
      <FloatCard delay={0} floatDuration={5.5} className="hidden lg:block top-[20%] right-[7%]">
        <div className="flex items-start gap-2.5 min-w-[210px]">
          <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <AlertTriangle size={14} className="text-orange-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-semibold text-white">{t('floatAlert')}</span>
              <span className="text-[9px] text-orange-400 font-mono bg-orange-500/15 px-1.5 py-0.5 rounded border border-orange-500/20">WARN</span>
            </div>
            <p className="text-[11px] text-slate-400">{t('floatAlertSub')}</p>
            <p className="text-[10px] text-orange-400/60 mt-1 font-mono">{t('floatAlertTime')}</p>
          </div>
        </div>
      </FloatCard>

      {/* ── Floating Card: GPS ── */}
      <FloatCard delay={1.5} floatDuration={6.2} className="hidden lg:block top-[36%] left-[5%]">
        <div className="flex items-start gap-2.5 min-w-[185px]">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center flex-shrink-0">
            <MapPin size={14} className="text-cyan-400" />
          </div>
          <div>
            <span className="text-xs font-semibold text-white">{t('floatGps')}</span>
            <p className="text-[11px] text-slate-400 mt-0.5">{t('floatGpsSub')}</p>
            <div className="mt-2 h-1 w-full bg-slate-700/50 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
            </div>
          </div>
        </div>
      </FloatCard>

      {/* ── Floating Card: PTT Group ── */}
      <FloatCard delay={0.8} floatDuration={5.8} className="hidden lg:block bottom-[27%] right-[9%]">
        <div className="flex items-start gap-2.5 min-w-[200px]">
          <div className="relative w-8 h-8 rounded-lg bg-green-500/15 flex items-center justify-center flex-shrink-0">
            <Radio size={14} className="text-green-400" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#030712]" />
          </div>
          <div>
            <span className="text-xs font-semibold text-white">{t('floatVoice')}</span>
            <p className="text-[11px] text-slate-400 mt-0.5">{t('floatVoiceSub')}</p>
            <div className="flex gap-0.5 mt-2 items-end h-4">
              {Array.from({ length: 14 }).map((_, i) => (
                <div
                  key={i}
                  className="w-0.5 bg-green-500/60 rounded-full transition-all duration-150"
                  style={{ height: `${Math.abs(Math.sin((tick + i) * 0.7)) * 12 + 4}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      </FloatCard>

      {/* ── Floating Card: LoRaWAN ── */}
      <FloatCard delay={2.1} floatDuration={6.8} className="hidden lg:block bottom-[28%] left-[5%]">
        <div className="flex items-start gap-2.5 min-w-[180px]">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(168,85,247,0.15)' }}>
            <Signal size={14} style={{ color: '#a855f7' }} />
          </div>
          <div>
            <span className="text-xs font-semibold text-white">{t('floatLora')}</span>
            <p className="text-[11px] text-slate-400 mt-0.5">{t('floatLoraSub')}</p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <Activity size={10} style={{ color: '#a855f7' }} />
              <span className="text-[10px] font-mono" style={{ color: '#a855f7' }}>LoRaWAN · RSSI −112dBm</span>
            </div>
          </div>
        </div>
      </FloatCard>

      {/* ── Center Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 pt-24 pb-12">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center gap-2 px-4 py-2 glass rounded-full border border-cyan-500/20 mb-8"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
          <span className="text-xs font-medium text-cyan-400 tracking-widest uppercase">{t('badge')}</span>
          <Zap size={11} className="text-cyan-500/70" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="text-[5rem] sm:text-[8rem] lg:text-[11rem] font-black tracking-[0.15em] leading-none mb-6 select-none"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 35%, #06b6d4 65%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 50px rgba(6,182,212,0.25))',
          }}
        >
          {t('title')}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="text-lg sm:text-xl lg:text-2xl font-medium text-slate-300 mb-3 max-w-2xl"
        >
          {t('subtitle')}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72, duration: 0.6 }}
          className="text-sm sm:text-base text-slate-500 mb-10 max-w-lg leading-relaxed"
        >
          {t('description')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
        >
          <button
            onClick={() => document.getElementById('platform')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] transition-all hover:scale-105"
          >
            {t('exploreBtn')}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex items-center gap-8 sm:gap-14"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="text-2xl sm:text-3xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 mt-1 font-mono tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#030712] to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <div className="w-px h-10 bg-gradient-to-b from-cyan-500/40 to-transparent" />
        <div className="w-1 h-1 rounded-full bg-cyan-500 animate-bounce" />
      </motion.div>
    </section>
  );
}
