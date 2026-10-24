import React from 'react';
import { Phone, MapPin, QrCode, Bike, MessageCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function Header({ onOpenQR }) {
  const primaryPhone = RESTAURANT_INFO.phoneNumbers[0];
  const secondaryPhone = RESTAURANT_INFO.phoneNumbers[1];
  const whatsappUrl = `https://wa.me/91${primaryPhone}?text=${encodeURIComponent(
    'Hi NT Café, I am browsing your digital menu and would like to place an order.'
  )}`;

  return (
    <header className="antilia-header-wrap">
      <div className="mx-auto max-w-xl flex flex-col items-center">
        
        {/* Antilia-style Grand Logo (96px with gold border & glow) */}
        <div className="antilia-logo-wrap">
          <div className="antilia-logo">
            <img
              src={RESTAURANT_INFO.logo}
              alt={RESTAURANT_INFO.name}
              loading="eager"
            />
          </div>
        </div>

        {/* Grand Title: NT CAFÉ */}
        <h1 className="antilia-title">
          {RESTAURANT_INFO.name}
        </h1>

        {/* Subtitle / Category */}
        <div className="antilia-sub">
          {RESTAURANT_INFO.subName} • EST. {RESTAURANT_INFO.established}
        </div>

        {/* Tagline */}
        <div className="antilia-tagline">
          "{RESTAURANT_INFO.tagline}"
        </div>

        {/* Ornamental Divider */}
        <div className="antilia-divider">
          <span>❖</span>
        </div>

        {/* Location Pin */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-[#a0b3cb] mb-4 max-w-md">
          <MapPin className="w-3.5 h-3.5 text-[#dfbd75] shrink-0" />
          <span>{RESTAURANT_INFO.address}</span>
        </div>

        {/* Antilia-Style Action Grid (4 distinct action tiles) */}
        <div className="antilia-cta-grid w-full">
          {/* Call Line 1 */}
          <a
            href={`tel:${primaryPhone}`}
            className="antilia-cta-sec"
          >
            <Phone className="w-4 h-4 text-[#dfbd75]" />
            <span>Call 1</span>
            <span className="text-[10px] text-[#8fa3bd] font-normal font-sans">
              {primaryPhone}
            </span>
          </a>

          {/* Call Line 2 */}
          <a
            href={`tel:${secondaryPhone}`}
            className="antilia-cta-sec"
          >
            <Phone className="w-4 h-4 text-[#dfbd75]" />
            <span>Call 2</span>
            <span className="text-[10px] text-[#8fa3bd] font-normal font-sans">
              {secondaryPhone}
            </span>
          </a>

          {/* WhatsApp Direct */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="antilia-cta-sec hover:border-emerald-500"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400">WhatsApp</span>
            <span className="text-[10px] text-[#8fa3bd] font-normal font-sans">
              Quick Order
            </span>
          </a>

          {/* Table QR */}
          <button
            type="button"
            onClick={onOpenQR}
            className="antilia-cta-sec"
          >
            <QrCode className="w-4 h-4 text-[#dfbd75]" />
            <span>Table QR</span>
            <span className="text-[10px] text-[#8fa3bd] font-normal font-sans">
              Share / Scan
            </span>
          </button>
        </div>

        {/* Delivery Badge */}
        <div className="antilia-badge">
          <Bike className="w-3.5 h-3.5 text-emerald-400" />
          <span>Free Home Delivery in Civil Lines & Aligarh</span>
        </div>
      </div>
    </header>
  );
}
