import React, { useRef, useEffect } from 'react';
import { Search, X, ArrowUpDown, RotateCcw } from 'lucide-react';
import { MENU_CATEGORIES } from '../data/menuData';

export default function StickyNav({
  searchQuery,
  setSearchQuery,
  dietFilter,
  setDietFilter,
  sortOption,
  setSortOption,
  activeCategory,
  onSelectCategory,
  hasActiveFilters,
  onResetFilters
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
    <nav className="sticky top-0 z-40 w-full border-b border-[#dfbd75]/20 bg-[#060c18]/95 backdrop-blur-xl shadow-lg">
      <div className="mx-auto max-w-3xl px-3 sm:px-4 pt-2.5 pb-2 space-y-2">
        
        {/* ROW 1: Search Bar & Sort Dropdown */}
        <div className="flex items-center gap-2">
          {/* Live Search Input */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#dfbd75]/70" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search momos, burgers, pizzas..."
              className="w-full rounded-xl border border-[#dfbd75]/25 bg-[#091527] pl-9 pr-8 py-2 text-xs sm:text-sm text-[#fbf9f4] placeholder-[#6e839e] focus:border-[#dfbd75] focus:outline-none focus:ring-1 focus:ring-[#dfbd75]/40 transition-all font-sans min-h-[40px]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#9bb0c9] hover:text-[#fbf9f4] cursor-pointer"
                title="Clear search"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Price Sort Dropdown */}
          <div className="shrink-0">
            <div className="flex items-center rounded-xl border border-[#dfbd75]/25 bg-[#091527] px-2.5 py-1 min-h-[40px]">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#dfbd75] mr-1.5 shrink-0" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent text-xs text-[#f5e4b8] font-semibold focus:outline-none cursor-pointer"
                aria-label="Sort dishes by price"
              >
                <option value="default" className="bg-[#091527] text-[#fbf9f4]">
                  Default Order
                </option>
                <option value="price-asc" className="bg-[#091527] text-[#fbf9f4]">
                  Price: Low to High
                </option>
                <option value="price-desc" className="bg-[#091527] text-[#fbf9f4]">
                  Price: High to Low
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* ROW 2: Dietary Filter Pills & Reset Button */}
        <div className="flex items-center justify-between gap-2">
          {/* Dietary Segmented Controls */}
          <div className="flex items-center gap-1 p-0.5 rounded-lg border border-[#dfbd75]/20 bg-[#071120]">
            <button
              type="button"
              onClick={() => setDietFilter('all')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer min-h-[32px] ${
                dietFilter === 'all'
                  ? 'bg-[#dfbd75] text-[#091322] shadow-sm'
                  : 'text-[#9bb0c9] hover:text-[#fbf9f4]'
              }`}
            >
              All Items
            </button>

            <button
              type="button"
              onClick={() => setDietFilter('veg')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer min-h-[32px] ${
                dietFilter === 'veg'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-[#9bb0c9] hover:text-emerald-400'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block shadow-sm"></span>
              <span>Pure Veg</span>
            </button>

            <button
              type="button"
              onClick={() => setDietFilter('nonveg')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer min-h-[32px] ${
                dietFilter === 'nonveg'
                  ? 'bg-red-700 text-white shadow-sm'
                  : 'text-[#9bb0c9] hover:text-red-400'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-400 inline-block shadow-sm"></span>
              <span>Non-Veg</span>
            </button>
          </div>

          {/* Reset Filters Trigger */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#dfbd75]/35 bg-[#dfbd75]/10 text-xs text-[#f5e4b8] font-medium hover:bg-[#dfbd75]/20 transition-all cursor-pointer min-h-[32px]"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3 text-[#dfbd75]" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* ROW 3: Horizontal Scrollable Category Rail */}
        <div
          ref={categoryScrollRef}
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5 pb-0.5 scroll-smooth"
        >
          {MENU_CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                data-category={category.id}
                onClick={() => onSelectCategory(category.id)}
                type="button"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 min-h-[36px] ${
                  isActive
                    ? 'border-[#dfbd75] bg-[#dfbd75]/25 text-[#fbf9f4] shadow-sm'
                    : 'border-[#dfbd75]/15 bg-[#091527] text-[#9bb0c9] hover:border-[#dfbd75]/40 hover:text-[#fbf9f4]'
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
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
