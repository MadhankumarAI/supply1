// Bangalore-specific Mandi data with multiple scenarios
// All coordinates are real Bangalore locations

export const RETAILER_LOCATION = {
  name: "Your Store - Koramangala",
  latitude: 12.9352,
  longitude: 77.6245,
  resale_prices: {
    "Tomatoes": 45,
    "Onions": 35,
    "Potatoes": 28,
    "Carrots": 40,
    "Cabbage": 25,
    "Cauliflower": 38,
    "Spinach": 35,
    "Green Beans": 50
  }
};

export const SCENARIOS = {
  // Scenario 1: Trade-off between distance, price, and shelf life
  scenario1: {
    name: "Price vs Distance Trade-off",
    description: "Nearest mandi is cheapest but lower shelf life. Farther mandis offer better quality.",
    mandis: [
      {
        id: "m1",
        name: "KR Market",
        location: "Krishnarajendra Market, Bangalore",
        latitude: 12.9591,
        longitude: 77.5753,
        products: [
          { product_name: "Tomatoes", available_quantity: 500, price_per_kg: 25, shelf_life_days: 2, last_updated: "2 hours ago" },
          { product_name: "Onions", available_quantity: 800, price_per_kg: 22, shelf_life_days: 10, last_updated: "1 hour ago" },
          { product_name: "Potatoes", available_quantity: 1000, price_per_kg: 18, shelf_life_days: 15, last_updated: "3 hours ago" },
          { product_name: "Carrots", available_quantity: 300, price_per_kg: 28, shelf_life_days: 5, last_updated: "2 hours ago" }
        ]
      },
      {
        id: "m2",
        name: "Yeshwanthpur APMC",
        location: "Yeshwanthpur, Bangalore",
        latitude: 13.0280,
        longitude: 77.5385,
        products: [
          { product_name: "Tomatoes", available_quantity: 800, price_per_kg: 30, shelf_life_days: 5, last_updated: "1 hour ago" },
          { product_name: "Onions", available_quantity: 1200, price_per_kg: 24, shelf_life_days: 12, last_updated: "30 mins ago" },
          { product_name: "Cabbage", available_quantity: 400, price_per_kg: 15, shelf_life_days: 7, last_updated: "2 hours ago" },
          { product_name: "Cauliflower", available_quantity: 350, price_per_kg: 25, shelf_life_days: 6, last_updated: "1 hour ago" }
        ]
      },
      {
        id: "m3",
        name: "Malleswaram Market",
        location: "Malleswaram, Bangalore",
        latitude: 13.0059,
        longitude: 77.5713,
        products: [
          { product_name: "Tomatoes", available_quantity: 400, price_per_kg: 28, shelf_life_days: 4, last_updated: "45 mins ago" },
          { product_name: "Spinach", available_quantity: 200, price_per_kg: 25, shelf_life_days: 1, last_updated: "30 mins ago" },
          { product_name: "Carrots", available_quantity: 500, price_per_kg: 30, shelf_life_days: 7, last_updated: "1 hour ago" },
          { product_name: "Green Beans", available_quantity: 250, price_per_kg: 38, shelf_life_days: 3, last_updated: "2 hours ago" }
        ]
      },
      {
        id: "m4",
        name: "Madiwala Market",
        location: "Madiwala, Bangalore",
        latitude: 12.9141,
        longitude: 77.6232,
        products: [
          { product_name: "Tomatoes", available_quantity: 600, price_per_kg: 24, shelf_life_days: 3, last_updated: "1 hour ago" },
          { product_name: "Potatoes", available_quantity: 900, price_per_kg: 19, shelf_life_days: 14, last_updated: "2 hours ago" },
          { product_name: "Onions", available_quantity: 700, price_per_kg: 23, shelf_life_days: 11, last_updated: "1 hour ago" },
          { product_name: "Cabbage", available_quantity: 300, price_per_kg: 16, shelf_life_days: 6, last_updated: "3 hours ago" }
        ]
      },
      {
        id: "m5",
        name: "Whitefield Mandi",
        location: "Whitefield, Bangalore",
        latitude: 12.9698,
        longitude: 77.7499,
        products: [
          { product_name: "Tomatoes", available_quantity: 1000, price_per_kg: 32, shelf_life_days: 6, last_updated: "2 hours ago" },
          { product_name: "Carrots", available_quantity: 600, price_per_kg: 32, shelf_life_days: 8, last_updated: "1 hour ago" },
          { product_name: "Green Beans", available_quantity: 400, price_per_kg: 40, shelf_life_days: 4, last_updated: "30 mins ago" },
          { product_name: "Cauliflower", available_quantity: 450, price_per_kg: 28, shelf_life_days: 7, last_updated: "1 hour ago" }
        ]
      },
      {
        id: "m6",
        name: "Jayanagar 4th Block Market",
        location: "Jayanagar, Bangalore",
        latitude: 12.9250,
        longitude: 77.5937,
        products: [
          { product_name: "Tomatoes", available_quantity: 350, price_per_kg: 27, shelf_life_days: 3, last_updated: "2 hours ago" },
          { product_name: "Spinach", available_quantity: 150, price_per_kg: 24, shelf_life_days: 1, last_updated: "1 hour ago" },
          { product_name: "Potatoes", available_quantity: 800, price_per_kg: 20, shelf_life_days: 13, last_updated: "3 hours ago" },
          { product_name: "Onions", available_quantity: 600, price_per_kg: 25, shelf_life_days: 10, last_updated: "2 hours ago" }
        ]
      }
    ]
  },

  // Scenario 2: Limited supply - only few mandis meet quantity
  scenario2: {
    name: "Limited Supply Situation",
    description: "High demand product. Only 2-3 mandis have sufficient stock. One barely meets requirement.",
    mandis: [
      {
        id: "m7",
        name: "KR Market",
        location: "Krishnarajendra Market, Bangalore",
        latitude: 12.9591,
        longitude: 77.5753,
        products: [
          { product_name: "Tomatoes", available_quantity: 150, price_per_kg: 35, shelf_life_days: 2, last_updated: "1 hour ago" },
          { product_name: "Onions", available_quantity: 250, price_per_kg: 28, shelf_life_days: 8, last_updated: "2 hours ago" },
          { product_name: "Carrots", available_quantity: 505, price_per_kg: 36, shelf_life_days: 5, last_updated: "30 mins ago" }
        ]
      },
      {
        id: "m8",
        name: "Banashankari Market",
        location: "Banashankari, Bangalore",
        latitude: 12.9250,
        longitude: 77.5483,
        products: [
          { product_name: "Tomatoes", available_quantity: 100, price_per_kg: 32, shelf_life_days: 3, last_updated: "1 hour ago" },
          { product_name: "Carrots", available_quantity: 1200, price_per_kg: 32, shelf_life_days: 7, last_updated: "2 hours ago" },
          { product_name: "Green Beans", available_quantity: 180, price_per_kg: 42, shelf_life_days: 3, last_updated: "1 hour ago" }
        ]
      },
      {
        id: "m9",
        name: "HSR Layout Market",
        location: "HSR Layout, Bangalore",
        latitude: 12.9116,
        longitude: 77.6473,
        products: [
          { product_name: "Tomatoes", available_quantity: 80, price_per_kg: 30, shelf_life_days: 2, last_updated: "2 hours ago" },
          { product_name: "Carrots", available_quantity: 600, price_per_kg: 34, shelf_life_days: 6, last_updated: "1 hour ago" },
          { product_name: "Cabbage", available_quantity: 200, price_per_kg: 18, shelf_life_days: 5, last_updated: "3 hours ago" }
        ]
      },
      {
        id: "m10",
        name: "Indiranagar Market",
        location: "Indiranagar, Bangalore",
        latitude: 12.9716,
        longitude: 77.6412,
        products: [
          { product_name: "Tomatoes", available_quantity: 120, price_per_kg: 38, shelf_life_days: 4, last_updated: "1 hour ago" },
          { product_name: "Carrots", available_quantity: 300, price_per_kg: 37, shelf_life_days: 6, last_updated: "2 hours ago" },
          { product_name: "Spinach", available_quantity: 90, price_per_kg: 28, shelf_life_days: 1, last_updated: "30 mins ago" }
        ]
      },
      {
        id: "m11",
        name: "Yelahanka Mandi",
        location: "Yelahanka, Bangalore",
        latitude: 13.1007,
        longitude: 77.5963,
        products: [
          { product_name: "Tomatoes", available_quantity: 90, price_per_kg: 33, shelf_life_days: 3, last_updated: "2 hours ago" },
          { product_name: "Carrots", available_quantity: 850, price_per_kg: 30, shelf_life_days: 8, last_updated: "1 hour ago" },
          { product_name: "Potatoes", available_quantity: 400, price_per_kg: 22, shelf_life_days: 12, last_updated: "3 hours ago" }
        ]
      }
    ]
  },

  // Scenario 3: Many options - shelf life becomes key differentiator
  scenario3: {
    name: "Quality Over Price",
    description: "Many mandis available with similar prices. Shelf life and freshness become deciding factors.",
    mandis: [
      {
        id: "m12",
        name: "KR Market",
        location: "Krishnarajendra Market, Bangalore",
        latitude: 12.9591,
        longitude: 77.5753,
        products: [
          { product_name: "Tomatoes", available_quantity: 700, price_per_kg: 26, shelf_life_days: 2, last_updated: "3 hours ago" },
          { product_name: "Onions", available_quantity: 900, price_per_kg: 23, shelf_life_days: 9, last_updated: "2 hours ago" },
          { product_name: "Potatoes", available_quantity: 1100, price_per_kg: 19, shelf_life_days: 13, last_updated: "4 hours ago" }
        ]
      },
      {
        id: "m13",
        name: "Malleswaram Market",
        location: "Malleswaram, Bangalore",
        latitude: 13.0059,
        longitude: 77.5713,
        products: [
          { product_name: "Tomatoes", available_quantity: 650, price_per_kg: 27, shelf_life_days: 5, last_updated: "30 mins ago" },
          { product_name: "Onions", available_quantity: 850, price_per_kg: 24, shelf_life_days: 11, last_updated: "1 hour ago" },
          { product_name: "Spinach", available_quantity: 300, price_per_kg: 26, shelf_life_days: 2, last_updated: "20 mins ago" }
        ]
      },
      {
        id: "m14",
        name: "Jayanagar 4th Block",
        location: "Jayanagar, Bangalore",
        latitude: 12.9250,
        longitude: 77.5937,
        products: [
          { product_name: "Tomatoes", available_quantity: 550, price_per_kg: 26, shelf_life_days: 4, last_updated: "1 hour ago" },
          { product_name: "Onions", available_quantity: 800, price_per_kg: 23, shelf_life_days: 10, last_updated: "2 hours ago" },
          { product_name: "Carrots", available_quantity: 450, price_per_kg: 31, shelf_life_days: 7, last_updated: "1 hour ago" }
        ]
      },
      {
        id: "m15",
        name: "Shivajinagar Market",
        location: "Shivajinagar, Bangalore",
        latitude: 12.9899,
        longitude: 77.6036,
        products: [
          { product_name: "Tomatoes", available_quantity: 800, price_per_kg: 27, shelf_life_days: 6, last_updated: "45 mins ago" },
          { product_name: "Onions", available_quantity: 1000, price_per_kg: 24, shelf_life_days: 12, last_updated: "1 hour ago" },
          { product_name: "Cauliflower", available_quantity: 400, price_per_kg: 26, shelf_life_days: 8, last_updated: "2 hours ago" }
        ]
      },
      {
        id: "m16",
        name: "Madiwala Market",
        location: "Madiwala, Bangalore",
        latitude: 12.9141,
        longitude: 77.6232,
        products: [
          { product_name: "Tomatoes", available_quantity: 600, price_per_kg: 25, shelf_life_days: 3, last_updated: "2 hours ago" },
          { product_name: "Onions", available_quantity: 750, price_per_kg: 22, shelf_life_days: 9, last_updated: "3 hours ago" },
          { product_name: "Green Beans", available_quantity: 350, price_per_kg: 39, shelf_life_days: 3, last_updated: "1 hour ago" }
        ]
      },
      {
        id: "m17",
        name: "BTM Layout Market",
        location: "BTM Layout, Bangalore",
        latitude: 12.9165,
        longitude: 77.6101,
        products: [
          { product_name: "Tomatoes", available_quantity: 720, price_per_kg: 26, shelf_life_days: 4, last_updated: "1 hour ago" },
          { product_name: "Onions", available_quantity: 880, price_per_kg: 23, shelf_life_days: 10, last_updated: "2 hours ago" },
          { product_name: "Cabbage", available_quantity: 380, price_per_kg: 17, shelf_life_days: 6, last_updated: "1 hour ago" }
        ]
      },
      {
        id: "m18",
        name: "RT Nagar Market",
        location: "RT Nagar, Bangalore",
        latitude: 13.0214,
        longitude: 77.5959,
        products: [
          { product_name: "Tomatoes", available_quantity: 680, price_per_kg: 27, shelf_life_days: 5, last_updated: "30 mins ago" },
          { product_name: "Onions", available_quantity: 820, price_per_kg: 24, shelf_life_days: 11, last_updated: "1 hour ago" },
          { product_name: "Potatoes", available_quantity: 950, price_per_kg: 20, shelf_life_days: 14, last_updated: "2 hours ago" }
        ]
      }
    ]
  }
};
