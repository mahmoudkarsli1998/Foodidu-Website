// SEO Enhancement Script for Foodidu Vendor Pages
// This script adds comprehensive SEO meta tags to all vendor pages

const fs = require("fs");
const path = require("path");

// Enhanced SEO data for all vendors
const seoData = {
  "pizza-hut": {
    titleAr: "كوبونات بيتزا هت وخصومات - خصم 40% على الطلب الأول | فوديدو مصر",
    descriptionAr:
      "احصل على كوبونات بيتزا هت الحصرية ووفر خصم 40% على الطلب الأول. كوبونات خصم موثقة لتوصيل البيتزا والطعام الإيطالي في مصر.",
    localKeywords:
      "pizza delivery Cairo, pizza delivery Alexandria, pizza delivery Giza, pizza delivery New Cairo, pizza delivery Maadi, pizza delivery Zamalek",
    localKeywordsAr:
      "توصيل بيتزا القاهرة، توصيل بيتزا الإسكندرية، توصيل بيتزا الجيزة، توصيل بيتزا القاهرة الجديدة، توصيل بيتزا المعادي، توصيل بيتزا الزمالك",
  },
  kfc: {
    titleAr:
      "كوبونات كنتاكي وخصومات - خصم 30% على الصناديق العائلية | فوديدو مصر",
    descriptionAr:
      "احصل على كوبونات كنتاكي الحصرية ووفر خصم 30% على الصناديق العائلية. كوبونات خصم موثقة للدجاج المقلي والوجبات السريعة في مصر.",
    localKeywords:
      "KFC delivery Cairo, KFC delivery Alexandria, fried chicken delivery Egypt, family meals Egypt, Kentucky Fried Chicken Egypt",
    localKeywordsAr:
      "توصيل كنتاكي القاهرة، توصيل كنتاكي الإسكندرية، توصيل الدجاج المقلي مصر، الوجبات العائلية مصر، كنتاكي فرايد تشيكن مصر",
  },
  "burger-king": {
    titleAr:
      "كوبونات برجر كينج وخصومات - خصم 15% على وجبة الواوبر | فوديدو مصر",
    descriptionAr:
      "احصل على كوبونات برجر كينج الحصرية ووفر خصم 15% على وجبات الواوبر. كوبونات خصم موثقة للبرجر والوجبات السريعة في مصر.",
    localKeywords:
      "Burger King delivery Cairo, Whopper delivery Egypt, burger delivery Alexandria, American food Egypt, fast food Egypt",
    localKeywordsAr:
      "توصيل برجر كينج القاهرة، توصيل الواوبر مصر، توصيل البرجر الإسكندرية، الطعام الأمريكي مصر، الوجبات السريعة مصر",
  },
  starbucks: {
    titleAr:
      "كوبونات ستاربكس وخصومات - اشتري واحدة واحصل على أخرى مجاناً | فوديدو مصر",
    descriptionAr:
      "احصل على كوبونات ستاربكس الحصرية مع عرض اشتري قهوة واحصل على أخرى مجاناً. كوبونات خصم موثقة للقهوة والمشروبات في مصر.",
    localKeywords:
      "Starbucks delivery Cairo, coffee delivery Egypt, Starbucks Alexandria, coffee deals Egypt, beverage delivery Egypt",
    localKeywordsAr:
      "توصيل ستاربكس القاهرة، توصيل القهوة مصر، ستاربكس الإسكندرية، عروض القهوة مصر، توصيل المشروبات مصر",
  },
  rabbit: {
    titleAr: "كوبونات رابيت وخصومات - خصم 25% على الطلب الأول | فوديدو مصر",
    descriptionAr:
      "احصل على كوبونات رابيت الحصرية ووفر خصم 25% على الطلب الأول. توصيل البقالة في 20 دقيقة مع كوبونات خصم موثقة في مصر.",
    localKeywords:
      "Rabbit delivery Cairo, grocery delivery Egypt, 20 minute delivery, supermarket delivery Alexandria, fast grocery Egypt",
    localKeywordsAr:
      "توصيل رابيت القاهرة، توصيل البقالة مصر، توصيل 20 دقيقة، توصيل السوبر ماركت الإسكندرية، بقالة سريعة مصر",
  },
  senem: {
    titleAr: "كوبونات سنيم وخصومات - خصم 20% على الطلب الأول | فوديدو مصر",
    descriptionAr:
      "احصل على كوبونات سنيم الحصرية ووفر خصم 20% على الطلب الأول. توصيل بقالة مميز مع منتجات عضوية وطازجة في مصر.",
    localKeywords:
      "Senem delivery Cairo, premium grocery Egypt, organic food delivery, fresh products Egypt, quality groceries Alexandria",
    localKeywordsAr:
      "توصيل سنيم القاهرة، بقالة مميزة مصر، توصيل طعام عضوي، منتجات طازجة مصر، بقالة عالية الجودة الإسكندرية",
  },
  breadfast: {
    titleAr: "كوبونات بريد فاست وخصومات - توصيل مجاني | فوديدو مصر",
    descriptionAr:
      "احصل على كوبونات بريد فاست الحصرية مع توصيل مجاني. كوبونات خصم موثقة للمخبز والطعام الطازج والإفطار في مصر.",
    localKeywords:
      "BreadFast delivery Cairo, bakery delivery Egypt, fresh bread Alexandria, breakfast delivery Egypt, pastry delivery Egypt",
    localKeywordsAr:
      "توصيل بريد فاست القاهرة، توصيل المخبز مصر، خبز طازج الإسكندرية، توصيل الإفطار مصر، توصيل المعجنات مصر",
  },
};

// Additional SEO meta tags template
function generateAdditionalSEO(vendorKey, vendor) {
  const seo = seoData[vendorKey] || {};

  return `
    <!-- Enhanced Local SEO -->
    <meta name="geo.region" content="EG-C">
    <meta name="geo.placename" content="Cairo, Egypt">
    <meta name="geo.position" content="30.0444;31.2357">
    <meta name="ICBM" content="30.0444, 31.2357">
    
    <!-- Additional Arabic SEO -->
    <meta name="title" lang="ar" content="${
      seo.titleAr || vendor.nameAr + " كوبونات وخصومات | فوديدو مصر"
    }">
    <meta name="description" lang="ar" content="${
      seo.descriptionAr ||
      "احصل على كوبونات " + vendor.nameAr + " الحصرية في فوديدو مصر"
    }">
    
    <!-- Local Business Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Foodidu",
      "description": "Food delivery and promo codes platform in Egypt",
      "url": "https://foodidu.com",
      "telephone": "+20-xxx-xxx-xxxx",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Cairo",
        "addressRegion": "Cairo Governorate",
        "addressCountry": "EG"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 30.0444,
        "longitude": 31.2357
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Cairo"
        },
        {
          "@type": "City", 
          "name": "Alexandria"
        },
        {
          "@type": "City",
          "name": "Giza"
        }
      ],
      "serviceType": "Food Delivery Platform",
      "priceRange": "Free"
    }
    </script>
    
    <!-- FAQ Schema for SEO -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I use ${vendor.name} promo codes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Copy the promo code ${
              vendor.promoCode
            } and paste it during checkout on the ${
    vendor.name
  } app or website to get ${vendor.discount}."
          }
        },
        {
          "@type": "Question",
          "name": "Is the ${vendor.name} promo code valid in Egypt?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, all ${
              vendor.name
            } promo codes on Foodidu are verified and valid for use in Egypt including Cairo, Alexandria, and Giza."
          }
        },
        {
          "@type": "Question",
          "name": "When does the ${vendor.name} promo code expire?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The ${vendor.name} promo code ${
    vendor.promoCode
  } is valid until ${vendor.expiry}."
          }
        }
      ]
    }
    </script>
    
    <!-- Enhanced Keywords with Repetition -->
    <meta name="keywords" content="${vendor.seoKeywords}, ${
    seo.localKeywords || ""
  }, ${vendor.name.toLowerCase()} foodidu, ${vendor.name.toLowerCase()} code, ${vendor.name.toLowerCase()} promo, ${vendor.name.toLowerCase()} promo code, ${vendor.name.toLowerCase()} discount, ${vendor.name.toLowerCase()} coupon, ${vendor.name.toLowerCase()} deals, ${vendor.name.toLowerCase()} offers, ${vendor.name.toLowerCase()} egypt, ${vendor.name.toLowerCase()} cairo, ${vendor.name.toLowerCase()} alexandria, food delivery Egypt, promo codes Egypt, discount codes Egypt, Foodidu Egypt, ${vendor.name.toLowerCase()} foodidu ${vendor.name.toLowerCase()} code ${vendor.name.toLowerCase()} promo ${vendor.name.toLowerCase()} promo code">
    <meta name="keywords" lang="ar" content="${vendor.seoKeywordsAr}, ${
    seo.localKeywordsAr || ""
  }, ${vendor.nameAr} فوديدو, كود ${vendor.nameAr}, برومو ${
    vendor.nameAr
  }, كود خصم ${vendor.nameAr}, كوبون ${vendor.nameAr}, عروض ${vendor.nameAr}, ${
    vendor.nameAr
  } مصر, ${vendor.nameAr} القاهرة, ${
    vendor.nameAr
  } الإسكندرية, توصيل طعام مصر, كوبونات خصم مصر, فوديدو مصر, ${
    vendor.nameAr
  } فوديدو ${vendor.nameAr} كود ${vendor.nameAr} برومو ${
    vendor.nameAr
  } كود خصم, ${vendor.nameAr} خصم, خصومات ${vendor.nameAr}, اكواد ${vendor.nameAr}, اكواد خصم ${vendor.nameAr}, كوبونات ${vendor.nameAr}, عروض خصم ${vendor.nameAr}, تخفيضات ${vendor.nameAr}, خصم ${vendor.nameAr}, كود تخفيض ${vendor.nameAr}, برومو كود ${vendor.nameAr}, كوبون خصم ${vendor.nameAr}, عرض ${vendor.nameAr}, تخفيض ${vendor.nameAr}, خصومات وعروض ${vendor.nameAr}, اكواد وخصومات ${vendor.nameAr}, كوبونات وعروض ${vendor.nameAr}, اكواد, اكواد خصم, كوبونات خصم, عروض وخصومات, تخفيضات وعروض, كوبونات وتخفيضات, اكواد وكوبونات, كوبونات وأكواد, خصومات وتخفيضات, عروض وتخفيضات, اكواد وعروض">
    
    <!-- Mobile App Deep Links -->
    <meta name="apple-itunes-app" content="app-id=123456789">
    <meta name="google-play-app" content="app-id=com.foodidu">
    
    <!-- Social Media Optimization -->
    <meta property="fb:app_id" content="your-facebook-app-id">
    <meta name="twitter:app:name:iphone" content="Foodidu">
    <meta name="twitter:app:name:googleplay" content="Foodidu">
    
    <!-- Performance and Caching -->
    <meta http-equiv="Cache-Control" content="public, max-age=31536000">
    <meta name="format-detection" content="telephone=no">
    
    <!-- Accessibility -->
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">`;
}

// Function to enhance existing vendor pages
function enhanceVendorSEO() {
  const { vendors } = require("./vendor-generator.js");
  const publicDir = path.join(__dirname, "public");

  console.log("🚀 Starting SEO enhancement for all vendor pages...\n");

  Object.entries(vendors).forEach(([vendorKey, vendor]) => {
    const vendorDir = path.join(publicDir, vendorKey);
    const htmlPath = path.join(vendorDir, "index.html");

    if (fs.existsSync(htmlPath)) {
      try {
        let htmlContent = fs.readFileSync(htmlPath, "utf8");

        // Add enhanced SEO meta tags before closing </head>
        const additionalSEO = generateAdditionalSEO(vendorKey, vendor);
        htmlContent = htmlContent.replace(
          "</head>",
          additionalSEO + "\n</head>"
        );

        // Write enhanced content back
        fs.writeFileSync(htmlPath, htmlContent, "utf8");
        console.log(`✅ Enhanced SEO for: ${vendorKey}`);
      } catch (error) {
        console.error(`❌ Error enhancing ${vendorKey}: ${error.message}`);
      }
    } else {
      console.log(`⚠️  File not found: ${htmlPath}`);
    }
  });

  console.log("\n🎉 SEO enhancement completed for all vendor pages!");
  console.log("\n📈 Enhanced features added:");
  console.log("   • Arabic meta tags and descriptions");
  console.log("   • Local business schema markup");
  console.log("   • FAQ schema for rich snippets");
  console.log("   • Enhanced geo-targeting");
  console.log("   • Mobile app deep links");
  console.log("   • Social media optimization");
  console.log("   • Performance and caching headers");
  console.log("   • Accessibility improvements");
}

// Run the SEO enhancer
if (require.main === module) {
  enhanceVendorSEO();
}

module.exports = { enhanceVendorSEO, seoData };
