/* ============================================
   NoozeLess Website JavaScript
   Scroll animations and interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functions
    initScrollAnimations();
    initMobileNavigation();
    setCurrentYear();
    setCurrentDate();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // Initialize scroll-based animations
    function initScrollAnimations() {
        // Create IntersectionObserver for fade-up animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Check if element has a data-delay attribute
                    const delay = element.getAttribute('data-delay') || 0;
                    
                    // Apply animation with delay
                    setTimeout(() => {
                        element.classList.add('animated');
                    }, delay * 300);
                    
                    // Stop observing after animation triggers
                    observer.unobserve(element);
                }
            });
        }, observerOptions);
        
        // Observe all elements with animate-fade-up class
        document.querySelectorAll('.animate-fade-up').forEach(element => {
            observer.observe(element);
        });
        
        // Add scroll effect to header
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(18, 18, 18, 0.98)';
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
            } else {
                header.style.backgroundColor = 'var(--bg-header)';
                header.style.boxShadow = 'none';
            }
        });
    }
    
    // Initialize mobile navigation toggle
    function initMobileNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (navToggle && navLinks) {
            navToggle.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                
                // Change icon based on menu state
                const icon = this.querySelector('i');
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
            
            // Close menu when clicking on a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    const icon = navToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                });
            });
        }
    }
    
    // Set current year in copyright
    function setCurrentYear() {
        const yearElements = document.querySelectorAll('#current-year, #current-year-privacy');
        const currentYear = new Date().getFullYear();
        
        yearElements.forEach(element => {
            if (element) {
                element.textContent = currentYear;
            }
        });
    }
    
    // Set current date in privacy policy
    function setCurrentDate() {
        const dateElement = document.getElementById('current-date');
        if (dateElement) {
            const now = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            dateElement.textContent = now.toLocaleDateString('en-US', options);
        }
    }
    
    // Add interactive challenge demo in hero section
    const challengeButton = document.querySelector('.challenge-button');
    if (challengeButton) {
        challengeButton.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = 'Alarm Stopped!';
            this.style.backgroundColor = 'var(--success-color)';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 1500);
        });
    }
    
    // Add interactive elements to screenshot placeholders
    const answerInputs = document.querySelectorAll('.answer-input');
    answerInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.borderColor = 'var(--primary-color)';
            this.style.borderColor = 'var(--primary-color)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.borderColor = '';
            this.style.borderColor = '';
        });
    });
    
    // Add challenge option selection
    const challengeOptions = document.querySelectorAll('.option');
    challengeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            challengeOptions.forEach(opt => {
                opt.classList.remove('active');
            });
            
            // Add active class to clicked option
            this.classList.add('active');
        });
    });
    
    // Add alarm item selection
    const alarmItems = document.querySelectorAll('.alarm-item');
    alarmItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            alarmItems.forEach(alarm => {
                alarm.classList.remove('active');
                alarm.style.borderLeftColor = '';
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            this.style.borderLeftColor = 'var(--primary-color)';
        });
    });
    
    // Add hover effect to feature cards with delay
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            // Staggered animation delay based on card position
            this.style.transitionDelay = `${index * 0.05}s`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transitionDelay = '0s';
        });
    });
    
    // Simple screenshot slider navigation (for demonstration)
    const screenshotSlider = document.querySelector('.screenshot-slider');
    if (screenshotSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        screenshotSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - screenshotSlider.offsetLeft;
            scrollLeft = screenshotSlider.scrollLeft;
        });
        
        screenshotSlider.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        screenshotSlider.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        screenshotSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - screenshotSlider.offsetLeft;
            const walk = (x - startX) * 2;
            screenshotSlider.scrollLeft = scrollLeft - walk;
        });
        
        // Also make it work on touch devices
        screenshotSlider.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - screenshotSlider.offsetLeft;
            scrollLeft = screenshotSlider.scrollLeft;
        });
        
        screenshotSlider.addEventListener('touchend', () => {
            isDown = false;
        });
        
        screenshotSlider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - screenshotSlider.offsetLeft;
            const walk = (x - startX) * 2;
            screenshotSlider.scrollLeft = scrollLeft - walk;
        });
    }
    
    // Add animation to step numbers on scroll
    const stepsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stepNumbers = document.querySelectorAll('.step-number');
                stepNumbers.forEach((number, index) => {
                    setTimeout(() => {
                        number.style.transform = 'scale(1.1)';
                        number.style.boxShadow = '0 0 20px rgba(67, 97, 238, 0.5)';
                        
                        setTimeout(() => {
                            number.style.transform = '';
                            number.style.boxShadow = '';
                        }, 300);
                    }, index * 200);
                });
                
                // Stop observing after animation
                stepsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const stepsContainer = document.querySelector('.steps-container');
    if (stepsContainer) {
        stepsObserver.observe(stepsContainer);
    }
});