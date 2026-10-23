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
    <section id={category.id} className="pt-6 sm:pt-8 pb-4 scroll-mt-44">
      {/* Antilia-Style Clean & Compact Category Header */}
      <div className="flex items-center gap-3 mb-4">
        {/* Category Crest Icon */}
        {category.icon && (
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border border-[#dfbd75]/40 bg-[#091527] p-0.5 overflow-hidden shrink-0 shadow-sm">
            <img
              src={category.icon}
              alt=""
              className="h-full w-full object-cover rounded-full"
              loading="lazy"
            />
          </div>
        )}

        {/* Large & Elegant Category Heading (26-32px on mobile) */}
        <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wide text-gold-gradient uppercase shrink-0">
          {category.name}
        </h2>

        {/* Item Count */}
        <span className="text-xs text-[#8fa3bd] font-medium shrink-0">
          ({filteredItems.length})
        </span>

        {/* Category Separator Line (Antilia layout) */}
        <div className="category-header-line" />
      </div>

      {/* Vertical Stack of Antilia-style Horizontal Cards */}
      <div className="space-y-3 sm:space-y-3.5">
        {filteredItems.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            categoryImage={category.image}
            categoryName={category.name}
            onSelect={onSelectItem}
          />
        ))}
      </div>
    </section>
  );
}
