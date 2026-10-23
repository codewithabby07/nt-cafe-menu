import React from 'react';
import { X, Phone, Sparkles, MapPin, Bike } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function ItemDetailModal({ item, selectedPortion, onClose }) {
  if (!item) return null;

  const isPortion = item.pricingType === 'portion' && item.portions;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#dfbd75]/40 bg-[#0a1525] p-5 sm:p-6 shadow-2xl text-[#f9f8f5]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-1.5 rounded-full border border-[#dfbd75]/20 bg-[#0e1c31] text-[#9eacbf] hover:text-[#f9f8f5] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Dietary and Special Badges */}
        <div className="flex items-center gap-2 mb-3">
          <div className={`diet-indicator ${item.isVeg ? 'veg' : 'non-veg'}`}>
            <div className="dot" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#9eacbf]">
            {item.isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}
          </span>
          {item.isSpecial && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-cinzel font-bold bg-[#dfbd75]/20 text-[#f5e4b8] border border-[#dfbd75]/40">
              <Sparkles className="w-2.5 h-2.5 text-[#dfbd75]" />
              NT SPECIAL
            </span>
          )}
        </div>

        {/* Dish Title */}
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#f5e4b8] leading-tight mb-2">
          {item.name}
        </h2>

        {/* Quantity if available */}
        {item.quantity && (
          <p className="text-xs text-[#8da0b8] mb-4">
            Serving size: <span className="text-[#f9f8f5] font-medium">{item.quantity}</span>
          </p>
        )}

        {/* Pricing Options */}
        <div className="my-4 rounded-xl border border-[#dfbd75]/25 bg-[#0e1c31] p-3.5">
          <div className="text-[11px] font-cinzel uppercase tracking-wider text-[#dfbd75] mb-2">
            Pricing & Portion Details
          </div>

          {isPortion ? (
            <div className="space-y-2">
              {item.portions.map((portion) => {
                const isCurrent = selectedPortion && selectedPortion.label === portion.label;
                return (
                  <div
                    key={portion.label}
                    className={`flex items-center justify-between p-2 rounded-lg border text-sm transition-all ${
                      isCurrent
                        ? 'border-[#dfbd75] bg-[#dfbd75]/15 text-[#f5e4b8]'
                        : 'border-[#dfbd75]/15 bg-[#091424] text-[#d4dde8]'
                    }`}
                  >
                    <span className="font-medium">{portion.label}</span>
                    <span className="font-cinzel font-bold text-base text-[#f5e4b8]">₹{portion.price}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-between text-base">
              <span className="text-sm text-[#a4b6cd]">Price</span>
              <span className="font-cinzel text-2xl font-bold text-[#f5e4b8]">₹{item.price}</span>
            </div>
          )}
        </div>

        {/* Direct Order by Phone Call */}
        <div className="mt-5 pt-4 border-t border-[#dfbd75]/20">
          <div className="flex items-center gap-1.5 text-xs text-[#8da0b8] mb-2.5">
            <Bike className="w-3.5 h-3.5 text-emerald-400" />
            <span>Order for Dine-in or Free Home Delivery:</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {RESTAURANT_INFO.phoneNumbers.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone}`}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-[#dfbd75]/40 bg-[#dfbd75]/10 text-[#f5e4b8] text-xs font-semibold hover:bg-[#dfbd75]/20 transition-all active:scale-95 text-center"
              >
                <Phone className="w-3.5 h-3.5 text-[#dfbd75]" />
                <span>Call {phone}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
