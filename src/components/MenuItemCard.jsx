import React, { useState } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';

export default function MenuItemCard({ item, onSelect, categoryName }) {
  // If the item has multiple portions, state tracks the selected portion index
  const [selectedPortionIdx, setSelectedPortionIdx] = useState(0);

  const isPortion = item.pricingType === 'portion' && item.portions && item.portions.length > 0;
  const activePortion = isPortion ? item.portions[selectedPortionIdx] : null;
  const displayPrice = isPortion ? activePortion.price : item.price;

  return (
    <article
      onClick={() => onSelect(item, isPortion ? activePortion : null)}
      className="menu-card p-4 sm:p-5 flex flex-col justify-between cursor-pointer group select-none min-h-[140px]"
    >
      <div>
        {/* Top Meta Row: Diet indicator + Badges + Price */}
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Standard Indian Veg / Non-Veg Indicator */}
            <div
              className={`diet-indicator ${item.isVeg ? 'veg' : 'non-veg'}`}
              title={item.isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}
              aria-label={item.isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}
            >
              <div className="dot" />
            </div>

            {/* Special / House Badge */}
            {item.isSpecial && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-cinzel font-bold bg-[#dfbd75]/20 text-[#f5e4b8] border border-[#dfbd75]/40 tracking-wider">
                <Sparkles className="w-3 h-3 text-[#dfbd75]" />
                NT SPECIAL
              </span>
            )}

            {/* Quantity Badge for single items */}
            {item.quantity && !isPortion && (
              <span className="px-2 py-0.5 rounded-md bg-[#091424] border border-[#dfbd75]/25 text-xs font-medium text-[#c0cfdf]">
                {item.quantity}
              </span>
            )}
          </div>

          {/* Primary Price Display - Large, High Contrast (16-18px) */}
          <div className="text-right shrink-0">
            <span className="font-cinzel text-lg sm:text-xl font-extrabold text-[#f5e4b8] tracking-tight">
              ₹{displayPrice}
            </span>
            {isPortion && (
              <div className="text-[11px] text-[#9bb0c9] font-medium tracking-wide">
                {activePortion.label}
              </div>
            )}
          </div>
        </div>

        {/* Dish Name - Large & Highly Readable (17-18px) */}
        <h3 className="font-editorial text-[18px] sm:text-[19px] font-bold text-[#fbf9f4] group-hover:text-[#dfbd75] transition-colors leading-relaxed tracking-wide">
          {item.name}
        </h3>
      </div>

      {/* Bottom Area: Portion Switcher or Category Tag */}
      {isPortion ? (
        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-3.5 pt-3 border-t border-[#dfbd75]/20 flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-2"
        >
          <span className="text-xs text-[#9bb0c9] uppercase tracking-wider font-sans font-semibold">
            Choose Portion:
          </span>
          <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl border border-[#dfbd75]/30 bg-[#07101d]">
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
                  className={`px-3 py-2 text-xs rounded-lg transition-all cursor-pointer font-semibold min-h-[38px] text-center ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#dfbd75] to-[#c5a059] text-[#091322] shadow-md scale-[1.02]'
                      : 'text-[#a2b4cc] hover:text-[#fbf9f4] hover:bg-[#0e1c31]'
                  }`}
                >
                  <span>{portion.label}</span>
                  <span className="ml-1 opacity-90 font-cinzel">₹{portion.price}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="mt-3.5 pt-2.5 border-t border-[#dfbd75]/15 flex items-center justify-between text-xs text-[#8aa0b9]">
          <span className="tracking-wide">{categoryName}</span>
          <span className="inline-flex items-center gap-0.5 text-[#dfbd75] font-medium group-hover:translate-x-1 transition-transform">
            View details <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      )}
    </article>
  );
}
