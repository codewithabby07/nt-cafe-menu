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
    <nav className="sticky top-0 z-40 w-full border-b border-[#dfbd75]/20 bg-[#070d18]/95 backdrop-blur-md shadow-md">
      <div className="mx-auto max-w-2xl px-3 sm:px-4 pt-2.5 pb-2 space-y-2">
        
        {/* ROW 1: Search Input & Sort Dropdown */}
        <div className="flex items-center gap-2">
          {/* Live Search */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#dfbd75]/70" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (momos, burgers, pizzas...)"
              className="w-full rounded-lg border border-[#dfbd75]/25 bg-[#0b1627] pl-8 pr-7 py-2 text-xs text-[#fbf9f4] placeholder-[#6e839e] focus:border-[#dfbd75] focus:outline-none transition-all font-sans"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#9bb0c9] hover:text-[#fbf9f4] cursor-pointer"
                title="Clear search"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Price Sort Control */}
          <div className="shrink-0">
            <div className="flex items-center rounded-lg border border-[#dfbd75]/25 bg-[#0b1627] px-2 py-1.5">
              <ArrowUpDown className="w-3 h-3 text-[#dfbd75] mr-1 shrink-0" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent text-[11px] text-[#f5e4b8] font-bold focus:outline-none cursor-pointer"
                aria-label="Sort dishes by price"
              >
                <option value="default" className="bg-[#0b1627] text-[#fbf9f4]">
                  Default
                </option>
                <option value="price-asc" className="bg-[#0b1627] text-[#fbf9f4]">
                  Price: Low to High
                </option>
                <option value="price-desc" className="bg-[#0b1627] text-[#fbf9f4]">
                  Price: High to Low
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* ROW 2: Dietary Filter Pills & Reset Trigger */}
        <div className="flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setDietFilter('all')}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-full transition-all cursor-pointer ${
                dietFilter === 'all'
                  ? 'bg-[#dfbd75] text-[#091322]'
                  : 'bg-[#0b1627] border border-[#dfbd75]/20 text-[#9bb0c9] hover:text-[#fff]'
              }`}
            >
              All Items
            </button>

            <button
              type="button"
              onClick={() => setDietFilter('veg')}
              className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-full transition-all cursor-pointer ${
                dietFilter === 'veg'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#0b1627] border border-[#dfbd75]/20 text-[#9bb0c9] hover:text-emerald-400'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
              <span>Pure Veg</span>
            </button>

            <button
              type="button"
              onClick={() => setDietFilter('nonveg')}
              className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-full transition-all cursor-pointer ${
                dietFilter === 'nonveg'
                  ? 'bg-red-700 text-white'
                  : 'bg-[#0b1627] border border-[#dfbd75]/20 text-[#9bb0c9] hover:text-red-400'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block"></span>
              <span>Non-Veg</span>
            </button>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] text-[#dfbd75] font-semibold hover:underline cursor-pointer"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* ROW 3: Antilia cat-bar (Horizontal Category Scroller) */}
        <div
          ref={categoryScrollRef}
          className="cat-bar no-scrollbar scroll-smooth"
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
