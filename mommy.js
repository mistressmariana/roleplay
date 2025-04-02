document.addEventListener('DOMContentLoaded', function() {
    // Create pink particles background
    createParticlesBackground();
    
    // Initialize tab functionality
    initTabs();
    
    // Initialize scene idea dropdowns
    initSceneDropdowns();
    
    // Initialize counter
    initCounter();
    
    // Add typing animation to profile title
    animateTitle();
    
    // Initialize image hover effect
    initImageHover();
    
    // Initialize click sounds
    initSounds();
});

// Create pink floating particles
function createParticlesBackground() {
    const particlesContainer = document.querySelector('.particles-background');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        
        // Random properties
        const size = Math.random() * 15 + 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = Math.random() * 0.6 + 0.2;
        const animDuration = Math.random() * 20 + 10;
        const animDelay = Math.random() * 5;
        
        // Style the particle
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${posX}%;
            top: ${posY}%;
            background-color: var(--primary-color);
            opacity: ${opacity};
            border-radius: 50%;
            filter: blur(${size/4}px);
            box-shadow: 0 0 ${size/2}px var(--primary-color);
            animation: float ${animDuration}s ease-in-out infinite;
            animation-delay: -${animDelay}s;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add hearts occasionally
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        
        // Random properties
        const size = Math.random() * 20 + 10;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.2;
        const animDuration = Math.random() * 25 + 15;
        const animDelay = Math.random() * 5;
        
        // Style the heart
        heart.innerHTML = '♥';
        heart.style.cssText = `
            position: absolute;
            font-size: ${size}px;
            left: ${posX}%;
            top: ${posY}%;
            color: var(--accent-color);
            opacity: ${opacity};
            animation: float ${animDuration}s ease-in-out infinite, pulse 3s infinite;
            animation-delay: -${animDelay}s;
        `;
        
        particlesContainer.appendChild(heart);
    }
    
    // Add float animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0) rotate(0deg);
            }
            25% {
                transform: translateY(-20px) rotate(5deg);
            }
            50% {
                transform: translateY(-35px) rotate(-5deg);
            }
            75% {
                transform: translateY(-15px) rotate(3deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize tab functionality
function initTabs() {
    const tabSelectors = document.querySelectorAll('.tab-selector');
    
    tabSelectors.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            document.querySelectorAll('.tab-selector').forEach(t => {
                t.classList.remove('active');
            });
            
            document.querySelectorAll('.tab-content').forEach(c => {
                c.classList.remove('active');
            });
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Add active class to corresponding content
            const tabName = tab.getAttribute('data-tab');
            document.getElementById(`${tabName}-content`).classList.add('active');
            
            // Play click sound
            playSound('click');
        });
    });
}

// Initialize scene idea dropdowns
function initSceneDropdowns() {
    const sceneTitles = document.querySelectorAll('.scene-title');
    
    sceneTitles.forEach(title => {
        title.addEventListener('click', () => {
            const description = title.nextElementSibling;
            const arrow = title.querySelector('.dropdown-arrow');
            
            if (description.style.display === 'block') {
                description.style.display = 'none';
                arrow.style.transform = 'rotate(0deg)';
            } else {
                description.style.display = 'block';
                arrow.style.transform = 'rotate(180deg)';
                playSound('expand');
            }
        });
    });
}

// Initialize counter with random incrementing
function initCounter() {
    const counterValue = document.querySelector('.counter-value');
    let count = parseInt(counterValue.textContent);
    
    setInterval(() => {
        // Randomly increase the counter (25% chance)
        if (Math.random() < 0.25) {
            count++;
            counterValue.textContent = count;
            counterValue.style.transform = 'scale(1.1)';
            setTimeout(() => {
                counterValue.style.transform = 'scale(1)';
            }, 200);
        }
    }, 3000);
}

// Add typing animation to the title
function animateTitle() {
    // Animation is handled by CSS, but we could add extra effects here
    const cursor = document.querySelector('.cursor');
    
    // Make cursor blink
    setInterval(() => {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    }, 500);
}

// Initialize image hover effect
function initImageHover() {
    const charImage = document.querySelector('.character-image');
    const mainImage = document.querySelector('.main-image');
    const hoverOverlay = document.querySelector('.hover-overlay');
    
    // Make sure overlay is hidden initially
    if (hoverOverlay && mainImage) {
        hoverOverlay.style.opacity = '0';
        mainImage.style.opacity = '1';
        
        // Add explicit event listeners to ensure hover works
        charImage.addEventListener('mouseenter', () => {
            hoverOverlay.style.opacity = '1';
            mainImage.style.opacity = '0';
        });
        
        charImage.addEventListener('mouseleave', () => {
            hoverOverlay.style.opacity = '0';
            mainImage.style.opacity = '1';
        });
    }
}

// Initialize sounds
function initSounds() {
    // Create audio elements
    const clickSound = createAudio('data:audio/wav;base64,UklGRpQFAABXQVZFZm10IBAAAAABAAEARKwAAESsAAABAAgAZGF0YXAFAACAgICAgICAgICAgICAgICAgICAgICAgICAf3hxeH+AfXZ1eHx6dnR5fYGFgXt2dXh9gIB8dXN1eHx+fnt4dnh7fH18e3p6e3t8fHx7e3t7e3x8fHt7e3t7e3x8fHt7e3t7e3x8fHt7e3t7fH19fHt7e3t8fX18e3t7e3x9fX18e3t7fH19fXx8e3x8fX19fHx8fHx9fX18fHx8fH19fXx8fHx8fX19fHx8fHx9fX18fHx8fH1+fnx8fHx9fn5+fX18fH1+fn59fX19fn5+fn19fX1+fn5+fX19fX5+fn59fX19fn5+fn19fX1+fn5+fX19fX6AgH99fHx9f4CAf319fX6AgIB/fn19foCAgH9+fn5/gICAf35+fn+AgIB/fn5+f4CAgH9+fn5/gICAf35+fn+AgIB/fn19foCAgH99fX1+gICAfn19fX6AgIB+fX19foCAgH59fX19f4CAf319fX1/gIB/fX19fX+AgH99fX19f4CAf319fX1/gIB/fX19fX+AgH99fX19f4CAf319fX1/gIB/fX19fX+AgH99fX19f4CAf319fX1/gIB/fX19fX+AgH99fX19f4CAf319fX1/gIB/fX19fX+AgH99fX19f4CAf319fX1/gIB/fX19fX+AgH99fX19f4GBgH59fX2AgYGAfn19fYCBgYB+fX19gIGBgH59fX2AgYGAfn19fYCBgYB+fX19gIGBgH59fX2AgYGAfn19fYCBgYB+fX19gIGBgH59fX2AgYGAfn19fYCBgYB+fX19gIGBgH59fX2AgYGAfn19fYCBgYB+fX19gIGBgH59fX2AgYGAfn19fYCBgYB+fX19gIGBgH59fX2AgYGAfn19fYCBgYB+fX19gIGBgH59fX2AgYGAfn19fYCBgYB+fX19gICAgH59fX2AgICAfn19fX+AgIB+fX19f4CAgH59fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fX1/gICAf319fQ==', 0.3);
    const expandSound = createAudio('data:audio/wav;base64,UklGRiQDAABXQVZFZm10IBAAAAABAAEARKwAAESsAAABAAgAZGF0YQADAACBgIF/gH2Af4B+gH6AfX9+gH6AfoCAgICAgH+AgICAgICAgICAgICAgICAgICBgICAgICAgICAgH+AgH9/gH+Af3+Af3+AgICAgICAgICBgYGBgYGAgICAgIB/f39/fn5+fn5+f39/gICBgYGBgoKCgoKCgoGBgYGAgH9+fn59fXx8fHx8fX1+f3+AgIGCg4SEhYWFhISEg4KBgH99fHp5d3Z1dXR0dXZ3eHl7fH5/gYOFhoeJioqKiYiHhYSCgH16eHVzcG5sa2ppamtsbW9xc3Z4e36AgoWHiYuNjo+PjoyLiYeEgn96d3RxbmxpZ2VkZGRlamxucXR3en1/goWIi46QkpOUlJSTkY+Nh4SAfXl1cm9saWZjYmBfYGFiZGZpbG9yeHt+gYSHio2PkpSWl5eXlpWTkY6LiIWBfnp2c29saWZjYV9eXV5fYGJkZ2ptcHN2eXyAg4aJjI+SlJaYmZqamZiXlZKPjImGgn97eHRxbmtpZmRiYGBfYGFiZGdpa25xdHd6fYCDhomMj5KUl5mcnZ2dnJuZl5WSkY2KhoN/fHh1cW5raGViYF9dXV1eX2FjZmhrbW9ydXh7foGEh4qNkJOVmJqdnp+gn56dmpiWk4+Nh4N/e3dzb2xoZGFeXFpYWFhYWlxeYGNmam1wc3Z6fYCEh4uOkZSXmp2foKGioqGhn52bmJSRjYmFgHx4dG9raGRhXVpYVlVUVVVWV1lcXmFkZ2ptcXR4e36ChoqOkZSYm56goqSlpqalpaOioJ2alpKOioWBfXl1cGtnY19bV1RSUVBPUFFSVFZZXGBjZmptcXV4fICEiIyQk5aanbCxs7EkIiYjbWhnIi4lIHNsZDCDfHULCAUEIzU4FC4xKQcWDxRNVE47UVdIFiUdHF1jWFQzNSwPLComIUpNRDYVEg0ZRUc9NwD//f4gGhYY5+jm6P///wO6u7kHBwgEBvv8+v8AAQH4+/z5LzIxLH1/e3BqbWlkeXt2cJWXkpGnqqWkoqWgn6uvq6qRlJCPkpWRkF9iXV3T1tHTra+rq4yPi4mKjYmJgIN/f2lsaGdHSkZGMzYyMi0vLS3/Avz+/wIBBfb49/vs7evs/v/+ABEUEBJFSEVHJCYjJB4gHR7h4+Dh9fb09/Lz8vO7vLu8r7Ctsd/g3uH29/X3xMbDxaCin6J5fHl8eHt3epWYlJeCg4GExcbEx8PFwsfq7OnsLzEuMmBiX2O8vru/pKaip1RWU1cLDAkNycrIzPHy8PW2t7W5+vv5/g==', 0.2);
    
    // Store them in window object for easy access
    window.mommySounds = {
        click: clickSound,
        expand: expandSound
    };
}

// Create an audio element from base64 data
function createAudio(base64Data, volume) {
    const audio = new Audio(base64Data);
    audio.volume = volume || 0.5;
    return audio;
}

// Play a sound
function playSound(soundName) {
    const sound = window.mommySounds[soundName];
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(err => {
            // Ignore autoplay restrictions
        });
    }
} 