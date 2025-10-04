// Sample Data
export const dealsData = [
    {
        id: 1, restaurant: "Mario's Pizza Palace", cuisine: "pizza", title: "Buy 1 Get 1 Free Pizza",
        description: "Get a free pizza of equal or lesser value with any large pizza purchase",
        discount: "50%", validity: "Valid until Dec 31, 2024", location: "Downtown", price: 15.99, icon: "🍕", featured: true
    },
    {
        id: 2, restaurant: "Burger Junction", cuisine: "burger", title: "20% Off All Burgers",
        description: "Discount on all premium burger combos and family meals",
        discount: "20%", validity: "Valid until Dec 25, 2024", location: "Midtown", price: 12.99, icon: "🍔", featured: false
    },
    {
        id: 3, restaurant: "Coffee Corner", cuisine: "coffee", title: "Free Coffee with Pastry",
        description: "Buy any pastry and get coffee for free - perfect morning combo",
        discount: "Buy1Get1", validity: "Valid until Jan 15, 2025", location: "Uptown", price: 8.99, icon: "☕", featured: true
    },
    {
        id: 4, restaurant: "Dragon Palace", cuisine: "chinese", title: "30% Off Family Meals",
        description: "Perfect for family dinners and gatherings - serves 4-6 people",
        discount: "30%", validity: "Valid until Jan 10, 2025", location: "Chinatown", price: 25.99, icon: "🥡", featured: false
    },
    {
        id: 5, restaurant: "Spice Garden", cuisine: "indian", title: "15% Off Lunch Buffet",
        description: "All-you-can-eat lunch buffet with authentic Indian cuisine",
        discount: "15%", validity: "Valid until Dec 28, 2024", location: "Little India", price: 18.99, icon: "🍛", featured: true
    },
    {
        id: 6, restaurant: "Taco Fiesta", cuisine: "mexican", title: "Taco Tuesday Special",
        description: "Buy 2 tacos get 1 free every Tuesday",
        discount: "33%", validity: "Every Tuesday", location: "South Side", price: 9.99, icon: "🌮", featured: false
    },
    {
        id: 7, restaurant: "Pasta Paradise", cuisine: "italian", title: "Wine & Dine Combo",
        description: "Free glass of wine with any pasta dish",
        discount: "25%", validity: "Valid until Jan 5, 2025", location: "Little Italy", price: 22.99, icon: "🍝", featured: true
    },
    {
        id: 8, restaurant: "Sushi Zen", cuisine: "japanese", title: "Happy Hour Sushi",
        description: "50% off all sushi rolls from 3-6 PM",
        discount: "50%", validity: "Daily 3-6 PM", location: "Downtown", price: 16.99, icon: "🍣", featured: false
    }
];

export const restaurantsData = [
    {
        id: 1,
        name: "Mario's Pizza Palace",
        cuisine: "Italian • Pizza",
        category: "fast-food",
        rating: 4.5,
        location: "Downtown",
        icon: "🍕",
        specialties: ["Wood-fired pizza", "Fresh ingredients", "Family recipes"]
    },
    {
        id: 2,
        name: "Hidden Gem Café",
        cuisine: "Café • Local",
        category: "local-gems",
        rating: 4.8,
        location: "Old Quarter",
        icon: "☕",
        specialties: ["Artisan coffee", "Homemade pastries", "Cozy atmosphere"]
    },
    {
        id: 3,
        name: "Fresh & Fit",
        cuisine: "Healthy • Salads",
        category: "healthy",
        rating: 4.6,
        location: "Health District",
        icon: "🥗",
        specialties: ["Organic ingredients", "Custom bowls", "Protein options"]
    },
    {
        id: 4,
        name: "Sweet Treats",
        cuisine: "Desserts • Bakery",
        category: "dessert",
        rating: 4.7,
        location: "Market Street",
        icon: "🧁",
        specialties: ["Custom cakes", "Fresh daily", "Sugar-free options"]
    },
    {
        id: 5,
        name: "Burger Junction",
        cuisine: "American • Burgers",
        category: "fast-food",
        rating: 4.3,
        location: "Midtown",
        icon: "🍔",
        specialties: ["Gourmet burgers", "Hand-cut fries", "Craft beer"]
    },
    {
        id: 6,
        name: "Coffee Corner",
        cuisine: "Coffee • Café",
        category: "coffee",
        rating: 4.4,
        location: "Uptown",
        icon: "☕",
        specialties: ["Single origin", "Latte art", "Free WiFi"]
    },
    {
        id: 7,
        name: "Le Petit Bistro",
        cuisine: "French • Fine Dining",
        category: "fine-dining",
        rating: 4.9,
        location: "French Quarter",
        icon: "🥐",
        specialties: ["Authentic French", "Wine pairing", "Romantic setting"]
    },
    {
        id: 8,
        name: "Noodle House",
        cuisine: "Asian • Noodles",
        category: "fast-food",
        rating: 4.2,
        location: "Asia Town",
        icon: "🍜",
        specialties: ["Hand-pulled noodles", "Spicy broths", "Quick service"]
    }
];

export const promoCodesData = [
    {
        id: 1,
        brand: "Rabbit",
        category: "delivery",
        code: "RabbitFood4",
        discount: "30% OFF upto 150 EGP",
        expiry: "Dec 31, 2025",
        logo: "images/Rabbit.png",
        description: "Get 30% OFF upto 150 EGP on your first order on Rabbit",
        featured: true
    },
    {
        id: 2,
        brand: "Senem",
        category: "delivery",
        code: "FOODIDU10",
        discount: "10% Off Your Order",
        expiry: "Dec 31, 2025",
        logo: "images/senem.webp",
        description: "Premium grocery delivery with exclusive discount",
        featured: true
    },
    {
        id: 3,
        brand: "BreadFast",
        category: "delivery",
        code: "SMR",
        discount: "Free Delivery",
        expiry: "Dec 31, 2025",
        logo: "images/Breadfast.svg",
        description: "Free Delivery on first order above 350 LE"
    },
    {
        id: 4,
        brand: "Pizza Hut",
        category: "fast-food",
        code: "NEW40",
        discount: "40% Off First Order",
        expiry: "Dec 31, 2025",
        logo: "images/Pizza Hut.svg",
        description: "40% Off first order on the Pizza Hut app"
    },
    {
        id: 5,
        brand: "MINI Berit",
        category: "bakery",
        code: "MINI25",
        discount: "25% Off Lebanese Pastries",
        expiry: "Oct 31, 2025",
        logo: "MB",
        description: "Get 25% off on all Lebanese pastries"
    },
    {
        id: 6,
        brand: "KFC",
        category: "fast-food",
        code: "KFCBOX",
        discount: "30% Off Family Boxes",
        expiry: "Nov 15, 2025",
        logo: "images/KFC.svg",
        description: "Save 30% on all family meal boxes"
    },
    {
        id: 7,
        brand: "Gourment",
        category: "fine-dining",
        code: "GOURM50",
        discount: "50% Off Second Main Course",
        expiry: "Oct 1, 2025",
        logo: "GM",
        description: "Buy one main course, get 50% off the second"
    },
    {
        id: 8,
        brand: "CILANTRO",
        category: "coffee",
        code: "CILAN2",
        discount: "Buy 1 Get 1 Free Coffee",
        expiry: "Dec 15, 2025",
        logo: "images/CILANTRO.png",
        description: "Free coffee with any coffee purchase"
    },
    {
        id: 9,
        brand: "BURGER KING",
        category: "fast-food",
        code: "WHOPPER",
        discount: "35% Off Whopper Meals",
        expiry: "Nov 30, 2025",
        logo: "images/Burger King.svg",
        description: "Save on all Whopper meal combinations"
    },
    {
        id: 10,
        brand: "BUFFALO BURGER",
        category: "fast-food",
        code: "BUFF45",
        discount: "45% Off First Order",
        expiry: "Oct 15, 2025",
        logo: "images/BUFFALO BURGER.png",
        description: "Save 45% on your first Buffalo Burger order"
    },
    {
        id: 11,
        brand: "Zumra Food",
        category: "healthy",
        code: "HEALTHY",
        discount: "20% Off Healthy Meals",
        expiry: "Dec 31, 2025",
        logo: "images/zumrafood.png",
        description: "20% discount on all healthy meal plans"
    },
    {
        id: 12,
        brand: "Starbucks",
        category: "coffee",
        code: "STARBUCKS",
        discount: "Buy 1 Get 1 Free Coffee",
        expiry: "Dec 31, 2025",
        logo: "images/starbucks.png",
        description: "Free coffee with any coffee purchase"
    }
];