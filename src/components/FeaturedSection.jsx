import React from 'react';
import { Flame } from 'lucide-react';

export default function FeaturedSection({ onSelectItem }) {
  const featuredDishes = [
    {
      id: "bg-nt-ultimate",
      name: "NT Ultimate Chicken Burger",
      price: 130,
      badge: "House Special",
      isVeg: false,
      image: "./assets/burgers.png",
      categoryName: "Burgers"
    },
    {
      id: "cs-cheeza",
      name: "NT Special Chicken Cheeza",
      price: 250,
      quantity: "2pcs",
      badge: "Must Try",
      isVeg: false,
      image: "./assets/crispy_snacks.png",
      categoryName: "Crispy Snacks"
    },
    {
      id: "cm-kurkure",
      name: "Chicken Kurkure Momos",
      price: 100,
      badge: "Best Seller",
      isVeg: false,
      image: "./assets/momos.png",
      categoryName: "Chicken Momos"
    },
    {
      id: "fr-cheese-loaded",
      name: "Cheese Loaded Fries",
      price: 100,
      badge: "Popular",
      isVeg: true,
      image: "./assets/fries.png",
      categoryName: "Fries"
    },
    {
      id: "pz-paneer-corn",
      name: "Paneer & Corn Pizza",
      price: 200,
      badge: "Chef Choice",
      isVeg: true,
      image: "./assets/pizza.png",
      categoryName: "Pizza"
    },
    {
      id: "tc-kulhad-tea",
      name: "Kulhad Tea",
      price: 20,
      badge: "Signature",
      isVeg: true,
      image: "./assets/tea_coffee.png",
      categoryName: "Tea & Coffee"
    }
  ];

  return (
    <div className="featured-section">
      <div className="flex items-center gap-2 mb-3">
        <Flame className="w-4 h-4 text-[#dfbd75]" />
        <h3 className="font-cinzel text-base font-bold uppercase tracking-wider text-[#f5e4b8]">
          Featured Specials
        </h3>
      </div>

      <div className="featured-scroll no-scrollbar">
        {featuredDishes.map((dish) => (
          <div
            key={dish.id}
            onClick={() => onSelectItem(dish, null)}
            className="featured-card group"
          >
            <img
              src={dish.image}
              alt={dish.name}
              className="featured-card-img group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="featured-card-body">
              <div>
                <span className="featured-card-badge">{dish.badge}</span>
                <div className="featured-card-name group-hover:text-[#dfbd75] transition-colors">
                  {dish.name}
                </div>
              </div>
              <div className="featured-card-price mt-1.5">
                ₹{dish.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
