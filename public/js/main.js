// Smooth scrolling with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide/show header on scroll
    if (currentScroll > lastScroll && currentScroll > 500) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Project tabs with enhanced animation
const tabButtons = document.querySelectorAll('.tab-btn');
const projectCards = document.querySelectorAll('.project-card');
const projectsGrid = document.querySelector('.projects-grid');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tab = button.dataset.tab;
        
        // Update active button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Animate filter with stagger effect
        projectsGrid.style.opacity = '0.7';
        
        setTimeout(() => {
            let delay = 0;
            projectCards.forEach(card => {
                if (tab === 'all' || card.dataset.category === tab) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1) translateY(0)';
                    }, delay);
                    delay += 100; // Stagger animation
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95) translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            projectsGrid.style.opacity = '1';
        }, 200);
    });
});

// Mobile menu
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        document.body.style.overflow = navMenu.classList.contains('show') ? 'hidden' : '';
        
        // Animate hamburger menu
        const spans = navToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (navMenu.classList.contains('show')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });
    
    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            document.body.style.overflow = '';
            
            // Reset hamburger menu
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });
}

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Stagger animation for project cards
            if (entry.target.classList.contains('project-card')) {
                const cards = Array.from(document.querySelectorAll('.project-card'));
                const index = cards.indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 100}ms`;
            }
            
            // Stagger animation for skill categories
            if (entry.target.classList.contains('skill-category')) {
                const categories = Array.from(document.querySelectorAll('.skill-category'));
                const index = categories.indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 150}ms`;
            }
        }
    });
}, observerOptions);

// Observe elements for animations
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

document.querySelectorAll('.project-card, .skill-category, .about-text').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Active section highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for hero (subtle)
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.2;
        hero.style.transform = `translateY(${rate}px)`;
    });
}

// Enhanced typing effect for tagline
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    // Start typing after a delay
    setTimeout(type, 1000);
}

// Apply typing effect on page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    const tagline = document.querySelector('.hero-tagline');
    if (tagline) {
        const originalText = tagline.textContent;
        typeWriter(tagline, originalText, 30);
    }
});

// Skill tag hover effects
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        // Add a subtle pulse effect
        tag.style.animation = 'pulse 0.6s ease-in-out';
    });
    
    tag.addEventListener('mouseleave', () => {
        tag.style.animation = 'none';
    });
});

// Project card interaction enhancements
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Enhance tech items on hover
        const techItems = card.querySelectorAll('.tech-item');
        techItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'scale(1.05)';
            }, index * 50);
        });
    });
    
    card.addEventListener('mouseleave', () => {
        const techItems = card.querySelectorAll('.tech-item');
        techItems.forEach(item => {
            item.style.transform = 'scale(1)';
        });
    });
});

// Enhanced social links hover effects
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-8px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
    });
});

// Console Easter egg
console.log('%c🎨 Designed & Developed by Gabriel Beronja', 
    'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; border-radius: 5px; font-weight: bold;'
);

console.log('%c🎵 Ansambl LADO - Profesionalni folklorni glazbenik', 
    'background: #4a5568; color: white; padding: 5px 15px; border-radius: 3px;'
);

console.log('%c💻 Student informatike - Sveučilište Jurja Dobrile u Puli', 
    'background: #6366f1; color: white; padding: 5px 15px; border-radius: 3px;'
);

// Dark mode toggle (optional enhancement)
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '🌙';
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--white);
    box-shadow: var(--shadow-lg);
    border: none;
    cursor: pointer;
    z-index: 999;
    font-size: 1.5rem;
    transition: var(--transition);
    display: none; /* Hidden by default, can be enabled */
`;

document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Check saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '☀️';
}

// Custom cursor effect for project cards (optional)
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
    });
});

// Add CSS for custom cursor effect
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .project-card::after {
        content: '';
        position: absolute;
        top: var(--mouse-y, 50%);
        left: var(--mouse-x, 50%);
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }
    
    .project-card:hover::after {
        opacity: 1;
    }
    
    /* Dark mode styles */
    body.dark-mode {
        --primary: #ffffff;
        --white: #0a0a0a;
        --gray-50: #171717;
        --gray-100: #262626;
        --gray-200: #404040;
        --gray-600: #a3a3a3;
        --gray-700: #d4d4d4;
        --gray-900: #fafafa;
    }
    
    body.dark-mode .header.scrolled {
        background: rgba(10, 10, 10, 0.8);
    }
    
    body.dark-mode .about-text,
    body.dark-mode .skill-category,
    body.dark-mode .project-card {
        background: var(--gray-100);
        border-color: var(--gray-200);
    }
`;

document.head.appendChild(style);

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

// Apply throttling to scroll-heavy functions
const throttledScrollHandler = throttle(() => {
    // Your scroll-dependent code here
}, 16); // ~60fps

// Enhanced loading animation
window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
        
        // Trigger entrance animations
        document.querySelectorAll('.hero-content > *').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 100);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add focus styles for keyboard navigation
const keyboardStyle = document.createElement('style');
keyboardStyle.textContent = `
    body.keyboard-nav .nav-link:focus,
    body.keyboard-nav .btn:focus,
    body.keyboard-nav .project-link:focus,
    body.keyboard-nav .social-link:focus {
        outline: 2px solid var(--accent);
        outline-offset: 2px;
    }
`;
document.head.appendChild(keyboardStyle);