// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Set current year in the footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Smooth scroll for navigation links (both desktop and mobile)
    document.querySelectorAll('header nav a[href^="#"], #mobile-menu a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent the default anchor click behavior

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = mobileMenuButton ? mobileMenuButton.querySelector('i') : null;

    if (mobileMenuButton && mobileMenu && menuIcon) {
        mobileMenuButton.addEventListener('click', () => {
            // Toggle visibility class for slide animation
            mobileMenu.classList.toggle('mobile-menu-visible');
            mobileMenu.classList.toggle('mobile-menu-hidden'); // Ensure one is always present for initial state

            // Change the menu icon (bars to times, and vice-versa)
            if (mobileMenu.classList.contains('mobile-menu-visible')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
                menuIcon.style.transform = 'rotate(90deg)'; // Rotate icon
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
                menuIcon.style.transform = 'rotate(0deg)'; // Rotate back
            }
        });

        // Close mobile menu when a link inside it is clicked
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenu.classList.contains('mobile-menu-visible')) {
                    mobileMenu.classList.remove('mobile-menu-visible');
                    mobileMenu.classList.add('mobile-menu-hidden');
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                    menuIcon.style.transform = 'rotate(0deg)';
                }
            });
        });
    }


    // Scroll Animation using Intersection Observer
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries, observerRef) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optional: Unobserve after animation to save resources
                    // observerRef.unobserve(entry.target);
                } else {
                    // Optional: Remove class if you want animation to replay on scroll up
                    // entry.target.classList.remove('is-visible');
                }
            });
        }, {
            root: null, // observes intersections relative to the viewport
            threshold: 0.1 // trigger when 10% of the element is visible
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

});
