import React from 'react';
import { X, Phone, Sparkles, Bike, MessageCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function ItemDetailModal({ item, selectedPortion, onClose }) {
  if (!item) return null;

  const isPortion = item.pricingType === 'portion' && item.portions;

  const whatsappItemUrl = `https://wa.me/91${RESTAURANT_INFO.phoneNumbers[0]}?text=${encodeURIComponent(
    `Hello NT Café, I would like to order: ${item.name}${
      selectedPortion ? ` (${selectedPortion.label})` : ''
    }.`
  )}`;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#dfbd75]/50 bg-[#081220] p-5 sm:p-6 shadow-2xl text-[#fbf9f4]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-2 rounded-full border border-[#dfbd75]/30 bg-[#0c182c] text-[#a4b4cc] hover:text-[#fbf9f4] cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dietary and Special Badges */}
        <div className="flex items-center gap-2.5 mb-3.5">
          <div className={`diet-indicator ${item.isVeg ? 'veg' : 'non-veg'}`}>
            <div className="dot" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#a4b4cc]">
            {item.isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}
          </span>
          {item.isSpecial && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-cinzel font-bold bg-[#dfbd75]/25 text-[#f5e4b8] border border-[#dfbd75]/40">
              <Sparkles className="w-3 h-3 text-[#dfbd75]" />
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
          <p className="text-sm text-[#8fa3bd] mb-3">
            Serving quantity: <span className="text-[#fbf9f4] font-semibold">{item.quantity}</span>
          </p>
        )}

        {/* Pricing Options */}
        <div className="my-4 rounded-xl border border-[#dfbd75]/30 bg-[#0c192d] p-4">
          <div className="text-xs font-cinzel uppercase tracking-wider text-[#dfbd75] mb-2.5 font-bold">
            Pricing & Serving Options
          </div>

          {isPortion ? (
            <div className="space-y-2">
              {item.portions.map((portion) => {
                const isCurrent = selectedPortion && selectedPortion.label === portion.label;
                return (
                  <div
                    key={portion.label}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-sm transition-all ${
                      isCurrent
                        ? 'border-[#dfbd75] bg-[#dfbd75]/20 text-[#fbf9f4] font-semibold shadow'
                        : 'border-[#dfbd75]/15 bg-[#081220] text-[#c5d3e2]'
                    }`}
                  >
                    <span>{portion.label}</span>
                    <span className="font-cinzel font-black text-lg text-[#f5e4b8]">₹{portion.price}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-[#9bb0c9] font-medium">Price</span>
              <span className="font-cinzel text-2xl font-black text-[#f5e4b8]">₹{item.price}</span>
            </div>
          )}
        </div>

        {/* Direct Order by Phone or WhatsApp */}
        <div className="mt-5 pt-4 border-t border-[#dfbd75]/20 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs text-[#9bb0c9]">
            <Bike className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Order for Dine-in or Free Home Delivery:</span>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
            <a
              href={`tel:${RESTAURANT_INFO.phoneNumbers[0]}`}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-[#dfbd75]/50 bg-gradient-to-r from-[#dfbd75] to-[#c5a059] text-[#091322] text-xs font-bold shadow active:scale-95 text-center min-h-[44px]"
            >
              <Phone className="w-4 h-4 text-[#091322]" />
              <span>Call ({RESTAURANT_INFO.phoneNumbers[0]})</span>
            </a>

            <a
              href={whatsappItemUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-emerald-500/50 bg-emerald-950/50 text-emerald-300 text-xs font-bold hover:bg-emerald-900/60 shadow active:scale-95 text-center min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Order on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
