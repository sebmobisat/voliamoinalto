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
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        formMessage.classList.remove('hidden', 'bg-red-100', 'text-red-700');
        formMessage.classList.add('bg-green-100', 'text-green-700');
        formMessage.textContent = currentLanguage === 'it'
            ? 'Messaggio inviato con successo! Ti risponderò entro 24 ore.'
            : 'Message sent successfully! I will reply within 24 hours.';
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
        
        // Log form data (for development)
        console.log('Form submitted:', data);
        
        // In production, you would send this to a backend:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(result => {
        //     // Handle success
        // })
        // .catch(error => {
        //     // Handle error
        // });
        
    }, 1500);
});

// Lazy Loading Images (if you add real images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => imageObserver.observe(img));
}

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



