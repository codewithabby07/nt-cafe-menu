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

  // Auto-scroll active category button into view
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
    <nav className="sticky top-0 z-40 w-full border-b border-[#dfbd75]/25 bg-[#060c18]/95 backdrop-blur-md shadow-lg">
      <div className="mx-auto max-w-2xl px-3 sm:px-4 pt-3 pb-2.5 space-y-2.5">
        
        {/* ROW 1: Big Centered Search Bar */}
        <div className="relative max-w-xl mx-auto w-full">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#dfbd75]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dishes (e.g. momos, burgers, pizzas...)"
            className="w-full h-11 sm:h-12 rounded-xl border border-[#dfbd75]/35 bg-[#0b1627] pl-10 pr-9 text-xs sm:text-sm text-[#fbf9f4] placeholder-[#798ea6] focus:border-[#dfbd75] focus:outline-none focus:ring-2 focus:ring-[#dfbd75]/30 shadow-inner transition-all font-sans"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#9bb0c9] hover:text-[#fbf9f4] cursor-pointer"
              title="Clear search"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* ROW 2: Big Centered Dietary Toggles & Big Sort Control */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mx-auto">
          
          {/* Dietary Filter Segmented Control - Big & Centered */}
          <div className="inline-flex items-center p-1 rounded-xl border border-[#dfbd75]/30 bg-[#091526] shadow-sm">
            <button
              type="button"
              onClick={() => setDietFilter('all')}
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer min-h-[38px] ${
                dietFilter === 'all'
                  ? 'bg-[#dfbd75] text-[#091322] shadow'
                  : 'text-[#9bb0c9] hover:text-[#fbf9f4]'
              }`}
            >
              All Items
            </button>

            <button
              type="button"
              onClick={() => setDietFilter('veg')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer min-h-[38px] ${
                dietFilter === 'veg'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-[#9bb0c9] hover:text-emerald-400'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block shadow-sm"></span>
              <span>Pure Veg</span>
            </button>

            <button
              type="button"
              onClick={() => setDietFilter('nonveg')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer min-h-[38px] ${
                dietFilter === 'nonveg'
                  ? 'bg-red-700 text-white shadow'
                  : 'text-[#9bb0c9] hover:text-red-400'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-400 inline-block shadow-sm"></span>
              <span>Non-Veg</span>
            </button>
          </div>

          {/* Big Sort Control - Centered */}
          <div className="inline-flex items-center rounded-xl border border-[#dfbd75]/30 bg-[#091526] px-3 sm:px-4 py-1.5 shadow-sm min-h-[38px]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#dfbd75] mr-1.5 shrink-0" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-transparent text-xs sm:text-sm text-[#f5e4b8] font-bold focus:outline-none cursor-pointer pr-1"
              aria-label="Sort dishes by price"
            >
              <option value="default" className="bg-[#091526] text-[#fbf9f4]">
                Sort: Default
              </option>
              <option value="price-asc" className="bg-[#091526] text-[#fbf9f4]">
                Price: Low to High
              </option>
              <option value="price-desc" className="bg-[#091526] text-[#fbf9f4]">
                Price: High to Low
              </option>
            </select>
          </div>

          {/* Reset Filters Action */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-[#dfbd75]/40 bg-[#dfbd75]/15 text-xs font-bold text-[#f5e4b8] hover:bg-[#dfbd75]/25 transition-all cursor-pointer min-h-[38px]"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* ROW 3: Category Rail (Antilia cat-bar) */}
        <div
          ref={categoryScrollRef}
          className="cat-bar no-scrollbar scroll-smooth justify-start sm:justify-center"
        >
          {MENU_CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                data-category={category.id}
                onClick={() => onSelectCategory(category.id)}
                type="button"
                className={`cat-btn ${isActive ? 'active' : ''}`}
              >
                {category.icon && (
                  <img
                    src={category.icon}
                    alt=""
                    className="w-3.5 h-3.5 rounded-full object-cover shrink-0"
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
