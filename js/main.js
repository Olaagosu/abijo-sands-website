// Scroll Animation Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: Stop observing once animated
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with class 'reveal'
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
    
    // Initialize other functions
    initNavbar();
    initDates();
    initParallax();
});

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
}

// Set minimum dates
function initDates() {
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (checkinInput && checkoutInput) {
        const today = new Date().toISOString().split('T')[0];
        checkinInput.min = today;
        checkinInput.value = today;
        
        // Set checkout to tomorrow by default
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        checkoutInput.min = today;
        checkoutInput.value = tomorrow.toISOString().split('T')[0];
        
        checkinInput.addEventListener('change', () => {
            checkoutInput.min = checkinInput.value;
            const checkinDate = new Date(checkinInput.value);
            const checkoutDate = new Date(checkoutInput.value);
            
            if (checkoutDate <= checkinDate) {
                const nextDay = new Date(checkinDate);
                nextDay.setDate(nextDay.getDate() + 1);
                checkoutInput.value = nextDay.toISOString().split('T')[0];
            }
        });
    }
}

// Simple parallax effect
function initParallax() {
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            heroImage.style.transform = `translateY(${rate}px) scale(1.1)`;
        });
    }
}

// Check Availability with loading state
function checkAvailability() {
    const btn = document.querySelector('.booking-form .btn-primary');
    const originalText = btn.innerText;
    
    const checkin = document.getElementById('checkin')?.value;
    const checkout = document.getElementById('checkout')?.value;
    const guests = document.getElementById('guests')?.value;
    
    if (!checkin || !checkout) {
        alert('Please select both check-in and check-out dates');
        return;
    }
    
    // Loading animation
    btn.innerText = 'Checking...';
    btn.disabled = true;
    btn.style.opacity = '0.7';
    
    setTimeout(() => {
        btn.innerText = originalText;
        btn.disabled = false;
        btn.style.opacity = '1';
        
        alert(`Great news! We have availability for ${guests} guest(s) from ${checkin} to ${checkout}.\n\nRedirecting to booking page...`);
        
        // In production: window.location.href = `/booking?checkin=${checkin}&checkout=${checkout}`;
    }, 1500);
}

// Scroll to booking section
function scrollToBooking() {
    const bookingSection = document.getElementById('collection');
    if (bookingSection) {
        bookingSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// Contact form with animation
function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    
    btn.innerText = 'Sending...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerText = 'Sent!';
        btn.style.background = '#4CAF50';
        
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you within 24 hours.');
            e.target.reset();
            btn.innerText = originalText;
            btn.style.background = '';
            btn.disabled = false;
        }, 500);
    }, 1500);
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            document.querySelector('.nav-links')?.classList.remove('active');
            document.querySelector('.hamburger')?.classList.remove('active');
            
            target.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    });
});

// Add reveal class to sections on load
window.addEventListener('load', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.classList.add('reveal');
        if (index % 2 === 0) {
            section.classList.add('stagger-1');
        }
    });
});
