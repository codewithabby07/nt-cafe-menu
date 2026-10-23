import React from 'react';
import { Phone, MapPin, ArrowUp, Bike } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-[#dfbd75]/20 bg-[#060c17] px-4 pt-10 pb-24 sm:pb-12 text-[#9eacbf] text-center">
      <div className="mx-auto max-w-2xl flex flex-col items-center">
        
        {/* Crest */}
        <div className="h-14 w-14 rounded-full border border-[#dfbd75]/40 p-0.5 bg-[#0e1c31] mb-3">
          <img
            src={RESTAURANT_INFO.logo}
            alt={RESTAURANT_INFO.name}
            className="h-full w-full rounded-full object-cover"
            loading="lazy"
          />
        </div>

        <h3 className="font-cinzel text-lg font-bold text-[#f5e4b8] tracking-widest uppercase">
          {RESTAURANT_INFO.name}
        </h3>
        <p className="font-cinzel text-xs text-[#dfbd75]/80 uppercase">
          ({RESTAURANT_INFO.subName})
        </p>

        <p className="font-editorial italic text-base text-[#d1c8b4] mt-1">
          "{RESTAURANT_INFO.tagline}"
        </p>

        {/* Address */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#a0afc4] max-w-md">
          <MapPin className="w-3.5 h-3.5 text-[#dfbd75] shrink-0" />
          <span>{RESTAURANT_INFO.address}</span>
        </div>

        {/* Phone links */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs">
          {RESTAURANT_INFO.phoneNumbers.map((phone) => (
            <a
              key={phone}
              href={`tel:${phone}`}
              className="inline-flex items-center gap-1 text-[#f5e4b8] hover:underline"
            >
              <Phone className="w-3 h-3 text-[#dfbd75]" />
              <span>{phone}</span>
            </a>
          ))}
        </div>

        {/* Delivery note */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/30 text-emerald-300 text-xs font-medium">
          <Bike className="w-3.5 h-3.5 text-emerald-400" />
          <span>{RESTAURANT_INFO.deliveryNotice} in Civil Lines & Surrounding Areas</span>
        </div>

        <div className="gold-divider my-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between w-full text-[11px] text-[#697a91] gap-3">
          <span>© {new Date().getFullYear()} {RESTAURANT_INFO.name} (FOOD HUB). All rights reserved.</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-[#dfbd75] hover:text-[#f5e4b8] cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
