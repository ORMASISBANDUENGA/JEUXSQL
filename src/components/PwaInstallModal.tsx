import React, { useState } from 'react';
import { Download, Monitor, Smartphone, Apple, Check, X, Sparkles, ExternalLink, Zap, Shield, QrCode } from 'lucide-react';
import { TRANSLATIONS } from '../i18n/translations';
import { Language } from '../types';

interface PwaInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  canPromptNative: boolean;
  onTriggerNativePrompt: () => void;
  onOpenQrModal?: () => void;
}

export const PwaInstallModal: React.FC<PwaInstallModalProps> = ({
  isOpen,
  onClose,
  language,
  canPromptNative,
  onTriggerNativePrompt,
  onOpenQrModal
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.fr;
  const [activeTab, setActiveTab] = useState<'all' | 'desktop' | 'android' | 'ios'>('all');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="pwa-install-dialog"
        className="bg-[#0f1228] text-white border border-[#2b336e] rounded-3xl max-w-xl w-full p-6 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#6C63FF]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#212754]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6C63FF] to-[#00D4FF] flex items-center justify-center text-white shadow-lg shrink-0">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                {t.pwaModalTitle}
              </h2>
              <p className="text-xs text-slate-300 font-medium">
                Par <span className="text-[#00D4FF] font-bold">OROMASIS BANDUENGA</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#181d3f] text-slate-400 hover:text-white hover:bg-[#232a5a] transition-all"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto py-4 space-y-4 pr-1">
          
          <p className="text-xs text-slate-300 leading-relaxed">
            {t.pwaModalSubtitle}
          </p>

          {/* Quick Native Install Button & QR Code Quick Action */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#171c45] to-[#121636] border border-[#3b458c] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Installation Rapide</h4>
                <p className="text-[11px] text-slate-400">Navigateur PC, Téléphone Android & iPhone</p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {onOpenQrModal && (
                <button
                  id="pwa-open-qr-sub-btn"
                  onClick={() => {
                    onClose();
                    onOpenQrModal();
                  }}
                  className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl bg-[#232a5a] hover:bg-[#2e3775] border border-[#3e488d] text-[#00D4FF] font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow active:scale-95"
                  title="Scanner avec Google ou Appareil photo"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Code QR</span>
                </button>
              )}

              <button
                id="pwa-native-trigger-btn"
                onClick={() => {
                  onTriggerNativePrompt();
                }}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6C63FF] via-[#00D4FF] to-[#00E676] hover:brightness-110 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                <span>{t.pwaBtnInstall}</span>
              </button>
            </div>
          </div>

          {/* Platform Tabs */}
          <div className="flex rounded-xl bg-[#161a3d] p-1 gap-1 text-xs font-bold">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 py-1.5 rounded-lg transition-all ${activeTab === 'all' ? 'bg-[#2b336e] text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Tous les Guides
            </button>
            <button
              onClick={() => setActiveTab('desktop')}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${activeTab === 'desktop' ? 'bg-[#2b336e] text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>PC / Mac</span>
            </button>
            <button
              onClick={() => setActiveTab('android')}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${activeTab === 'android' ? 'bg-[#2b336e] text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android</span>
            </button>
            <button
              onClick={() => setActiveTab('ios')}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${activeTab === 'ios' ? 'bg-[#2b336e] text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Apple className="w-3.5 h-3.5" />
              <span>iPhone</span>
            </button>
          </div>

          {/* Guide Steps */}
          <div className="space-y-3">
            {(activeTab === 'all' || activeTab === 'desktop') && (
              <div className="p-3.5 rounded-2xl bg-[#131738] border border-[#262e63]">
                <div className="flex items-center gap-2 mb-2 font-bold text-xs text-[#00D4FF]">
                  <Monitor className="w-4 h-4" />
                  <span>{t.pwaDesktopTitle}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t.pwaDesktopStep}
                </p>
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'android') && (
              <div className="p-3.5 rounded-2xl bg-[#131738] border border-[#262e63]">
                <div className="flex items-center gap-2 mb-2 font-bold text-xs text-emerald-400">
                  <Smartphone className="w-4 h-4" />
                  <span>{t.pwaAndroidTitle}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t.pwaAndroidStep}
                </p>
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'ios') && (
              <div className="p-3.5 rounded-2xl bg-[#131738] border border-[#262e63]">
                <div className="flex items-center gap-2 mb-2 font-bold text-xs text-rose-300">
                  <Apple className="w-4 h-4" />
                  <span>{t.pwaIosTitle}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t.pwaIosStep}
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#212754] flex items-center justify-between">
          <div className="text-[11px] text-slate-400">
            PWA Hors-ligne &bull; Conçu par OROMASIS BANDUENGA
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#232a5a] hover:bg-[#2e3775] text-white font-bold text-xs transition-colors"
          >
            {t.pwaClose}
          </button>
        </div>

      </div>
    </div>
  );
};
