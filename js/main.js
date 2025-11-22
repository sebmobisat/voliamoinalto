// Main JavaScript for Voliamo in Alto Website

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    
    // Abilita supporto WebP automatico
    enableWebPSupport();
});

// Language Management
let currentLanguage = localStorage.getItem('language') || 'it';

// Set initial language
document.addEventListener('DOMContentLoaded', function() {
    setLanguage(currentLanguage);
    updateLanguageButton();
});

// Language Toggle Buttons
document.getElementById('langToggle')?.addEventListener('click', toggleLanguage);
document.getElementById('langToggleMobile')?.addEventListener('click', toggleLanguage);

function toggleLanguage() {
    currentLanguage = currentLanguage === 'it' ? 'en' : 'it';
    setLanguage(currentLanguage);
    localStorage.setItem('language', currentLanguage);
    updateLanguageButton();
}

function updateLanguageButton() {
    const langButtons = document.querySelectorAll('#currentLang, #currentLangMobile');
    langButtons.forEach(btn => {
        btn.textContent = currentLanguage.toUpperCase();
    });
}

function setLanguage(lang) {
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update all elements with data-it and data-en attributes
    const elements = document.querySelectorAll('[data-it][data-en]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            // Check if it's a text node or attribute
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else if (element.tagName === 'OPTION') {
                element.textContent = text;
            } else if (element.tagName === 'META') {
                element.setAttribute('content', text);
            } else if (element.tagName === 'TITLE') {
                element.textContent = text;
            } else {
                element.textContent = text;
            }
        }
    });
    
    // Update placeholders
    const placeholders = document.querySelectorAll('[data-it-placeholder][data-en-placeholder]');
    placeholders.forEach(element => {
        const placeholder = element.getAttribute(`data-${lang}-placeholder`);
        if (placeholder) {
            element.placeholder = placeholder;
        }
    });
    
    // Update page title
    const titleElement = document.querySelector('title');
    if (titleElement) {
        const title = titleElement.getAttribute(`data-${lang}`);
        if (title) {
            titleElement.textContent = title;
        }
    }
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        const desc = metaDesc.getAttribute(`data-${lang}`);
        if (desc) {
            metaDesc.setAttribute('content', desc);
        }
    }
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn?.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = document.querySelectorAll('#mobileMenu a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Header Scroll Effect
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = currentLanguage === 'it' 
        ? '<i class="fas fa-spinner fa-spin mr-2"></i>Invio in corso...' 
        : '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
    
    // Send to API
    fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            // Show success message
            formMessage.classList.remove('hidden', 'bg-red-100', 'text-red-700');
            formMessage.classList.add('bg-green-100', 'text-green-700');
            formMessage.textContent = currentLanguage === 'it'
                ? '✅ Messaggio inviato con successo! Ti risponderò entro 24 ore.'
                : '✅ Message sent successfully! I will reply within 24 hours.';
            
            // Reset form
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);
        } else {
            throw new Error(result.message);
        }
    })
    .catch(error => {
        // Show error message
        formMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
        formMessage.classList.add('bg-red-100', 'text-red-700');
        formMessage.textContent = currentLanguage === 'it'
            ? '❌ Errore durante l\'invio. Riprova o contattami via email.'
            : '❌ Error sending message. Please try again or contact me via email.';
        
        console.error('Form submission error:', error);
    })
    .finally(() => {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    });
});

// Auto WebP Support - Sostituisce automaticamente JPG/PNG con WebP se disponibile
function enableWebPSupport() {
    // Controlla se il browser supporta WebP
    const webpSupported = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
    
    if (webpSupported) {
        // Trova tutte le immagini JPG/PNG e prova a caricare la versione WebP
        const images = document.querySelectorAll('img[src$=".jpg"], img[src$=".jpeg"], img[src$=".png"]');
        
        images.forEach(img => {
            const originalSrc = img.src;
            const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
            
            // Prova a caricare WebP
            const testImg = new Image();
            testImg.onload = function() {
                // WebP esiste, sostituisci
                img.src = webpSrc;
            };
            testImg.onerror = function() {
                // WebP non esiste, mantieni originale
            };
            testImg.src = webpSrc;
        });
    }
}

// Enhanced Lazy Loading Images with IntersectionObserver
// This works for images with data-src attribute (fallback for older browsers)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    // Add loading state
                    img.classList.add('loading');
                    
                    // Load the image
                    const imageLoader = new Image();
                    imageLoader.onload = () => {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy', 'loading');
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    };
                    imageLoader.onerror = () => {
                        img.classList.remove('lazy', 'loading');
                        img.classList.add('error');
                        imageObserver.unobserve(img);
                    };
                    imageLoader.src = img.dataset.src;
                }
            }
        });
    }, {
        rootMargin: '50px' // Start loading 50px before entering viewport
    });
    
    // Observe images with data-src (for fallback lazy loading)
    const lazyImages = document.querySelectorAll('img.lazy[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // Also enhance native lazy loading with fetchpriority
    const nativeLazyImages = document.querySelectorAll('img[loading="lazy"]:not([fetchpriority])');
    nativeLazyImages.forEach(img => {
        // Set fetchpriority to low for lazy images
        img.setAttribute('fetchpriority', 'low');
        
        // Add sizes attribute if not present for responsive images
        if (!img.hasAttribute('sizes') && img.classList.contains('w-full')) {
            img.setAttribute('sizes', '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw');
        }
    });
    
    // Preload images that are about to enter viewport
    const preloadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.srcset) {
                    // Preload srcset images
                    const link = document.createElement('link');
                    link.rel = 'preload';
                    link.as = 'image';
                    link.href = img.dataset.srcset.split(',')[0].trim().split(' ')[0];
                    document.head.appendChild(link);
                }
            }
        });
    }, {
        rootMargin: '100px'
    });
    
    const preloadImages = document.querySelectorAll('img[data-srcset]');
    preloadImages.forEach(img => preloadObserver.observe(img));
}

// ============================================
// SISTEMA INTELLIGENTE LAZY LOADING VIDEO
// con detection velocità connessione
// ============================================

// Rileva velocità di connessione
function getConnectionSpeed() {
    if (!navigator.connection) return 'unknown';
    
    const connection = navigator.connection;
    const effectiveType = connection.effectiveType; // '4g', '3g', '2g', 'slow-2g'
    
    // Classifica connessione
    if (effectiveType === '4g' || effectiveType === 'wifi') return 'fast';
    if (effectiveType === '3g') return 'medium';
    return 'slow';
}

// Rileva se l'utente ha Save-Data attivo
function hasSaveDataEnabled() {
    return navigator.connection && navigator.connection.saveData === true;
}

// ============================================
// HERO ANIMATION - CSS PURO (NO VIDEO)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const connectionSpeed = getConnectionSpeed();
    console.log(`🎨 Hero Animation: CSS PURO (animazione droni)`);
    console.log(`📡 Velocità: ${connectionSpeed} | Performance: OTTIMIZZATA`);
    console.log(`✅ Zero video = Zero latenza = Performance 90+`);
});

// NO VIDEO = NO LAZY LOADING NEEDED!
// Tutto è CSS puro, carica istantaneamente 🚀
console.log('⚡ Performance Mode: MASSIMA - Solo CSS animations');

// ============================================
// INDICATORE VELOCITÀ CONNESSIONE (opzionale)
// ============================================
function showConnectionNotification(speed) {
    // Crea indicatore se non esiste
    let indicator = document.querySelector('.connection-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.className = 'connection-indicator';
        document.body.appendChild(indicator);
    }
    
    // Imposta messaggio e stile
    const messages = {
        'fast': '🚀 Connessione veloce',
        'medium': '⚡ Connessione media',
        'slow': '🐌 Connessione lenta - video disattivati',
        'unknown': '📡 Connessione rilevata'
    };
    
    indicator.textContent = messages[speed] || messages['unknown'];
    indicator.className = `connection-indicator connection-${speed} show`;
    
    // Nascondi dopo 5 secondi
    setTimeout(() => {
        indicator.classList.remove('show');
    }, 5000);
}

// Mostra indicatore all'avvio (opzionale - commenta se non vuoi)
// setTimeout(() => {
//     const speed = getConnectionSpeed();
//     if (speed !== 'fast' && speed !== 'unknown') {
//         showConnectionNotification(speed);
//     }
// }, 2000);

// ============================================
// PERFORMANCE MONITORING
// ============================================

// Monitora Core Web Vitals
if ('PerformanceObserver' in window) {
    // Largest Contentful Paint (LCP)
    try {
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log(`📊 LCP: ${lastEntry.renderTime || lastEntry.loadTime}ms`);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
        // Browser non supporta
    }
    
    // First Input Delay (FID)
    try {
        const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                console.log(`📊 FID: ${entry.processingStart - entry.startTime}ms`);
            });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
        // Browser non supporta
    }
    
    // Cumulative Layout Shift (CLS)
    try {
        let clsScore = 0;
        const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsScore += entry.value;
                }
            }
            console.log(`📊 CLS: ${clsScore.toFixed(4)}`);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
        // Browser non supporta
    }
}

// Monitora tempo di caricamento immagini
const imageLoadTimes = [];
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        const startTime = performance.now();
        img.addEventListener('load', () => {
            const loadTime = performance.now() - startTime;
            imageLoadTimes.push(loadTime);
            if (loadTime > 1000) {
                console.warn(`⚠️  Immagine lenta: ${img.src.split('/').pop()} - ${loadTime.toFixed(0)}ms`);
            }
        });
    });
});

// Log statistiche performance alla fine del caricamento
window.addEventListener('load', () => {
    setTimeout(() => {
        if (imageLoadTimes.length > 0) {
            const avgTime = imageLoadTimes.reduce((a, b) => a + b, 0) / imageLoadTimes.length;
            console.log(`📊 Tempo medio caricamento immagini: ${avgTime.toFixed(0)}ms`);
        }
        
        // Navigation Timing
        if (window.performance && window.performance.timing) {
            const timing = window.performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
            
            console.log(`📊 Statistiche Performance:`);
            console.log(`   - DOM Ready: ${domReady}ms`);
            console.log(`   - Page Load: ${loadTime}ms`);
            console.log(`   - TTFB: ${timing.responseStart - timing.navigationStart}ms`);
        }
    }, 1000);
});

// Add floating animation to hero elements
const floatingElements = document.querySelectorAll('.floating');
floatingElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.5}s`;
});

// Console welcome message
console.log('%c🚁 Voliamo in Alto', 'color: #2563eb; font-size: 24px; font-weight: bold;');
console.log('%cProfessional Drone & Video Services', 'color: #6b7280; font-size: 14px;');
console.log('%cwww.voliamoinalto.com', 'color: #2563eb; font-size: 12px;');

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handlers
const optimizedScroll = debounce(() => {
    // Your scroll handlers here
}, 10);

window.addEventListener('scroll', optimizedScroll);

// Preload critical resources
const preloadImage = (url) => {
    const img = new Image();
    img.src = url;
};

// Add any critical images to preload here
// preloadImage('/path/to/image.jpg');

// Service Worker Registration (optional, for PWA functionality)
if ('serviceWorker' in navigator) {
    // Uncomment when you have a service worker file
    // window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('/sw.js')
    //         .then(registration => console.log('SW registered'))
    //         .catch(err => console.log('SW registration failed'));
    // });
}

// Analytics tracking (add your analytics code here)
// Example: Google Analytics, Matomo, etc.
function trackEvent(category, action, label) {
    // ga('send', 'event', category, action, label);
    console.log('Event tracked:', category, action, label);
}

// Track important user interactions
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('Navigation', 'Click', link.getAttribute('href'));
    });
});

// Track external links
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('Outbound Link', 'Click', link.href);
    });
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiSequence.length);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        console.log('%c🎉 Congratulations! You found the Konami code!', 'color: #2563eb; font-size: 18px; font-weight: bold;');
        // Add a fun animation or effect here
        document.body.style.animation = 'blob 2s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
});



