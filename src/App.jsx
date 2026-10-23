import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import StickyNav from './components/StickyNav';
import CategorySection from './components/CategorySection';
import ItemDetailModal from './components/ItemDetailModal';
import QRCodeModal from './components/QRCodeModal';
import Footer from './components/Footer';
import FloatingMobileBar from './components/FloatingMobileBar';
import { MENU_CATEGORIES } from './data/menuData';
import { ArrowUp, RotateCcw } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState('all'); // 'all' | 'veg' | 'nonveg'
  const [sortOption, setSortOption] = useState('default'); // 'default' | 'price-asc' | 'price-desc'
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].id);
  const [selectedItemState, setSelectedItemState] = useState(null); // { item, portion }
  const [showQRModal, setShowQRModal] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Helper to get base numerical price for sorting
  const getItemBasePrice = (item) => {
    if (item.pricingType === 'portion' && item.portions && item.portions.length > 0) {
      return Number(item.portions[0].price);
    }
    return Number(item.price) || 0;
  };

  // Has active filters
  const hasActiveFilters = Boolean(
    searchQuery.trim() !== '' || dietFilter !== 'all' || sortOption !== 'default'
  );

  const handleResetFilters = () => {
    setSearchQuery('');
    setDietFilter('all');
    setSortOption('default');
  };

  // Filter and sort items across categories
  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return MENU_CATEGORIES.map((cat) => {
      let matchingItems = cat.items.filter((item) => {
        // Dietary filter
        if (dietFilter === 'veg' && !item.isVeg) return false;
        if (dietFilter === 'nonveg' && item.isVeg) return false;

        // Search filter (name and category)
        if (!query) return true;
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCategory = cat.name.toLowerCase().includes(query);
        return matchesName || matchesCategory;
      });

      // Price sorting
      if (sortOption === 'price-asc') {
        matchingItems = [...matchingItems].sort(
          (a, b) => getItemBasePrice(a) - getItemBasePrice(b)
        );
      } else if (sortOption === 'price-desc') {
        matchingItems = [...matchingItems].sort(
          (a, b) => getItemBasePrice(b) - getItemBasePrice(a)
        );
      }

      return {
        ...cat,
        matchingItems
      };
    }).filter((cat) => cat.matchingItems.length > 0);
  }, [searchQuery, dietFilter, sortOption]);

  // Total visible items counter
  const totalVisibleItems = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.matchingItems.length, 0);
  }, [filteredCategories]);

  // Scroll to selected category
  const handleSelectCategory = (categoryId) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      const yOffset = -150; // account for sticky nav height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // ScrollSpy & Scroll-to-Top visibility
  useEffect(() => {
    const handleScroll = () => {
      // Toggle back to top visibility
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      if (searchQuery) return; // avoid jitter while actively typing search

      const categoryElements = MENU_CATEGORIES.map((c) => ({
        id: c.id,
        el: document.getElementById(c.id)
      })).filter((c) => c.el !== null);

      const scrollPosition = window.scrollY + 200;

      for (let i = categoryElements.length - 1; i >= 0; i--) {
        const item = categoryElements[i];
        if (item.el.offsetTop <= scrollPosition) {
          setActiveCategory(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchQuery]);

  const handleSelectItem = (item, portion) => {
    setSelectedItemState({ item, portion });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-trellis">
      {/* Restaurant Header */}
      <Header onOpenQR={() => setShowQRModal(true)} />

      {/* Sticky Category & Search Navigation */}
      <StickyNav
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        dietFilter={dietFilter}
        setDietFilter={setDietFilter}
        sortOption={sortOption}
        setSortOption={setSortOption}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        hasActiveFilters={hasActiveFilters}
        onResetFilters={handleResetFilters}
      />

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-4xl px-3.5 sm:px-6 py-4">
        
        {/* Results Banner when filtering or searching */}
        {hasActiveFilters && (
          <div className="mb-4 flex items-center justify-between p-3.5 rounded-xl border border-[#dfbd75]/30 bg-[#081324] text-xs sm:text-sm text-[#a4b6cd]">
            <div>
              <span>
                Showing <strong className="text-[#f5e4b8] font-bold">{totalVisibleItems}</strong> items
              </span>
              {searchQuery && (
                <span> for "<strong className="text-[#fbf9f4]">{searchQuery}</strong>"</span>
              )}
              {dietFilter !== 'all' && (
                <span className="ml-1 text-[#dfbd75]">
                  • {dietFilter === 'veg' ? 'Pure Vegetarian' : 'Non-Vegetarian'}
                </span>
              )}
              {sortOption !== 'default' && (
                <span className="ml-1 text-[#dfbd75]">
                  • {sortOption === 'price-asc' ? 'Price: Low to High' : 'Price: High to Low'}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-[#dfbd75] hover:text-[#fbf9f4] font-semibold cursor-pointer shrink-0 ml-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        )}

        {/* Categories & Dish Lists */}
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              filteredItems={category.matchingItems}
              onSelectItem={handleSelectItem}
            />
          ))
        ) : (
          /* Helpful Empty Search State */
          <div className="py-20 text-center">
            <div className="mx-auto w-16 h-16 rounded-full border border-[#dfbd75]/40 bg-[#091527] flex items-center justify-center text-2xl mb-4 shadow-lg">
              🍽️
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#f5e4b8] uppercase tracking-wide">
              No Dishes Found
            </h3>
            <p className="text-sm text-[#9bb0c9] mt-2 max-w-md mx-auto">
              We couldn't find any dish matching "<span className="text-[#fbf9f4] font-semibold">{searchQuery}</span>" with the selected filters.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-5 px-5 py-2.5 rounded-xl border border-[#dfbd75]/60 bg-gradient-to-r from-[#dfbd75] to-[#c5a059] text-xs sm:text-sm font-bold text-[#091322] shadow hover:brightness-110 transition-all cursor-pointer min-h-[44px]"
            >
              Clear All Filters & Show Full Menu
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Bottom Bar for Mobile Devices */}
      <FloatingMobileBar
        onOpenQR={() => setShowQRModal(true)}
      />

      {/* Desktop / Tablet Floating Back-to-Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="hidden sm:flex fixed bottom-6 right-6 z-30 p-3 rounded-full border border-[#dfbd75]/40 bg-[#091527]/90 text-[#f5e4b8] hover:bg-[#dfbd75] hover:text-[#091322] shadow-2xl transition-all cursor-pointer items-center justify-center min-h-[44px] min-w-[44px]"
          title="Back to Top"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Item Detail Modal */}
      {selectedItemState && (
        <ItemDetailModal
          item={selectedItemState.item}
          selectedPortion={selectedItemState.portion}
          onClose={() => setSelectedItemState(null)}
        />
      )}

      {/* QR Code Sharing Modal */}
      {showQRModal && (
        <QRCodeModal onClose={() => setShowQRModal(false)} />
      )}
    </div>
  );
}
