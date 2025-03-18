document.addEventListener('DOMContentLoaded', function() {
    // Dynamic Text Animation
    const dynamicText = document.querySelector('.dynamic-text');
    const words = JSON.parse(dynamicText.getAttribute('data-words'));
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        dynamicText.textContent = currentChar;
        dynamicText.classList.add('stop-blinking');

        if (!isDeleting && charIndex < currentWord.length) {
            // Typing
            charIndex++;
            setTimeout(typeEffect, 200);
        } else if (isDeleting && charIndex > 0) {
            // Deleting
            charIndex--;
            setTimeout(typeEffect, 100);
        } else {
            // Switch words
            isDeleting = !isDeleting;
            dynamicText.classList.remove('stop-blinking');
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            setTimeout(typeEffect, 1200);
        }
    }

    typeEffect();

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Skills Animation
    const skillBars = document.querySelectorAll('.progress');
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const percentage = bar.parentElement.previousElementSibling.lastElementChild.textContent;
            bar.style.width = percentage;
        });
    }

    // Intersection Observer for skill animations
    const skillsSection = document.querySelector('.expertise');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
            }
        });
    }, { threshold: 0.5 });

    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add form validation
            const formData = new FormData(this);
            const errors = [];

            formData.forEach((value, key) => {
                if (!value) {
                    errors.push(`${key} is required`);
                }
            });

            if (errors.length === 0) {
                // Success message
                const button = this.querySelector('button[type="submit"]');
                const originalText = button.textContent;
                button.textContent = 'Message Sent!';
                button.disabled = true;

                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    this.reset();
                }, 3000);
            } else {
                alert(errors.join('\n'));
            }
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }

    // Project Cards Hover Effect
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once animation is triggered
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .project-card, .timeline-item, .point');
    animatedElements.forEach(el => observer.observe(el));
});
