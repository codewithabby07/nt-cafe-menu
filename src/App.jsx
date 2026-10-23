import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import StickyNav from './components/StickyNav';
import CategorySection from './components/CategorySection';
import ItemDetailModal from './components/ItemDetailModal';
import QRCodeModal from './components/QRCodeModal';
import Footer from './components/Footer';
import FloatingMobileBar from './components/FloatingMobileBar';
import { MENU_CATEGORIES } from './data/menuData';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState('all'); // 'all' | 'veg' | 'nonveg'
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].id);
  const [selectedItemState, setSelectedItemState] = useState(null); // { item, portion }
  const [showQRModal, setShowQRModal] = useState(false);

  // Filtered menu categories based on search query and dietary filter
  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return MENU_CATEGORIES.map((cat) => {
      const matchingItems = cat.items.filter((item) => {
        // Dietary check
        if (dietFilter === 'veg' && !item.isVeg) return false;
        if (dietFilter === 'nonveg' && item.isVeg) return false;

        // Search check
        if (!query) return true;
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCategory = cat.name.toLowerCase().includes(query);
        return matchesName || matchesCategory;
      });

      return {
        ...cat,
        matchingItems
      };
    }).filter((cat) => cat.matchingItems.length > 0);
  }, [searchQuery, dietFilter]);

  // Total visible items counter
  const totalVisibleItems = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.matchingItems.length, 0);
  }, [filteredCategories]);

  // Scroll to selected category
  const handleSelectCategory = (categoryId) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      const yOffset = -140; // account for sticky header + nav
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // ScrollSpy using IntersectionObserver to track visible category during scroll
  useEffect(() => {
    if (searchQuery) return; // avoid jittering active tab while searching

    const handleScroll = () => {
      const categoryElements = MENU_CATEGORIES.map((c) => ({
        id: c.id,
        el: document.getElementById(c.id)
      })).filter((c) => c.el !== null);

      const scrollPosition = window.scrollY + 180;

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
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-4xl px-3 sm:px-6 py-4">
        
        {/* Results Info Banner when filtering or searching */}
        {(searchQuery || dietFilter !== 'all') && (
          <div className="mb-4 flex items-center justify-between p-3 rounded-xl border border-[#dfbd75]/25 bg-[#0e1c31] text-xs text-[#a2b4cc]">
            <span>
              Showing <strong className="text-[#f5e4b8]">{totalVisibleItems}</strong> items
              {searchQuery && <span> for "<span className="text-[#f9f8f5]">{searchQuery}</span>"</span>}
              {dietFilter !== 'all' && (
                <span> ({dietFilter === 'veg' ? 'Pure Vegetarian' : 'Non-Vegetarian'})</span>
              )}
            </span>
            {(searchQuery || dietFilter !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setDietFilter('all');
                }}
                className="text-[#dfbd75] hover:underline font-medium cursor-pointer"
              >
                Reset filters
              </button>
            )}
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
          /* Empty Search State */
          <div className="py-16 text-center">
            <div className="mx-auto w-12 h-12 rounded-full border border-[#dfbd75]/30 bg-[#0e1c31] flex items-center justify-center text-lg mb-3">
              🍽️
            </div>
            <h3 className="font-cinzel text-lg font-bold text-[#f5e4b8] uppercase">
              No Dishes Found
            </h3>
            <p className="text-xs text-[#8ca0b8] mt-1 max-w-sm mx-auto">
              We couldn't find any dish matching "{searchQuery}". Please try searching for another dish or category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setDietFilter('all');
              }}
              className="mt-4 px-4 py-2 rounded-lg border border-[#dfbd75]/40 bg-[#dfbd75]/10 text-xs font-semibold text-[#f5e4b8] hover:bg-[#dfbd75]/20 transition-all cursor-pointer"
            >
              Show All Menu Items
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Bottom Bar for Mobile Devices */}
      <FloatingMobileBar
        onOpenQR={() => setShowQRModal(true)}
        totalVisibleItems={totalVisibleItems}
      />

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
