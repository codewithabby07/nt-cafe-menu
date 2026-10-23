import React from 'react';
import { Phone, QrCode, ArrowUp, MessageCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function FloatingMobileBar({ onOpenQR }) {
  const primaryPhone = RESTAURANT_INFO.phoneNumbers[0];
  const whatsappUrl = `https://wa.me/91${primaryPhone}?text=${encodeURIComponent(
    'Hi NT Café, I am browsing your digital QR menu and would like to order.'
  )}`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-3 left-3 right-3 z-30 sm:hidden">
      <div className="flex items-center justify-between gap-2 p-2 rounded-2xl border border-[#dfbd75]/40 bg-[#060d19]/95 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        
        {/* Call Restaurant Button */}
        <a
          href={`tel:${primaryPhone}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-gradient-to-r from-[#dfbd75] to-[#c5a059] text-[#091322] font-bold text-xs shadow active:scale-95 transition-transform min-h-[44px]"
        >
          <Phone className="w-4 h-4 text-[#091322]" />
          <span>Call to Order</span>
        </a>

        {/* WhatsApp Direct Chat */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl border border-emerald-500/40 bg-emerald-950/60 text-emerald-400 hover:bg-emerald-900/60 transition-all cursor-pointer active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
          title="Order via WhatsApp"
          aria-label="Order via WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
        </a>

        {/* Share QR */}
        <button
          type="button"
          onClick={onOpenQR}
          className="p-3 rounded-xl border border-[#dfbd75]/30 bg-[#0a1527] text-[#dfbd75] hover:bg-[#12243f] transition-all cursor-pointer active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
          title="Table QR Code"
          aria-label="Table QR Code"
        >
          <QrCode className="w-4 h-4" />
        </button>

        {/* Scroll To Top */}
        <button
          type="button"
          onClick={scrollToTop}
          className="p-3 rounded-xl border border-[#dfbd75]/30 bg-[#0a1527] text-[#a4b4cc] hover:text-[#fbf9f4] transition-all cursor-pointer active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
          title="Scroll to Top"
          aria-label="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
