'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Globe, ChevronDown, Radio, Signal, Monitor, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const localeNames: Record<string, string> = { en: 'EN', fr: 'FR', de: 'DE', ru: 'RU' };
const localeLabels: Record<string, string> = {
  en: '🇬🇧 English',
  fr: '🇫🇷 Français',
  de: '🇩🇪 Deutsch',
  ru: '🇷🇺 Русский',
};

const platformSubItems = [
  { id: 'communication', icon: Radio,   color: '#06b6d4', labelKey: 'communication' as const },
  { id: 'monitoring',    icon: Monitor,  color: '#3b82f6', labelKey: 'monitoring'    as const },
  { id: 'lorawan',       icon: Signal,   color: '#a855f7', labelKey: 'lorawan'       as const },
];

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled,        setIsScrolled]        = useState(false);
  const [mobileOpen,        setMobileOpen]        = useState(false);
  const [langOpen,          setLangOpen]          = useState(false);
  const [platformOpen,      setPlatformOpen]      = useState(false);
  const [mobilePlatformOpen,setMobilePlatformOpen]= useState(false);
  const platformRef = useRef<HTMLDivElement>(null);
  const langRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (platformRef.current && !platformRef.current.contains(e.target as Node)) setPlatformOpen(false);
      if (langRef.current     && !langRef.current.contains(e.target as Node))     setLangOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
    setLangOpen(false);
  };

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    setPlatformOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const mainLinks = [
    { label: t('pilots'), id: 'pilots' },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#030712]/90 backdrop-blur-xl border-b border-cyan-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                <Radio size={16} className="text-white" />
              </div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 opacity-30 blur-md group-hover:opacity-60 transition-opacity" />
            </div>
            <span className="text-white font-bold text-xl tracking-[0.15em] group-hover:text-cyan-400 transition-colors">
              PRIVOX
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">

            {/* Platform dropdown */}
            <div ref={platformRef} className="relative">
              <button
                onClick={() => setPlatformOpen(!platformOpen)}
                className="flex items-center gap-1.5 px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors relative group"
              >
                <Cpu size={13} className="opacity-60" />
                {t('platform')}
                <ChevronDown size={12} className={`transition-transform duration-200 ${platformOpen ? 'rotate-180' : ''}`} />
                <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-cyan-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>

              <AnimatePresence>
                {platformOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full mt-2 w-52 rounded-xl border border-cyan-500/15 overflow-hidden"
                    style={{
                      background: 'rgba(3,7,18,0.96)',
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
                    }}
                  >
                    <div className="p-1.5">
                      {platformSubItems.map(({ id, icon: Icon, color, labelKey }) => (
                        <button
                          key={id}
                          onClick={() => scrollTo(id)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left group/item hover:bg-white/5 transition-colors"
                        >
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                            <Icon size={13} style={{ color }} />
                          </div>
                          <span className="text-slate-300 group-hover/item:text-white transition-colors">{t(labelKey)}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other nav links */}
            {mainLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-cyan-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
            ))}
          </div>

          {/* Right: Language switcher only */}
          <div className="flex items-center gap-3">
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-400 hover:text-white transition-colors glass rounded-lg"
              >
                <Globe size={13} />
                <span>{localeNames[locale] ?? 'EN'}</span>
                <ChevronDown size={11} className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-36 rounded-xl border border-cyan-500/20 overflow-hidden"
                    style={{
                      background: 'rgba(3,7,18,0.97)',
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                    }}
                  >
                    {Object.entries(localeLabels).map(([loc, label]) => (
                      <button
                        key={loc}
                        onClick={() => switchLocale(loc)}
                        className={`w-full px-4 py-2.5 text-sm text-left hover:bg-cyan-500/10 transition-colors ${
                          locale === loc ? 'text-cyan-400' : 'text-slate-300'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-b border-cyan-500/10"
            style={{ background: 'rgba(3,7,18,0.97)', backdropFilter: 'blur(20px)' }}
          >
            <div className="px-4 py-4 flex flex-col gap-1">

              {/* Platform accordion */}
              <button
                onClick={() => setMobilePlatformOpen(!mobilePlatformOpen)}
                className="flex items-center justify-between px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Cpu size={14} className="text-slate-500" />
                  {t('platform')}
                </span>
                <ChevronDown size={14} className={`transition-transform ${mobilePlatformOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {mobilePlatformOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-4"
                  >
                    {platformSubItems.map(({ id, icon: Icon, color, labelKey }) => (
                      <button
                        key={id}
                        onClick={() => scrollTo(id)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg text-left transition-colors"
                      >
                        <Icon size={13} style={{ color }} />
                        {t(labelKey)}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {mainLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg text-left transition-colors"
                >
                  {link.label}
                </button>
              ))}

              {/* Language section in mobile */}
              <div className="mt-2 pt-3 border-t border-white/5">
                <p className="px-4 text-[10px] text-slate-600 font-mono uppercase tracking-wider mb-2">Language</p>
                <div className="grid grid-cols-2 gap-1.5 px-1">
                  {Object.entries(localeLabels).map(([loc, label]) => (
                    <button
                      key={loc}
                      onClick={() => { switchLocale(loc); setMobileOpen(false); }}
                      className={`px-3 py-2 text-xs rounded-lg text-left transition-colors ${
                        locale === loc
                          ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                          : 'text-slate-400 hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
