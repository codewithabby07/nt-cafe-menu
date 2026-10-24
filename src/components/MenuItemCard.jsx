import React, { useState } from 'react';
import { Sparkles, Utensils, ChevronRight } from 'lucide-react';

export default function MenuItemCard({ item, categoryImage, onSelect, categoryName }) {
  const [selectedPortionIdx, setSelectedPortionIdx] = useState(0);

  const isPortion = item.pricingType === 'portion' && item.portions && item.portions.length > 0;
  const activePortion = isPortion ? item.portions[selectedPortionIdx] : null;
  const displayPrice = isPortion ? activePortion.price : item.price;
  const displayImage = item.image || categoryImage;

  return (
    <article
      onClick={() => onSelect(item, isPortion ? activePortion : null)}
      className="item-card cursor-pointer group"
    >
      {/* LEFT: Food Photography (Antilia style 105px x 105px) */}
      <div className="relative shrink-0 overflow-hidden bg-[#0a1424]">
        {displayImage ? (
          <img
            src={displayImage}
            alt={item.name}
            className="item-card-img group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="item-card-img flex items-center justify-center text-[#dfbd75]/40">
            <Utensils className="w-6 h-6" />
          </div>
        )}
      </div>

      {/* RIGHT: Content Body */}
      <div className="item-card-body">
        <div>
          {/* Dietary & Special Badges */}
          <div className="item-card-badges">
            <span className={item.isVeg ? 'badge-veg' : 'badge-nonveg'}>
              <span className="text-[7px]">●</span>
              <span>{item.isVeg ? 'Veg' : 'Non-Veg'}</span>
            </span>

            {item.isSpecial && (
              <span className="badge-special flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-[#091322]" />
                <span>Special</span>
              </span>
            )}
          </div>

          {/* Dish Name */}
          <h3 className="item-card-name group-hover:text-[#dfbd75] transition-colors">
            {item.name}
          </h3>

          {/* Subtitle / Serving Quantity */}
          <p className="item-card-desc">
            {item.quantity ? `${item.quantity} • ` : ''}
            {categoryName}
          </p>
        </div>

        {/* Bottom: Price & Action */}
        <div className="item-card-bottom">
          <div className="flex items-baseline gap-1">
            <span className="item-card-price">₹{displayPrice}</span>
            {isPortion && (
              <span className="text-[10px] text-[#8fa3bd] font-medium">
                ({activePortion.label})
              </span>
            )}
          </div>

          {isPortion ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="inline-flex rounded-md border border-[#dfbd75]/25 bg-[#091527] p-0.5"
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
                    className={`px-2 py-0.5 text-[10px] font-bold rounded transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#dfbd75] text-[#091322]'
                        : 'text-[#9bb0c9] hover:text-[#fff]'
                    }`}
                  >
                    {portion.label.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(item, null);
              }}
              className="add-btn"
            >
              <span>+ Order</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
