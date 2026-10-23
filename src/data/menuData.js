export const RESTAURANT_INFO = {
  name: "NT CAFÉ",
  subName: "FOOD HUB",
  tagline: "Made with Heart, Served with Love",
  established: 2026,
  address: "Sir Syed Nagar, Near Nadeem Tarin Hall, Civil Lines, Aligarh",
  phoneNumbers: ["9045008193", "8449173585"],
  deliveryNotice: "Free Home Delivery Available",
  logo: "./assets/logo_gold.png",
  headerEmblem: "./assets/header_emblem.png"
};

export const MENU_CATEGORIES = [
  {
    id: "chicken-momos",
    name: "Chicken Momos",
    badge: "House Specialty",
    icon: "./assets/cat_momos.png",
    image: null,
    items: [
      {
        id: "cm-steam",
        name: "Chicken Steam Momos",
        isVeg: false,
        pricingType: "portion",
        portions: [
          { label: "Half (5pcs)", price: 80 },
          { label: "Full (10pcs)", price: 150 }
        ]
      },
      {
        id: "cm-fried",
        name: "Chicken Fried Momos",
        isVeg: false,
        pricingType: "portion",
        portions: [
          { label: "Half (5pcs)", price: 90 },
          { label: "Full (10pcs)", price: 170 }
        ]
      },
      {
        id: "cm-kurkure",
        name: "Chicken Kurkure Momos",
        isVeg: false,
        pricingType: "portion",
        portions: [
          { label: "Half (5pcs)", price: 100 },
          { label: "Full (10pcs)", price: 200 }
        ]
      },
      {
        id: "cm-tandoori-creamy",
        name: "Chicken Tandoori Creamy Momos",
        isVeg: false,
        pricingType: "portion",
        portions: [
          { label: "Half (5pcs)", price: 100 },
          { label: "Full (10pcs)", price: 200 }
        ]
      }
    ]
  },
  {
    id: "sandwiches",
    name: "Sandwiches",
    icon: "./assets/cat_sandwiches.png",
    image: "./assets/sandwiches.png",
    items: [
      {
        id: "sw-veg-grilled",
        name: "Veg Grilled Sandwich",
        isVeg: true,
        pricingType: "portion",
        portions: [
          { label: "2pcs", price: 60 },
          { label: "4pcs", price: 110 }
        ]
      },
      {
        id: "sw-grilled-paneer-corn",
        name: "Grilled Paneer & Corn Sandwich",
        isVeg: true,
        pricingType: "portion",
        portions: [
          { label: "2pcs", price: 80 },
          { label: "4pcs", price: 150 }
        ]
      },
      {
        id: "sw-chicken-grilled",
        name: "Chicken Grilled Sandwich",
        isVeg: false,
        pricingType: "portion",
        portions: [
          { label: "2pcs", price: 70 },
          { label: "4pcs", price: 130 }
        ]
      },
      {
        id: "sw-chicken-tandoori",
        name: "Chicken Tandoori Sandwich",
        isVeg: false,
        pricingType: "portion",
        portions: [
          { label: "2pcs", price: 80 },
          { label: "4pcs", price: 150 }
        ]
      }
    ]
  },
  {
    id: "fries",
    name: "Fries",
    icon: "./assets/cat_fries.png",
    image: "./assets/fries.png",
    items: [
      {
        id: "fr-french",
        name: "French Fries",
        isVeg: true,
        pricingType: "portion",
        portions: [
          { label: "Half", price: 50 },
          { label: "Full", price: 80 }
        ]
      },
      {
        id: "fr-peri-peri",
        name: "Peri Peri Fries",
        isVeg: true,
        pricingType: "portion",
        portions: [
          { label: "Half", price: 70 },
          { label: "Full", price: 120 }
        ]
      },
      {
        id: "fr-cheese-loaded",
        name: "Cheese Loaded Fries",
        isVeg: true,
        pricingType: "portion",
        portions: [
          { label: "Half", price: 100 },
          { label: "Full", price: 180 }
        ]
      },
      {
        id: "fr-chicken-loaded",
        name: "Chicken Loaded Fries",
        isVeg: false,
        pricingType: "portion",
        portions: [
          { label: "Half", price: 130 },
          { label: "Full", price: 240 }
        ]
      }
    ]
  },
  {
    id: "crispy-snacks",
    name: "Crispy Snacks",
    icon: "./assets/cat_crispy.png",
    image: "./assets/crispy_snacks.png",
    items: [
      {
        id: "cs-nuggets",
        name: "Chicken Nuggets",
        quantity: "5pcs",
        price: 100,
        isVeg: false,
        pricingType: "single"
      },
      {
        id: "cs-popcorn",
        name: "Chicken Popcorn",
        quantity: "10pcs",
        price: 100,
        isVeg: false,
        pricingType: "single"
      },
      {
        id: "cs-strips",
        name: "Chicken Strips",
        quantity: "4pcs",
        price: 120,
        isVeg: false,
        pricingType: "single"
      },
      {
        id: "cs-cheeza",
        name: "NT Special Chicken Cheeza",
        quantity: "2pcs",
        price: 250,
        isVeg: false,
        isSpecial: true,
        pricingType: "single"
      }
    ]
  },
  {
    id: "wraps",
    name: "Wraps",
    icon: "./assets/cat_wraps.png",
    image: "./assets/wraps.png",
    items: [
      {
        id: "wr-veg",
        name: "Veg Wrap",
        price: 60,
        isVeg: true,
        pricingType: "single"
      },
      {
        id: "wr-grilled-paneer",
        name: "Grilled Paneer Wrap",
        price: 80,
        isVeg: true,
        pricingType: "single"
      },
      {
        id: "wr-chicken-grilled",
        name: "Chicken Grilled Wrap",
        price: 80,
        isVeg: false,
        pricingType: "single"
      },
      {
        id: "wr-chicken-tandoori",
        name: "Chicken Tandoori Wrap",
        price: 90,
        isVeg: false,
        pricingType: "single"
      }
    ]
  },
  {
    id: "burgers",
    name: "Burgers",
    icon: "./assets/cat_burgers.png",
    image: "./assets/burgers.png",
    items: [
      {
        id: "bg-veg-aloo-tikki",
        name: "Veg Aloo Tikki Burger",
        price: 50,
        isVeg: true,
        pricingType: "single"
      },
      {
        id: "bg-veg-cheese",
        name: "Veg Cheese Burger",
        price: 60,
        isVeg: true,
        pricingType: "single"
      },
      {
        id: "bg-chicken-grilled",
        name: "Chicken Grilled Burger",
        price: 70,
        isVeg: false,
        pricingType: "single"
      },
      {
        id: "bg-chicken-cheese",
        name: "Chicken Cheese Burger",
        price: 90,
        isVeg: false,
        pricingType: "single"
      },
      {
        id: "bg-chicken-tandoori",
        name: "Chicken Tandoori Burger",
        price: 90,
        isVeg: false,
        pricingType: "single"
      },
      {
        id: "bg-nt-ultimate",
        name: "NT Ultimate Chicken Burger",
        price: 130,
        isVeg: false,
        isSpecial: true,
        pricingType: "single"
      }
    ]
  },
  {
    id: "pizza",
    name: "Pizza",
    icon: "./assets/cat_pizza.png",
    image: "./assets/pizza.png",
    items: [
      {
        id: "pz-veg-cheese",
        name: "Veg Cheese Pizza",
        price: 150,
        isVeg: true,
        pricingType: "single"
      },
      {
        id: "pz-margherita",
        name: "Margherita Pizza",
        price: 150,
        isVeg: true,
        pricingType: "single"
      },
      {
        id: "pz-chicken-cheese",
        name: "Chicken Cheese Pizza",
        price: 180,
        isVeg: false,
        pricingType: "single"
      },
      {
        id: "pz-chicken-tandoori",
        name: "Chicken Tandoori Pizza",
        price: 190,
        isVeg: false,
        pricingType: "single"
      },
      {
        id: "pz-paneer-corn",
        name: "Paneer & Corn Pizza",
        price: 200,
        isVeg: true,
        pricingType: "single"
      }
    ]
  },
  {
    id: "beverages",
    name: "Beverages",
    icon: "./assets/cat_beverages.png",
    image: "./assets/beverages.png",
    items: [
      { id: "bv-strawberry-shake", name: "Strawberry Shake", price: 60, isVeg: true, pricingType: "single" },
      { id: "bv-mango-shake", name: "Mango Shake", price: 60, isVeg: true, pricingType: "single" },
      { id: "bv-banana-shake", name: "Banana Shake", price: 60, isVeg: true, pricingType: "single" },
      { id: "bv-oreo-shake", name: "Oreo Shake", price: 60, isVeg: true, pricingType: "single" },
      { id: "bv-lassi", name: "Lassi", price: 60, isVeg: true, pricingType: "single" },
      { id: "bv-mint-mojito", name: "Mint Mojito", price: 60, isVeg: true, pricingType: "single" },
      { id: "bv-blue-mojito", name: "Blue Mojito", price: 60, isVeg: true, pricingType: "single" },
      { id: "bv-strawberry-mojito", name: "Strawberry Mojito", price: 60, isVeg: true, pricingType: "single" }
    ]
  },
  {
    id: "tea-coffee",
    name: "Tea & Coffee",
    icon: "./assets/cat_tea_coffee.png",
    image: "./assets/tea_coffee.png",
    items: [
      { id: "tc-hot-coffee", name: "Hot Coffee", price: 30, isVeg: true, pricingType: "single" },
      { id: "tc-cold-coffee", name: "Cold Coffee", price: 60, isVeg: true, pricingType: "single" },
      { id: "tc-kulhad-tea", name: "Kulhad Tea", price: 20, isVeg: true, pricingType: "single" }
    ]
  }
];
