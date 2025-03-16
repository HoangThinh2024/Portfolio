// Typing Animation
document.addEventListener('DOMContentLoaded', function() {
    const typingText = document.getElementById('typing-text');
    const words = ["Data Analyst", "AI Developer", "Researcher", "Problem Solver"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 200;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 100;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 200;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingDelay = 1000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingDelay = 500; // Pause before typing next word
        }
        
        setTimeout(type, typingDelay);
    }
    
    // Start typing animation
    setTimeout(type, 1000);
    
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking a nav link on mobile
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Active navigation link on scroll
    const sections = document.querySelectorAll('section');
    
    function setActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Project Modal
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');
    const projectLinks = document.querySelectorAll('.project-link');
    
    // Project templates
    const projectTemplates = {
        'object-recognition': document.getElementById('object-recognition-template').innerHTML,
        'text-to-speech': document.getElementById('text-to-speech-template').innerHTML,
        'product-management': document.getElementById('product-management-template').innerHTML
    };
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            modalBody.innerHTML = projectTemplates[projectId];
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically handle form submission with AJAX
        // For demo purposes, we'll just show an alert
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });

    // Animation on scroll
    const animatedElements = document.querySelectorAll('.animate');

    function checkIfInView() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate-in');
            }
        });
    }

    // Initial check
    checkIfInView();

    // Check on scroll
    window.addEventListener('scroll', checkIfInView);

    // Skills progress bars animation
    const skillBars = document.querySelectorAll('.skill-progress');

    function animateSkillBars() {
        skillBars.forEach(bar => {
            const percentage = bar.getAttribute('data-percentage');
            bar.style.width = percentage + '%';
        });
    }

    // Animate skill bars when skills section comes into view
    const skillsSection = document.getElementById('skills');

    function checkSkillsInView() {
        const skillsSectionTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (skillsSectionTop < windowHeight - 100) {
            animateSkillBars();
            window.removeEventListener('scroll', checkSkillsInView);
        }
    }

    window.addEventListener('scroll', checkSkillsInView);

    // Testimonial slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    function showSlide(index) {
        testimonialSlider.style.transform = `translateX(-${index * 100}%)`;
        currentSlide = index;
    }

    nextBtn.addEventListener('click', function() {
        if (currentSlide < testimonials.length - 1) {
            showSlide(currentSlide + 1);
        } else {
            showSlide(0);
        }
    });

    prevBtn.addEventListener('click', function() {
        if (currentSlide > 0) {
            showSlide(currentSlide - 1);
        } else {
            showSlide(testimonials.length - 1);
        }
    });

    // Auto slide
    let slideInterval = setInterval(() => {
        if (currentSlide < testimonials.length - 1) {
            showSlide(currentSlide + 1);
        } else {
            showSlide(0);
        }
    }, 5000);

    // Pause auto slide on hover
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    // Resume auto slide on mouse leave
    testimonialSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            if (currentSlide < testimonials.length - 1) {
                showSlide(currentSlide + 1);
            } else {
                showSlide(0);
            }
        }, 5000);
    });})