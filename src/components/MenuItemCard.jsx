import React, { useState } from 'react';
import { Star, Sparkles } from 'lucide-react';

export default function MenuItemCard({ item, onSelect, categoryName }) {
  // If the item has multiple portions, state tracks the selected portion index
  const [selectedPortionIdx, setSelectedPortionIdx] = useState(0);

  const isPortion = item.pricingType === 'portion' && item.portions && item.portions.length > 0;
  const activePortion = isPortion ? item.portions[selectedPortionIdx] : null;
  const displayPrice = isPortion ? activePortion.price : item.price;

  return (
    <div
      onClick={() => onSelect(item, isPortion ? activePortion : null)}
      className="menu-card p-3.5 sm:p-4 flex flex-col justify-between cursor-pointer group"
    >
      {/* Top Row: Diet indicator + Badges */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          {/* Veg / Non-Veg Indicator */}
          <div
            className={`diet-indicator ${item.isVeg ? 'veg' : 'non-veg'}`}
            title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
          >
            <div className="dot" />
          </div>

          {/* Special / House Badge */}
          {item.isSpecial && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-cinzel font-bold bg-[#dfbd75]/20 text-[#f5e4b8] border border-[#dfbd75]/40 tracking-wider">
              <Sparkles className="w-2.5 h-2.5 text-[#dfbd75]" />
              NT SPECIAL
            </span>
          )}

          {/* Quantity Badge for single items */}
          {item.quantity && !isPortion && (
            <span className="px-1.5 py-0.5 rounded bg-[#0b1626] border border-[#dfbd75]/20 text-[11px] text-[#a6b6cc]">
              {item.quantity}
            </span>
          )}
        </div>

        {/* Price Display */}
        <div className="text-right">
          <div className="font-cinzel text-base sm:text-lg font-bold text-[#f5e4b8] tracking-tight">
            ₹{displayPrice}
          </div>
          {isPortion && (
            <div className="text-[10px] text-[#8e9fb5] font-sans">
              {activePortion.label}
            </div>
          )}
        </div>
      </div>

      {/* Dish Name */}
      <div className="mb-3">
        <h3 className="font-editorial text-lg sm:text-xl font-semibold text-[#f8f6f0] group-hover:text-[#dfbd75] transition-colors leading-snug">
          {item.name}
        </h3>
      </div>

      {/* Portion Switcher for portion-based items */}
      {isPortion ? (
        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-auto pt-2 border-t border-[#dfbd75]/15 flex items-center justify-between gap-1.5"
        >
          <span className="text-[11px] text-[#8e9fb5] uppercase tracking-wider font-sans">Portion:</span>
          <div className="inline-flex rounded-lg border border-[#dfbd75]/25 bg-[#091424] p-0.5">
            {item.portions.map((portion, idx) => {
              const isSelected = selectedPortionIdx === idx;
              return (
                <button
                  key={portion.label}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPortionIdx(idx);
                  }}
                  className={`px-2 py-1 text-[11px] rounded-md transition-all cursor-pointer font-medium ${
                    isSelected
                      ? 'bg-[#dfbd75] text-[#091322] font-semibold shadow'
                      : 'text-[#9eacbf] hover:text-[#f8f6f0]'
                  }`}
                >
                  {portion.label} • ₹{portion.price}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="mt-auto pt-2 border-t border-[#dfbd75]/10 flex items-center justify-between text-[11px] text-[#788a9f]">
          <span>{categoryName}</span>
          <span className="text-[#dfbd75] group-hover:translate-x-0.5 transition-transform">
            Tap for details →
          </span>
        </div>
      )}
    </div>
  );
}
