// Loading Screen Management
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.querySelector('.progress-bar');
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Hide loading screen after animation completes
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.classList.add('loaded');
                initializeWebsite();
            }, 500);
        }
        progressBar.style.width = progress + '%';
    }, 100);
});

// Cursor Trail Effect
let cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', function(e) {
    const trail = document.querySelector('.cursor-trail');
    
    // Update cursor trail position
    trail.style.left = e.clientX - 10 + 'px';
    trail.style.top = e.clientY - 10 + 'px';
    trail.style.opacity = '0.8';
    
    // Create trail effect
    cursorTrail.push({x: e.clientX, y: e.clientY, time: Date.now()});
    
    // Remove old trail points
    cursorTrail = cursorTrail.filter(point => Date.now() - point.time < 500);
});

document.addEventListener('mouseleave', function() {
    const trail = document.querySelector('.cursor-trail');
    trail.style.opacity = '0';
});

// Initialize Website Functions
function initializeWebsite() {
    initParticles();
    initScrollAnimations();
    initNavigation();
    initInteractiveElements();
    initCounterAnimations();
    initFormHandling();
    initGalleryLightbox();
    initServiceBooking();
    initHeroSlider();
}

// Hero Slider Functionality
function initHeroSlider() {
    const dots = document.querySelectorAll('.hero-bullets .dot');
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    // Initialize first slide
    if (slides.length > 0) {
        slides[0].classList.add('active');
        dots[0].classList.add('active');
    }
    
    // Set up dot click events
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Auto slide change
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }, 5000);
    
    function goToSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
}

// Particle.js Configuration
function initParticles() {
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
            value: ['#ff006e', '#8338ec', '#3a86ff']
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ff006e',
            opacity: 0.2,
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
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
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

// Navigation and Smooth Scrolling
function initNavigation() {
    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');
    
    // Update active navigation item on scroll
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    // Smooth scroll for navigation links
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll animations
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Add animation classes to elements
    function addAnimationClasses() {
        // About section animations
        const aboutContent = document.querySelector('.about-content');
        if (aboutContent) {
            const profileContainer = aboutContent.querySelector('.profile-image-container');
            const personalDetails = aboutContent.querySelector('.personal-details');
            
            if (profileContainer) profileContainer.classList.add('slide-in-left');
            if (personalDetails) personalDetails.classList.add('slide-in-right');
        }
        
        // Timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
        });
        
        // Achievement items
        const achievementItems = document.querySelectorAll('.achievement-item');
        achievementItems.forEach(item => {
            item.classList.add('fade-in');
        });
        
        // Experience cards
        const experienceCards = document.querySelectorAll('.experience-card');
        experienceCards.forEach(item => {
            item.classList.add('fade-in');
        });
        
        // Gallery items
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.classList.add('fade-in');
        });
        
        // Contact content
        const contactForm = document.querySelector('.contact-form-container');
        const contactInfo = document.querySelector('.contact-info');
        
        if (contactForm) contactForm.classList.add('slide-in-left');
        if (contactInfo) contactInfo.classList.add('slide-in-right');
    }
    
    // Initialize animations
    addAnimationClasses();
    
    // Event listeners with throttling
    const throttledScroll = throttle(() => {
        updateActiveNav();
        animateOnScroll();
        updateParallax();
    }, 16);
    
    window.addEventListener('scroll', throttledScroll);
    
    // Initial calls
    updateActiveNav();
    animateOnScroll();
}

// Enhanced Scroll Animations
function initScrollAnimations() {
    
}

// Counter Animations for Achievement Items
function initCounterAnimations() {
    const achievementItems = document.querySelectorAll('.achievement-item[data-count]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const targetCount = parseInt(entry.target.dataset.count);
                const badge = entry.target.querySelector('.achievement-badge');
                
                animateCounter(0, targetCount, 2000, (value) => {
                    badge.textContent = value + '+';
                });
                
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);
    
    achievementItems.forEach(item => observer.observe(item));
}

function animateCounter(start, end, duration, callback) {
    const startTime = performance.now();
    const range = end - start;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (range * easeOutQuart));
        
        callback(current);
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Interactive Elements
function initInteractiveElements() {
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.service-card, .experience-card, .achievement-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateY(2deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0)';
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.submit-btn, .service-btn, .cta-button:not(.call-btn)');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
    
    // Handle main CTA "Book a Session" button
    const mainBookButton = document.querySelector('.cta-button.primary');
    if (mainBookButton) {
        mainBookButton.addEventListener('click', function(e) {
            e.preventDefault();
            showMainBookingModal();
        });
    }
}

// Create Ripple Effect
function createRipple(event, element) {
    const ripple = document.createElement('div');
    ripple.classList.add('btn-ripple');
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Gallery Lightbox
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openLightbox(img.src, img.alt);
            }
        });
    });
}

// Service Booking
function initServiceBooking() {
    const serviceButtons = document.querySelectorAll('.service-btn');
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceCard = this.closest('.service-card');
            const serviceName = serviceCard.querySelector('h3').textContent;
            const servicePrice = serviceCard.querySelector('.service-price').textContent;
            
            showBookingModal(serviceName, servicePrice);
        });
    });
}

// Form Handling
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.querySelector('span').textContent;
            
            // Show loading state
            submitBtn.querySelector('span').textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.disabled = false;
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.disabled = false;
                return;
            }
            
            // Simulate form submission
            setTimeout(() => {
                showNotification('Message sent successfully! I will get back to you soon.', 'success');
                this.reset();
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // CTA Button click handlers
    const primaryCTA = document.querySelector('.cta-button.primary');
    const secondaryCTA = document.querySelector('.cta-button.secondary');
    
    if (primaryCTA) {
        primaryCTA.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    if (secondaryCTA) {
        secondaryCTA.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Typing animation for hero text
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Initialize typing animation for hero description
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
        const originalText = heroDescription.textContent;
        setTimeout(() => {
            typeWriter(heroDescription, originalText, 50);
        }, 1000);
    }
    
}

// Enhanced Parallax Effects
function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    const smokeEffect = document.querySelector('.smoke-effect');
    const neonOverlay = document.querySelector('.neon-overlay');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    if (smokeEffect) {
        smokeEffect.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrolled * 0.0005}) rotate(${scrolled * 0.01}deg)`;
    }
    
    if (neonOverlay) {
        neonOverlay.style.opacity = Math.max(0.1, 1 - scrolled * 0.001);
    }
}
    

    
    // Dynamic neon glow intensity based on scroll
    const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
    const neonElements = document.querySelectorAll('.neon-text, .neon-text-alt');
    
    neonElements.forEach(element => {
        const intensity = 0.8 + (Math.sin(Date.now() * 0.001) * 0.2);
        element.style.filter = `brightness(${intensity})`;
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(0, 255, 0, 0.1)' : type === 'error' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 0, 255, 0.1)'};
        border: 2px solid ${type === 'success' ? '#00ff00' : type === 'error' ? '#ff0000' : '#0000ff'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        backdrop-filter: blur(10px);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function openLightbox(src, alt) {
    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${src}" alt="${alt}">
            <div class="lightbox-controls">
                <button class="lightbox-zoom-in"><i class="fas fa-search-plus"></i></button>
                <button class="lightbox-zoom-out"><i class="fas fa-search-minus"></i></button>
                <button class="lightbox-close">&times;</button>
            </div>
        </div>
    `;
    
    // Add styles
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const lightboxContent = lightbox.querySelector('.lightbox-content');
    lightboxContent.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        overflow: hidden;
    `;
    
    const img = lightbox.querySelector('img');
    img.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 10px;
        border: 2px solid #ff006e;
        box-shadow: 0 0 30px rgba(255, 0, 110, 0.5);
        transition: transform 0.3s ease;
        cursor: zoom-in;
    `;
    
    const controls = lightbox.querySelector('.lightbox-controls');
    controls.style.cssText = `
        position: absolute;
        top: -50px;
        right: -50px;
        display: flex;
        gap: 10px;
    `;
    
    const zoomInBtn = lightbox.querySelector('.lightbox-zoom-in');
    zoomInBtn.style.cssText = `
        background: #ff006e;
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;
    
    const zoomOutBtn = lightbox.querySelector('.lightbox-zoom-out');
    zoomOutBtn.style.cssText = `
        background: #8338ec;
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
        background: #ff006e;
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;
    
    // Add to DOM
    document.body.appendChild(lightbox);
    
    // Animate in
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
    
    // Zoom functionality
    let currentZoom = 1;
    const zoomStep = 0.5;
    const maxZoom = 3;
    const minZoom = 1;
    
    function updateZoom() {
        img.style.transform = `scale(${currentZoom})`;
        img.style.cursor = currentZoom >= maxZoom ? 'zoom-out' : 'zoom-in';
    }
    
    zoomInBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (currentZoom < maxZoom) {
            currentZoom += zoomStep;
            updateZoom();
        }
    });
    
    zoomOutBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (currentZoom > minZoom) {
            currentZoom -= zoomStep;
            updateZoom();
        }
    });
    
    img.addEventListener('click', function(e) {
        e.stopPropagation();
        if (currentZoom < maxZoom) {
            currentZoom += zoomStep;
        } else {
            currentZoom = minZoom;
        }
        updateZoom();
    });
    
    // Close functionality
    function closeLightbox() {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(lightbox);
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Reinitialize particles on resize
    if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
        window.pJSDom[0].pJS.fn.particlesRefresh();
    }
}, 250));

// Preload images for better performance
function preloadImages() {
    const images = [
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();

// Main Booking Modal (for hero CTA button)
function showMainBookingModal() {
    showBookingModal('Personal Training Session', '₹2000/session');
}

// Booking Modal
function showBookingModal(serviceName, servicePrice) {
    const modal = document.createElement('div');
    modal.className = 'booking-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Book ${serviceName}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p class="service-info">Service: <strong>${serviceName}</strong></p>
                <p class="price-info">Price: <strong>${servicePrice}</strong></p>
                <form class="booking-form">
                    <div class="form-group">
                        <input type="text" name="name" required>
                        <label>Your Name</label>
                    </div>
                    <div class="form-group">
                        <input type="tel" name="phone" required>
                        <label>Phone Number</label>
                    </div>
                    <div class="form-group">
                        <input type="date" name="date" required>
                        <label>Preferred Date</label>
                    </div>
                    <div class="form-group">
                        <select name="time" required>
                            <option value="">Select Time</option>
                            <option value="06:00">6:00 AM</option>
                            <option value="07:00">7:00 AM</option>
                            <option value="08:00">8:00 AM</option>
                            <option value="09:00">9:00 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="17:00">5:00 PM</option>
                            <option value="18:00">6:00 PM</option>
                            <option value="19:00">7:00 PM</option>
                            <option value="20:00">8:00 PM</option>
                        </select>
                        <label>Preferred Time</label>
                    </div>
                    <button type="submit" class="book-btn">
                        <span>Confirm Booking</span>
                        <i class="fas fa-check"></i>
                    </button>
                </form>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: linear-gradient(135deg, rgba(10, 10, 10, 0.95), rgba(26, 0, 51, 0.95));
        border: 2px solid #ff006e;
        border-radius: 20px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        backdrop-filter: blur(20px);
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Close functionality
    function closeModal() {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    // Form submission
    modal.querySelector('.booking-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const date = formData.get('date');
        const time = formData.get('time');
        
        if (!name || !phone || !date || !time) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Create WhatsApp message
        const message = `Hi Rizwan! I want to book ${serviceName} for ${date} at ${time}. My name is ${name} and my phone number is ${phone}.`;
        const whatsappUrl = `https://wa.me/918707681098?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
        closeModal();
        showNotification('Redirecting to WhatsApp for booking confirmation!', 'success');
    });
}

// Add dynamic CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .booking-modal .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid rgba(255, 0, 110, 0.3);
    }
    
    .booking-modal h3 {
        color: #ff006e;
        font-family: 'Orbitron', monospace;
        margin: 0;
    }
    
    .modal-close {
        background: none;
        border: none;
        color: #ff006e;
        font-size: 24px;
        cursor: pointer;
        padding: 5px;
        transition: transform 0.3s ease;
    }
    
    .modal-close:hover {
        transform: scale(1.2);
    }
    
    .service-info, .price-info {
        color: #cccccc;
        margin-bottom: 10px;
    }
    
    .booking-form .form-group {
        margin-bottom: 20px;
    }
    
    .booking-form select {
        width: 100%;
        padding: 15px 20px;
        background: rgba(255, 255, 255, 0.05);
        border: 2px solid rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        color: #ffffff;
        font-size: 1rem;
        transition: all 0.3s ease;
    }
    
    .booking-form select:focus {
        outline: none;
        border-color: #ff006e;
        box-shadow: 0 0 20px rgba(255, 0, 110, 0.3);
    }
    
    .book-btn {
        width: 100%;
        padding: 15px;
        background: linear-gradient(45deg, #ff006e, #8338ec);
        border: none;
        border-radius: 10px;
        color: #ffffff;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-top: 20px;
    }
    
    .book-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(255, 0, 110, 0.4);
    }
    
    .hero-title,
    .hero-description,
    .cta-buttons {
        opacity: 0;
    }
    
    body.loaded .hero-title {
        animation: fadeInUp 1s ease 0.5s forwards;
    }
    
    body.loaded .hero-description {
        animation: fadeInUp 1s ease 0.8s forwards;
    }
    
    body.loaded .cta-buttons {
        animation: fadeInUp 1s ease 1.1s forwards;
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // DOM is ready, but wait for load event for full initialization
    });
} else {
    // DOM is already ready
    if (document.body.classList.contains('loaded')) {
        initializeWebsite();
    }
}

// PDF viewer helpers removed as Portfolio section is no longer present.
