import React, { useRef, useEffect } from 'react';
import { Search, X, Flame } from 'lucide-react';
import { MENU_CATEGORIES } from '../data/menuData';

export default function StickyNav({
  searchQuery,
  setSearchQuery,
  dietFilter,
  setDietFilter,
  activeCategory,
  onSelectCategory
}) {
  const categoryScrollRef = useRef(null);

  // Auto-scroll the active category pill into view
  useEffect(() => {
    if (!categoryScrollRef.current) return;
    const activeBtn = categoryScrollRef.current.querySelector(`[data-category="${activeCategory}"]`);
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activeCategory]);

  return (
    <div className="sticky top-0 z-40 w-full border-b border-[#dfbd75]/20 bg-[#070e1b]/95 backdrop-blur-md shadow-lg transition-all">
      <div className="mx-auto max-w-4xl px-3 pt-3 pb-2.5">
        
        {/* Top Controls: Search Bar & Dietary Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#dfbd75]/70" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search momos, burger, pizza, shake..."
              className="w-full rounded-lg border border-[#dfbd75]/25 bg-[#0b1626] pl-9 pr-8 py-2 text-xs sm:text-sm text-[#f9f8f5] placeholder-[#6f829c] focus:border-[#dfbd75] focus:outline-none focus:ring-1 focus:ring-[#dfbd75]/50 transition-all font-sans"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-[#9eacbf] hover:text-[#f9f8f5] cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Dietary Filter Segmented Control */}
          <div className="flex items-center justify-between sm:justify-start gap-1 p-1 rounded-lg border border-[#dfbd75]/20 bg-[#091424] self-stretch sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setDietFilter('all')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                dietFilter === 'all'
                  ? 'bg-[#dfbd75] text-[#091322] font-semibold shadow'
                  : 'text-[#9eacbf] hover:text-[#f9f8f5]'
              }`}
            >
              All Items
            </button>

            <button
              type="button"
              onClick={() => setDietFilter('veg')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                dietFilter === 'veg'
                  ? 'bg-emerald-600 text-white font-semibold shadow'
                  : 'text-[#9eacbf] hover:text-emerald-400'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
              <span>Pure Veg</span>
            </button>

            <button
              type="button"
              onClick={() => setDietFilter('nonveg')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                dietFilter === 'nonveg'
                  ? 'bg-red-700 text-white font-semibold shadow'
                  : 'text-[#9eacbf] hover:text-red-400'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-400 inline-block"></span>
              <span>Non-Veg</span>
            </button>
          </div>
        </div>

        {/* Horizontal Category Nav Rail */}
        <div
          ref={categoryScrollRef}
          className="mt-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 scroll-smooth"
        >
          {MENU_CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                data-category={category.id}
                onClick={() => onSelectCategory(category.id)}
                type="button"
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'border-[#dfbd75] bg-[#dfbd75]/20 text-[#f5e4b8] shadow-[0_0_12px_rgba(223,189,117,0.25)]'
                    : 'border-[#dfbd75]/15 bg-[#0e1c31]/80 text-[#a0afc4] hover:border-[#dfbd75]/40 hover:text-[#f9f8f5]'
                }`}
              >
                {category.icon && (
                  <img
                    src={category.icon}
                    alt=""
                    className="w-4 h-4 rounded-full object-cover shrink-0"
                    loading="lazy"
                  />
                )}
                <span>{category.name}</span>
                {category.badge && (
                  <span className="text-[10px] text-[#dfbd75] font-cinzel">★</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
