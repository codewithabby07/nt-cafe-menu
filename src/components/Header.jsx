import React from 'react';
import { Phone, MapPin, QrCode, Bike, MessageCircle, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function Header({ onOpenQR }) {
  const primaryPhone = RESTAURANT_INFO.phoneNumbers[0];
  const secondaryPhone = RESTAURANT_INFO.phoneNumbers[1];
  const whatsappUrl = `https://wa.me/91${primaryPhone}?text=${encodeURIComponent(
    'Hi NT Café, I am browsing your digital menu and would like to place an order.'
  )}`;

  return (
    <header className="w-full border-b border-[#dfbd75]/20 bg-[#060c17] px-4 pt-4 pb-4 text-center">
      <div className="mx-auto max-w-3xl flex flex-col items-center">
        
        {/* Compact Logo & Title Row */}
        <div className="flex items-center gap-3 mb-2">
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full p-0.5 bg-gradient-to-b from-[#dfbd75] to-transparent shrink-0 shadow-md">
            <img
              src={RESTAURANT_INFO.logo}
              alt={RESTAURANT_INFO.name}
              className="h-full w-full rounded-full object-cover"
              loading="eager"
            />
          </div>

          <div className="text-left">
            <div className="flex items-center gap-2">
              <h1 className="font-cinzel text-xl sm:text-2xl font-extrabold tracking-wide text-gold-gradient uppercase">
                {RESTAURANT_INFO.name}
              </h1>
              <span className="text-[10px] font-cinzel font-semibold text-[#dfbd75] px-1.5 py-0.5 rounded border border-[#dfbd75]/30 bg-[#dfbd75]/10">
                EST. {RESTAURANT_INFO.established}
              </span>
            </div>
            <p className="font-editorial italic text-xs sm:text-sm text-[#d4dde8]">
              "{RESTAURANT_INFO.tagline}"
            </p>
          </div>
        </div>

        {/* Address Pin */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-[#8fa3bd] mb-3 max-w-lg">
          <MapPin className="w-3.5 h-3.5 text-[#dfbd75] shrink-0" />
          <span className="truncate">{RESTAURANT_INFO.address}</span>
        </div>

        {/* Action Pills Row: Compact & Balanced */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          {/* Call 1 */}
          <a
            href={`tel:${primaryPhone}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dfbd75]/35 bg-[#0a1628] text-[#f5e4b8] font-semibold hover:bg-[#12243e] transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-[#dfbd75]" />
            <span>{primaryPhone}</span>
          </a>

          {/* Call 2 */}
          <a
            href={`tel:${secondaryPhone}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dfbd75]/35 bg-[#0a1628] text-[#f5e4b8] font-semibold hover:bg-[#12243e] transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-[#dfbd75]" />
            <span>{secondaryPhone}</span>
          </a>

          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 font-semibold hover:bg-emerald-900/50 transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </a>

          {/* Delivery Note */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#dfbd75]/25 bg-[#dfbd75]/10 text-[#f5e4b8] font-medium">
            <Bike className="w-3.5 h-3.5 text-emerald-400" />
            <span>Free Delivery</span>
          </div>

          {/* Table QR */}
          <button
            onClick={onOpenQR}
            type="button"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#dfbd75]/30 bg-[#0a1628] text-[#dfbd75] font-semibold hover:bg-[#dfbd75]/20 transition-all cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Table QR</span>
          </button>
        </div>
      </div>
    </header>
  );
}
