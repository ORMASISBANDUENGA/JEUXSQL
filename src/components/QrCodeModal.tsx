import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, X, Copy, Check, ExternalLink, Smartphone, Camera, Globe, Sparkles, Download } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { sound } from '../game/sound';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onOpenInstallModal?: () => void;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({
  isOpen,
  onClose,
  language,
  onOpenInstallModal
}) => {
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[language] || TRANSLATIONS.fr;

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-pre-ox6an7gtbmyskzlvmj3dkl-333776273396.europe-west2.run.app';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      sound.playClick();
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const handleOpenGoogle = () => {
    sound.playClick();
    window.open(currentUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="qr-code-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="qr-code-modal-content"
        className="bg-[#12152e] dark:bg-[#12152e] light:bg-white text-slate-100 dark:text-slate-100 light:text-slate-800 border border-[#2b336e] dark:border-[#2b336e] light:border-slate-200 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden p-6 relative transition-all transform animate-scaleUp"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="qr-modal-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#1b2046] dark:bg-[#1b2046] light:bg-slate-100 text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 transition-colors"
          title="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6C63FF] to-[#00D4FF] flex items-center justify-center text-white shadow-lg shadow-[#6C63FF]/30 shrink-0">
            <QrCode className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white dark:text-white light:text-slate-900 tracking-tight">
              {t.qrCodeModalTitle}
            </h3>
            <p className="text-xs text-[#00D4FF] font-semibold">
              SQL Quest Arena &bull; OROMASIS BANDUENGA
            </p>
          </div>
        </div>

        {/* Explanatory Subtitle */}
        <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 mb-5 leading-relaxed">
          {t.qrCodeModalSubtitle}
        </p>

        {/* QR Code Container with visual highlight */}
        <div className="relative mx-auto w-fit p-4 rounded-3xl bg-white shadow-xl border-4 border-[#00D4FF]/40 mb-4 flex flex-col items-center justify-center">
          <div className="p-2 bg-white rounded-2xl">
            <QRCodeSVG
              value={currentUrl}
              size={200}
              level="H"
              includeMargin={false}
              fgColor="#090a16"
              bgColor="#ffffff"
            />
          </div>
          
          {/* Subtle Google & Mobile helper badge */}
          <div className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
            <Camera className="w-3.5 h-3.5 text-[#6C63FF]" />
            <span>Google Lens & Appareil photo</span>
          </div>
        </div>

        {/* Scanning Instructions */}
        <div className="bg-[#090b1c] dark:bg-[#090b1c] light:bg-slate-50 border border-[#202652] dark:border-[#202652] light:border-slate-200 rounded-2xl p-3 mb-5 text-xs">
          <div className="flex items-start gap-2.5">
            <Smartphone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed text-[11px]">
              <span className="font-semibold text-white dark:text-white light:text-slate-900 block mb-0.5">
                {t.qrCodeScanInstruction}
              </span>
              <span>
                {t.qrCodeGoogleNotice}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Copy Link & Open in Browser */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            id="qr-copy-link-btn"
            onClick={handleCopyLink}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#1d2350] hover:bg-[#28306e] border border-[#394285] text-white text-xs font-bold transition-all shadow-md active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">{t.qrCodeLinkCopied}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#00D4FF]" />
                <span>{t.qrCodeCopyLink}</span>
              </>
            )}
          </button>

          <button
            id="qr-open-browser-btn"
            onClick={handleOpenGoogle}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] hover:from-[#584fe0] hover:to-[#00b5da] text-white text-xs font-bold shadow-lg shadow-[#6C63FF]/30 transition-all active:scale-95"
          >
            <ExternalLink className="w-4 h-4" />
            <span>{t.qrCodeOpenDirect}</span>
          </button>
        </div>

        {/* Optional link to PWA install guide */}
        {onOpenInstallModal && (
          <div className="mt-4 pt-3 border-t border-[#1e2450] dark:border-[#1e2450] light:border-slate-200 text-center">
            <button
              onClick={() => {
                onClose();
                onOpenInstallModal();
              }}
              className="text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-[#00D4FF] dark:hover:text-[#00D4FF] light:hover:text-indigo-600 transition-colors inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Besoin d'aide pour l'installer sur Windows, Mac ou Android ? Clique ici</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
