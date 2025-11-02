// ====================================
// SELECTORS
// ====================================
const navbar = document.getElementById('navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const yearSpan = document.getElementById('current-year');

// ====================================
// NAVBAR SCROLL EFFECT
// ====================================
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ====================================
// MOBILE MENU
// ====================================
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        // Toggle visibility
        const isVisible = navLinks.style.display === 'flex';
        navLinks.style.display = isVisible ? 'none' : 'flex';

        // Apply styles when menu is opened
        if (!isVisible) {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%'; // Position below the navbar
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'var(--primary-green)';
            navLinks.style.padding = '1rem';
            navLinks.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        }
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);

        if (navLinks.style.display === 'flex' && !isClickInsideNav && !isClickOnToggle) {
            navLinks.style.display = 'none';
        }
    });
}

// ====================================
// SMOOTH SCROLLING
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Handle href="#" to scroll to top
        if (href === '#') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // Close mobile menu if open
            if (window.innerWidth <= 968 && navLinks) {
                navLinks.style.display = 'none';
            }
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Close mobile menu if open
            if (window.innerWidth <= 968 && navLinks) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// ====================================
// SCROLL ANIMATION
// ====================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Optional: stop observing after animation
        }
    });
}, observerOptions);

// Add any elements from your index page you want to animate here
document.querySelectorAll('.service-choice-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ====================================
// TESTIMONIAL SLIDERS
// ====================================
const homeSlider = document.querySelector('.testimonial-slider-home');
if (homeSlider) {
    new Swiper('.testimonial-slider-home', {
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: '.pagination-home', clickable: true },
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
            640: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 30 }
        }
    });
}

const autoSlider = document.querySelector('.testimonial-slider-auto');
if (autoSlider) {
    new Swiper('.testimonial-slider-auto', {
        loop: true,
        autoplay: { delay: 4500, disableOnInteraction: false },
        pagination: { el: '.pagination-auto', clickable: true },
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
            640: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 30 }
        }
    });
}

// ====================================
// UPDATE COPYRIGHT YEAR
// ====================================
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}