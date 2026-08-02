/* ==========================================================================
   AURA 3D - APPLICATION CONTROLLER & INTERACTION LOGIC
   ========================================================================== */

// 1. PRODUCT DATABASE & SCHEMA
const productsData = {
  perfume: {
    category: "Exquisite Fragrance",
    title: "AMMAR'S <span class='gradient-text'>ELIXIR</span>",
    price: "$89.00",
    rawPrice: 89.0,
    desc: "Indulge in the luxury of pure sensory delight. Crafted with delicate floral extracts and dark amber undertones, it is designed for the modern trendsetter.",
    specs: [
      { label: "Origin", value: "Grasse, France" },
      { label: "Longevity", value: "12+ Hours" },
      { label: "Concentration", value: "Eau de Parfum" },
      { label: "Notes", value: "Jasmin, Amberwood, Saffron" }
    ],
    swatches: [
      { color: "gold", style: "linear-gradient(135deg, #e5c07b, #c19c53)", label: "Amber Gold" },
      { color: "ruby", style: "linear-gradient(135deg, #e06c75, #be5046)", label: "Ruby Rose" },
      { color: "sapphire", style: "linear-gradient(135deg, #61afef, #4078c0)", label: "Sapphire Breeze" }
    ],
    items: [
      { id: "perfume-1", name: "Ammar's Elixir Luxe", subCat: "luxe", price: 89.00, rating: "★★★★★ (4.9)", img: "images/perfume_1.png", desc: "Our signature blend featuring rare ambergris and fresh saffron notes." },
      { id: "perfume-2", name: "Aqua Vibe Sport", subCat: "sport", price: 45.00, rating: "★★★★☆ (4.5)", img: "images/perfume_2.png", desc: "A crisp marine fragrance with lemon peel, mint, and sea salt elements." },
      { id: "perfume-3", name: "Noire Intense Night", subCat: "night", price: 95.00, rating: "★★★★★ (4.8)", img: "images/perfume_3.png", desc: "Seductive leather, patchouli, and dark vanilla for formal evenings." }
    ],
    subFilters: [
      { value: "all", label: "All Perfumes" },
      { value: "luxe", label: "Luxe Collection" },
      { value: "sport", label: "Sport Fresh" },
      { value: "night", label: "Night & Intense" }
    ]
  },
  watch: {
    category: "Precision Horology",
    title: "AMMAR'S <span class='gradient-text'>CHRONO</span>",
    price: "$99.00",
    rawPrice: 99.0,
    desc: "A timeless masterpiece engineered with modern aesthetics. Featuring a scratch-resistant crystal face, structural stainless steel, and a precision ticking movement.",
    specs: [
      { label: "Movement", value: "Precision Japanese Quartz" },
      { label: "Case Material", value: "316L Stainless Steel" },
      { label: "Strap", value: "Top-Grain Italian Leather" },
      { label: "Water Resistance", value: "5 ATM (50 Meters)" }
    ],
    swatches: [
      { color: "sapphire", style: "linear-gradient(135deg, #61afef, #4078c0)", label: "Silver Steel" },
      { color: "gold", style: "linear-gradient(135deg, #e5c07b, #c19c53)", label: "Luxury Gold" },
      { color: "ruby", style: "linear-gradient(135deg, #e06c75, #be5046)", label: "Sport Crimson" }
    ],
    items: [
      { id: "watch-1", name: "Chronograph Platinum", subCat: "chrono", price: 99.00, rating: "★★★★★ (4.9)", img: "images/watch_1.png", desc: "Triple dial quartz setup with full steel calendar indices." },
      { id: "watch-2", name: "Vantage Minimalist Black", subCat: "minimalist", price: 59.00, rating: "★★★★☆ (4.6)", img: "images/watch_2.png", desc: "Clean matte face with thin hands and a dark nubuck leather band." },
      { id: "watch-3", name: "Titan Sport Chrono", subCat: "sport", price: 79.00, rating: "★★★★★ (4.7)", img: "images/watch_3.png", desc: "Shockproof polymer alloy framing with a quick-release silicone strap." }
    ],
    subFilters: [
      { value: "all", label: "All Watches" },
      { value: "chrono", label: "Chronograph" },
      { value: "minimalist", label: "Minimalist" },
      { value: "sport", label: "Sport Specs" }
    ]
  },
  joggers: {
    category: "Athletic Performance",
    title: "AMMAR'S <span class='gradient-text'>NIKE FLEX</span>",
    price: "$65.00",
    rawPrice: 65.0,
    desc: "Engineered for absolute mobility and lightweight warmth. Features tapered premium utility fits and a breathable double-sided knit fabric blend.",
    specs: [
      { label: "Material", value: "66% Cotton, 34% Polyester" },
      { label: "Fit Type", value: "Slim Tapered Athletic" },
      { label: "Pockets", value: "Dual Zipper Seams" },
      { label: "Ventilation", value: "Dry-Fit Airweave Panels" }
    ],
    swatches: [
      { color: "emerald", style: "linear-gradient(135deg, #98c379, #6d964f)", label: "Volt Accent" },
      { color: "sapphire", style: "linear-gradient(135deg, #61afef, #4078c0)", label: "Slate Blue" },
      { color: "ruby", style: "linear-gradient(135deg, #e06c75, #be5046)", label: "Hyper Red" }
    ],
    items: [
      { id: "joggers-1", name: "Nike Sport Fleece Jogger", subCat: "fleece", price: 65.00, rating: "★★★★★ (4.8)", img: "images/joggers_1.png", desc: "Classic grey sportswear tailored with heat-trapping fleece fibers." },
      { id: "joggers-2", name: "Nike Dry-Fit Elite", subCat: "dry-fit", price: 75.00, rating: "★★★★☆ (4.6)", img: "images/joggers_2.png", desc: "Advanced moisture wicking panels for rigorous cold-weather workouts." },
      { id: "joggers-3", name: "Nike Pro Run Jogger", subCat: "run", price: 85.00, rating: "★★★★★ (4.9)", img: "images/joggers_3.png", desc: "Aerodynamic windbreaker front panels with dynamic knee gussets." }
    ],
    subFilters: [
      { value: "all", label: "All Joggers" },
      { value: "fleece", label: "Tech Fleece" },
      { value: "dry-fit", label: "Dry-Fit" },
      { value: "run", label: "Pro Run" }
    ]
  },
  shirt: {
    category: "Premium Wear",
    title: "AMMAR'S <span class='gradient-text'>LINEN</span>",
    price: "$42.00",
    rawPrice: 42.0,
    desc: "Stay breezy and elegant. Our resort shirts are woven from organic European flax, delivering exceptional air permeation and a sophisticated, relaxed silhouette.",
    specs: [
      { label: "Fabric", value: "100% Organic Linen" },
      { label: "Collar Style", value: "Camp / Cuban Collar" },
      { label: "Weave", value: "Breathable Open Basketweave" },
      { label: "Care", value: "Machine Washable Cold" }
    ],
    swatches: [
      { color: "shirt", style: "linear-gradient(135deg, #abb2bf, #7f848e)", label: "Sand Beige" },
      { color: "sapphire", style: "linear-gradient(135deg, #61afef, #4078c0)", label: "Ocean Breeze" },
      { color: "emerald", style: "linear-gradient(135deg, #98c379, #6d964f)", label: "Sage Green" }
    ],
    items: [
      { id: "shirt-1", name: "Linen Vacation Shirt", subCat: "linen", price: 42.00, rating: "★★★★☆ (4.5)", img: "images/shirt_1.png", desc: "Cool beachwear linen with standard mother-of-pearl buttons." },
      { id: "shirt-2", name: "Classic Oxford Button-Down", subCat: "classic", price: 35.00, rating: "★★★★☆ (4.6)", img: "images/shirt_2.png", desc: "Sturdy woven cotton Oxford for dynamic corporate-casual transitions." },
      { id: "shirt-3", name: "Urban Salvage Denim Shirt", subCat: "denim", price: 49.00, rating: "★★★★★ (4.8)", img: "images/shirt_3.png", desc: "Lightweight washed denim shirting with dual chest flap pockets." }
    ],
    subFilters: [
      { value: "all", label: "All Shirts" },
      { value: "linen", label: "Resort Linen" },
      { value: "classic", label: "Oxford Cotton" },
      { value: "denim", label: "Denim Indigo" }
    ]
  },
  pants: {
    category: "Tailored Collection",
    title: "AMMAR'S <span class='gradient-text'>CHINOS</span>",
    price: "$55.00",
    rawPrice: 55.0,
    desc: "A sharp look combined with active-stretch comfort. Woven with dual-elastic fibers, these chinos offer unmatched leg flexibility and wrinkle-resistant longevity.",
    specs: [
      { label: "Fabric Blend", value: "97% Cotton, 3% Elastane" },
      { label: "Leg Opening", value: "Tapered Ankle Cut" },
      { label: "Pocketing", value: "Slash side & double welt rear" },
      { label: "Belt Loops", value: "Reinforced Cross-Stitch" }
    ],
    swatches: [
      { color: "pants", style: "linear-gradient(135deg, #d19a66, #b07e50)", label: "Desert Khaki" },
      { color: "sapphire", style: "linear-gradient(135deg, #61afef, #4078c0)", label: "Deep Navy" },
      { color: "shirt", style: "linear-gradient(135deg, #abb2bf, #7f848e)", label: "Slate Grey" }
    ],
    items: [
      { id: "pants-1", name: "Tailored Flat-Front Chinos", subCat: "chino", price: 55.00, rating: "★★★★★ (4.7)", img: "images/pants_1.png", desc: "Everyday luxury trousers with micro-stretch weave." },
      { id: "pants-2", name: "Modern Slim Fit Trousers", subCat: "trouser", price: 65.00, rating: "★★★★★ (4.8)", img: "images/pants_2.png", desc: "Neat creases and a formal drape suitable for executive suit pairings." },
      { id: "pants-3", name: "Relaxed Utility Cargo", subCat: "cargo", price: 48.00, rating: "★★★★☆ (4.4)", img: "images/pants_3.png", desc: "Dual utility expandable pockets with ribbed elastic ankles." }
    ],
    subFilters: [
      { value: "all", label: "All Pants" },
      { value: "chino", label: "Stretch Chino" },
      { value: "trouser", label: "Formal Trouser" },
      { value: "cargo", label: "Utility Cargo" }
    ]
  },
  ladies_dress: {
    category: "Ladies Couture",
    title: "AMMAR'S <span class='gradient-text'>COUTURE</span>",
    price: "$95.00",
    rawPrice: 95.0,
    desc: "An ethereal statement of luxury. Crafted from lightweight fluid silk charmeuse, featuring an open back, cascading drape, and a hand-tailored waist contour.",
    specs: [
      { label: "Fabric Type", value: "100% Charmeuse Mulberry Silk" },
      { label: "Fit Profile", value: "Fluid Slip / Cascade Silhouette" },
      { label: "Length", value: "Floor Length Gown" },
      { label: "Details", value: "Hand-pleated adjustable straps" }
    ],
    swatches: [
      { color: "ladies_dress", style: "linear-gradient(135deg, #e06c75, #b84c55)", label: "Ruby Rose" },
      { color: "ruby", style: "linear-gradient(135deg, #e06c75, #be5046)", label: "Crimson Silk" },
      { color: "sapphire", style: "linear-gradient(135deg, #61afef, #4078c0)", label: "Classic Indigo" }
    ],
    items: [
      { id: "ladies-1", name: "Silk Evening Gown", subCat: "evening", price: 95.00, rating: "★★★★★ (4.9)", img: "images/ladies_dress_1.png", desc: "Stunning backless silk drape with hand-woven strap lines." },
      { id: "ladies-2", name: "Floral Summer Dress", subCat: "summer", price: 52.00, rating: "★★★★☆ (4.6)", img: "images/ladies_dress_2.png", desc: "A breezy pleated dress using georgette silk with delicate print designs." },
      { id: "ladies-3", name: "Tailored Casual Blazer", subCat: "casual", price: 78.00, rating: "★★★★★ (4.7)", img: "images/ladies_dress_3.png", desc: "Lined silk-linen blend outer jacket with structured shoulders." }
    ],
    subFilters: [
      { value: "all", label: "All Clothing" },
      { value: "evening", label: "Evening Couture" },
      { value: "summer", label: "Summer Slip" },
      { value: "casual", label: "Structured Casual" }
    ]
  },
  ladies_daily: {
    category: "Ladies Care",
    title: "AMMAR'S <span class='gradient-text'>GLOW SET</span>",
    price: "$38.00",
    rawPrice: 38.0,
    desc: "Bring clinical-grade skincare to your dresser. This serum lock kit uses botanicals and multi-weight hyaluronic compounds to lock in deep hydration.",
    specs: [
      { label: "Skin Profile", value: "Dry, Sensitive, Combo" },
      { label: "Formulation", value: "Vegan, Alcohol-Free, Cruelty-Free" },
      { label: "Active Agent", value: "2.5% Hyaluronic, Vitamin B5" },
      { label: "Included", value: "1 Serum (50ml) + 1 Cream (30ml)" }
    ],
    swatches: [
      { color: "ladies_daily", style: "linear-gradient(135deg, #c678dd, #a056b8)", label: "Orchid Serum" },
      { color: "ruby", style: "linear-gradient(135deg, #e06c75, #be5046)", label: "Rosewater Serum" },
      { color: "gold", style: "linear-gradient(135deg, #e5c07b, #c19c53)", label: "Honey Extract" }
    ],
    items: [
      { id: "care-1", name: "Anti-Aging Retinol Serum", subCat: "serum", price: 38.00, rating: "★★★★★ (4.9)", img: "images/ladies_daily_1.png", desc: "Accelerates cell renewal and builds dermis elasticity." },
      { id: "care-2", name: "Hydro-Boost Gel Moisturizer", subCat: "moisturizer", price: 29.00, rating: "★★★★☆ (4.6)", img: "images/ladies_daily_2.png", desc: "Water-based gel that replenishes cellular hydration levels." },
      { id: "care-3", name: "Organic Rosewater Cleanser", subCat: "cleanser", price: 19.00, rating: "★★★★☆ (4.5)", img: "images/ladies_daily_3.png", desc: "Gentle soap-free foaming gel containing Damascus petals." }
    ],
    subFilters: [
      { value: "all", label: "All Skincare" },
      { value: "serum", label: "Serums & Elixirs" },
      { value: "moisturizer", label: "Hydration Creams" },
      { value: "cleanser", label: "Gentle Cleansers" }
    ]
  }
};

// 2. SHOPPING CART CONSTRUCTOR
let shoppingCart = JSON.parse(localStorage.getItem('AMMARS_CART')) || [];

// 3. INITIALIZATION CONTROLLER
document.addEventListener('DOMContentLoaded', () => {
  // Cursor Tracking Glow
  initCursorTracking();

  // Navigation Drawer Logic
  initNavigation();

  // Hero Product Switcher
  initHeroSwitcher();

  // E-commerce Catalog Logic
  initCatalog();

  // Cart Logic
  initCartDrawer();

  // Stats Counters
  initStatsObserver();

  // Vector Radar Map
  initRadarMap();

  // Custom Form Notifications
  initForms();
  
  // Update Cart Header Count
  updateCartBadge();
});

/* ==========================================================================
   CURSOR TRACKING Glow (Desktop Only)
   ========================================================================== */
function initCursorTracking() {
  const cursorGlow = document.getElementById('cursor-glow');
  const cursorDot = document.getElementById('cursor-dot');

  // Disable on touchscreen devices
  if (window.matchMedia('(hover: none)').matches) {
    cursorGlow.style.display = 'none';
    cursorDot.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;
  let dotX = 0, dotY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function updatePositions() {
    // Smooth trailing for glow
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    cursorGlow.style.left = `${glowX}px`;
    cursorGlow.style.top = `${glowY}px`;

    // High response for inner dot
    dotX += (mouseX - dotX) * 0.25;
    dotY += (mouseY - dotY) * 0.25;
    cursorDot.style.left = `${dotX}px`;
    cursorDot.style.top = `${dotY}px`;

    requestAnimationFrame(updatePositions);
  }
  requestAnimationFrame(updatePositions);

  // Set Hover State Body Class
  const interactiveTargets = 'a, button, input, select, textarea, .swatch, .q-btn, .filter-btn, .qty-btn, .sub-filter-btn';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveTargets)) {
      document.body.classList.add('hover-interactive');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveTargets)) {
      document.body.classList.remove('hover-interactive');
    }
  });
}

/* ==========================================================================
   HEADER NAVIGATION & DRAWER
   ========================================================================== */
function initNavigation() {
  const mainHeader = document.getElementById('main-header');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const drawerClose = document.getElementById('drawer-close');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll Event Header background change
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  });

  // Mobile navigation drawer toggle
  const toggleDrawer = (open) => {
    mobileDrawer.classList.toggle('open', open);
  };

  mobileMenuBtn.addEventListener('click', () => toggleDrawer(true));
  drawerClose.addEventListener('click', () => toggleDrawer(false));
  mobileLinks.forEach(link => link.addEventListener('click', () => toggleDrawer(false)));

  // Scroll spy active highlights
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;
    const sections = ['hero-section', 'products-section', 'about-section', 'contact-section'];
    
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      
      const top = el.offsetTop;
      const height = el.offsetHeight;
      
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === '#' && id === 'hero-section') {
            link.classList.add('active');
          } else if (href === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   HERO PRODUCT SWITCHER & THEMES
   ========================================================================== */
const heroProductKeys = ['perfume', 'watch', 'joggers', 'shirt', 'pants', 'ladies_dress', 'ladies_daily'];
let activeHeroProduct = 'perfume';
let autoplayTimer = null;
const autoplayDelay = 6000; // 6 seconds slide interval

function startAutoplay() {
  stopAutoplay();
  
  const progressFill = document.getElementById('slideshow-progress-fill');
  if (progressFill) {
    progressFill.style.transition = 'none';
    progressFill.style.width = '0%';
    // Force browser reflow to reset transition
    progressFill.offsetWidth;
    progressFill.style.transition = 'width 6s linear';
    progressFill.style.width = '100%';
  }
  
  autoplayTimer = setTimeout(() => {
    let idx = heroProductKeys.indexOf(activeHeroProduct);
    let nextIdx = (idx + 1) % heroProductKeys.length;
    switchHeroProduct(heroProductKeys[nextIdx], 'next');
  }, autoplayDelay);
}

function stopAutoplay() {
  if (autoplayTimer) {
    clearTimeout(autoplayTimer);
    autoplayTimer = null;
  }
  const progressFill = document.getElementById('slideshow-progress-fill');
  if (progressFill) {
    progressFill.style.transition = 'none';
    progressFill.style.width = '0%';
  }
}

function resetAutoplayDelay() {
  stopAutoplay();
  // Pause for 4 seconds after manual navigation, then start autoplay again
  setTimeout(() => {
    if (!autoplayTimer) {
      startAutoplay();
    }
  }, 4000);
}

function updateHeroVariantDetails(productKey, variantIndex) {
  const db = productsData[productKey];
  if (!db || !db.items[variantIndex]) return;
  
  const item = db.items[variantIndex];
  
  // 1. Update details Left
  const detailsLeft = document.getElementById('hero-details-left');
  if (detailsLeft) {
    detailsLeft.style.opacity = 0;
    detailsLeft.style.transform = 'translateX(-10px)';

    setTimeout(() => {
      // Update price and desc matching the specific color item
      document.getElementById('hero-desc').textContent = item.desc;
      document.getElementById('hero-price').textContent = `$${item.price.toFixed(2)}`;
      detailsLeft.style.opacity = 1;
      detailsLeft.style.transform = 'translateX(0)';
    }, 200);
  }
  
  // 2. 3D Slide Transition for the variant image
  const slidesWrapper = document.getElementById('hero-slides-wrapper');
  if (slidesWrapper) {
    const activeCard = slidesWrapper.querySelector('.hero-slide-card.slide-active');
    const currentImg = activeCard ? activeCard.querySelector('img').getAttribute('src') : '';
    
    if (currentImg !== item.img) {
      const direction = 'next';
      
      const newCard = document.createElement('div');
      newCard.className = `hero-slide-card ${direction === 'next' ? 'slide-next-enter' : 'slide-prev-enter'}`;
      newCard.innerHTML = `<img src="${item.img}" alt="${item.name}">`;
      
      slidesWrapper.appendChild(newCard);
      newCard.offsetWidth; // force reflow
      
      if (activeCard) {
        activeCard.classList.remove('slide-active');
        activeCard.classList.add(direction === 'next' ? 'slide-next-exit' : 'slide-prev-exit');
        setTimeout(() => {
          activeCard.remove();
        }, 800);
      }
      
      newCard.classList.remove(direction === 'next' ? 'slide-next-enter' : 'slide-prev-enter');
      newCard.classList.add('slide-active');
    }
  }
}

function initHeroSwitcher() {
  const quickBtns = document.querySelectorAll('.q-btn');
  const footerLinks = document.querySelectorAll('.footer-action-link');
  const swatchContainer = document.getElementById('color-swatches');
  const prevBtn = document.getElementById('hero-slide-prev');
  const nextBtn = document.getElementById('hero-slide-next');

  // Bind Swatch Container Delegation
  swatchContainer.addEventListener('click', (e) => {
    const swatch = e.target.closest('.swatch');
    if (!swatch) return;

    // Toggle active state
    swatchContainer.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
    swatch.classList.add('active');

    const colorTheme = swatch.getAttribute('data-color');
    changeThemeColor(colorTheme);
    resetAutoplayDelay(); // Delay autoplay on interaction

    // Retrieve active swatch index and trigger details update
    const swatches = Array.from(swatchContainer.querySelectorAll('.swatch'));
    const swatchIndex = swatches.indexOf(swatch);
    updateHeroVariantDetails(activeHeroProduct, swatchIndex);
  });

  // Handle switching hero product
  window.switchHeroProduct = function(productKey, direction) {
    if (!productsData[productKey]) return;
    
    // Auto-detect direction if not provided
    if (!direction) {
      let oldIdx = heroProductKeys.indexOf(activeHeroProduct);
      let newIdx = heroProductKeys.indexOf(productKey);
      if (newIdx > oldIdx) {
        direction = 'next';
      } else if (newIdx < oldIdx) {
        direction = 'prev';
      } else {
        return; // No change
      }
    }
    
    activeHeroProduct = productKey;

    // 1. Update active selectors
    quickBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-prod') === productKey);
    });

    // 2. Animate and update details Left (Fade & Slide out effect)
    const detailsLeft = document.getElementById('hero-details-left');
    if (detailsLeft) {
      detailsLeft.style.opacity = 0;
      detailsLeft.style.transform = 'translateX(-20px)';

      setTimeout(() => {
        const db = productsData[productKey];
        document.getElementById('hero-category').textContent = db.category;
        document.getElementById('hero-title').innerHTML = db.title;
        document.getElementById('hero-desc').textContent = db.desc;
        document.getElementById('hero-price').textContent = db.price;

        detailsLeft.style.opacity = 1;
        detailsLeft.style.transform = 'translateX(0)';
      }, 300);
    }

    // 3. Update specifications table Right
    const specsList = document.getElementById('hero-specs');
    if (specsList) {
      specsList.style.opacity = 0;
      specsList.style.transform = 'translateX(20px)';

      setTimeout(() => {
        const db = productsData[productKey];
        specsList.innerHTML = db.specs.map(s => `
          <li><strong>${s.label}:</strong> <span>${s.value}</span></li>
        `).join('');

        // Build swatches
        swatchContainer.innerHTML = db.swatches.map((sw, idx) => `
          <button class="swatch ${idx === 0 ? 'active' : ''}" 
                  data-color="${sw.color}" 
                  style="background: ${sw.style};" 
                  title="${sw.label}"></button>
        `).join('');

        specsList.style.opacity = 1;
        specsList.style.transform = 'translateX(0)';
        
        // Default to first swatch theme
        changeThemeColor(db.swatches[0].color);
      }, 300);
    }

    // 4. Trigger WebGL mesh reconstruction
    if (window.rebuild3DModel) {
      window.rebuild3DModel(productKey);
    }

    // 5. Update floating 3D product card image (3D slide transition)
    const slidesWrapper = document.getElementById('hero-slides-wrapper');
    if (slidesWrapper) {
      const db = productsData[productKey];
      const activeCard = slidesWrapper.querySelector('.hero-slide-card.slide-active');
      
      // Create new slide card
      const newCard = document.createElement('div');
      newCard.className = `hero-slide-card ${direction === 'next' ? 'slide-next-enter' : 'slide-prev-enter'}`;
      newCard.innerHTML = `<img src="${db.items[0].img}" alt="${db.category}">`;
      
      slidesWrapper.appendChild(newCard);
      
      // Force layout reflow
      newCard.offsetWidth;
      
      // Start transition
      if (activeCard) {
        activeCard.classList.remove('slide-active');
        activeCard.classList.add(direction === 'next' ? 'slide-next-exit' : 'slide-prev-exit');
        
        // Clean up old card after transition
        setTimeout(() => {
          activeCard.remove();
        }, 800);
      }
      
      newCard.classList.remove(direction === 'next' ? 'slide-next-enter' : 'slide-prev-enter');
      newCard.classList.add('slide-active');
    }

    // 6. Refresh slide interval timer
    if (autoplayTimer) {
      startAutoplay();
    }
  };

  // Bind Buttons
  quickBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const prod = btn.getAttribute('data-prod');
      switchHeroProduct(prod);
      resetAutoplayDelay();
    });
  });

  // Footer Links Bind
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const prod = link.getAttribute('data-prod');
      switchHeroProduct(prod);
      resetAutoplayDelay();
      // Scroll to hero
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Bind Prev/Next Controls
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      let idx = heroProductKeys.indexOf(activeHeroProduct);
      let prevIdx = (idx - 1 + heroProductKeys.length) % heroProductKeys.length;
      switchHeroProduct(heroProductKeys[prevIdx], 'prev');
      resetAutoplayDelay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      let idx = heroProductKeys.indexOf(activeHeroProduct);
      let nextIdx = (idx + 1) % heroProductKeys.length;
      switchHeroProduct(heroProductKeys[nextIdx], 'next');
      resetAutoplayDelay();
    });
  }

  // Hero Add to Cart trigger
  document.getElementById('hero-add-to-cart').addEventListener('click', () => {
    const db = productsData[activeHeroProduct];
    const activeSwatch = swatchContainer.querySelector('.swatch.active');
    const swatches = Array.from(swatchContainer.querySelectorAll('.swatch'));
    const swatchIndex = activeSwatch ? swatches.indexOf(activeSwatch) : 0;
    
    const activeItem = db.items[swatchIndex] || db.items[0];
    const colorLabel = activeSwatch ? activeSwatch.getAttribute('title') : "Default";

    addToCart(activeItem.id, activeItem.name, activeItem.price, activeItem.img, colorLabel);
  });

  // 3D Parallax Tilt Effect on Hero stage
  const stage = document.getElementById('hero-3d-stage');
  const detailsL = document.getElementById('hero-details-left');
  const detailsR = document.getElementById('hero-details-right');
  const badge1 = document.getElementById('popout-badge-1');
  const badge2 = document.getElementById('popout-badge-2');
  const heroSlidesWrapper = document.getElementById('hero-slides-wrapper');

  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Apply tilt values
    const rotX = -y / 15;
    const rotY = x / 15;

    // Dynamic transform overlays
    if(badge1) badge1.style.transform = `translate3d(${x * 0.12}px, ${y * 0.12}px, 90px)`;
    if(badge2) badge2.style.transform = `translate3d(${x * -0.08}px, ${y * -0.08}px, 120px)`;
    if(heroSlidesWrapper) heroSlidesWrapper.style.transform = `translate3d(${x * -0.03}px, ${y * 0.03}px, -20px) rotateY(${x * 0.03}deg) rotateX(${y * -0.03}deg)`;
    
    // Tilt left and right detail cards slightly based on focus
    detailsL.style.transform = `rotateY(${rotY * 0.1}deg) translateY(${y * 0.02}px)`;
    detailsR.style.transform = `rotateY(${rotY * 0.1}deg) translateY(${y * -0.02}px)`;
  });

  stage.addEventListener('mouseleave', () => {
    // Reset to normal
    if(badge1) badge1.style.transform = `translate3d(0px, 0px, 0px)`;
    if(badge2) badge2.style.transform = `translate3d(0px, 0px, 0px)`;
    if(heroSlidesWrapper) heroSlidesWrapper.style.transform = `translateZ(-20px) rotateY(0deg)`;
    detailsL.style.transform = `none`;
    detailsR.style.transform = `none`;
  });

  // Pause Autoplay when dragging the 3D model
  stage.addEventListener('mousedown', stopAutoplay);
  stage.addEventListener('touchstart', stopAutoplay);
  stage.addEventListener('mouseup', resetAutoplayDelay);
  stage.addEventListener('touchend', resetAutoplayDelay);

  // Initialize Autoplay Timer on load
  startAutoplay();
}

function changeThemeColor(colorName) {
  // Reset body theme class and set new one
  document.body.className = '';
  document.body.classList.add(`theme-${colorName}`);
  
  // Re-paint Three.js dynamic pointlights inside Three code if listener exists
  if (window.updateThreeLights) {
    window.updateThreeLights(colorName);
  }
}

/* ==========================================================================
   E-COMMERCE CATALOG & FILTERS
   ========================================================================== */
let activeCategoryFilter = 'all';
let activeSubFilter = 'all';

function initCatalog() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  // Render full initial list
  renderCatalogGrid();

  // Bind Category Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      activeCategoryFilter = btn.getAttribute('data-filter');
      activeSubFilter = 'all'; // reset sub-filters
      
      renderSubFilterPills();
      renderCatalogGrid();
    });
  });

  // Render initial sub-filter row (none for "all", or default)
  renderSubFilterPills();
}

function renderSubFilterPills() {
  const container = document.getElementById('sub-filter-container');
  container.innerHTML = '';

  if (activeCategoryFilter === 'all') {
    return; // No sub-filters for all
  }

  const categoryDb = productsData[activeCategoryFilter];
  if (!categoryDb || !categoryDb.subFilters) return;

  categoryDb.subFilters.forEach(sub => {
    const pill = document.createElement('button');
    pill.className = `sub-filter-btn ${activeSubFilter === sub.value ? 'active' : ''}`;
    pill.textContent = sub.label;
    pill.setAttribute('data-sub', sub.value);
    
    pill.addEventListener('click', () => {
      container.querySelectorAll('.sub-filter-btn').forEach(b => b.classList.remove('active'));
      pill.classList.add('active');
      activeSubFilter = sub.value;
      renderCatalogGrid();
    });

    container.appendChild(pill);
  });
}

function renderCatalogGrid() {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = '';

  // Filter items
  let filteredItems = [];
  
  if (activeCategoryFilter === 'all') {
    // Collect all items
    Object.keys(productsData).forEach(catKey => {
      productsData[catKey].items.forEach(item => {
        filteredItems.push({ ...item, category: catKey });
      });
    });
  } else {
    // Filtered by category
    const items = productsData[activeCategoryFilter].items;
    items.forEach(item => {
      if (activeSubFilter === 'all' || item.subCat === activeSubFilter) {
        filteredItems.push({ ...item, category: activeCategoryFilter });
      }
    });
  }

  // Draw cards
  filteredItems.forEach(item => {
    const cardWrapper = document.createElement('div');
    cardWrapper.className = 'tilt-card-wrapper';
    
    cardWrapper.innerHTML = `
      <div class="tilt-card">
        <span class="card-tag">${item.subCat || item.category}</span>
        
        <div class="card-visual">
          <div class="card-glow-bg"></div>
          <img src="${item.img}" alt="${item.name}" class="card-img">
        </div>
        
        <div class="card-info">
          <div class="card-rating">${item.rating}</div>
          <h3 class="card-title">${item.name}</h3>
          
          <div class="card-footer-row">
            <span class="card-price">$${item.price.toFixed(2)}</span>
            <button class="card-add-btn" aria-label="Add to cart" onclick="addToCart('${item.id}', '${item.name}', ${item.price}, '${item.img}', '${item.subCat}')">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;

    // Apply 3D Tilt Interaction
    applyTiltEffect(cardWrapper);
    grid.appendChild(cardWrapper);
  });
}

function applyTiltEffect(wrapper) {
  const card = wrapper.querySelector('.tilt-card');
  
  wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse position inside card
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Rotate max 15 degrees
    const rotateX = -((y - centerY) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  wrapper.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}

/* ==========================================================================
   SHOPPING CART SYSTEM
   ========================================================================== */
// Toggle Cart Drawer Globally
function toggleCart(open) {
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  if (!cartDrawer || !cartOverlay) return;
  
  cartDrawer.classList.toggle('open', open);
  cartOverlay.classList.toggle('open', open);
  if(open) {
    renderCartItems();
  }
}

function initCartDrawer() {
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartOverlay = document.getElementById('cart-overlay');
  const browseBtn = document.getElementById('empty-cart-browse');
  const checkoutBtn = document.getElementById('checkout-btn');

  cartToggleBtn.addEventListener('click', () => toggleCart(true));
  cartCloseBtn.addEventListener('click', () => toggleCart(false));
  cartOverlay.addEventListener('click', () => toggleCart(false));
  browseBtn.addEventListener('click', () => toggleCart(false));
  
  checkoutBtn.addEventListener('click', () => {
    if(shoppingCart.length === 0) {
      showToast("🛒 Bag is empty", "Add some items before checking out!");
      return;
    }
    showToast("💳 Checkout Initialized", "Thank you for choosing Ammar's Shopping. Demo order created!");
    shoppingCart = [];
    saveCart();
    updateCartBadge();
    toggleCart(false);
  });
}

window.addToCart = function(id, name, price, img, variant) {
  // Check if item already in cart
  const existing = shoppingCart.find(item => item.id === id && item.variant === variant);
  
  if (existing) {
    existing.qty++;
  } else {
    shoppingCart.push({ id, name, price, img, variant, qty: 1 });
  }

  saveCart();
  updateCartBadge();
  showToast("🛒 Item Added", `${name} (${variant || 'Default'}) added to bag!`);

  // Animate Cart Icon badge pop
  const badge = document.getElementById('cart-count-badge');
  if (badge) {
    badge.style.transform = 'scale(1.3)';
    setTimeout(() => {
      badge.style.transform = 'scale(1)';
    }, 300);
  }

  // Open cart drawer for direct visual feedback
  toggleCart(true);
};

window.adjustCartQty = function(id, variant, delta) {
  const itemIndex = shoppingCart.findIndex(item => item.id === id && item.variant === variant);
  if (itemIndex === -1) return;

  shoppingCart[itemIndex].qty += delta;

  if (shoppingCart[itemIndex].qty <= 0) {
    shoppingCart.splice(itemIndex, 1);
  }

  saveCart();
  updateCartBadge();
  renderCartItems();
};

window.removeCartItem = function(id, variant) {
  shoppingCart = shoppingCart.filter(item => !(item.id === id && item.variant === variant));
  saveCart();
  updateCartBadge();
  renderCartItems();
  showToast("🗑️ Item Removed", "Item removed from shopping bag.");
};

function saveCart() {
  localStorage.setItem('AMMARS_CART', JSON.stringify(shoppingCart));
}

function updateCartBadge() {
  const count = shoppingCart.reduce((total, item) => total + item.qty, 0);
  const badge = document.getElementById('cart-count-badge');
  const drawerCount = document.getElementById('cart-drawer-count');
  if(badge) badge.textContent = count;
  if(drawerCount) drawerCount.textContent = count;
}

function renderCartItems() {
  const container = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal-price');
  
  if (shoppingCart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-message">
        <span class="empty-cart-icon">🛒</span>
        <p>Your shopping bag is empty.</p>
        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('cart-close-btn').click();">Browse Products</button>
      </div>
    `;
    subtotalEl.textContent = "$0.00";
    return;
  }

  container.innerHTML = '';
  let subtotal = 0;

  shoppingCart.forEach(item => {
    const itemCost = item.price * item.qty;
    subtotal += itemCost;

    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <div class="cart-item-img-wrapper">
        <img src="${item.img}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <span class="cart-item-name">${item.name}</span>
        <span class="cart-item-variant">${item.variant || 'Default'}</span>
        <div class="cart-item-qty-selector">
          <button class="qty-btn" onclick="adjustCartQty('${item.id}', '${item.variant}', -1)">-</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="adjustCartQty('${item.id}', '${item.variant}', 1)">+</button>
        </div>
      </div>
      <div class="cart-item-price-col">
        <button class="cart-item-remove" onclick="removeCartItem('${item.id}', '${item.variant}')">Delete</button>
        <span class="cart-item-price">$${itemCost.toFixed(2)}</span>
      </div>
    `;
    container.appendChild(row);
  });

  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
}

/* ==========================================================================
   STAT COUNT-UP ON SCROLL OBSERVER
   ========================================================================== */
function initStatsObserver() {
  const numbers = document.querySelectorAll('.stat-number');
  
  const startCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing easeOutQuad
      const easedProgress = progress * (2 - progress);
      const current = Math.floor(easedProgress * target);
      
      if (el.textContent.includes('k')) {
        el.textContent = current + "k+";
      } else if (el.textContent.includes('%')) {
        el.textContent = current + "%";
      } else {
        el.textContent = current + "+";
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        // Enforce final values exactly
        if (el.textContent.includes('k')) el.textContent = target + "k+";
        else if (el.textContent.includes('%')) el.textContent = target + "%";
        else el.textContent = target + "+";
      }
    };
    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        numbers.forEach(n => {
          // Initialize formatting
          if (n.nextElementSibling.textContent.includes('Clients')) {
            n.textContent = "0k+";
          } else if (n.nextElementSibling.textContent.includes('Satisfaction')) {
            n.textContent = "0%";
          } else {
            n.textContent = "0+";
          }
          startCounter(n);
        });
        self.unobserve(entry.target); // Trigger once
      }
    });
  }, { threshold: 0.5 });

  const aboutSection = document.getElementById('about-section');
  if (aboutSection) observer.observe(aboutSection);

  // About Us Visual Tilt
  const aboutTilt = document.getElementById('about-tilt');
  if (aboutTilt) {
    const card = aboutTilt.querySelector('.about-visual-card');
    aboutTilt.addEventListener('mousemove', (e) => {
      const rect = aboutTilt.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      card.style.transform = `rotateX(${-y / 15}deg) rotateY(${x / 15}deg)`;
    });
    
    aboutTilt.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }
}

/* ==========================================================================
   TACTICAL RADAR RADIAL MAP DRAWING
   ========================================================================== */
function initRadarMap() {
  const container = document.getElementById('map-canvas-container');
  const canvas = document.getElementById('styled-map-canvas');
  if (!canvas || !container) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let hqX, hqY;

  const resize = () => {
    width = container.clientWidth;
    height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;
    hqX = width / 2;
    hqY = height / 2;
  };
  resize();
  window.addEventListener('resize', resize);

  // Radar variables
  let sweepAngle = 0;

  // Particle dots (representing cities/nodes)
  const nodes = [
    { x: width * 0.25, y: height * 0.35, label: "London node", active: false },
    { x: width * 0.75, y: height * 0.25, label: "Tokyo link", active: false },
    { x: width * 0.3, y: height * 0.7, label: "Paris relay", active: false },
    { x: width * 0.65, y: height * 0.75, label: "Sydney port", active: false },
    { x: width * 0.5, y: height * 0.5, label: "AMMAR'S HQ", active: true } // Center
  ];

  // Coordinates matrix falling text
  let matrixLines = [];
  const matrixCount = 5;
  for(let i=0; i<matrixCount; i++) {
    matrixLines.push({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.5 + Math.random() * 1.5,
      val: (Math.random() * 100).toFixed(4)
    });
  }

  function drawMap() {
    ctx.clearRect(0, 0, width, height);

    // 1. Dark tech background grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
    ctx.lineWidth = 1;
    const gridSpacing = 20;
    for (let x = 0; x < width; x += gridSpacing) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSpacing) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    // Get Active Accent RGB
    const accentStyle = getComputedStyle(document.body).getPropertyValue('--accent-color').trim();

    // 2. Radar sweep circles
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.beginPath(); ctx.arc(hqX, hqY, 50, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(hqX, hqY, 100, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(hqX, hqY, 150, 0, Math.PI * 2); ctx.stroke();

    // 3. Draw radar coordinates falling text
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.font = '8px monospace';
    matrixLines.forEach(line => {
      ctx.fillText(`SYS.LOC: [${line.val}]`, line.x, line.y);
      line.y += line.speed;
      if (line.y > height) {
        line.y = -10;
        line.x = Math.random() * width;
      }
    });

    // 4. Sweep radar beam line
    sweepAngle += 0.015;
    const sweepX = hqX + 220 * Math.cos(sweepAngle);
    const sweepY = hqY + 220 * Math.sin(sweepAngle);
    
    // Gradient Sweep
    ctx.strokeStyle = `rgba(255, 255, 255, 0.05)`;
    ctx.beginPath();
    ctx.moveTo(hqX, hqY);
    ctx.lineTo(sweepX, sweepY);
    ctx.stroke();

    // 5. Draw interactive nodes
    nodes.forEach(node => {
      // Re-position nodes on resize
      if (node.label === "London node") { node.x = width * 0.25; node.y = height * 0.35; }
      if (node.label === "Tokyo link") { node.x = width * 0.75; node.y = height * 0.25; }
      if (node.label === "Paris relay") { node.x = width * 0.3; node.y = height * 0.7; }
      if (node.label === "Sydney port") { node.x = width * 0.65; node.y = height * 0.75; }
      if (node.label === "AMMAR'S HQ") { node.x = width / 2; node.y = height / 2; }

      // Check distance to sweep beam to light up node
      const angleToNode = Math.atan2(node.y - hqY, node.x - hqX);
      const angleDiff = Math.abs((sweepAngle % (Math.PI * 2)) - (angleToNode < 0 ? angleToNode + Math.PI * 2 : angleToNode));
      
      let intensity = 0.2;
      if (angleDiff < 0.25) {
        intensity = 1.0;
        node.active = true;
      } else {
        node.active = false;
      }

      ctx.fillStyle = node.active ? accentStyle : 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.label === "AMMAR'S HQ" ? 5 : 3, 0, Math.PI * 2);
      ctx.fill();

      // Ripple around HQ
      if (node.label === "AMMAR'S HQ") {
        ctx.strokeStyle = accentStyle;
        ctx.globalAlpha = intensity * 0.4;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 12, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      } else {
        // Label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.fillText(node.label, node.x + 8, node.y + 3);
      }
    });

    requestAnimationFrame(drawMap);
  }
  
  // Start loop
  requestAnimationFrame(drawMap);
}

/* ==========================================================================
   FORM VALIDATIONS & TOAST UTILITIES
   ========================================================================== */
function initForms() {
  const contactForm = document.getElementById('contact-form');
  const newsletterForm = document.getElementById('newsletter-form');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const msg = document.getElementById('contact-message').value.trim();

    if (!name || !email || !msg) {
      showToast("⚠️ Missing Fields", "Please complete all fields before sending.");
      return;
    }

    if (!validateEmail(email)) {
      showToast("⚠️ Invalid Email", "Please enter a valid email address.");
      return;
    }

    // Success response
    showToast("✉️ Message Transmitted", `Thank you, ${name}! Ammar's Shopping concierge will contact you soon.`);
    contactForm.reset();
  });

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('.newsletter-input');
    const val = emailInput.value.trim();

    if (!val || !validateEmail(val)) {
      showToast("⚠️ Check Email", "Please insert a correct email to subscribe.");
      return;
    }

    showToast("💎 Subscribed!", "Welcome to early access showroom lists.");
    newsletterForm.reset();
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Global Toast Spawner
window.showToast = function(title, text) {
  const container = document.getElementById('toast-container');
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-icon">⚡</span>
    <div>
      <h4 style="font-family: var(--font-display); font-size: 13px; font-weight: 700; margin-bottom: 2px;">${title}</h4>
      <p class="toast-message">${text}</p>
    </div>
  `;

  container.appendChild(toast);

  // Auto clean DOM
  setTimeout(() => {
    toast.remove();
  }, 4000);
};
