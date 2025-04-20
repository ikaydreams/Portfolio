document.addEventListener('DOMContentLoaded', function() {
    // Initialize character eye animations
    initEyeAnimations();
    
    // Initialize character animations
    initCharacterAnimations();
    
    // Generate stars in background
    generateStars();
    
    // Create blinking typing cursor effect
    typingCursorAnimation();
    
    // Create floating animations with parallax effect
    parallaxEffect();
});

// Create eye tracking animations for the cartoon characters
function initEyeAnimations() {
    const characters = document.querySelectorAll('.character-container, .about-char-container, .skills-char-container, .contact-char-container, .timeline-char-container, .project-char-container');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        characters.forEach(character => {
            if (!character) return;
            
            const characterRect = character.getBoundingClientRect();
            const characterX = characterRect.left + characterRect.width / 2;
            const characterY = characterRect.top + characterRect.height / 3;
            
            const deltaX = mouseX - characterX;
            const deltaY = mouseY - characterY;
            
            const maxMove = 3; // Maximum eye movement in pixels
            
            // Calculate eye movement based on mouse position
            const moveX = Math.max(Math.min(deltaX / 30, maxMove), -maxMove);
            const moveY = Math.max(Math.min(deltaY / 30, maxMove), -maxMove);
            
            // Apply to all eyes in this character
            const eyes = character.querySelectorAll('.character-eye-hero, .about-char-eye, .skills-char-eye, .contact-char-eye, .timeline-char-eye, .project-char-eye');
            
            eyes.forEach(eye => {
                eye.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    });
}

// Random movement animations for characters
function initCharacterAnimations() {
    // Hero character laptop typing animation
    const heroCharacter = document.querySelector('.character-container');
    if (heroCharacter) {
        const laptop = heroCharacter.querySelector('.character-laptop-hero');
        if (laptop) {
            setInterval(() => {
                laptop.style.transform = 'translateY(-2px)';
                setTimeout(() => {
                    laptop.style.transform = 'translateY(0)';
                }, 200);
            }, 2000);
        }
    }
    
    // Project character head bobbing
    const projectCharacters = document.querySelectorAll('.project-char-container');
    projectCharacters.forEach(character => {
        setInterval(() => {
            const head = character.querySelector('.project-char-head');
            if (head) {
                head.style.transform = 'rotate(5deg)';
                setTimeout(() => {
                    head.style.transform = 'rotate(-5deg)';
                    setTimeout(() => {
                        head.style.transform = 'rotate(0)';
                    }, 300);
                }, 300);
            }
        }, 3000);
    });
    
    // Contact character wave animation
    const contactCharacter = document.querySelector('.contact-char-container');
    if (contactCharacter) {
        const leftArm = contactCharacter.querySelector('.contact-char-arm.left');
        if (leftArm) {
            setInterval(() => {
                leftArm.style.animation = 'none';
                leftArm.style.transform = 'rotate(-60deg)';
                
                setTimeout(() => {
                    leftArm.style.transform = 'rotate(-30deg)';
                    setTimeout(() => {
                        leftArm.style.transform = 'rotate(-60deg)';
                        setTimeout(() => {
                            leftArm.style.transform = 'rotate(-30deg)';
                            setTimeout(() => {
                                leftArm.style.animation = 'contact-arm-left 4s ease-in-out infinite';
                            }, 300);
                        }, 300);
                    }, 300);
                }, 300);
            }, 6000);
        }
    }
}

// Generate random stars in the background of home section
function generateStars() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;
    
    const starCount = 120;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const size = Math.random() * 2.5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 3 + Math.random() * 3;
        
        // Different colors for stars - primarily blue tones
        const colors = ['#ffffff', '#4285F4', '#8AB4F8', '#0099FF', '#E8F0FE'];
        const colorIndex = Math.floor(Math.random() * colors.length);
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.backgroundColor = colors[colorIndex];
        star.style.animationDelay = `${delay}s`;
        star.style.animationDuration = `${duration}s`;
        
        starsContainer.appendChild(star);
    }
    
    // Add web development themed icons
    const webIcons = ['</>','{ }','#','()=>','CSS','HTML','JS'];
    const iconCount = 10;
    
    for (let i = 0; i < iconCount; i++) {
        const icon = document.createElement('div');
        icon.classList.add('code-icon');
        
        const iconIndex = Math.floor(Math.random() * webIcons.length);
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 10 + Math.random() * 10;
        const size = Math.random() * 10 + 10;
        
        icon.textContent = webIcons[iconIndex];
        icon.style.left = `${posX}%`;
        icon.style.top = `${posY}%`;
        icon.style.fontSize = `${size}px`;
        icon.style.animationDelay = `${delay}s`;
        icon.style.animationDuration = `${duration}s`;
        
        starsContainer.appendChild(icon);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        .star {
            position: absolute;
            border-radius: 50%;
            animation: star-twinkle linear infinite;
            box-shadow: 0 0 4px rgba(255, 255, 255, 0.5);
        }
        
        @keyframes star-twinkle {
            0%, 100% {
                opacity: 0.2;
            }
            50% {
                opacity: 0.8;
            }
        }
        
        .code-icon {
            position: absolute;
            color: rgba(66, 133, 244, 0.6);
            font-family: monospace;
            font-weight: bold;
            animation: code-float linear infinite;
            user-select: none;
            pointer-events: none;
        }
        
        @keyframes code-float {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.1;
            }
            25% {
                opacity: 0.5;
            }
            50% {
                transform: translateY(-50px) rotate(180deg);
                opacity: 0.3;
            }
            75% {
                opacity: 0.5;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Typing cursor animation
function typingCursorAnimation() {
    const typingCursor = document.querySelector('.typing-cursor');
    if (!typingCursor) return;
    
    // Animation is done with CSS, but we could add more dynamic typing effects here
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        const typeEffect = () => {
            let i = 0;
            const typing = setInterval(() => {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                }
            }, 100);
        };
        
        // Start typing effect after a short delay
        setTimeout(typeEffect, 1500);
    }
}

// Parallax effect on scroll
function parallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Parallax for hero section
        const heroCharacter = document.querySelector('.character-container');
        if (heroCharacter && scrolled < window.innerHeight) {
            heroCharacter.style.transform = `translate(-50%, -50%) translateY(${scrolled * 0.2}px)`;
        }
        
        // Parallax for blobs
        const blobs = document.querySelectorAll('.blob');
        blobs.forEach((blob, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            blob.style.transform = `translate(${scrolled * 0.03 * direction}px, ${scrolled * 0.02}px)`;
        });
        
        // Parallax for code icons
        const codeIcons = document.querySelectorAll('.code-icon');
        codeIcons.forEach((icon, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            const speed = 0.05 + (index % 3) * 0.02;
            icon.style.transform = `translateY(${scrolled * speed * direction}px) rotate(${scrolled * 0.05 * direction}deg)`;
        });
    });
    
    // Parallax on mouse move for home section
    const homeSection = document.querySelector('.home-section');
    if (homeSection) {
        homeSection.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            const blobs = document.querySelectorAll('.blob');
            blobs.forEach((blob, index) => {
                const factor = (index + 1) * 20;
                blob.style.transform = `translate(${mouseX * factor}px, ${mouseY * factor}px)`;
            });
            
            const heroCharacter = document.querySelector('.character-container');
            if (heroCharacter) {
                heroCharacter.style.transform = `translate(-50%, -50%) translate(${mouseX * 20}px, ${mouseY * 20}px)`;
            }
            
            // Code icons mouse move effect
            const codeIcons = document.querySelectorAll('.code-icon');
            codeIcons.forEach((icon, index) => {
                const factor = (index % 5 + 1) * 10;
                const direction = index % 2 === 0 ? 1 : -1;
                icon.style.transform += ` translate(${mouseX * factor * direction}px, ${mouseY * factor * direction}px)`;
            });
        });
    }
    
    // Add web development themed animations
    createWebAnimations();
}

// Add web development animations
function createWebAnimations() {
    // Create animated code brackets on scroll
    const body = document.body;
    
    window.addEventListener('scroll', () => {
        // Create floating code elements occasionally when scrolling
        if (Math.random() < 0.03) {
            const codeElement = document.createElement('div');
            codeElement.classList.add('floating-code');
            
            const codeSnippets = [
                '<div>', '</div>', 
                '<span>', '</span>',
                '<header>', '</header>',
                'function()', 'return',
                '{ }', '[ ]', '()'
            ];
            
            codeElement.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
            
            // Random position from left
            codeElement.style.left = `${Math.random() * 100}vw`;
            // Start from bottom
            codeElement.style.bottom = '0';
            // Random size
            const size = 10 + Math.random() * 20;
            codeElement.style.fontSize = `${size}px`;
            // Random color from blue palette
            const blueShades = ['#4285F4', '#8AB4F8', '#0099FF', '#1A73E8'];
            codeElement.style.color = blueShades[Math.floor(Math.random() * blueShades.length)];
            
            body.appendChild(codeElement);
            
            // Animate upward and fade out
            const keyframes = [
                { bottom: '0', opacity: 0.1 },
                { bottom: '50vh', opacity: 0.7 },
                { bottom: '100vh', opacity: 0 }
            ];
            
            const timing = {
                duration: 5000 + Math.random() * 5000,
                easing: 'ease-out'
            };
            
            const animation = codeElement.animate(keyframes, timing);
            
            // Remove element after animation completes
            animation.onfinish = () => {
                body.removeChild(codeElement);
            };
        }
    });
    
    // Add CSS for code animations
    const style = document.createElement('style');
    style.textContent = `
        .floating-code {
            position: fixed;
            font-family: 'Courier New', monospace;
            pointer-events: none;
            z-index: 10;
            font-weight: bold;
            white-space: nowrap;
            text-shadow: 0 0 5px rgba(66, 133, 244, 0.3);
        }
    `;
    document.head.appendChild(style);
}
