import React from 'react';
import { Phone, MapPin, QrCode, Bike, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function Header({ onOpenQR }) {
  return (
    <header className="relative w-full overflow-hidden border-b border-[#dfbd75]/20 bg-[#070e1b] px-4 pt-6 pb-6 text-center sm:px-6">
      {/* Decorative royal corner ornaments */}
      <div className="pointer-events-none absolute top-2 left-2 text-[#dfbd75]/30 text-xs font-serif select-none">
        ❖
      </div>
      <div className="pointer-events-none absolute top-2 right-2 text-[#dfbd75]/30 text-xs font-serif select-none">
        ❖
      </div>

      <div className="mx-auto max-w-2xl flex flex-col items-center">
        {/* Authentic Gold Seal Logo from NT Cafe Menu */}
        <div className="relative mb-3 flex items-center justify-center">
          <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full p-1 bg-gradient-to-b from-[#dfbd75]/40 via-[#dfbd75]/10 to-transparent shadow-[0_0_25px_rgba(223,189,117,0.18)]">
            <img
              src={RESTAURANT_INFO.logo}
              alt={RESTAURANT_INFO.name}
              className="h-full w-full rounded-full object-cover border border-[#dfbd75]/50"
              loading="eager"
            />
          </div>
        </div>

        {/* Established Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 mb-2 rounded-full border border-[#dfbd75]/30 bg-[#dfbd75]/10 text-[#dfbd75] text-[11px] font-cinzel tracking-widest uppercase">
          <Sparkles className="w-3 h-3 text-[#dfbd75]" />
          <span>EST. {RESTAURANT_INFO.established}</span>
        </div>

        {/* Restaurant Title */}
        <h1 className="font-cinzel text-2xl sm:text-3xl font-extrabold tracking-wider text-gold-gradient uppercase drop-shadow-sm">
          {RESTAURANT_INFO.name}
        </h1>
        <p className="font-cinzel text-xs sm:text-sm font-semibold tracking-widest text-[#dfbd75]/90 mt-0.5 uppercase">
          ({RESTAURANT_INFO.subName})
        </p>

        {/* Tagline */}
        <p className="font-editorial italic text-base sm:text-lg text-[#ede4ce] mt-1.5 font-medium tracking-wide">
          "{RESTAURANT_INFO.tagline}"
        </p>

        {/* Location */}
        <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#a4b4cc] max-w-md px-2">
          <MapPin className="w-3.5 h-3.5 text-[#dfbd75] shrink-0" />
          <span>{RESTAURANT_INFO.address}</span>
        </div>

        {/* Contact Numbers & Delivery Badge */}
        <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2">
          {RESTAURANT_INFO.phoneNumbers.map((phone) => (
            <a
              key={phone}
              href={`tel:${phone}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dfbd75]/40 bg-[#0e1c31] text-[#f5e4b8] text-xs font-medium hover:border-[#dfbd75] hover:bg-[#162a48] transition-all shadow-sm active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 text-[#dfbd75]" />
              <span>{phone}</span>
            </a>
          ))}

          {/* Delivery Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 text-xs font-medium">
            <Bike className="w-3.5 h-3.5 text-emerald-400" />
            <span>{RESTAURANT_INFO.deliveryNotice}</span>
          </div>

          {/* Share QR Button */}
          <button
            onClick={onOpenQR}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dfbd75]/30 bg-[#dfbd75]/10 text-[#dfbd75] text-xs font-medium hover:bg-[#dfbd75]/20 transition-all cursor-pointer active:scale-95"
            title="View & Share Menu QR Code"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Table QR</span>
          </button>
        </div>
      </div>
    </header>
  );
}
