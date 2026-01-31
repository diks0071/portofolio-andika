// ===== MAIN JAVASCRIPT FILE =====

// DOM Elements
const preloader = document.querySelector('.preloader');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link-elite');
const backToTop = document.getElementById('backToTop');
const themeToggle = document.getElementById('themeToggle');
const soundToggle = document.getElementById('soundToggle');
const contactForm = document.getElementById('contactFormElite');
const typingText = document.getElementById('typingText');
const skillProgressBars = document.querySelectorAll('.skill-progress');

// Sound elements
const hoverSound = document.getElementById('hoverSound');
const clickSound = document.getElementById('clickSound');
let soundEnabled = true;

// Typing animation texts
const typingTexts = [
    "WEB DEVELOPER",
    "GAMER ELITE", 
    "CODING ENTHUSIAST",
    "DESIGN CREATOR"
];
let currentTextIndex = 0;
let charIndex = 0;
let isDeleting = false;

// ===== PRELOADER =====
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('hidden');
        
        // Initialize AOS animations
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
        
        // Start typing animation
        typeText();
        
        // Animate skill bars
        animateSkillBars();
    }, 1500);
});

// ===== TYPING ANIMATION =====
function typeText() {
    const currentText = typingTexts[currentTextIndex];
    
    if (isDeleting) {
        // Deleting text
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
            setTimeout(typeText, 500);
        } else {
            setTimeout(typeText, 50);
        }
    } else {
        // Typing text
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeText, 2000);
        } else {
            setTimeout(typeText, 100);
        }
    }
}

// ===== MOBILE MENU =====
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    
    playSound('click');
});

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
        playSound('click');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== BACK TO TOP =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Update active nav link
    updateActiveNavLink();
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    playSound('click');
});

// ===== ACTIVE NAV LINK ON SCROLL =====
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    navLinks.forEach(link => {
        const sectionId = link.getAttribute('href');
        const section = document.querySelector(sectionId);
        
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

// ===== THEME TOGGLE =====
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    
    playSound('click');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

if (savedTheme === 'light') {
    const icon = themeToggle.querySelector('i');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

// ===== SOUND TOGGLE =====
soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    const icon = soundToggle.querySelector('i');
    
    if (soundEnabled) {
        icon.classList.remove('fa-volume-mute');
        icon.classList.add('fa-volume-up');
        playSound('click');
    } else {
        icon.classList.remove('fa-volume-up');
        icon.classList.add('fa-volume-mute');
    }
    
    localStorage.setItem('soundEnabled', soundEnabled);
});

// Load sound preference
const savedSound = localStorage.getItem('soundEnabled');
if (savedSound !== null) {
    soundEnabled = savedSound === 'true';
    const icon = soundToggle.querySelector('i');
    
    if (!soundEnabled) {
        icon.classList.remove('fa-volume-up');
        icon.classList.add('fa-volume-mute');
    }
}

function playSound(type) {
    if (!soundEnabled) return;
    
    if (type === 'hover' && hoverSound) {
        hoverSound.currentTime = 0;
        hoverSound.play().catch(e => console.log('Audio play failed:', e));
    } else if (type === 'click' && clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.log('Audio play failed:', e));
    }
}

// ===== HOVER SOUND EFFECTS =====
document.querySelectorAll('.btn, .nav-link-elite, .social-icon, .project-link').forEach(element => {
    element.addEventListener('mouseenter', () => playSound('hover'));
    element.addEventListener('click', () => playSound('click'));
});

// ===== ANIMATE SKILL BARS =====
function animateSkillBars() {
    skillProgressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = `${width}%`;
    });
}

// Animate on scroll
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills-elite');
if (skillsSection) {
    observer.observe(skillsSection);
}

// ===== FORM SUBMISSION =====
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Success message
            alert('Thank you! Your message has been sent successfully. I will get back to you soon.');
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            playSound('click');
        }, 2000);
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#' || href === '#!') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            
            playSound('click');
        }
    });
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Space/Enter triggers click on focused elements
    if ((e.key === ' ' || e.key === 'Enter') && document.activeElement.classList.contains('interactive')) {
        document.activeElement.click();
        e.preventDefault();
    }
});

// ===== TOUCH DEVICE DETECTION =====
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (isTouchDevice) {
    document.body.classList.add('touch-device');
    
    // Add touch feedback
    document.querySelectorAll('.btn, .nav-link-elite, .hobby-card, .project-card').forEach(el => {
        el.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });
        
        el.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Performance-intensive operations here
            ticking = false;
        });
        ticking = true;
    }
});

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio Elite loaded successfully!');
    
    // Initialize particles
    if (typeof particlesJS !== 'undefined') {
        particlesJS.load('particles-js', 'js/particles-config.json', function() {
            console.log('Particles.js loaded');
        });
    }
});