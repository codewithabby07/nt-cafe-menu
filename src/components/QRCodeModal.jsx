import React, { useState } from 'react';
import { X, Copy, Check, Share2, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function QRCodeModal({ onClose }) {
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ntcafe.local';

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
    currentUrl
  )}&color=091322&bgcolor=f5e4b8&margin=10`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${RESTAURANT_INFO.name} - Digital Menu`,
        text: `Browse the digital menu of ${RESTAURANT_INFO.name} (${RESTAURANT_INFO.address})`,
        url: currentUrl
      }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-[#dfbd75]/40 bg-[#0a1525] p-6 text-center shadow-2xl text-[#f9f8f5]"
      >
        <button
          onClick={onClose}
          type="button"
          className="absolute top-3.5 right-3.5 p-1.5 rounded-full border border-[#dfbd75]/20 bg-[#0e1c31] text-[#9eacbf] hover:text-[#f9f8f5] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Logo and Header */}
        <div className="mx-auto mb-3 h-16 w-16 rounded-full p-0.5 bg-gradient-to-b from-[#dfbd75] to-transparent shadow-md">
          <img
            src={RESTAURANT_INFO.logo}
            alt={RESTAURANT_INFO.name}
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        <h3 className="font-cinzel text-lg font-bold text-[#f5e4b8] uppercase tracking-wider">
          {RESTAURANT_INFO.name}
        </h3>
        <p className="text-xs text-[#a4b4cc] mt-0.5">Table Digital QR Menu</p>

        {/* QR Code Frame */}
        <div className="mx-auto my-4 w-56 h-56 p-2 rounded-xl border-2 border-[#dfbd75]/60 bg-[#f5e4b8] shadow-lg flex items-center justify-center">
          <img
            src={qrImageUrl}
            alt="Scan QR for NT Cafe Menu"
            className="w-full h-full object-contain rounded-lg"
          />
        </div>

        <p className="text-xs text-[#8ea0b7] max-w-xs mx-auto">
          Scan with your smartphone camera to browse our menu directly at your table.
        </p>

        {/* Action Buttons */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-[#dfbd75]/30 bg-[#0e1c31] text-xs font-medium text-[#f5e4b8] hover:bg-[#162a48] transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#dfbd75]" />}
            <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-[#dfbd75]/60 bg-[#dfbd75] text-xs font-semibold text-[#091322] hover:bg-[#e8ce8f] transition-all cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
}
