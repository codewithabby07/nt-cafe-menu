import React from 'react';
import MenuItemCard from './MenuItemCard';

export default function CategorySection({
  category,
  filteredItems,
  onSelectItem
}) {
  if (filteredItems.length === 0) return null;

  return (
    <section id={category.id} className="pt-6 pb-4 scroll-mt-28">
      {/* Category Banner Header */}
      <div className="flex items-center justify-between gap-3 mb-4 pb-2 border-b border-[#dfbd75]/20">
        <div className="flex items-center gap-3">
          {category.icon && (
            <div className="h-8 w-8 rounded-full border border-[#dfbd75]/40 bg-[#0e1c31] p-0.5 shadow-sm overflow-hidden shrink-0">
              <img
                src={category.icon}
                alt=""
                className="h-full w-full object-cover rounded-full"
                loading="lazy"
              />
            </div>
          )}
          <div>
            <h2 className="font-cinzel text-lg sm:text-xl font-bold tracking-wide text-[#f5e4b8] uppercase">
              {category.name}
            </h2>
            <span className="text-xs text-[#7d90a8]">
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        {/* Genuine Food Photography Preview from Menu */}
        {category.image && (
          <div className="hidden xs:flex items-center gap-2">
            <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-full border-2 border-[#dfbd75]/50 overflow-hidden shadow-md bg-[#0e1c31]">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        )}
      </div>

      {/* Grid of Dishes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {filteredItems.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            categoryName={category.name}
            onSelect={onSelectItem}
          />
        ))}
      </div>
    </section>
  );
}
