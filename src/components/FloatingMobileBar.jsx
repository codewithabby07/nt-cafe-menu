import React from 'react';
import { Phone, QrCode, MessageCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function FloatingMobileBar({ onOpenQR }) {
  const primaryPhone = RESTAURANT_INFO.phoneNumbers[0];
  const whatsappUrl = `https://wa.me/91${primaryPhone}?text=${encodeURIComponent(
    'Hi NT Café, I am browsing your digital menu and would like to place an order.'
  )}`;

  return (
    <div className="fixed bottom-3 left-3 right-3 z-30 sm:hidden pointer-events-none">
      <div className="mx-auto max-w-sm flex items-center justify-between gap-2 p-1.5 rounded-2xl border border-[#dfbd75]/40 bg-[#060c18]/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.8)] pointer-events-auto">
        
        {/* Primary Call to Order Button */}
        <a
          href={`tel:${primaryPhone}`}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#dfbd75] to-[#c5a059] text-[#091322] font-bold text-xs shadow active:scale-95 transition-transform min-h-[40px]"
        >
          <Phone className="w-4 h-4 text-[#091322]" />
          <span>Call: {primaryPhone}</span>
        </a>

        {/* WhatsApp Direct Chat */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl border border-emerald-500/40 bg-emerald-950/70 text-emerald-300 hover:bg-emerald-900/60 transition-all cursor-pointer active:scale-95 min-h-[40px] min-w-[40px] flex items-center justify-center"
          title="Order via WhatsApp"
          aria-label="Order via WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
        </a>

        {/* Table QR Button */}
        <button
          type="button"
          onClick={onOpenQR}
          className="p-2.5 rounded-xl border border-[#dfbd75]/30 bg-[#0a1628] text-[#dfbd75] hover:bg-[#12243f] transition-all cursor-pointer active:scale-95 min-h-[40px] min-w-[40px] flex items-center justify-center"
          title="Table QR Code"
          aria-label="Table QR Code"
        >
          <QrCode className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
