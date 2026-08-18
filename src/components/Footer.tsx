import React from 'react';
import { Phone, MessageCircle, Database, Sparkles, Download, PlayCircle, ShieldCheck, QrCode } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface FooterProps {
  language: Language;
  onOpenInstallModal: () => void;
  onOpenQrModal: () => void;
  onReplaySplash: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onOpenInstallModal,
  onOpenQrModal,
  onReplaySplash
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.fr;
  const whatsappNumber = '+243 89 60 82 244';
  const whatsappClean = '243896082244';
  const whatsappUrl = `https://wa.me/${whatsappClean}?text=${encodeURIComponent('Bonjour OROMASIS BANDUENGA, je vous contacte depuis SQL Quest Arena !')}`;

  return (
    <footer id="app-footer" className="mt-auto border-t border-[#1e2348] dark:border-[#1e2348] light:border-slate-300 bg-[#090a16]/95 dark:bg-[#090a16]/95 light:bg-slate-100/95 backdrop-blur-md py-6 px-4 sm:px-6 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 text-xs">
        
        {/* Brand & Project info */}
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6C63FF] to-[#00D4FF] flex items-center justify-center text-white shadow-md shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-black text-white dark:text-white light:text-slate-900 tracking-wide text-sm">
                SQL Quest Arena
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#181d3f] text-[#00D4FF] border border-[#2b336e]">
                {t.version}
              </span>
            </div>
            <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-[11px] mt-0.5">
              {t.footerDesc}
            </p>
          </div>
        </div>

        {/* Action Shortcuts (Replay Intro, QR Code Scanner, PWA Install) */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            id="footer-intro-btn"
            onClick={onReplaySplash}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141838] hover:bg-[#1f2452] border border-[#262c5b] text-slate-300 hover:text-white transition-all text-xs font-semibold"
            title="Rejouer l'animation de démarrage"
          >
            <PlayCircle className="w-3.5 h-3.5 text-[#00D4FF]" />
            <span>Intro OROMASIS</span>
          </button>

          {/* QR Code Button */}
          <button
            id="footer-qr-code-btn"
            onClick={onOpenQrModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#6C63FF]/20 to-[#00D4FF]/20 hover:from-[#6C63FF]/40 hover:to-[#00D4FF]/40 border border-[#6C63FF]/50 text-[#00D4FF] hover:text-white transition-all text-xs font-bold shadow-sm shadow-[#6C63FF]/20 active:scale-95"
            title="Scanner le code QR pour ouvrir sur Google ou Mobile"
          >
            <QrCode className="w-3.5 h-3.5 text-[#00D4FF]" />
            <span>{t.qrCodeBtn}</span>
          </button>

          <button
            id="footer-install-btn"
            onClick={onOpenInstallModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141838] hover:bg-[#1f2452] border border-[#262c5b] text-emerald-400 hover:text-emerald-300 transition-all text-xs font-semibold"
            title="Guide d'installation PC & Mobile"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.installApp}</span>
          </button>
        </div>

        {/* Creator & WhatsApp Contact */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#12152e] dark:bg-[#12152e] light:bg-white border border-[#262c5b] dark:border-[#262c5b] light:border-slate-300 shadow-sm">
            <span className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-[11px]">
              {t.footerCreatedBy}
            </span>
            <span className="font-extrabold text-white dark:text-white light:text-slate-900 tracking-wider text-xs text-[#00D4FF]">
              OROMASIS BANDUENGA
            </span>
          </div>

          <a
            id="whatsapp-contact-link"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 hover:text-white border border-emerald-500/40 hover:border-emerald-400 shadow-md transition-all transform hover:scale-105 active:scale-95"
            title="Contacter OROMASIS BANDUENGA sur WhatsApp (+243 89 60 82 244)"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 fill-emerald-500/30" />
            <span className="font-bold font-mono text-xs">{whatsappNumber}</span>
          </a>
        </div>

      </div>
    </footer>
  );
};
