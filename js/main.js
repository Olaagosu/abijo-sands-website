// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Set minimum date to today
const checkinInput = document.getElementById('checkin');
const checkoutInput = document.getElementById('checkout');

if (checkinInput && checkoutInput) {
    const today = new Date().toISOString().split('T')[0];
    checkinInput.min = today;
    checkinInput.value = today;
    
    checkinInput.addEventListener('change', () => {
        checkoutInput.min = checkinInput.value;
        if (checkoutInput.value && checkoutInput.value <= checkinInput.value) {
            const nextDay = new Date(checkinInput.value);
            nextDay.setDate(nextDay.getDate() + 1);
            checkoutInput.value = nextDay.toISOString().split('T')[0];
        }
    });
}

// Check Availability Function
function checkAvailability() {
    const checkin = document.getElementById('checkin')?.value;
    const checkout = document.getElementById('checkout')?.value;
    const guests = document.getElementById('guests')?.value;
    
    if (!checkin || !checkout) {
        alert('Please select both check-in and check-out dates');
        return;
    }
    
    // Here you would typically connect to your booking system
    alert(`Checking availability for ${guests} guest(s) from ${checkin} to ${checkout}...\n\n(In production, this would connect to your booking engine)`);
    
    // Example: redirect to booking page with parameters
    // window.location.href = `/book?checkin=${checkin}&checkout=${checkout}&guests=${guests}`;
}

// Scroll to Booking
function scrollToBooking() {
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
}

// Contact Form Handler
function handleSubmit(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you shortly.');
    e.target.reset();
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});
