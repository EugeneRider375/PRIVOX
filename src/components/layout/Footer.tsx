'use client';

import { useTranslations } from 'next-intl';
import { Radio, MapPin, Wifi, Shield } from 'lucide-react';
import PrivoxBrandIcon from './PrivoxBrandIcon';

export default function Footer() {
  const t = useTranslations('footer');

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#020208]">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <PrivoxBrandIcon className="w-8 h-8 shadow-[0_0_15px_rgba(16,163,111,0.4)]" />
              <span className="text-white font-bold text-xl tracking-[0.15em]">PRIVOX</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              {t('description')}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-mono tracking-wider">{t('tagline')}</span>
            </div>

            {/* Tech indicators */}
            <div className="flex items-center gap-4 mt-6">
              {[
                { icon: Radio, label: 'PTT' },
                { icon: MapPin, label: 'GPS' },
                { icon: Wifi, label: 'LTE' },
                { icon: Shield, label: 'SECURE' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Icon size={12} className="text-cyan-500/50" />
                  <span className="font-mono">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wider uppercase">{t('platform')}</h4>
            <ul className="space-y-3">
              {[
                { label: t('linksFeatures'), id: 'features' },
                { label: t('linksUseCases'), id: 'use-cases' },
                { label: t('linksPilots'), id: 'pilots' },
                { label: t('linksTech'), id: 'technology' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wider uppercase">{t('company')}</h4>
            <ul className="space-y-3">
              {[
                { label: t('linksAbout'), href: '#' },
                { label: t('linksContact'), id: 'contact' },
                { label: t('linksPrivacy'), href: '#' },
              ].map((link) => (
                <li key={link.label}>
                  {'id' in link ? (
                    <button
                      onClick={() => scrollTo(link.id!)}
                      className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a href={link.href} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">{t('copyright')}</p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-slate-600 font-mono">SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
