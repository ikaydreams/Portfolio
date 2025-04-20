document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Show loader for a few seconds
    setTimeout(() => {
        document.querySelector('.loader').classList.add('hidden');
        setTimeout(() => {
            document.querySelector('.loader').style.display = 'none';
        }, 500);
    }, 2000);

    // Initialize sections
    initSections();

    // Initialize custom cursor
    initCustomCursor();

    // Initialize navigation
    initNavigation();

    // Initialize project cards
    initProjectCards();

    // Initialize skill bars
    initSkillBars();

    // Initialize contact form
    initContactForm();

    // Observe sections for animations
    observeSections();
});

// Initialize and animate sections when they become visible
function initSections() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        if (section.id === 'home') {
            section.classList.add('active');
        }
    });
}

// Custom cursor functionality
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Add 'active' class on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .cta-button, .project-card, .skill-item, .project-expand, .nav-link');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
            });
        });

        // Hide cursor when it leaves the window
        document.addEventListener('mouseout', (e) => {
            if (e.relatedTarget === null) {
                cursor.classList.add('hidden');
            }
        });

        document.addEventListener('mouseover', () => {
            cursor.classList.remove('hidden');
        });
    } else {
        cursor.style.display = 'none';
    }
}

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const scrollDownBtn = document.querySelector('.scroll-down');

    // Toggle menu on mobile
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Animate menu toggle bars
        const bars = menuToggle.querySelectorAll('.bar');
        if (menuToggle.classList.contains('active')) {
            bars[0].style.transform = 'translateY(9px) rotate(45deg)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'translateY(-9px) rotate(-45deg)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            const bars = menuToggle.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll to next section when scroll down button is clicked
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Set active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const offset = window.innerHeight / 3;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - offset;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Project cards functionality
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const expandButton = card.querySelector('.project-expand');
        
        expandButton.addEventListener('click', () => {
            card.classList.toggle('expanded');
        });
    });
}

// Initialize skill bars animation
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const progressBar = item.querySelector('.skill-progress');
            const percentage = progressBar.getAttribute('data-percentage');
            progressBar.style.width = `${percentage}%`;
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSentMessage = document.querySelector('.form-sent-message');
    const backButton = document.querySelector('.back-btn');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (name && email && message) {
            // Show success message
            formSentMessage.classList.add('active');
            
            // Reset form
            contactForm.reset();
        }
    });
    
    backButton.addEventListener('click', () => {
        formSentMessage.classList.remove('active');
    });
}

// Intersection Observer for section animations
function observeSections() {
    const sections = document.querySelectorAll('.section:not(.home-section)');
    
    // Options for the observer
    const options = {
        threshold: 0.3,
        rootMargin: '0px'
    };
    
    // Create an observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animate skill bars if in skills section
                if (entry.target.id === 'skills') {
                    const skillBars = entry.target.querySelectorAll('.skill-progress');
                    skillBars.forEach(bar => {
                        const percentage = bar.getAttribute('data-percentage');
                        setTimeout(() => {
                            bar.style.width = `${percentage}%`;
                        }, 300);
                    });
                }
                
                // Stop observing this section
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Start observing each section
    sections.forEach(section => {
        observer.observe(section);
    });
}
