// ====================================
// SELECTORS
// ====================================
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const yearSpan = document.getElementById('current-year');

// ====================================
// NAVBAR SCROLL EFFECT
// ====================================
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ====================================
// MOBILE MENU TOGGLE
// ====================================
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const isVisible = navLinks.style.display === 'flex';
        navLinks.style.display = isVisible ? 'none' : 'flex';

        if (!isVisible) {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'var(--primary-green)';
            navLinks.style.padding = '1rem';
            navLinks.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);

        if (navLinks.style.display === 'flex' && !isClickInsideNav && !isClickOnToggle) {
            navLinks.style.display = 'none';
        }
    });
}

// ====================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        if (href === '#') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (window.innerWidth <= 968 && navLinks) {
                navLinks.style.display = 'none';
            }
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (window.innerWidth <= 968 && navLinks) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// ====================================
// UPDATE COPYRIGHT YEAR
// ====================================
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}