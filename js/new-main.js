document.addEventListener('DOMContentLoaded', function() {
    // Initialize the preloader
    setTimeout(() => {
        document.querySelector('.preloader').classList.add('hidden');
        
        // Ensure we're at the top of the page after preloader disappears
        window.scrollTo(0, 0);
        
        // Make sure home section is visible first and nav is properly set
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector('.nav-menu a[href="#home"]').classList.add('active');
    }, 2000);
    
    // Update current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize particles background
    initParticles();
    
    // Initialize sticky header on scroll
    initStickyHeader();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScroll();
    
    // Initialize mobile menu toggle
    initMobileMenu();
    
    // Initialize text rotation animation
    initTextRotation();
    
    // Initialize skill bars animation
    initSkillBars();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize theme switcher
    initThemeSwitcher();
});

// Initialize particles.js for background effect
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#2563eb'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#4285f4',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Make header sticky on scroll
function initStickyHeader() {
    const header = document.querySelector('.header');
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
}

// Enable smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            document.querySelector('.nav-menu').classList.remove('active');
            document.querySelector('.menu-btn').classList.remove('active');
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate header height dynamically
                const headerHeight = document.querySelector('.header').offsetHeight;
                
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Update active nav link on scroll, with home section priority
    window.addEventListener('scroll', () => {
        // If we're at the very top of the page, always highlight home
        if (window.scrollY < 10) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector('.nav-menu a[href="#home"]').classList.add('active');
            return;
        }
        
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const id = section.getAttribute('id');
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Toggle mobile menu
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Text rotation animation
function initTextRotation() {
    const TxtRotate = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };
    
    TxtRotate.prototype.tick = function() {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];
        
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        
        this.el.innerHTML = this.txt;
        
        const that = this;
        let delta = 200 - Math.random() * 100;
        
        if (this.isDeleting) { delta /= 2; }
        
        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }
        
        setTimeout(function() {
            that.tick();
        }, delta);
    };
    
    const elements = document.getElementsByClassName('txt-rotate');
    for (let i = 0; i < elements.length; i++) {
        const toRotate = elements[i].getAttribute('data-rotate');
        const period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
}

// Animate skill bars when in viewport
function initSkillBars() {
    const skillBars = document.querySelectorAll('.progress');
    
    // Set initial width to 0
    skillBars.forEach(bar => {
        bar.style.width = '0';
    });
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Function to animate skill bars
    function animateSkillBars() {
        skillBars.forEach(bar => {
            if (isInViewport(bar)) {
                const targetWidth = bar.getAttribute('data-value');
                bar.style.width = targetWidth;
            }
        });
    }
    
    // Animate on scroll
    window.addEventListener('scroll', animateSkillBars);
    
    // Initial check
    animateSkillBars();
}

// Initialize back to top button
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize contact form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.querySelector('.form-success-message');
    const backBtn = document.querySelector('.back-btn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                // Show success message
                successMessage.classList.add('active');
                
                // Reset form
                contactForm.reset();
                
                // For a real implementation, you would send the form data to a server here
            }
        });
    }
    
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            successMessage.classList.remove('active');
        });
    }
}

// Initialize theme switcher
function initThemeSwitcher() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const htmlRoot = document.documentElement;
    const defaultTheme = 'blue'; // Default theme
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('portfolio-theme') || defaultTheme;
    setTheme(savedTheme);
    
    // Set active state on the current theme button
    themeButtons.forEach(btn => {
        if (btn.getAttribute('data-theme') === savedTheme) {
            btn.classList.add('active');
        }
        
        // Add click event listeners to all theme buttons
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-theme');
            setTheme(theme);
            
            // Update active state
            themeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Save to localStorage
            localStorage.setItem('portfolio-theme', theme);
            
            // Update particle colors for different themes
            updateParticlesColor(theme);
        });
    });
    
    // Function to set theme
    function setTheme(theme) {
        // Remove any existing theme
        const currentTheme = htmlRoot.getAttribute('data-theme');
        if (currentTheme) {
            htmlRoot.removeAttribute('data-theme');
        }
        
        // Set new theme if it's not the default (blue)
        if (theme !== 'blue') {
            htmlRoot.setAttribute('data-theme', theme);
        }
    }
    
    // Update particles color based on theme
    function updateParticlesColor(theme) {
        let particleColor, linkColor;
        
        switch(theme) {
            case 'purple':
                particleColor = '#8b5cf6';
                linkColor = '#a78bfa';
                break;
            case 'green':
                particleColor = '#10b981';
                linkColor = '#34d399';
                break;
            case 'orange':
                particleColor = '#f59e0b';
                linkColor = '#fbbf24';
                break;
            case 'dark':
                particleColor = '#3b82f6';
                linkColor = '#60a5fa';
                break;
            default: // blue
                particleColor = '#2563eb';
                linkColor = '#4285f4';
        }
        
        // Update particles.js colors if it's loaded
        if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
            const particles = pJSDom[0].pJS.particles;
            particles.color.value = particleColor;
            particles.line_linked.color = linkColor;
            
            // Refresh particles
            pJSDom[0].pJS.fn.particlesRefresh();
        }
    }
}
