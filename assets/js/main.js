/* ============================================================
  KANDUMAN CASCARA & COFFEE - MAIN JAVASCRIPT
  Interactivity, Animations, Form Handling
  ============================================================ */

// ============================================================
// DOM UTILITIES - Cache DOM elements at startup
// ============================================================

const DOM = {
  body: document.body,
  nav: document.querySelector('nav'),
  navMenu: document.querySelector('.nav-menu'),
  mobileMenuToggle: document.querySelector('.mobile-menu-toggle'),
  navOverlay: document.querySelector('.nav-overlay'),
  navLinks: document.querySelectorAll('.nav-menu a'),
  filterBtns: document.querySelectorAll('.filter-btn'),
  productGrid: document.querySelector('.product-grid'),
  accordionItems: document.querySelectorAll('.accordion-item'),
  contactForm: document.querySelector('#contact-form'),
  counter: document.querySelectorAll('.counter'),
};

// ============================================================
// MOBILE MENU SYSTEM
// ============================================================

function openMobileMenu() {
  if (!DOM.navMenu || !DOM.mobileMenuToggle || !DOM.navOverlay) return;
  
  DOM.navMenu.classList.add('active');
  DOM.mobileMenuToggle.classList.add('active');
  DOM.navOverlay.classList.add('active');
  DOM.body.classList.add('menu-open');
  
  // Prevent touch scrolling on iOS
  DOM.body.style.top = `-${window.scrollY}px`;
}

function closeMobileMenu() {
  if (!DOM.navMenu || !DOM.mobileMenuToggle || !DOM.navOverlay) return;
  
  DOM.navMenu.classList.remove('active');
  DOM.mobileMenuToggle.classList.remove('active');
  DOM.navOverlay.classList.remove('active');
  DOM.body.classList.remove('menu-open');
  
  // Restore scroll position on iOS
  const scrollY = DOM.body.style.top;
  DOM.body.style.top = '';
  if (scrollY) {
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }
}

// Toggle hamburger button
if (DOM.mobileMenuToggle) {
  DOM.mobileMenuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (DOM.navMenu && DOM.navMenu.classList.contains('active')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
}

// Close menu when clicking overlay
if (DOM.navOverlay) {
  DOM.navOverlay.addEventListener('click', () => {
    closeMobileMenu();
  });
}

// Close menu when clicking a nav link
DOM.navLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMobileMenu();
  });
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && DOM.navMenu && DOM.navMenu.classList.contains('active')) {
    closeMobileMenu();
  }
});

// ============================================================
// SMOOTH SCROLL LINK HANDLING (for anchor links)
// ============================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================================
// NAVIGATION SCROLL EFFECTS
// ============================================================

window.addEventListener('scroll', () => {
  // Add/remove scrolled class on nav
  if (DOM.nav) {
    if (window.scrollY > 50) {
      DOM.nav.classList.add('scrolled');
    } else {
      DOM.nav.classList.remove('scrolled');
    }
  }
  
  // Parallax effect on hero background
  const parallaxBg = document.querySelector('.hero-fullwidth .hero-bg');
  const heroLogo = document.querySelector('.hero-fullwidth .hero-logo-center');
  const heroContents = document.querySelectorAll('.hero:not(.hero-fullwidth) .hero-content');

  if (parallaxBg) {
    const rect = parallaxBg.getBoundingClientRect();
    const speed = 0.2;
    const yPos = Math.round(rect.top * speed);
    parallaxBg.style.backgroundPosition = `center calc(50% + ${yPos}px)`;
  }

  if (heroLogo) {
    const logoOffset = Math.min(Math.max(window.scrollY * 0.05, 0), 40);
    heroLogo.style.transform = `translateY(${logoOffset}px)`;
  }

  heroContents.forEach(content => {
    const rect = content.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      const offset = Math.round((window.innerHeight - rect.top) * 0.02);
      content.style.transform = `translateY(${offset}px)`;
    }
  });
});

// ============================================================
// FILTER FUNCTIONALITY (Collection page)
// ============================================================

if (DOM.filterBtns.length > 0) {
  DOM.filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      DOM.filterBtns.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      btn.classList.add('active');
      
      // Filter products
      const category = btn.dataset.category;
      const oldProducts = document.querySelectorAll('.product-card');
      const newProducts = document.querySelectorAll('.product-card-premium');
      
      oldProducts.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
          product.style.display = '';
          setTimeout(() => product.classList.add('fade-in'), 10);
        } else {
          product.style.display = 'none';
        }
      });
      
      newProducts.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
          product.style.display = 'block';
          setTimeout(() => product.classList.add('fade-in'), 10);
        } else {
          product.style.display = 'none';
        }
      });
    });
  });
  
  // Set "All" as active by default
  const allBtn = document.querySelector('[data-category="all"]');
  if (allBtn) allBtn.classList.add('active');
}

// ============================================================
// ACCORDION FUNCTIONALITY
// ============================================================

DOM.accordionItems.forEach(item => {
  const header = item.querySelector('.accordion-header');
  
  if (header) {
    header.addEventListener('click', () => {
      // Close all other accordions
      DOM.accordionItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('open')) {
          otherItem.classList.remove('open');
        }
      });
      
      // Toggle current accordion
      item.classList.toggle('open');
    });
  }
});

// ============================================================
// COUNTER ANIMATION
// ============================================================

const animateCounters = () => {
  DOM.counter.forEach(element => {
    if (element.dataset.animated) return;
    
    const target = parseInt(element.textContent);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + '+';
      }
    };
    
    element.dataset.animated = 'true';
    updateCounter();
  });
};

// Intersection Observer for lazy animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
      
      // Trigger counter animation when stats section is visible
      if (entry.target.classList.contains('stats-grid')) {
        animateCounters();
      }
    }
  });
}, observerOptions);

document.querySelectorAll('.card, .product-card, .hero-content, .section-title, .stats-grid').forEach(el => {
  observer.observe(el);
});

// ============================================================
// FORM HANDLING
// ============================================================

if (DOM.contactForm) {
  DOM.contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(DOM.contactForm);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.name || !data._replyto || !data.message) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data._replyto)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }
    
    // Form submission
    const submitBtn = DOM.contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
      const response = await fetch(DOM.contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        showNotification('Message sent successfully! We will be in touch soon.', 'success');
        DOM.contactForm.reset();
      } else {
        const result = await response.json();
        showNotification(result.errors ? result.errors.map(error => error.message).join(', ') : 'Oops! There was a problem submitting your form', 'error');
      }
    } catch (error) {
      showNotification('Oops! There was a problem submitting your form', 'error');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// ============================================================
// NOTIFICATION SYSTEM
// ============================================================

function showNotification(message, type = 'info') {
  // Remove any existing notifications
  document.querySelectorAll('.notification').forEach(n => n.remove());
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 16px 24px;
    background-color: ${type === 'success' ? '#D8C3A5' : '#FF6B6B'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 2000;
    animation: slideInRight 0.3s ease-out;
    font-weight: 500;
    max-width: 400px;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ============================================================
// ACTIVE NAV LINK ON PAGE LOAD
// ============================================================

function updateActiveNavLink() {
  const currentPath = window.location.pathname;
  DOM.navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPath || 
        (link.getAttribute('href') === '/' && currentPath === '/') ||
        currentPath.includes(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });
}

updateActiveNavLink();

// ============================================================
// PAGE LOAD ANIMATION
// ============================================================

window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// Initial opacity
if (document.body.style.opacity !== '1') {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.3s ease-out';
}

// ============================================================
// RESPONSIVE UTILITIES
// ============================================================

function isMobile() {
  return window.innerWidth < 768;
}

function isTablet() {
  return window.innerWidth >= 768 && window.innerWidth < 1024;
}

function isDesktop() {
  return window.innerWidth >= 1024;
}

// ============================================================
// SCROLL TO TOP BUTTON
// ============================================================

(function createScrollToTop() {
  // Prevent duplicate buttons
  if (document.querySelector('.scroll-top-btn')) return;
  
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.innerHTML = '↑';
  scrollTopBtn.className = 'scroll-top-btn';
  scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
  scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: var(--color-accent-secondary);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    box-shadow: var(--shadow-lg);
    transition: all var(--transition-base);
    z-index: 999;
  `;

  document.body.appendChild(scrollTopBtn);

  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'flex';
      } else {
        scrollTopBtn.style.display = 'none';
      }
    }, 50);
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'scale(1.1)';
  });

  scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'scale(1)';
  });
})();

// ============================================================
// REVEAL ON SCROLL
// ============================================================

const revealElements = document.querySelectorAll('[data-reveal]');

if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  revealElements.forEach(el => revealObserver.observe(el));
}

// ============================================================
// PRODUCT SLIDER / CAROUSEL
// ============================================================

class ProductSlider {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.wrapper = this.container.querySelector('.slider-wrapper');
    this.items = this.container.querySelectorAll('.slider-item');
    this.prevBtn = this.container.querySelector('.slider-btn-prev');
    this.nextBtn = this.container.querySelector('.slider-btn-next');
    this.dots = this.container.querySelectorAll('.slider-dot');
    
    this.currentIndex = 0;
    this.totalItems = this.items.length;
    this.autoPlayInterval = null;
    
    if (this.totalItems > 0) {
      this.init();
    }
  }
  
  init() {
    if (this.prevBtn && this.nextBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
      this.nextBtn.addEventListener('click', () => this.next());
    }
    
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goTo(index));
    });
    
    // Auto-play slider
    this.autoPlay();
    
    // Pause on hover
    this.container.addEventListener('mouseenter', () => {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
      }
    });
    
    this.container.addEventListener('mouseleave', () => this.autoPlay());
    
    // Touch swipe support
    let startX = 0;
    let isDragging = false;
    
    this.container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });
    
    this.container.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.next();
        } else {
          this.prev();
        }
      }
    }, { passive: true });
  }
  
  updateSlider() {
    const offset = -this.currentIndex * 100;
    this.wrapper.style.transform = `translateX(${offset}%)`;
    
    // Update dots
    this.dots.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.totalItems;
    this.updateSlider();
  }
  
  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
    this.updateSlider();
  }
  
  goTo(index) {
    this.currentIndex = index;
    this.updateSlider();
  }
  
  autoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
    this.autoPlayInterval = setInterval(() => {
      this.next();
    }, 5000); // Change slide every 5 seconds
  }
}

// ============================================================
// WHY BUY SLIDER FUNCTIONALITY
// ============================================================

function initWhyBuySlider() {
  const container = document.querySelector('.why-buy-slider-container');
  const wrapper = document.querySelector('.why-buy-slider-wrapper');
  const cards = document.querySelectorAll('.why-buy-card');
  const prevBtn = document.querySelector('.why-buy-nav-btn.prev');
  const nextBtn = document.querySelector('.why-buy-nav-btn.next');
  const dotsContainer = document.querySelector('.why-buy-dots');

  if (!container || !wrapper || cards.length === 0) return;

  let currentIndex = 0;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let isDragging = false;

  // Create dots
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('why-buy-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.why-buy-dot');

  function updateSlider() {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    if (!isMobile && !isTablet) {
      wrapper.style.transform = 'none';
      return;
    }

    const cardWidth = cards[0].offsetWidth;
    const gap = 15; // margin-right in CSS
    const padding = isMobile ? window.innerWidth * 0.05 : 20;
    
    const translateValue = -currentIndex * (cardWidth + gap) + padding;
    wrapper.style.transform = `translateX(${translateValue}px)`;
    
    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });

    // Update buttons
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === cards.length - 1;
  }

  function goToSlide(index) {
    const maxIndex = window.innerWidth < 768 ? cards.length - 1 : cards.length - 2;
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    updateSlider();
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

  // Touch Events
  container.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    wrapper.style.transition = 'none';
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    
    // Simple drag effect (optional, might conflict with standard scroll)
    // For now, we'll just handle the end gesture for simplicity
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    wrapper.style.transition = 'transform 0.4s ease-out';
    
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToSlide(currentIndex + 1);
      else goToSlide(currentIndex - 1);
    } else {
      updateSlider();
    }
  });

  window.addEventListener('resize', updateSlider);
  updateSlider();
}

// Initialize sliders when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductSlider('product-slider');
  initWhyBuySlider();
  
  // Ensure body opacity is set
  if (document.body.style.opacity !== '1') {
    document.body.style.opacity = '1';
  }
});

// ============================================================
// LANGUAGE / TRANSLATION SYSTEM
// ============================================================

const translations = {
  en: {
    // Navigation
    'nav-story': 'Our Story',
    'nav-why-buy': 'Why Buy',
    'nav-collection': 'Collection',
    'nav-contact': 'Contact',
    'nav-cta': 'Contact Us',
    
    // Home - Hero Section
    'home-title': 'Enjoy the authentic taste of selected coffee and cascara from the highlands of Central Java',
    'home-subtitle': 'From bold robusta, complex arabica, to refreshing cascara, discover the drink character that suits your taste.',
    'home-cta-collection': 'View Products',
    'home-cta-whatsapp': 'Order via WhatsApp',

    // Home - Sections
    'section-about': 'About Kanduman Cascara & Coffee',
    'about-intro-1': 'Kanduman Cascara & Coffee is a specialty coffee producer from Central Java, Indonesia, dedicated to delivering high-quality Robusta coffee, Arabica coffee, and Arabica cascara to customers worldwide. Our coffee originates from two distinguished growing regions: the Robusta plantations of Kandangan, Temanggung, located at elevations of approximately 800–1,200 meters above sea level, and the Arabica farms of Ngaduman, Salatiga, situated between 1,200–1,500 meters above sea level. These highland environments, combined with fertile volcanic soil and a cool mountain climate, create ideal conditions for producing coffee with exceptional character and consistency.',
    'about-intro-2': 'The Robusta coffee from Kandangan is renowned for its full body, rich aroma, chocolate notes, and balanced low acidity, making it highly valued by roasters and coffee businesses seeking a strong and distinctive flavor profile. Meanwhile, the Arabica coffee cultivated in Ngaduman develops elegant floral aromas, natural fruity sweetness, bright acidity, and a smooth finish thanks to its higher growing altitude and careful cultivation practices. In addition to our coffee beans, we also produce premium Arabica cascara, a naturally sweet tea-like beverage made from carefully processed coffee cherry husks, offering delicate notes of honey, dried fruits, and citrus.',
    'about-intro-3': 'At KandumanCascara & Coffee, we combine traditional farming knowledge with rigorous post-harvest processing and quality control to ensure every product meets the expectations of specialty coffee markets. From the highlands of Central Java to customers around the world, we are committed to preserving quality, freshness, and authenticity while providing flexible packaging and supply solutions for exporters, roasters, cafés, wholesalers, and retail customers. Through every harvest, we proudly showcase the unique flavors and rich coffee heritage of Kandangan and Ngaduman.',
    'about-intro-4': '',
    
    'section-vision': 'Vision & Mission',
    'vision-title': 'Our Vision',
    'vision-text': 'Become the preferred partner for premium Indonesian Robusta, Arabica, and cascara trusted for quality, sustainability, and consistent supply.',
    'mission-title': 'Our Mission',
    'mission-text': 'Deliver high-quality Robusta, Arabica, and cascara products with transparent pricing, reliable logistics, and excellent customer support for both wholesale and retail partners.',
    
    'why-buy-title': 'Why Buy From Kanduman Cascara & Coffee',
    'why-buy-subtitle': 'Premium coffee and cascara sourced directly from Central Java\'s highlands with transparent supply chains, flexible purchasing options, and reliable export services.',
    'why-buy-1-title': 'Best Price Direct From Farmers',
    'why-buy-1-desc': 'We source directly from coffee farmers in Kandangan and Ngaduman, eliminating unnecessary middlemen and providing competitive prices while maintaining premium quality standards.',
    'why-buy-2-title': 'Flexible Export Shipping',
    'why-buy-2-desc': 'Choose your preferred shipping and export logistics partner. We support international deliveries with flexible export solutions tailored to your destination country.',
    'why-buy-3-title': 'Custom Order Quantities',
    'why-buy-3-desc': 'Flexible purchasing options for every customer. Domestic buyers can order retail or wholesale quantities, while international buyers can purchase coffee and cascara in bulk and ton-scale volumes.',
    'why-buy-4-title': 'Full Traceability',
    'why-buy-4-desc': 'Every coffee bean and cascara product can be traced from farm to customer. We ensure transparency throughout cultivation, processing, packaging, and delivery.',
    
    'section-products-title': 'Three Perfect Flavor Choices',
    'section-products-desc': 'Each product is designed to provide a unique experience according to your preferences and needs',
    
    // Product Overview Cards
    'product-robusta-name': 'Robusta Coffee',
    'product-robusta-tag1': 'Strong Taste',
    'product-robusta-tag2': 'High Caffeine',
    'product-robusta-tag3': 'Thick Body',
    'product-robusta-desc': 'Nutty and chocolaty flavor character with a firm coffee sensation. Suitable for traditional coffee lovers and milk coffee that wants a dominant taste.',
    'product-robusta-caffeine-label': 'Caffeine:',
    'product-robusta-caffeine-value': 'High',
    'product-robusta-body-label': 'Body:',
    'product-robusta-body-value': 'Strong',
    'product-robusta-link': 'Learn more →',
    
    'product-arabika-name': 'Arabica Coffee',
    'product-arabika-tag1': 'Complex Taste',
    'product-arabika-tag2': 'Fruity & Floral',
    'product-arabika-tag3': 'High Acidity',
    'product-arabika-desc': 'Complex flavor profile with prominent acidity and rich aroma. Perfect for specialty brewing such as pour over, V60, or French Press.',
    'product-arabika-caffeine-label': 'Caffeine:',
    'product-arabika-caffeine-value': 'Medium',
    'product-arabika-taste-label': 'Taste:',
    'product-arabika-taste-value': 'Nuanced',
    'product-arabika-link': 'Learn more →',
    
    'product-cascara-name': 'Arabica Cascara',
    'product-cascara-tag1': 'Light & Fresh',
    'product-cascara-tag2': 'Low Caffeine',
    'product-cascara-tag3': 'Antioxidants',
    'product-cascara-desc': 'Premium tea from coffee cherry skins with dried fruit, honey, and floral characteristics. A modern health beverage low in caffeine and rich in benefits.',
    'product-cascara-caffeine-label': 'Caffeine:',
    'product-cascara-caffeine-value': 'Low',
    'product-cascara-type-label': 'Type:',
    'product-cascara-type-value': 'Herbal',
    'product-cascara-link': 'Learn more →',
    
    'home-cta-desc-1': 'Explore our collection of Robusta, Arabica, and Cascara products available per ton for wholesale or in retail packaging.',
    'home-cta-button': 'View Kanduman Collection',
    
    'cta-main': 'Ready to Experience Premium Coffee & Cascara?',
    
    // Collection Page
    'collection-title': 'Collection Robusta, Arabica & Cascara',
    'collection-subtitle': 'Collection of coffee and cascara raw materials: Robusta and Arabica available in several grades; cascara for tea and infusion. Wholesale and retail options.',
    'collection-browse': 'View Products',
    'collection-custom': 'Order Now',
    
    'filter-all': 'All Products',
    'filter-robusta': 'Robusta Coffee',
    'filter-arabika': 'Arabica Coffee',
    'filter-cascara': 'Arabica Cascara',
    
    'section-products': 'Premium Product Collection',
    'section-products-desc': 'Choose a product category that suits your taste preferences and needs',
    
    // Collection - Product Cards
    'product-card-robusta-category': 'Robusta Coffee',
    'product-card-robusta-name': 'Kandangan Robusta Coffee',
    'product-card-taste-notes': 'Taste Notes',
    'product-card-about': 'About the Product',
    'product-card-robusta-desc': 'Robusta has higher caffeine with strong taste, thick body, and firm coffee character. Ideal for espresso and milk coffee with rich aroma.',
    'product-card-wa': 'Order via WhatsApp',
    'product-card-email': 'Order via Email',
    
    'product-card-arabika-category': 'Arabica Coffee',
    'product-card-arabika-name': 'Ngaduman Arabica Coffee',
    'product-card-arabika-desc': 'Arabica with complex flavor and rich aroma, suitable for manual brew such as pour over, V60, and French Press. Smooth and balanced premium sensation.',
    
    'product-card-cascara-category': 'Arabica Cascara',
    'product-card-cascara-name': 'Ngaduman Arabica Cascara',
    'product-card-cascara-desc': 'Cascara is a tea made from arabica coffee cherry skins rich in antioxidants, dried fruit flavor, and honey aroma. A soft and refreshing choice for an alternative coffee experience.',
    
    // Comparison Table
    'comparison-title': 'Comparison of Three Kanduman Products',
    'comparison-desc': 'Choose the product that best suits your taste preferences and lifestyle',
    'comparison-aspect': 'Aspect',
    'comparison-col-robusta': 'Robusta Coffee',
    'comparison-col-arabika': 'Arabica Coffee',
    'comparison-col-cascara': 'Arabica Cascara',
    'comparison-caffeine': 'Caffeine Level',
    'comparison-caffeine-r': 'High (2.7% per bean)',
    'comparison-caffeine-a': 'Medium (1.5% per bean)',
    'comparison-caffeine-c': 'Low (< 0.5% per bean)',
    'comparison-acidity': 'Acidity',
    'comparison-acidity-r': 'Low (3/10)',
    'comparison-acidity-a': 'High (7/10)',
    'comparison-acidity-c': 'Medium (5/10)',
    'comparison-body': 'Body',
    'comparison-body-r': 'Strong (5/10)',
    'comparison-body-a': 'Light-Medium (5/10)',
    'comparison-body-c': 'Very Light (3/10)',
    'comparison-brew-method': 'Brewing Method',
    'comparison-brew-r': 'Espresso, Milk Coffee, Moka',
    'comparison-brew-a': 'Pour Over, V60, French Press, AeroPress',
    'comparison-brew-c': 'Hot Brew (3-5 min), Cold Brew',
    'comparison-best': 'Best For',
    'comparison-best-r': 'Energetic Mornings',
    'comparison-best-a': 'Specialty Taste Appreciation',
    'comparison-best-c': 'Relaxing & Healthy Afternoon/Evening',
    'comparison-rating': 'Overall Rating',
    'comparison-rating-r': '7/10 (Consistent)',
    'comparison-rating-a': '8/10 (Premium)',
    'comparison-rating-c': '8/10 (Unique & Healthy)',
    
    // Cascara Education
    'cascara-edu-title': 'About Arabica Cascara',
    'cascara-edu-subtitle': 'A Heritage Beverage Now Trending in Global Specialty Coffee',
    'cascara-edu-1-title': 'What is Cascara?',
    'cascara-edu-1-p1': 'Cascara (meaning "husk" in Spanish) is the dried skin of the coffee cherry after the coffee processing. For centuries, cascara has been used as a daily beverage in various coffee-producing countries such as Ethiopia, Yemen, Peru, and Colombia.',
    'cascara-edu-1-p2': 'In recent decades, cascara has gained international recognition as part of the specialty coffee movement. In 2015, the Specialty Coffee Association (SCA) recognized cascara as a specialty coffee beverage, elevating cascara from a by-product to a premium beverage valued in the global coffee market.',
    'cascara-edu-1-p3': 'Now, cascara is increasingly popular in European countries (especially Nordic countries) and North America as a wellness beverage rich in benefits and low in caffeine.',
    'cascara-edu-2-title': 'Flavor Profile & Benefits',
    'cascara-edu-2-p1': 'Ngaduman Arabica Cascara has a unique flavor profile combining premium fruit tea characteristics with herbal and berry notes. The natural sweet and balanced acidic taste makes it a refreshing beverage enjoyed either hot or cold.',
    'cascara-edu-2-benefits-title': 'Health Benefits:',
    'cascara-edu-2-li1': 'Rich in natural antioxidants (polyphenols)',
    'cascara-edu-2-li2': 'Low caffeine, safe to consume anytime',
    'cascara-edu-2-li3': 'Supports digestive health',
    'cascara-edu-2-li4': 'Suitable as a daily wellness beverage',
    
    'cta-ready': 'Ready to Experience Premium Coffee & Cascara?',
    'cta-collection': 'Contact us to place your order or inquire about bulk pricing and custom blends for Robusta, Arabica, or Cascara.',
    'cta-contact': 'Contact Us Today',
    
    // Contact Page
    'contact-title': 'Let\'s Connect with Kanduman Cascara & Coffee',
    'contact-subtitle': 'For inquiries about Robusta, Arabica, cascara, wholesale pricing, or custom orders reach out and we\'ll respond promptly.',
    'contact-message': 'Send an Email',
    'contact-wa': 'WhatsApp',
    'contact-connect-text': 'Contact us for orders, product consultation, and business partnerships.',
    
    'contact-form-title': 'Get in Touch',
    'contact-form-desc': 'We\'re here to help and answer any question you might have',
    'contact-section-form-heading': 'Send Us an Email',
    'contact-form-name': 'Full Name *',
    'contact-form-email': 'Email Address *',
    'contact-form-phone': 'Phone Number',
    'contact-form-company': 'Company Name',
    'contact-form-subject': 'Subject',
    'contact-form-message': 'Message *',
    'contact-form-submit': 'Send Message',
    
    'contact-form-subject-placeholder': 'Select a topic',
    'contact-form-subject-wholesale': 'Wholesale Inquiry',
    'contact-form-subject-business': 'Business Inquiry',
    'contact-form-subject-support': 'Customer Support',
    'contact-form-subject-custom': 'Custom Orders',
    'contact-form-subject-other': 'Other',
    
    'contact-info-title': 'Company Information',
    'contact-info-production': 'Production',
    'contact-info-production-detail': 'Robusta',
    'contact-info-distribution': 'Arabika & Cascara',
    'contact-info-location-temanggung': 'Kandangan, Temanggung Regency, Central Java',
    'contact-info-location-salatiga': 'Ngaduman, Salatiga City, Central Java',
    'contact-info-contact-heading': 'Contact',
    'contact-info-email': 'Email:',
    'contact-info-phone': 'WhatsApp:',
    'contact-info-response': 'Quick Response Time',
    'contact-info-response-text': 'We typically respond within 24 hours on business days',
    
    'contact-location': 'Our Location',
    
    'section-faq': 'Frequently Asked Questions',
    
    'faq-1-q': 'How can I become a distributor?',
    'faq-1-a': 'To become a distributor, please contact our sales team at niluh.osiniditami@gmail.com or fill out our contact form above. We\'ll review your request and discuss the best options for your business. Our team typically responds within 24 hours.',
    'faq-2-q': 'What is the minimum order quantity?',
    'faq-2-a': 'Minimum order quantities vary depending on the order type and product selection. For wholesale and distributor orders, we typically have a MOQ of 50kg. For retail orders, the minimum is usually 5kg per order. Custom quantities can be negotiated based on specific requirements. Contact our sales team for details.',
    'faq-3-q': 'Do you provide wholesale pricing?',
    'faq-3-a': 'Yes, we offer competitive wholesale pricing for qualified distributors and bulk buyers. Our pricing structure is tiered based on order volume and order frequency. For specific wholesale inquiries, please contact our sales team at niluh.osiniditami@gmail.com or via WhatsApp at +62 821-3989-1329.',
    'faq-4-q': 'Can businesses request custom products?',
    'faq-4-a': 'Absolutely! We offer custom blending services for corporate clients and hospitality partners. Whether you need a unique flavor profile, custom packaging, or branded products, our team can work with you to create the perfect solution. Minimum quantities apply. Reach out to discuss your specific needs.',
    'faq-5-q': 'What is your shipping and delivery policy?',
    'faq-5-a': 'We offer both domestic and international shipping with various delivery options. Standard delivery typically takes 3-5 business days, while express options are available for urgent orders. All shipments are tracked and insured. Shipping costs are calculated based on order size and destination. Contact us for detailed shipping information.',
    'faq-6-q': 'Do you offer technical support and training?',
    'faq-6-a': 'Yes, we provide comprehensive support to all our partners. This includes product training, storage recommendations, brewing guides, and marketing materials. For distributor and retail partners, we offer on-site training and regular support calls. Our customer support team is available during business hours to assist with any questions.',
    'faq-7-q': 'What are your payment terms?',
    'faq-7-a': 'Payment terms vary based on the order type and order history. Standard options include payment upon order, bank transfer, or credit terms for repeat customers. For specific payment arrangements, please discuss directly with our sales team or contact niluh.osiniditami@gmail.com.',
    
    'cta-meaningful': 'Let\'s Create Something Meaningful Together',
    'cta-meaningful-desc': 'Whether you\'re interested in our products or have questions, we\'re ready to discuss how we can work together.',
    'cta-touch': 'Get In Touch',
    
    // Footer
    'footer-quick-links': 'Quick Links',
    'footer-company': 'Company',
    'footer-products': 'Products',
    'footer-resources': 'Resources',
    'footer-support': 'Support',
    'footer-contact': 'Contact',
    
    'footer-link-story': 'Our Story',
    'footer-link-collection': 'Collection',
    'footer-link-contact': 'Contact',
    'footer-link-browse': 'Browse Collection',
    'footer-link-featured': 'Featured Products',
    'footer-link-new-arrivals': 'New Arrivals',
    'footer-link-about': 'About Us',
    'footer-link-get-in-touch': 'Get in Touch',
    'footer-link-faq': 'FAQ',
    'footer-link-shipping': 'Shipping Info',
    'footer-link-returns': 'Returns',
    'footer-link-brewing-guide': 'Brewing Guide',
    'footer-link-storage-tips': 'Storage Tips',
    
    'footer-contact-email': 'Email: niluh.osiniditami@gmail.com',
    'footer-contact-phone': 'WhatsApp: +62 821-3989-1329',
    'footer-contact-phone-text': 'Phone: +62 821-3989-1329',
    'footer-contact-address': 'Kandangan, Temanggung Regency; Ngaduman, Salatiga City Central Java, Indonesia',
    
    'footer-about-text': 'Premium Robusta, Arabica, and Cascara wholesale and retail from Central Java.',
    'footer-locations': 'Locations:',
    'footer-location-production': 'Kandangan, Temanggung Regency, Central Java ',
    'footer-location-distribution': 'Kandangan, Salatiga City, Central Java ',
    
    'footer-business': 'Business',
    'footer-business-touch': 'Get in Touch',
    'footer-business-wholesale': 'Wholesale Inquiry',
    'footer-business-support': 'Order Support',
    
    'footer-copyright': '© 2026 Kanduman Cascara & Coffee. All rights reserved.',
  },
  id: {
    // Navigasi
    'nav-story': 'Kisah Kami',
    'nav-why-buy': 'Kenapa Kami',
    'nav-collection': 'Koleksi',
    'nav-contact': 'Hubungi',
    'nav-cta': 'Hubungi Kami',
    
    // Home - Bagian Hero
    'home-title': 'Nikmati cita rasa autentik kopi dan cascara pilihan dari dataran tinggi Jawa Tengah',
    'home-subtitle': 'Dari robusta yang kuat, arabika yang kompleks, hingga cascara yang menyegarkan, temukan karakter minuman yang sesuai dengan selera Anda.',
    'home-cta-collection': 'Lihat Produk',
    'home-cta-whatsapp': 'Pesan via WhatsApp',
    
    // Home - Bagian
    'section-about': 'Tentang Kanduman Cascara & Coffee',
    'about-intro-1': 'KandumanCascara & Coffee adalah produsen kopi spesialti dari Jawa Tengah, Indonesia, yang berdedikasi untuk menghadirkan kopi Robusta, kopi Arabika, dan cascara Arabika berkualitas tinggi kepada pelanggan di seluruh dunia. Kopi kami berasal dari dua wilayah tanam unggulan: perkebunan Robusta di Kandangan, Temanggung, yang terletak di ketinggian sekitar 800–1.200 meter di atas permukaan laut (mdpl), dan kebun Arabika di Ngaduman, Salatiga, yang berada di antara 1.200–1.500 mdpl. Lingkungan dataran tinggi ini, berpadu dengan tanah vulkanik yang subur dan iklim pegunungan yang sejuk, menciptakan kondisi ideal untuk menghasilkan kopi dengan karakter dan konsistensi yang luar biasa.',
    'about-intro-2': 'Kopi Robusta dari Kandangan dikenal dengan body-nya yang tebal, aroma yang kaya, catatan rasa cokelat, serta keasaman rendah yang seimbang, menjadikannya sangat bernilai bagi penyangrai (roaster) dan bisnis kopi yang mencari profil rasa yang kuat dan khas. Sementara itu, kopi Arabika yang dibudidayakan di Ngaduman menghasilkan aroma floral yang elegan, rasa manis buah alami, keasaman yang cerah, dan hasil akhir yang halus (smooth finish) berkat ketinggian tanam yang lebih tinggi dan praktik budidaya yang teliti. Selain biji kopi, kami juga memproduksi cascara Arabika premium, minuman mirip teh yang manis alami dan terbuat dari kulit ceri kopi yang diproses secara hati-hati, menawarkan catatan rasa madu, buah-buahan kering, dan sitrus yang lembut.',
    'about-intro-3': 'Di Kanduman Cascara & Coffee, kami memadukan pengetahuan pertanian tradisional dengan proses pasca-panen yang ketat dan kontrol kualitas untuk memastikan setiap produk memenuhi ekspektasi pasar kopi spesialti. Dari dataran tinggi Jawa Tengah hingga ke pelanggan di seluruh dunia, kami berkomitmen untuk menjaga kualitas, kesegaran, dan keaslian sambil menyediakan solusi pengemasan dan pasokan yang fleksibel bagi eksportir, roaster, kafe, grosir, dan pelanggan ritel. Melalui setiap panen, kami dengan bangga menampilkan cita rasa unik dan warisan kopi yang kaya dari Kandangan dan Ngaduman.',
    'about-intro-4': '',
    
    'section-vision': 'Visi & Misi',
    'vision-title': 'Visi Kami',
    'vision-text': 'Menjadi mitra pilihan untuk Robusta, Arabica, dan cascara premium Indonesia dipercaya karena kualitas, keberlanjutan, dan pasokan yang konsisten.',
    'mission-title': 'Misi Kami',
    'mission-text': 'Menghadirkan produk Robusta, Arabica, dan cascara berkualitas tinggi dengan harga transparan, logistik andal, dan dukungan pelanggan yang sangat baik untuk mitra grosir dan eceran.',
    
    'why-buy-title': 'Mengapa Membeli dari Kanduman Cascara & Coffee',
    'why-buy-subtitle': 'Kopi dan cascara premium yang bersumber langsung dari dataran tinggi Jawa Tengah dengan rantai pasok yang transparan, opsi pembelian yang fleksibel, dan layanan ekspor yang andal.',
    'why-buy-1-title': 'Harga Terbaik Langsung Dari Petani',
    'why-buy-1-desc': 'Kami mengambil langsung dari petani kopi di Kandangan dan Ngaduman, meniadakan perantara yang tidak perlu dan memberikan harga kompetitif sambil menjaga standar kualitas premium.',
    'why-buy-2-title': 'Pengiriman Ekspor yang Fleksibel',
    'why-buy-2-desc': 'Pilih mitra logistik pengiriman dan ekspor pilihan Anda. Kami mendukung pengiriman internasional dengan solusi ekspor fleksibel yang disesuaikan dengan negara tujuan Anda.',
    'why-buy-3-title': 'Jumlah Pesanan Kustom',
    'why-buy-3-desc': 'Opsi pembelian fleksibel untuk setiap pelanggan. Pembeli domestik dapat memesan jumlah ritel atau grosir, sementara pembeli internasional dapat membeli kopi dan cascara dalam volume besar dan skala ton.',
    'why-buy-4-title': 'Ketertelusuran Penuh',
    'why-buy-4-desc': 'Setiap biji kopi dan produk cascara dapat ditelusuri dari kebun hingga ke pelanggan. Kami menjamin transparansi selama budidaya, pengolahan, pengemasan, dan pengiriman.',
    
    'section-products-title': 'Tiga Pilihan Rasa yang Sempurna',
    'section-products-desc': 'Setiap produk dirancang untuk memberikan pengalaman unik sesuai preferensi dan kebutuhan Anda',
    
    // Product Overview Cards
    'product-robusta-name': 'Kopi Robusta',
    'product-robusta-tag1': 'Rasa Kuat',
    'product-robusta-tag2': 'Kafein Tinggi',
    'product-robusta-tag3': 'Body Tebal',
    'product-robusta-desc': 'Karakter rasa nutty dan chocolaty dengan sensasi kopi yang tegas. Cocok untuk penikmat kopi tradisional dan kopi susu yang menginginkan rasa dominan.',
    'product-robusta-caffeine-label': 'Kafein:',
    'product-robusta-caffeine-value': 'Tinggi',
    'product-robusta-body-label': 'Body:',
    'product-robusta-body-value': 'Kuat',
    'product-robusta-link': 'Pelajari lebih →',
    
    'product-arabika-name': 'Kopi Arabika',
    'product-arabika-tag1': 'Rasa Kompleks',
    'product-arabika-tag2': 'Fruity & Floral',
    'product-arabika-tag3': 'Acidity Tinggi',
    'product-arabika-desc': 'Profil rasa kompleks dengan acidity yang menonjol dan aroma kaya. Sempurna untuk specialty brewing seperti pour over, V60, atau French Press.',
    'product-arabika-caffeine-label': 'Kafein:',
    'product-arabika-caffeine-value': 'Sedang',
    'product-arabika-taste-label': 'Rasa:',
    'product-arabika-taste-value': 'Nuanced',
    'product-arabika-link': 'Pelajari lebih →',
    
    'product-cascara-name': 'Cascara Arabika',
    'product-cascara-tag1': 'Ringan & Segar',
    'product-cascara-tag2': 'Kafein Rendah',
    'product-cascara-tag3': 'Antioksidan',
    'product-cascara-desc': 'Teh premium dari kulit buah kopi dengan karakter buah kering, madu, dan floral. Minuman kesehatan modern yang rendah kafein dan kaya manfaat.',
    'product-cascara-caffeine-label': 'Kafein:',
    'product-cascara-caffeine-value': 'Rendah',
    'product-cascara-type-label': 'Tipe:',
    'product-cascara-type-value': 'Herbal',
    'product-cascara-link': 'Pelajari lebih →',
    
    'home-cta-desc-1': 'Jelajahi koleksi Robusta, Arabica, dan produk Cascara kami tersedia per ton untuk wholesale atau dalam kemasan retail.',
    'home-cta-button': 'Lihat Koleksi Kanduman',
    
    'cta-main': 'Siap Merasakan Kopi Premium & Cascara?',
    
    // Halaman Koleksi
    'collection-title': 'Koleksi Robusta, Arabica & Cascara',
    'collection-subtitle': 'Koleksi bahan baku kopi dan cascara: Robusta dan Arabica tersedia dalam beberapa grade; cascara untuk teh dan infusion. Opsi wholesale dan retail.',
    'collection-browse': 'Lihat Produk',
    'collection-custom': 'Pesan Sekarang',
    
    'filter-all': 'Semua Produk',
    'filter-robusta': 'Kopi Robusta',
    'filter-arabika': 'Kopi Arabika',
    'filter-cascara': 'Cascara Arabika',
    
    'section-products': 'Koleksi Produk Premium',
    'section-products-desc': 'Pilih kategori produk yang sesuai dengan preferensi rasa dan kebutuhan Anda',
    
    // Product Cards
    'product-card-robusta-category': 'Kopi Robusta',
    'product-card-robusta-name': 'Kopi Robusta Kandangan',
    'product-card-taste-notes': 'Catatan Rasa',
    'product-card-about': 'Tentang Produk',
    'product-card-robusta-desc': 'Robusta memiliki kafein lebih tinggi dengan rasa kuat, body tebal, dan karakter kopi tegas. Ideal untuk espresso dan kopi susu yang kaya aroma.',
    'product-card-wa': 'Pesan via WhatsApp',
    'product-card-email': 'Pesan via Email',
    
    'product-card-arabika-category': 'Kopi Arabika',
    'product-card-arabika-name': 'Kopi Arabika Ngaduman',
    'product-card-arabika-desc': 'Arabika dengan rasa kompleks dan aroma kaya, cocok untuk manual brew seperti pour over, V60, dan French Press. Sensasi premium yang halus dan seimbang.',
    
    'product-card-cascara-category': 'Cascara Arabika',
    'product-card-cascara-name': 'Cascara Arabika Ngaduman',
    'product-card-cascara-desc': 'Cascara adalah teh dari kulit kopi arabika yang kaya antioksidan, rasa buah kering, dan aroma madu. Pilihan yang lembut dan menyegarkan untuk pengalaman minum kopi alternatif.',
    
    // Comparison Table
    'comparison-title': 'Perbandingan Ketiga Produk Kanduman',
    'comparison-desc': 'Pilih produk yang paling sesuai dengan preferensi rasa dan gaya hidup Anda',
    'comparison-aspect': 'Aspek',
    'comparison-col-robusta': 'Kopi Robusta',
    'comparison-col-arabika': 'Kopi Arabika',
    'comparison-col-cascara': 'Cascara Arabika',
    'comparison-caffeine': 'Tingkat Kafein',
    'comparison-caffeine-r': 'Tinggi (2.7% per biji)',
    'comparison-caffeine-a': 'Sedang (1.5% per biji)',
    'comparison-caffeine-c': 'Rendah (< 0.5% per biji)',
    'comparison-acidity': 'Acidity',
    'comparison-acidity-r': 'Rendah (3/10)',
    'comparison-acidity-a': 'Tinggi (7/10)',
    'comparison-acidity-c': 'Sedang (5/10)',
    'comparison-body': 'Body',
    'comparison-body-r': 'Kuat (5/10)',
    'comparison-body-a': 'Ringan-Medium (5/10)',
    'comparison-body-c': 'Sangat Ringan (3/10)',
    'comparison-brew-method': 'Metode Penyajian',
    'comparison-brew-r': 'Espresso, Kopi Susu, Moka',
    'comparison-brew-a': 'Pour Over, V60, French Press, AeroPress',
    'comparison-brew-c': 'Seduh Panas (3-5 menit), Dingin',
    'comparison-best': 'Terbaik Untuk',
    'comparison-best-r': 'Pagi yang Penuh Energi',
    'comparison-best-a': 'Apresiasi Rasa Specialty',
    'comparison-best-c': 'Sore/Malam Rileks & Sehat',
    'comparison-rating': 'Overall Rating',
    'comparison-rating-r': '7/10 (Konsisten)',
    'comparison-rating-a': '8/10 (Premium)',
    'comparison-rating-c': '8/10 (Unik & Sehat)',
    
    // Cascara Education
    'cascara-edu-title': 'Mengenal Cascara Arabika',
    'cascara-edu-subtitle': 'Minuman Heritage yang Kini Menjadi Trend di Specialty Coffee Global',
    'cascara-edu-1-title': 'Apa Itu Cascara?',
    'cascara-edu-1-p1': 'Cascara (yang berarti "kulit" dalam bahasa Spanyol) adalah kulit buah kopi yang dikeringkan setelah proses pengolahan kopi. Selama berabad-abad, cascara telah digunakan sebagai minuman sehari-hari di berbagai negara penghasil kopi seperti Ethiopia, Yemen, Peru, dan Colombia.',
    'cascara-edu-1-p2': 'Dalam beberapa dekade terakhir, cascara mulai mendapat pengakuan internasional sebagai bagian dari gerakan specialty coffee. Pada tahun 2015, Specialty Coffee Association (SCA) mengakui cascara sebagai minuman specialty coffee, meningkatkan status cascara dari produk sampingan menjadi minuman premium yang dihargai di pasar kopi global.',
    'cascara-edu-1-p3': 'Kini, cascara semakin populer di negara-negara Eropa (terutama Nordic countries) dan Amerika Utara sebagai minuman wellness yang kaya manfaat dan rendah kafein.',
    'cascara-edu-2-title': 'Profil Rasa & Manfaat',
    'cascara-edu-2-p1': 'Cascara Arabika Ngaduman memiliki profil rasa unik yang menggabungkan karakteristik teh buah premium dengan sentuhan herbal dan buah beri. Rasa natural yang manis dan asam seimbang menjadikannya minuman yang menyegarkan baik dinikmati panas atau dingin.',
    'cascara-edu-2-benefits-title': 'Manfaat Kesehatan:',
    'cascara-edu-2-li1': 'Kaya akan antioksidan alami (polyphenol)',
    'cascara-edu-2-li2': 'Rendah kafein, aman untuk dikonsumsi kapan saja',
    'cascara-edu-2-li3': 'Mendukung kesehatan pencernaan',
    'cascara-edu-2-li4': 'Cocok sebagai minuman wellness sehari-hari',
    
    'cta-ready': 'Siap Merasakan Kopi Premium & Cascara?',
    'cta-collection': 'Hubungi kami untuk melakukan pesanan atau menanyakan harga grosir dan campuran kustom untuk Robusta, Arabica, atau Cascara.',
    'cta-contact': 'Hubungi Kami Hari Ini',
    
    // Halaman Kontak
    'contact-title': 'Mari Terhubung dengan Kanduman Cascara & Coffee',
    'contact-subtitle': 'Untuk pertanyaan tentang Robusta, Arabika, cascara, harga grosir, atau pesanan kustom hubungi kami dan kami akan merespons segera.',
    'contact-message': 'Kirim Email',
    'contact-wa': 'WhatsApp',
    'contact-connect-text': 'Hubungi kami untuk pemesanan, konsultasi produk, dan kerja sama bisnis.',
    
    'contact-form-title': 'Hubungi Kami',
    'contact-form-desc': 'Kami di sini untuk membantu dan menjawab pertanyaan apa pun yang Anda miliki',
    'contact-section-form-heading': 'Kirim Email kepada Kami',
    'contact-form-name': 'Nama Lengkap *',
    'contact-form-email': 'Alamat Email *',
    'contact-form-phone': 'Nomor Telepon',
    'contact-form-company': 'Nama Perusahaan',
    'contact-form-subject': 'Subjek',
    'contact-form-message': 'Pesan *',
    'contact-form-submit': 'Kirim Pesan',
    
    'contact-form-subject-placeholder': 'Pilih topik',
    'contact-form-subject-wholesale': 'Pertanyaan Grosir',
    'contact-form-subject-business': 'Pertanyaan Bisnis',
    'contact-form-subject-support': 'Dukungan Pelanggan',
    'contact-form-subject-custom': 'Pesanan Kustom',
    'contact-form-subject-other': 'Lainnya',
    
    'contact-info-title': 'Informasi Perusahaan',
    'contact-info-production': 'Produksi',
    'contact-info-production-detail': 'Robusta',
    'contact-info-distribution': 'Arabika & Cascara',
    'contact-info-location-temanggung': 'Kandangan, Kabupaten Temanggung, Jawa Tengah',
    'contact-info-location-salatiga': 'Kandangan, Kota Salatiga, Jawa Tengah',
    'contact-info-contact-heading': 'Kontak',
    'contact-info-email': 'Email:',
    'contact-info-phone': 'WhatsApp:',
    'contact-info-response': 'Waktu Respons Cepat',
    'contact-info-response-text': 'Kami biasanya merespons dalam 24 jam pada hari kerja',
    
    'contact-location': 'Lokasi Kami',
    
    'section-faq': 'Pertanyaan yang Sering Diajukan',
    
    'faq-1-q': 'Bagaimana saya bisa menjadi distributor?',
    'faq-1-a': 'Untuk menjadi distributor, silakan hubungi tim penjualan kami di niluh.osiniditami@gmail.com atau isi formulir kontak di atas. Kami akan meninjau permintaan Anda dan mendiskusikan opsi terbaik untuk bisnis Anda. Tim kami biasanya merespons dalam 24 jam.',
    'faq-2-q': 'Berapa jumlah pesanan minimum?',
    'faq-2-a': 'Jumlah pesanan minimum bervariasi tergantung pada jenis pesanan dan pilihan produk. Untuk pesanan grosir dan distributor, kami biasanya memiliki MOQ 50kg. Untuk pesanan eceran, minimalnya adalah 5kg per pesanan. Jumlah kustom dapat dinegosiasikan berdasarkan kebutuhan spesifik. Hubungi tim penjualan kami untuk detail.',
    'faq-3-q': 'Apakah Anda menyediakan harga grosir?',
    'faq-3-a': 'Ya, kami menawarkan harga grosir yang kompetitif untuk distributor dan pembeli grosir yang memenuhi syarat. Struktur harga kami bertingkat berdasarkan volume dan frekuensi pesanan. Untuk pertanyaan grosir spesifik, silakan hubungi tim penjualan kami di niluh.osiniditami@gmail.com atau WhatsApp di +62 821-3989-1329.',
    'faq-4-q': 'Dapatkah bisnis meminta produk kustom?',
    'faq-4-a': 'Tentu saja! Kami menawarkan layanan pencampuran kustom untuk klien korporat dan mitra perhotelan. Apakah Anda memerlukan profil rasa unik, kemasan kustom, atau produk bermerek, tim kami dapat bekerja dengan Anda untuk menciptakan solusi yang sempurna. Jumlah minimum berlaku. Hubungi untuk mendiskusikan kebutuhan spesifik Anda.',
    'faq-5-q': 'Apa kebijakan pengiriman dan pengiriman Anda?',
    'faq-5-a': 'Kami menawarkan pengiriman domestik dan internasional dengan berbagai pilihan pengiriman. Pengiriman standar biasanya membutuhkan waktu 3-5 hari kerja, sedangkan opsi ekspres tersedia untuk pesanan mendesak. Semua pengiriman dilacak dan diasuransikan. Biaya pengiriman dihitung berdasarkan ukuran pesanan dan tujuan. Hubungi kami untuk informasi pengiriman terperinci.',
    'faq-6-q': 'Apakah Anda menawarkan dukungan teknis dan pelatihan?',
    'faq-6-a': 'Ya, kami menyediakan dukungan komprehensif kepada semua mitra kami. Ini termasuk pelatihan produk, rekomendasi penyimpanan, panduan menyeduh, dan materi pemasaran. Untuk mitra distributor dan ritel, kami menawarkan pelatihan on-site dan panggilan dukungan reguler. Tim dukungan pelanggan kami tersedia selama jam kerja untuk membantu pertanyaan apa pun.',
    'faq-7-q': 'Apa syarat pembayaran Anda?',
    'faq-7-a': 'Syarat pembayaran bervariasi berdasarkan jenis pesanan dan riwayat pesanan. Opsi standar termasuk pembayaran saat pemesanan, transfer bank, atau syarat kredit untuk pelanggan tetap. Untuk pengaturan pembayaran spesifik, silakan diskusikan langsung dengan tim penjualan kami atau hubungi niluh.osiniditami@gmail.com.',
    
    'cta-meaningful': 'Mari Ciptakan Sesuatu yang Bermakna Bersama-sama',
    'cta-meaningful-desc': 'Baik Anda tertarik dengan produk kami atau memiliki pertanyaan, kami siap mendiskusikan bagaimana kami dapat bekerja sama.',
    'cta-touch': 'Hubungi Kami',
    
    // Footer
    'footer-quick-links': 'Tautan Cepat',
    'footer-company': 'Perusahaan',
    'footer-products': 'Produk',
    'footer-resources': 'Sumber Daya',
    'footer-support': 'Dukungan',
    'footer-contact': 'Kontak',
    
    'footer-link-story': 'Kisah Kami',
    'footer-link-collection': 'Koleksi',
    'footer-link-contact': 'Kontak',
    'footer-link-browse': 'Jelajahi Koleksi',
    'footer-link-featured': 'Produk Unggulan',
    'footer-link-new-arrivals': 'Produk Baru',
    'footer-link-about': 'Tentang Kami',
    'footer-link-get-in-touch': 'Hubungi',
    'footer-link-faq': 'FAQ',
    'footer-link-shipping': 'Info Pengiriman',
    'footer-link-returns': 'Pengembalian',
    'footer-link-brewing-guide': 'Panduan Penyeduhan',
    'footer-link-storage-tips': 'Tips Penyimpanan',
    
    'footer-contact-email': 'Email: niluh.osiniditami@gmail.com',
    'footer-contact-phone': 'WhatsApp: +62 821-3989-1329',
    'footer-contact-phone-text': 'Telepon: +62 821-3989-1329',
    'footer-contact-address': 'Kandangan, Kabupaten Temanggung; Ngaduman, Kota Salatiga Jawa Tengah, Indonesia',
    
    'footer-about-text': 'Premium Robusta, Arabica, dan Cascara wholesale dan retail dari Jawa Tengah.',
    'footer-locations': 'Lokasi:',
    'footer-location-production': 'Kandangan, Kabupaten Temanggung, Jawa Tengah',
    'footer-location-distribution': 'Kandangan, Kota Salatiga, Jawa Tengah',
    
    'footer-business': 'Bisnis',
    'footer-business-touch': 'Hubungi Kami',
    'footer-business-wholesale': 'Pertanyaan Grosir',
    'footer-business-support': 'Dukungan Pesanan',
    
    'footer-copyright': '© 2026 KandumanCascara & Coffee. Semua hak dilindungi.',
  }
};

// ============================================================
// LANGUAGE SWITCHING
// ============================================================

let currentLang = 'en';

function switchLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const text = translations[lang][key];
    if (text) {
      // Handle different element types
      if (el.tagName === 'OPTION') {
        el.textContent = text;
      } else if (el.tagName === 'SELECT') {
        // Nothing, options are handled individually
      } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        if (el.hasAttribute('placeholder')) {
          el.placeholder = text;
        } else {
          el.value = text;
        }
      } else if (el.tagName === 'META') {
        el.content = text;
      } else if (el.tagName === 'TITLE') {
        el.textContent = text;
      } else {
        el.textContent = text;
      }
    }
  });
  
  // Update html lang attribute
  document.documentElement.lang = lang;
  
  // Update lang toggle buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  
  // Store preference
  try {
    localStorage.setItem('kanduman-lang', lang);
  } catch(e) {
    // localStorage not available
  }
}

// Initialize language toggle
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    switchLanguage(btn.dataset.lang);
  });
});

// Initialize language on page load (default EN)
document.addEventListener('DOMContentLoaded', () => {
  try {
    const savedLang = localStorage.getItem('kanduman-lang');
    if (savedLang && translations[savedLang]) {
      switchLanguage(savedLang);
    } else {
      // Default to English on first visit, apply translations
      switchLanguage('en');
    }
  } catch(e) {
    // localStorage not available
    switchLanguage('en');
  }
});
