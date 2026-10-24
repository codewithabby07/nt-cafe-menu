import React from 'react';
import MenuItemCard from './MenuItemCard';

export default function CategorySection({
  category,
  filteredItems,
  onSelectItem
}) {
  if (filteredItems.length === 0) return null;

  return (
    <section id={category.id} className="menu-section scroll-mt-44">
      {/* Antilia Menu Section Title */}
      <h2 className="menu-section-title">
        {category.icon && (
          <img
            src={category.icon}
            alt=""
            className="w-6 h-6 rounded-full object-cover shrink-0 border border-[#dfbd75]/40"
            loading="lazy"
          />
        )}
        <span>{category.name}</span>
        <span className="text-xs text-[#8fa3bd] font-sans font-normal normal-case">
          ({filteredItems.length})
        </span>
      </h2>

      {/* Grid of Dishes (Antilia single column stacked list) */}
      <div className="space-y-2.5">
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
