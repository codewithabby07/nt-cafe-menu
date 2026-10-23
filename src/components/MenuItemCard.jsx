import React, { useState } from 'react';
import { Sparkles, ChevronRight, Utensils } from 'lucide-react';

export default function MenuItemCard({ item, categoryImage, onSelect, categoryName }) {
  // If item has portions, track selected portion
  const [selectedPortionIdx, setSelectedPortionIdx] = useState(0);

  const isPortion = item.pricingType === 'portion' && item.portions && item.portions.length > 0;
  const activePortion = isPortion ? item.portions[selectedPortionIdx] : null;
  const displayPrice = isPortion ? activePortion.price : item.price;

  // Use item image, or fallback to category image
  const displayImage = item.image || categoryImage;

  return (
    <article
      onClick={() => onSelect(item, isPortion ? activePortion : null)}
      className="dish-row-card p-3 sm:p-4 flex flex-row items-stretch gap-3 sm:gap-4 cursor-pointer group"
    >
      {/* LEFT: Consistently Sized Food Photography (Antilia Layout) */}
      <div className="relative w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-[#dfbd75]/25 bg-[#091527] self-center">
        {displayImage ? (
          <img
            src={displayImage}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              // Graceful fallback if image fails
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#dfbd75]/40">
            <Utensils className="w-6 h-6" />
          </div>
        )}
      </div>

      {/* RIGHT: Well-Spaced Dish Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        
        {/* Top Meta: Dietary Tag & Special Badge */}
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            {/* Antilia-style Veg / Non-Veg Pill */}
            <span className={`diet-pill ${item.isVeg ? 'veg' : 'non-veg'}`}>
              <span className="diet-dot" />
              <span>{item.isVeg ? 'Veg' : 'Non-Veg'}</span>
            </span>

            {/* NT Special Badge if applicable */}
            {item.isSpecial && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-cinzel font-bold bg-[#dfbd75]/20 text-[#f5e4b8] border border-[#dfbd75]/35">
                <Sparkles className="w-2.5 h-2.5 text-[#dfbd75]" />
                NT SPECIAL
              </span>
            )}

            {/* Serving Quantity for single items */}
            {item.quantity && !isPortion && (
              <span className="text-[11px] text-[#8fa5be] font-medium">
                • {item.quantity}
              </span>
            )}
          </div>

          {/* Dish Name: High Contrast, Readable (16-18px) */}
          <h3 className="font-editorial text-base sm:text-lg font-bold text-[#fbf9f4] group-hover:text-[#dfbd75] transition-colors leading-snug line-clamp-2">
            {item.name}
          </h3>

          {/* Category breadcrumb */}
          <p className="text-[11px] text-[#788eab] mt-0.5 truncate">
            {categoryName}
          </p>
        </div>

        {/* Bottom Row: Prominent Gold Price & Portion Controls */}
        <div className="mt-2.5 pt-2 border-t border-[#dfbd75]/15 flex items-center justify-between gap-2 flex-wrap">
          {/* Price */}
          <div className="flex items-baseline gap-1.5 shrink-0">
            <span className="font-cinzel text-base sm:text-lg font-extrabold text-[#f5e4b8] tracking-tight">
              ₹{displayPrice}
            </span>
            {isPortion && (
              <span className="text-[11px] text-[#8fa5be] font-medium">
                ({activePortion.label})
              </span>
            )}
          </div>

          {/* Portion Switcher or View Details Button */}
          {isPortion ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center rounded-lg border border-[#dfbd75]/30 bg-[#081222] p-0.5 shrink-0"
            >
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
                    className={`px-2 py-1 text-[11px] font-semibold rounded-md transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#dfbd75] text-[#091322] shadow-sm font-bold'
                        : 'text-[#9bb0c9] hover:text-[#fbf9f4]'
                    }`}
                  >
                    {portion.label.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          ) : (
            <span className="inline-flex items-center gap-0.5 text-xs text-[#dfbd75] font-semibold group-hover:translate-x-0.5 transition-transform shrink-0">
              Details <ChevronRight className="w-3.5 h-3.5" />
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
