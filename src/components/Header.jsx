import React from 'react';
import { MapPin, Bike } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function Header() {
  return (
    <header className="antilia-header-wrap">
      <div className="mx-auto max-w-xl flex flex-col items-center">
        
        {/* Antilia Grand Brand Seal (96px with gold border & glow) */}
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
        <div className="flex items-center justify-center gap-1.5 text-xs text-[#a0b3cb] mb-3 max-w-md">
          <MapPin className="w-3.5 h-3.5 text-[#dfbd75] shrink-0" />
          <span>{RESTAURANT_INFO.address}</span>
        </div>

        {/* Free Delivery Badge */}
        <div className="antilia-badge">
          <Bike className="w-3.5 h-3.5 text-emerald-400" />
          <span>Free Home Delivery in Civil Lines & Aligarh</span>
        </div>
      </div>
    </header>
  );
}
