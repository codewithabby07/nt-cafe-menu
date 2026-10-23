import React from 'react';
import MenuItemCard from './MenuItemCard';
import { Sparkles } from 'lucide-react';

export default function CategorySection({
  category,
  filteredItems,
  onSelectItem
}) {
  if (filteredItems.length === 0) return null;

  return (
    <section id={category.id} className="pt-8 sm:pt-10 pb-6 scroll-mt-36">
      {/* Category Hero Showcase Banner */}
      <div className="category-hero-card mb-5 sm:mb-6 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Category Title & Badges */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              {/* Category Icon */}
              {category.icon && (
                <div className="h-8 w-8 rounded-full border border-[#dfbd75]/50 bg-[#091424] p-0.5 shadow-md overflow-hidden shrink-0">
                  <img
                    src={category.icon}
                    alt=""
                    className="h-full w-full object-cover rounded-full"
                    loading="lazy"
                  />
                </div>
              )}
              {category.badge && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-cinzel font-bold bg-[#dfbd75]/25 text-[#f5e4b8] border border-[#dfbd75]/40 uppercase tracking-widest">
                  <Sparkles className="w-3 h-3 text-[#dfbd75]" />
                  {category.badge}
                </span>
              )}
              <span className="text-xs text-[#9bb0c9] font-medium tracking-wide">
                • {filteredItems.length} {filteredItems.length === 1 ? 'Dish' : 'Dishes'} Available
              </span>
            </div>

            {/* BIG & ATTRACTIVE Heading (26-32px mobile, 32-40px desktop) */}
            <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wider text-gold-gradient uppercase drop-shadow-md">
              {category.name}
            </h2>

            {/* Subtle decorative gold line */}
            <div className="mt-2.5 h-[2px] w-24 bg-gradient-to-r from-[#dfbd75] via-[#dfbd75]/60 to-transparent rounded-full" />
          </div>

          {/* High-Quality Food Photography Showcase */}
          {category.image && (
            <div className="shrink-0 flex items-center justify-center sm:justify-end">
              <div className="relative group">
                <div className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 rounded-2xl border-2 border-[#dfbd75]/60 overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.6)] bg-[#07101d]">
                  <img
                    src={category.image}
                    alt={`${category.name} at NT Café`}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                {/* Subtle gold crown watermark badge */}
                <div className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-md bg-[#07101d] border border-[#dfbd75]/40 text-[10px] font-cinzel text-[#dfbd75] shadow-sm">
                  NT CAFÉ
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grid of Dishes with comfortable mobile breathing room */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {filteredItems.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            categoryName={category.name}
            onSelect={onSelectItem}
          />
        ))}
      </div>

      {/* Subtle ornate separator between categories */}
      <div className="gold-divider opacity-40 mt-8 mb-2" />
    </section>
  );
}
