/**
 * Modern Blog - Main JavaScript
 * Handles theme toggle, mobile navigation, search, and performance optimizations
 */

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileNav();
    initSearch();
    initLazyLoading();
    initSmoothScroll();
});

/**
 * Theme Toggle (Dark/Light Mode)
 * Persists user preference in localStorage
 */
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add animation class
        themeToggle.classList.add('fade-in');
        setTimeout(() => themeToggle.classList.remove('fade-in'), 300);
    });
}

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle, .mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu, .main-nav');
    
    if (!navToggle || !navMenu) return;

    const setMenuState = (isOpen) => {
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navMenu.classList.toggle('active', isOpen);
        navToggle.classList.toggle('active', isOpen);
    };

    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        setMenuState(!isExpanded);
    });

    navMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setMenuState(false));
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            setMenuState(false);
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            setMenuState(false);
        }
    });
}

/**
 * Search Functionality
 * Basic client-side search implementation
 */
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (!searchInput) return;

    // Handle search submission
    const handleSearch = (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        
        if (query) {
            const script = document.querySelector('script[src*="scripts/main.js"]');
            const siteRoot = script
                ? new URL(script.getAttribute('src'), window.location.href).href.replace(/scripts\/main\.js(?:[?#].*)?$/, '')
                : './';
            window.location.href = `${siteRoot}search/?q=${encodeURIComponent(query)}`;
        }
    };

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    });

    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
}

/**
 * Lazy Loading Images
 * Improves initial page load performance
 */
function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src;
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        script.async = true;
        document.body.appendChild(script);
    }
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                // Account for fixed header height
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without scrolling
                history.pushState(null, null, href);
            }
        });
    });
}

/**
 * Debounce Function
 * Utility for limiting function execution rate
 */
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

/**
 * Throttle Function
 * Utility for limiting function execution rate
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Intersection Observer for Animations
 * Triggers animations when elements come into view
 */
function observeElements(selector, callback) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    document.querySelectorAll(selector).forEach(el => observer.observe(el));
}

// Initialize fade-in animations on scroll
observeElements('.post-card, .category-card', (element) => {
    element.classList.add('fade-in');
});

/**
 * Reading Time Calculator
 * Estimates reading time based on word count
 */
function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
}

/**
 * Share Functionality
 * Web Share API with fallback
 */
async function shareArticle(title, url, text) {
    if (navigator.share) {
        try {
            await navigator.share({
                title: title,
                url: url,
                text: text
            });
        } catch (err) {
            console.log('Share canceled');
        }
    } else {
        // Fallback: copy to clipboard
        try {
            await navigator.clipboard.writeText(url);
            alert('Link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }
}

/**
 * Performance: Preload critical resources
 */
function preloadResources() {
    const criticalResources = [
        // Add URLs of critical resources to preload
    ];
    
    criticalResources.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = url;
        document.head.appendChild(link);
    });
}

/**
 * Analytics Placeholder
 * Integrate with your preferred analytics service
 */
function trackPageView() {
    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', 'page_view', {
    //         page_title: document.title,
    //         page_location: window.location.href
    //     });
    // }
    
    // Example: Plausible Analytics
    // plausible('pageview');
}

// Track page view on load
window.addEventListener('load', trackPageView);

/**
 * Service Worker Registration (Optional - for PWA)
 * Uncomment to enable offline support
 */
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/sw.js')
//             .then(registration => {
//                 console.log('SW registered:', registration);
//             })
//             .catch(error => {
//                 console.log('SW registration failed:', error);
//             });
//     });
// }

console.log('Modern Blog initialized successfully! 🚀');
