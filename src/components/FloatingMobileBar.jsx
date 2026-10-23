import React from 'react';
import { Phone, QrCode, ArrowUp, Layers } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function FloatingMobileBar({ onOpenQR, totalVisibleItems }) {
  const primaryPhone = RESTAURANT_INFO.phoneNumbers[0];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-3 left-3 right-3 z-30 sm:hidden">
      <div className="flex items-center justify-between gap-2 p-2 rounded-2xl border border-[#dfbd75]/40 bg-[#070e1b]/95 backdrop-blur-lg shadow-2xl">
        
        {/* Call Restaurant Button */}
        <a
          href={`tel:${primaryPhone}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#dfbd75] to-[#c5a059] text-[#091322] font-semibold text-xs shadow-md active:scale-95 transition-transform"
        >
          <Phone className="w-3.5 h-3.5 text-[#091322]" />
          <span>Call to Order</span>
        </a>

        {/* Share QR */}
        <button
          type="button"
          onClick={onOpenQR}
          className="p-2.5 rounded-xl border border-[#dfbd75]/30 bg-[#0e1c31] text-[#dfbd75] hover:bg-[#162a48] transition-all cursor-pointer active:scale-95"
          title="QR Code"
        >
          <QrCode className="w-4 h-4" />
        </button>

        {/* Scroll To Top */}
        <button
          type="button"
          onClick={scrollToTop}
          className="p-2.5 rounded-xl border border-[#dfbd75]/30 bg-[#0e1c31] text-[#9eacbf] hover:text-[#f8f6f0] transition-all cursor-pointer active:scale-95"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
