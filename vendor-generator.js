// Vendor Page Generator Script
// Run this with Node.js to generate new vendor pages

const fs = require("fs");
const path = require("path");

// Vendor configuration with comprehensive SEO data
const vendors = {
  "pizza-hut": {
    name: "Pizza Hut",
    nameAr: "بيتزا هت",
    logo: "Pizza Hut.svg",
    promoCode: "NEW40",
    discount: "40% OFF",
    description: "40% OFF. Exclusive app deal for first-time orders via the Pizza Hut app.",
    descriptionAr: "خصم 40%. عرض حصري للتطبيق للطلبات الأولى عبر تطبيق بيتزا هت",
    expiry: "Dec 31, 2025",
    badge: "App Exclusive",
    category: "Pizza & Italian Food",
    categoryAr: "بيتزا وطعام إيطالي",
    cuisine: "Italian, Pizza, Fast Food",
    cuisineAr: "إيطالي، بيتزا، وجبات سريعة",
    iosApp: "https://apps.apple.com/app/pizza-hut",
    androidApp: "https://play.google.com/store/apps/details?id=com.pizzahut",
    website: "https://pizzahut.com",
    seoKeywords: "pizza hut foodidu, pizza hut code, pizza hut promo, pizza hut promo code, pizza hut discount code, pizza hut coupon, pizza hut deals, pizza hut offers, pizza hut egypt, pizza hut cairo, pizza hut alexandria, pizza hut delivery, pizza hut 40% off, pizza hut first order, pizza hut app exclusive, pizza hut discount, pizza hut coupons, pizza hut codes, pizza hut discounts, pizza hut voucher, pizza hut promotion, pizza hut sale, pizza hut offer, pizza hut deal, pizza hut foodidu pizza hut code pizza hut promo pizza hut promo code, pizza delivery deals, Italian food coupons, fast food offers, pizza coupons Egypt, food delivery Egypt",
    seoKeywordsAr: "بيتزا هت فوديدو، كود بيتزا هت، برومو بيتزا هت، كود خصم بيتزا هت، كوبون بيتزا هت، عروض بيتزا هت، بيتزا هت مصر، بيتزا هت القاهرة، بيتزا هت الإسكندرية، توصيل بيتزا هت، بيتزا هت خصم 40%، بيتزا هت الطلب الأول، بيتزا هت حصري للتطبيق، بيتزا هت خصم، خصومات بيتزا هت، اكواد بيتزا هت، اكواد خصم بيتزا هت، كوبونات بيتزا هت، عروض خصم بيتزا هت، تخفيضات بيتزا هت، خصم بيتزا هت، كود تخفيض بيتزا هت، برومو كود بيتزا هت، كوبون خصم بيتزا هت، عرض بيتزا هت، تخفيض بيتزا هت، خصومات وعروض بيتزا هت، اكواد وخصومات بيتزا هت، كوبونات وعروض بيتزا هت، بيتزا هت فوديدو بيتزا هت كود بيتزا هت برومو بيتزا هت كود خصم، عروض توصيل البيتزا، كوبونات الطعام الإيطالي، عروض الوجبات السريعة، كوبونات البيتزا مصر، توصيل الطعام مصر"
  },
  kfc: {
    name: "KFC",
    nameAr: "كنتاكي",
    logo: "KFC.svg",
    promoCode: "NEW25",
    discount: "25% discount on the first 3 orders",
    description: "25% discount on the first 3 orders. (Term: Not valid with special Tuesday offers).",
    descriptionAr: "خصم 25% على أول 3 طلبات. (الشرط: غير صالح مع عروض الثلاثاء الخاصة)",
    expiry: "Dec 31, 2025",
    badge: "First 3 Orders",
    category: "Fried Chicken & Fast Food",
    categoryAr: "دجاج مقلي ووجبات سريعة",
    cuisine: "American, Fried Chicken, Fast Food",
    cuisineAr: "أمريكي، دجاج مقلي، وجبات سريعة",
    iosApp: "https://apps.apple.com/app/kfc",
    androidApp: "https://play.google.com/store/apps/details?id=com.kfc",
    website: "https://kfc.com",
    seoKeywords: "kfc foodidu, kfc code, kfc promo, kfc promo code, kfc discount code, kfc coupon, kfc deals, kfc offers, kfc egypt, kfc cairo, kfc alexandria, kfc delivery, kfc chicken, kfc 25% off, kfc first 3 orders, kfc discount, kfc coupons, kfc codes, kfc discounts, kfc voucher, kfc promotion, kfc sale, kfc offer, kfc deal, kfc foodidu kfc code kfc promo kfc promo code, fried chicken deals, Kentucky Fried Chicken coupons, fast food deals Egypt, chicken delivery Egypt",
    seoKeywordsAr: "كنتاكي فوديدو، كود كنتاكي، برومو كنتاكي، كود خصم كنتاكي، كوبون كنتاكي، عروض كنتاكي، كنتاكي مصر، كنتاكي القاهرة، كنتاكي الإسكندرية، توصيل كنتاكي، دجاج كنتاكي، كنتاكي خصم 25%، كنتاكي أول 3 طلبات، كنتاكي خصم، خصومات كنتاكي، اكواد كنتاكي، اكواد خصم كنتاكي، كوبونات كنتاكي، عروض خصم كنتاكي، تخفيضات كنتاكي، خصم كنتاكي، كود تخفيض كنتاكي، برومو كود كنتاكي، كوبون خصم كنتاكي، عرض كنتاكي، تخفيض كنتاكي، خصومات وعروض كنتاكي، اكواد وخصومات كنتاكي، كوبونات وعروض كنتاكي، كنتاكي فوديدو كنتاكي كود كنتاكي برومو كنتاكي كود خصم، عروض الدجاج المقلي، كوبونات كنتاكي فرايد تشيكن، عروض الوجبات السريعة مصر، توصيل الدجاج مصر"
  },

  rabbit: {
    name: "Rabbit",
    nameAr: "رابيت",
    logo: "Rabbit.svg",
    promoCode: "RabbitFood4",
    discount: "30% OFF upto 150 EGP",
    description: "Get 30% OFF upto 150 EGP on your first order on Rabbit",
    descriptionAr: "احصل على خصم 30% حتى 150 جنيه على طلبك الأول من رابيت",
    expiry: "Dec 31, 2025",
    badge: "New User",
    category: "Grocery & Food Delivery",
    categoryAr: "بقالة وتوصيل طعام",
    cuisine: "Groceries, Food Delivery, Supermarket",
    cuisineAr: "بقالة، توصيل طعام، سوبر ماركت",
    iosApp: "https://apps.apple.com/eg/app/rabbit-20-mins-delivery/id1588565838",
    androidApp: "https://play.google.com/store/apps/details?id=com.rabbit.mart&hl=en",
    website: "https://www.rabbitmart.com/us/",
    seoKeywords: "rabbit foodidu, rabbit code, rabbit promo, rabbit promo code, rabbit discount code, rabbit coupon, rabbit deals, rabbit offers, rabbit egypt, rabbit cairo, rabbit alexandria, rabbit delivery, rabbit grocery, rabbit food delivery, rabbit app, rabbit website, rabbit 30% off, rabbit first order, rabbit new user, rabbit savings, rabbit discount, rabbit coupons, rabbit codes, rabbit discounts, rabbit voucher, rabbit promotion, rabbit sale, rabbit offer, rabbit deal, rabbit foodidu rabbit code rabbit promo rabbit promo code, grocery delivery deals, supermarket coupons Egypt, food delivery Egypt, 20 minute delivery, fast delivery Egypt",
    seoKeywordsAr: "رابيت فوديدو، كود رابيت، برومو رابيت، كود خصم رابيت، كوبون رابيت، عروض رابيت، رابيت مصر، رابيت القاهرة، رابيت الإسكندرية، توصيل رابيت، بقالة رابيت، توصيل طعام رابيت، تطبيق رابيت، موقع رابيت، رابيت خصم 30%، رابيت الطلب الأول، رابيت مستخدم جديد، توفير رابيت، رابيت خصم، خصومات رابيت، اكواد رابيت، اكواد خصم رابيت، كوبونات رابيت، عروض خصم رابيت، تخفيضات رابيت، خصم رابيت، كود تخفيض رابيت، برومو كود رابيت، كوبون خصم رابيت، عرض رابيت، تخفيض رابيت، خصومات وعروض رابيت، اكواد وخصومات رابيت، كوبونات وعروض رابيت، رابيت فوديدو رابيت كود رابيت برومو رابيت كود خصم، عروض توصيل البقالة، كوبونات السوبر ماركت مصر، توصيل الطعام مصر، توصيل 20 دقيقة، التوصيل السريع مصر"
  },
  senem: {
    name: "Senem",
    nameAr: "سنيم",
    logo: "Senem.svg",
    promoCode: "FOODIDU10",
    discount: "10% OFF on premium groceries",
    description: "Get 10% OFF on premium groceries with Senem",
    descriptionAr: "احصل على خصم 10% على البقالة المميزة مع سنيم",
    expiry: "Dec 31, 2025",
    badge: "New User",
    category: "Premium Grocery Delivery",
    categoryAr: "توصيل بقالة مميز",
    cuisine: "Premium Groceries, Organic Food, Fresh Products",
    cuisineAr: "بقالة مميزة، طعام عضوي، منتجات طازجة",
    iosApp: "https://apps.apple.com/app/senem",
    androidApp: "https://play.google.com/store/apps/details?id=com.senem",
    website: "https://www.senem-eg.com/",
    seoKeywords: "senem foodidu, senem code, senem promo, senem promo code, senem discount code, senem coupon, senem deals, senem offers, senem egypt, senem cairo, senem alexandria, senem delivery, senem grocery, senem premium, senem organic, senem fresh, senem 10% off, senem discount, senem coupons, senem codes, senem discounts, senem voucher, senem promotion, senem sale, senem offer, senem deal, senem foodidu senem code senem promo senem promo code, premium grocery delivery, organic food deals, fresh products Egypt, premium supermarket Egypt, quality groceries Egypt",
    seoKeywordsAr: "سنيم فوديدو، كود سنيم، برومو سنيم، كود خصم سنيم، كوبون سنيم، عروض سنيم، سنيم مصر، سنيم القاهرة، سنيم الإسكندرية، توصيل سنيم، بقالة سنيم، سنيم مميز، سنيم عضوي، سنيم طازج، سنيم خصم 10%، سنيم خصم، خصومات سنيم، اكواد سنيم، اكواد خصم سنيم، كوبونات سنيم، عروض خصم سنيم، تخفيضات سنيم، خصم سنيم، كود تخفيض سنيم، برومو كود سنيم، كوبون خصم سنيم، عرض سنيم، تخفيض سنيم، خصومات وعروض سنيم، اكواد وخصومات سنيم، كوبونات وعروض سنيم، سنيم فوديدو سنيم كود سنيم برومو سنيم كود خصم، توصيل بقالة مميز، عروض الطعام العضوي، منتجات طازجة مصر، سوبر ماركت مميز مصر، بقالة عالية الجودة مصر"
  },
  breadfast: {
    name: "BreadFast",
    nameAr: "بريد فاست",
    logo: "BreadFast.svg",
    promoCode: "SMR",
    discount: "Free delivery on your first order",
    description: "Free delivery on your first order. (Term: Valid for orders of 350 EGP or more).",
    descriptionAr: "توصيل مجاني على طلبك الأول. (الشرط: صالح للطلبات من 350 جنيه أو أكثر)",
    expiry: "Dec 31, 2025",
    badge: "Free Delivery",
    category: "Bakery & Fresh Food",
    categoryAr: "مخبز وطعام طازج",
    cuisine: "Bakery, Fresh Food, Breakfast, Pastries",
    cuisineAr: "مخبز، طعام طازج، إفطار، معجنات",
    iosApp: "https://apps.apple.com/app/breadfast",
    androidApp: "https://play.google.com/store/apps/details?id=com.breadfast",
    website: "https://breadfast.com",
    seoKeywords: "breadfast foodidu, breadfast code, breadfast promo, breadfast promo code, breadfast discount code, breadfast coupon, breadfast deals, breadfast offers, breadfast egypt, breadfast cairo, breadfast alexandria, breadfast delivery, breadfast bakery, breadfast bread, breadfast breakfast, breadfast free delivery, breadfast pastries, breadfast discount, breadfast coupons, breadfast codes, breadfast discounts, breadfast voucher, breadfast promotion, breadfast sale, breadfast offer, breadfast deal, breadfast foodidu breadfast code breadfast promo breadfast promo code, bakery delivery deals, fresh bread Egypt, breakfast delivery, pastry deals Egypt",
    seoKeywordsAr: "بريد فاست فوديدو، كود بريد فاست، برومو بريد فاست، كود خصم بريد فاست، كوبون بريد فاست، عروض بريد فاست، بريد فاست مصر، بريد فاست القاهرة، بريد فاست الإسكندرية، توصيل بريد فاست، مخبز بريد فاست، خبز بريد فاست، إفطار بريد فاست، توصيل مجاني بريد فاست، معجنات بريد فاست، بريد فاست خصم، خصومات بريد فاست، اكواد بريد فاست، اكواد خصم بريد فاست، كوبونات بريد فاست، عروض خصم بريد فاست، تخفيضات بريد فاست، خصم بريد فاست، كود تخفيض بريد فاست، برومو كود بريد فاست، كوبون خصم بريد فاست، عرض بريد فاست، تخفيض بريد فاست، خصومات وعروض بريد فاست، اكواد وخصومات بريد فاست، كوبونات وعروض بريد فاست، بريد فاست فوديدو بريد فاست كود بريد فاست برومو بريد فاست كود خصم، عروض توصيل المخبز، خبز طازج مصر، توصيل الإفطار، عروض المعجنات مصر"
  },
  "just-smash-burger": {
    name: "Just Smash Burger",
    nameAr: "جست سماش برجر",
    logo: "just-smash-burger.png",
    promoCode: "AUTO10",
    discount: "10% cashback on all orders",
    description: "10% cashback on all orders from the website or application.",
    descriptionAr: "استرداد نقدي 10% على جميع الطلبات من الموقع أو التطبيق",
    expiry: "Dec 31, 2025",
    badge: "Automatic Offer",
    category: "Burgers & Fast Food",
    categoryAr: "برجر ووجبات سريعة",
    cuisine: "American, Burgers, Fast Food",
    cuisineAr: "أمريكي، برجر، وجبات سريعة",
    iosApp: "https://apps.apple.com/app/just-smash-burger",
    androidApp: "https://play.google.com/store/apps/details?id=com.justsmashburger",
    website: "https://justsmashburger.com",
    isAutomatic: true,
    seoKeywords: "just smash burger foodidu, just smash burger code, just smash burger promo, just smash burger cashback, just smash burger 10%, just smash burger automatic offer, just smash burger egypt, just smash burger cairo, just smash burger alexandria, burger delivery, smash burger deals, burger cashback, fast food cashback Egypt",
    seoKeywordsAr: "جست سماش برجر فوديدو، جست سماش برجر كود، جست سماش برجر برومو، جست سماش برجر استرداد نقدي، جست سماش برجر 10%، جست سماش برجر عرض تلقائي، جست سماش برجر مصر، جست سماش برجر القاهرة، جست سماش برجر الإسكندرية، توصيل برجر، عروض سماش برجر، استرداد نقدي برجر، استرداد نقدي وجبات سريعة مصر"
  },
  "butchers-burger": {
    name: "Butcher's Burger",
    nameAr: "بوتشرز برجر",
    logo: "butchers-burger.png",
    promoCode: "WELCOME200",
    discount: "200 EGP Welcome Gift",
    description: "200 EGP 'Welcome Gift' on your online order.",
    descriptionAr: "هدية ترحيب 200 جنيه على طلبك الإلكتروني",
    expiry: "Dec 31, 2025",
    badge: "Automatic Offer",
    category: "Burgers & Fast Food",
    categoryAr: "برجر ووجبات سريعة",
    cuisine: "American, Burgers, Gourmet",
    cuisineAr: "أمريكي، برجر، جورميه",
    iosApp: "https://apps.apple.com/app/butchers-burger",
    androidApp: "https://play.google.com/store/apps/details?id=com.butchersburger",
    website: "https://butchersburger.com",
    isAutomatic: true,
    seoKeywords: "butchers burger foodidu, butchers burger code, butchers burger promo, butchers burger welcome gift, butchers burger 200 egp, butchers burger automatic offer, butchers burger egypt, butchers burger cairo, butchers burger alexandria, gourmet burger delivery, butchers burger deals, burger welcome gift Egypt",
    seoKeywordsAr: "بوتشرز برجر فوديدو، بوتشرز برجر كود، بوتشرز برجر برومو، بوتشرز برجر هدية ترحيب، بوتشرز برجر 200 جنيه، بوتشرز برجر عرض تلقائي، بوتشرز برجر مصر، بوتشرز برجر القاهرة، بوتشرز برجر الإسكندرية، توصيل برجر جورميه، عروض بوتشرز برجر، هدية ترحيب برجر مصر"
  },
  "mini-beirut": {
    name: "Mini Beirut",
    nameAr: "ميني بيروت",
    logo: "mini-beirut.png",
    promoCode: "AUTO15",
    discount: "15% discount",
    description: "15% discount when ordering directly from the Mini Beirut website.",
    descriptionAr: "خصم 15% عند الطلب مباشرة من موقع ميني بيروت",
    expiry: "Dec 31, 2025",
    badge: "Automatic Offer",
    category: "Lebanese & Middle Eastern",
    categoryAr: "لبناني وشرق أوسطي",
    cuisine: "Lebanese, Middle Eastern, Mediterranean",
    cuisineAr: "لبناني، شرق أوسطي، متوسطي",
    iosApp: "https://apps.apple.com/app/mini-beirut",
    androidApp: "https://play.google.com/store/apps/details?id=com.minibeirut",
    website: "https://minibeirut.com",
    isAutomatic: true,
    seoKeywords: "mini beirut foodidu, mini beirut code, mini beirut promo, mini beirut 15% off, mini beirut automatic offer, mini beirut egypt, mini beirut cairo, mini beirut alexandria, lebanese food delivery, middle eastern food, mediterranean cuisine Egypt",
    seoKeywordsAr: "ميني بيروت فوديدو، ميني بيروت كود، ميني بيروت برومو، ميني بيروت خصم 15%، ميني بيروت عرض تلقائي، ميني بيروت مصر، ميني بيروت القاهرة، ميني بيروت الإسكندرية، توصيل طعام لبناني، طعام شرق أوسطي، مطبخ متوسطي مصر"
  },
  "my-buffalo": {
    name: "My Buffalo",
    nameAr: "ماي بافلو",
    logo: "my-buffalo.png",
    promoCode: "APPONLY",
    discount: "App Exclusive Deals",
    description: "Download the My Buffalo App for exclusive deals and offers.",
    descriptionAr: "حمل تطبيق ماي بافلو للحصول على عروض وخصومات حصرية",
    expiry: "Dec 31, 2025",
    badge: "App Promotion",
    category: "Wings & American Food",
    categoryAr: "أجنحة وطعام أمريكي",
    cuisine: "American, Wings, Fast Food",
    cuisineAr: "أمريكي، أجنحة، وجبات سريعة",
    iosApp: "https://apps.apple.com/app/my-buffalo",
    androidApp: "https://play.google.com/store/apps/details?id=com.mybuffalo",
    website: "https://mybuffalo.com",
    isAppPromotion: true,
    seoKeywords: "my buffalo foodidu, my buffalo app, my buffalo promo, my buffalo exclusive deals, my buffalo egypt, my buffalo cairo, my buffalo alexandria, buffalo wings delivery, american food delivery, wings restaurant Egypt",
    seoKeywordsAr: "ماي بافلو فوديدو، ماي بافلو تطبيق، ماي بافلو برومو، ماي بافلو عروض حصرية، ماي بافلو مصر، ماي بافلو القاهرة، ماي بافلو الإسكندرية، توصيل أجنحة بافلو، توصيل طعام أمريكي، مطعم أجنحة مصر"
  },
  "abu-auf": {
    name: "Abu Auf",
    nameAr: "أبو عوف",
    logo: "abu_auf.svg",
    promoCode: "ABUAUF20",
    discount: "20% OFF First Order",
    description: "Get 20% OFF on your first order from Abu Auf premium nuts and dried fruits.",
    descriptionAr: "احصل على خصم 20% على طلبك الأول من أبو عوف للمكسرات والفواكه المجففة المميزة",
    expiry: "Dec 31, 2025",
    badge: "New User",
    category: "Nuts & Dried Fruits",
    categoryAr: "مكسرات وفواكه مجففة",
    cuisine: "Nuts, Dried Fruits, Healthy Snacks",
    cuisineAr: "مكسرات، فواكه مجففة، وجبات خفيفة صحية",
    iosApp: "https://apps.apple.com/eg/app/abu-auf/id123456793",
    androidApp: "https://play.google.com/store/apps/details?id=com.abuauf.eg",
    website: "https://www.abuauf.com.eg/",
    seoKeywords: "abu auf foodidu, abu auf code, abu auf promo, abu auf promo code, abu auf discount code, abu auf coupon, abu auf deals, abu auf offers, abu auf egypt, abu auf cairo, abu auf alexandria, abu auf delivery, abu auf nuts, abu auf dried fruits, abu auf 20% off, nuts delivery Egypt, healthy snacks Egypt",
    seoKeywordsAr: "أبو عوف فوديدو، كود أبو عوف، برومو أبو عوف، كود خصم أبو عوف، كوبون أبو عوف، عروض أبو عوف، أبو عوف مصر، أبو عوف القاهرة، أبو عوف الإسكندرية، توصيل أبو عوف، مكسرات أبو عوف، فواكه مجففة أبو عوف، أبو عوف خصم 20%، توصيل مكسرات مصر، وجبات خفيفة صحية مصر"
  }

};

// HTML template with comprehensive SEO
function generateHTML(vendorKey, vendor) {
  return `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Primary Meta Tags -->
    <title>${vendor.name} Promo Codes & Discounts - ${vendor.discount} | Foodidu Egypt</title>
    <meta name="title" content="${vendor.name} Promo Codes & Discounts - ${vendor.discount} | Foodidu Egypt">
    <meta name="description" content="Get exclusive ${vendor.name} promo codes and save with ${vendor.discount}. Verified discount codes for ${vendor.category} delivery in Egypt. Free ${vendor.name} coupons at Foodidu.">
    <meta name="keywords" content="${vendor.seoKeywords}">
    <meta name="author" content="Foodidu">
    <meta name="robots" content="index, follow">
    <meta name="language" content="English">
    <meta name="revisit-after" content="7 days">
    
    <!-- Arabic Meta Tags -->
    <meta name="description" lang="ar" content="احصل على كوبونات ${vendor.nameAr} الحصرية ووفر مع ${vendor.descriptionAr}. كوبونات خصم موثقة لتوصيل ${vendor.categoryAr} في مصر. كوبونات ${vendor.nameAr} مجانية في فوديدو.">
    <meta name="keywords" lang="ar" content="${vendor.seoKeywordsAr}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Foodidu">
    <meta property="og:title" content="${vendor.name} Promo Codes - ${vendor.discount} | Foodidu">
    <meta property="og:description" content="Exclusive ${vendor.name} promo codes and deals. Save with ${vendor.discount} on ${vendor.category}. Verified discount codes for food delivery in Egypt.">
    <meta property="og:image" content="https://foodidu.com/images/${vendor.logo}">
    <meta property="og:image:alt" content="${vendor.name} Logo - Promo Codes at Foodidu">
    <meta property="og:url" content="https://foodidu.com/${vendorKey}">
    <meta property="og:locale" content="en_US">
    <meta property="og:locale:alternate" content="ar_EG">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:site" content="@Foodidu">
    <meta property="twitter:creator" content="@Foodidu">
    <meta property="twitter:title" content="${vendor.name} Promo Codes - ${vendor.discount} | Foodidu">
    <meta property="twitter:description" content="Get exclusive ${vendor.name} promo codes. Save with ${vendor.discount} on food delivery in Egypt.">
    <meta property="twitter:image" content="https://foodidu.com/images/${vendor.logo}">
    
    <!-- Additional SEO Meta Tags -->
    <meta name="theme-color" content="#ffe082">
    <meta name="msapplication-TileColor" content="#ffe082">
    <meta name="application-name" content="Foodidu">
    <meta name="apple-mobile-web-app-title" content="Foodidu">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    
    <!-- Geo Tags -->
    <meta name="geo.region" content="EG">
    <meta name="geo.placename" content="Egypt">
    <meta name="geo.position" content="26.8206;30.8025">
    <meta name="ICBM" content="26.8206, 30.8025">
    
    <!-- Business/Local SEO -->
    <meta name="business:contact_data:locality" content="Cairo">
    <meta name="business:contact_data:region" content="Cairo Governorate">
    <meta name="business:contact_data:country_name" content="Egypt">
    
    <!-- Structured Data for Rich Snippets -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "${vendor.name} Promo Codes - Foodidu",
      "description": "Get exclusive ${vendor.name} promo codes and save with ${vendor.discount}",
      "url": "https://foodidu.com/${vendorKey}",
      "mainEntity": {
        "@type": "Offer",
        "name": "${vendor.name} ${vendor.discount}",
        "description": "${vendor.description}",
        "seller": {
          "@type": "Organization",
          "name": "${vendor.name}"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "EGP"
        },
        "validThrough": "${vendor.expiry}",
        "category": "${vendor.category}",
        "areaServed": {
          "@type": "Country",
          "name": "Egypt"
        }
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://foodidu.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Vendors",
            "item": "https://foodidu.com/#vendors"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "${vendor.name}",
            "item": "https://foodidu.com/${vendorKey}"
          }
        ]
      },
      "publisher": {
        "@type": "Organization",
        "name": "Foodidu",
        "logo": {
          "@type": "ImageObject",
          "url": "https://foodidu.com/images/Logo.svg"
        }
      }
    }
    </script>
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://foodidu.com/${vendorKey}">
    
    <!-- Alternate Language Pages -->
    <link rel="alternate" hreflang="en" href="https://foodidu.com/${vendorKey}">
    <link rel="alternate" hreflang="ar" href="https://foodidu.com/${vendorKey}">
    <link rel="alternate" hreflang="x-default" href="https://foodidu.com/${vendorKey}">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="../images/Logo.svg">
    <link rel="apple-touch-icon" href="../images/Logo.svg">
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="../Rabbit-PromoCode/vendor-page.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="logo">
                <a href="../index.html">
                    <img src="../images/Logo-Text.svg" alt="Foodidu Logo"
                         style="height:80px; width:auto; object-fit:contain; margin-right:0.7rem; vertical-align:middle; box-shadow:0 2px 16px rgba(0,0,0,0.07); background:none; border-radius:32px; border: 3px solid #ffe082; transition: box-shadow 0.2s;">
                </a>
            </div>
            <ul class="nav-menu">
                <li><a href="../index.html">Home</a></li>
                <li><a href="../index.html#discover">Discover</a></li>
                <li><a href="../index.html#deals">Deals</a></li>
                <li><a href="../index.html#promo">Promo Codes</a></li>
                <li><a href="../index.html#vendors">Vendors</a></li>
                <li><a href="../index.html#contact">Contact</a></li>
            </ul>
            <div class="hamburger" onclick="toggleMenu()">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <!-- Vendor Page Content -->
    <main class="vendor-page">
        <div class="container">
            <!-- Vendor Logo Section -->
            <section class="vendor-header">
                <div class="vendor-logo-container">
                    <img src="../images/${vendor.logo}" alt="${vendor.name} Logo" class="vendor-logo clean-logo">
                </div>
                <h1 class="vendor-name">${vendor.name}</h1>
                <p class="vendor-description">Get exclusive promo codes and save on your ${vendor.name} orders</p>
            </section>

            <!-- Promo Code Section -->
            <section class="promo-section">
                <div class="promo-card-large">
                    <div class="promo-header">
                        <h2>Exclusive Promo Code</h2>
                        <div class="promo-badge">${vendor.badge}</div>
                    </div>
                    <div class="promo-code-display">
                        <span class="promo-code" id="promoCode">${vendor.promoCode}</span>
                        <button class="copy-btn" onclick="copyPromoCode('${vendor.promoCode}')">
                            <i class="fas fa-copy"></i>
                            Copy Code
                        </button>
                    </div>
                    <p class="promo-instruction">Use this code on ${vendor.name} App or Website</p>
                    <div class="promo-details">
                        <div class="promo-discount">${vendor.discount}</div>
                        <div class="promo-expiry">Expires: ${vendor.expiry}</div>
                    </div>
                </div>
            </section>

            <!-- Download Buttons Section -->
            <section class="download-section">
                <h2>Download Apps</h2>
                
                <!-- Foodidu App -->
                <div class="app-group">
                    <h3>Foodidu App</h3>
                    <p>Get more promo codes and discover hidden gems</p>
                    <div class="download-buttons">
                        <a href="#" class="download-btn app-store" onclick="downloadApp('ios')">
                            <i class="fab fa-apple"></i>
                            <div class="btn-text">
                                <span class="small">Download on the</span>
                                <span class="large">App Store</span>
                            </div>
                        </a>
                        <a href="#" class="download-btn google-play" onclick="downloadApp('android')">
                            <i class="fab fa-google-play"></i>
                            <div class="btn-text">
                                <span class="small">Get it on</span>
                                <span class="large">Google Play</span>
                            </div>
                        </a>
                    </div>
                </div>

                <!-- Vendor App & Website -->
                <div class="app-group">
                    <h3>${vendor.name} App & Website</h3>
                    <p>Order directly from ${vendor.name}</p>
                    <div class="download-buttons">
                        <a href="#" class="download-btn app-store" onclick="openVendorApp('${vendorKey}', 'ios')">
                            <i class="fab fa-apple"></i>
                            <div class="btn-text">
                                <span class="small">Download on the</span>
                                <span class="large">App Store</span>
                            </div>
                        </a>
                        <a href="#" class="download-btn google-play" onclick="openVendorApp('${vendorKey}', 'android')">
                            <i class="fab fa-google-play"></i>
                            <div class="btn-text">
                                <span class="small">Get it on</span>
                                <span class="large">Google Play</span>
                            </div>
                        </a>
                        <a href="#" class="download-btn website" onclick="openVendorWebsite('${vendorKey}')">
                            <i class="fas fa-globe"></i>
                            <div class="btn-text">
                                <span class="small">Visit</span>
                                <span class="large">Website</span>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            <!-- Back to Home -->
            <section class="back-section">
                <a href="../index.html" class="back-btn">
                    <i class="fas fa-arrow-left"></i>
                    Back to Foodidu
                </a>
            </section>
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-logo">
                    <img src="../images/Logo-Text.svg" alt="Foodidu Logo" style="height: 40px;">
                </div>
                <p>&copy; 2024 Foodidu. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- JavaScript -->
    <script src="../script.js"></script>
    <script>
        // ${vendor.name} specific JavaScript
        function copyPromoCode(code) {
            navigator.clipboard.writeText(code).then(function() {
                const copyBtn = document.querySelector('.copy-btn');
                const originalText = copyBtn.innerHTML;
                
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                copyBtn.classList.add('copied');
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                    copyBtn.classList.remove('copied');
                }, 2000);
                
                showNotification('Promo code copied to clipboard!', 'success');
            }).catch(function(err) {
                console.error('Failed to copy: ', err);
                showNotification('Failed to copy code. Please try again.', 'error');
            });
        }

        function downloadApp(platform) {
            let url = '';
            if (platform === 'ios') {
                url = 'https://apps.apple.com/app/foodidu';
            } else if (platform === 'android') {
                url = 'https://play.google.com/store/apps/details?id=com.foodidu';
            }
            if (url) window.open(url, '_blank');
        }

        function openVendorApp(vendor, platform) {
            const vendorApps = {
                '${vendorKey}': {
                    ios: '${vendor.iosApp}',
                    android: '${vendor.androidApp}'
                }
            };
            
            const url = vendorApps[vendor] && vendorApps[vendor][platform];
            if (url) window.open(url, '_blank');
        }

        function openVendorWebsite(vendor) {
            const vendorWebsites = {
                '${vendorKey}': '${vendor.website}'
            };
            
            const url = vendorWebsites[vendor];
            if (url) window.open(url, '_blank');
        }

        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = \`notification \${type}\`;
            notification.innerHTML = \`
                <div class="notification-content">
                    <i class="fas fa-\${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                    <span>\${message}</span>
                </div>
            \`;
            
            notification.style.cssText = \`
                position: fixed; top: 20px; right: 20px;
                background: \${type === 'success' ? '#059669' : type === 'error' ? '#dc2626' : '#3b82f6'};
                color: white; padding: 15px 20px; border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); z-index: 10000;
                animation: slideInRight 0.3s ease; max-width: 300px;
            \`;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => document.body.removeChild(notification), 300);
            }, 3000);
        }

        function toggleMenu() {
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        }

        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = \`
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification-content { display: flex; align-items: center; gap: 10px; }
        \`;
        document.head.appendChild(style);
    </script>
</body>
</html>`;
}

// Generate vendor pages
function generateVendorPages() {
  const publicDir = path.join(__dirname, "public");

  Object.entries(vendors).forEach(([vendorKey, vendor]) => {
    const vendorDir = path.join(publicDir, vendorKey);

    // Create vendor directory if it doesn't exist
    if (!fs.existsSync(vendorDir)) {
      fs.mkdirSync(vendorDir, { recursive: true });
    }

    // Generate HTML file
    const htmlContent = generateHTML(vendorKey, vendor);
    const htmlPath = path.join(vendorDir, "index.html");

    fs.writeFileSync(htmlPath, htmlContent, "utf8");
    console.log(`✅ Generated: ${vendorKey}/index.html`);
  });

  console.log("\\n🎉 All vendor pages generated successfully!");
  console.log("\\n📁 Generated pages:");
  Object.keys(vendors).forEach((vendorKey) => {
    console.log(`   • foodidu.com/${vendorKey}`);
  });
}

// Run the generator
if (require.main === module) {
  generateVendorPages();
}

module.exports = { generateVendorPages, vendors };
