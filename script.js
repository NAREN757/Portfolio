document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const logos = document.querySelectorAll('#theme-logo, #footer-logo, .hero-mascot');
    
    // Set initial theme
    const setLightMode = () => {
        root.setAttribute('data-theme', 'light');
        logos.forEach(logo => {
            if (logo) logo.src = 'Lightthemelog.png';
        });
    };
    
    const setDarkMode = () => {
        root.setAttribute('data-theme', 'dark');
        logos.forEach(logo => {
            if (logo) logo.src = 'Darkthemelogo.png';
        });
    };
    
    // Default to light theme
    setLightMode();
    
    // Toggle theme on button click
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                setLightMode();
            } else {
                setDarkMode();
            }
        });
    }

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Only animate once
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        // Respect prefers-reduced-motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            el.classList.add('active');
        } else {
            revealObserver.observe(el);
        }
    });
});

// Handle Loading Screen
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        // Artificial delay so the cool animation is seen even on fast local connections
        setTimeout(() => {
            loader.classList.add('hidden');
            // Remove from DOM after fade out transition (0.5s)
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1500);
    }
});
