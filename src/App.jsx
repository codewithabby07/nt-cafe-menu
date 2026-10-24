import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import StickyNav from './components/StickyNav';
import FeaturedSection from './components/FeaturedSection';
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

  // Helper to extract base numeric price for sorting
  const getItemBasePrice = (item) => {
    if (item.pricingType === 'portion' && item.portions && item.portions.length > 0) {
      return Number(item.portions[0].price);
    }
    return Number(item.price) || 0;
  };

  // Check if any filter or search is active
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
        // Dietary check
        if (dietFilter === 'veg' && !item.isVeg) return false;
        if (dietFilter === 'nonveg' && item.isVeg) return false;

        // Search check
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
      const yOffset = -150; // offset for sticky nav
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // ScrollSpy & Scroll-to-Top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
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
        if (item.el && item.el.offsetTop <= scrollPosition) {
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
    <div className="min-h-screen flex flex-col bg-[#070d18]">
      {/* Antilia-style Compact Restaurant Header */}
      <Header onOpenQR={() => setShowQRModal(true)} />

      {/* Sticky Filter & Category Navigation Toolbar */}
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

      {/* Main Content Area (Antilia layout max-w-2xl, generous bottom clearance) */}
      <main className="flex-1 mx-auto w-full max-w-2xl px-3 sm:px-4 py-2 pb-32">
        
        {/* Antilia Featured Carousel (shown when not searching) */}
        {!hasActiveFilters && (
          <FeaturedSection onSelectItem={handleSelectItem} />
        )}

        {/* Results Banner when filtering or searching */}
        {hasActiveFilters && (
          <div className="my-3 flex items-center justify-between p-2.5 rounded-lg border border-[#dfbd75]/25 bg-[#0b1626] text-xs text-[#9bb0c9]">
            <div className="truncate mr-2">
              <span>
                Showing <strong className="text-[#f5e4b8] font-bold">{totalVisibleItems}</strong> dishes
              </span>
              {searchQuery && (
                <span> for "<strong className="text-[#fff]">{searchQuery}</strong>"</span>
              )}
              {dietFilter !== 'all' && (
                <span className="text-[#dfbd75] ml-1">
                  • {dietFilter === 'veg' ? 'Veg Only' : 'Non-Veg Only'}
                </span>
              )}
              {sortOption !== 'default' && (
                <span className="text-[#dfbd75] ml-1">
                  • {sortOption === 'price-asc' ? 'Low to High' : 'High to Low'}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-[#dfbd75] hover:text-[#fff] font-bold cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        )}

        {/* Categories & Dish Lists (Antilia Section Title + Item Cards) */}
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
          /* Empty Search State */
          <div className="py-16 text-center">
            <div className="mx-auto w-12 h-12 rounded-full border border-[#dfbd75]/30 bg-[#0b1626] flex items-center justify-center text-xl mb-3 shadow">
              🍽️
            </div>
            <h3 className="font-cinzel text-lg font-bold text-[#f5e4b8] uppercase">
              No Dishes Found
            </h3>
            <p className="text-xs text-[#8fa3bd] mt-1 max-w-xs mx-auto">
              No dishes match "<span className="text-[#fff] font-medium">{searchQuery}</span>".
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-3.5 px-4 py-2 rounded-lg border border-[#dfbd75]/60 bg-[#dfbd75] text-xs font-bold text-[#091322] shadow cursor-pointer hover:bg-[#f5e4b8]"
            >
              Show All Dishes
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

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-30 p-2.5 rounded-full border border-[#dfbd75]/40 bg-[#0b1626]/90 text-[#f5e4b8] hover:bg-[#dfbd75] hover:text-[#091322] shadow-xl transition-all cursor-pointer flex items-center justify-center min-h-[38px] min-w-[38px]"
          title="Back to Top"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
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
