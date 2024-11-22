// Form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send this data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Clear form
    this.reset();
    
    // Show success message (you can customize this)
    alert('Thank you for your message! We will get back to you soon.');
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#home') {
            scrollToTop();
        } else {
            const section = document.querySelector(targetId);
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add animation class to elements when they come into view
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all section headings
document.querySelectorAll('section h2').forEach(heading => {
    observer.observe(heading);
});

// Scroll to Top Button Visibility
function handleScrollToTopVisibility() {
    const scrollToTopButton = document.getElementById('scrollToTop');
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollPosition > 300) {
        scrollToTopButton.classList.add('visible');
    } else {
        scrollToTopButton.classList.remove('visible');
    }
}

// Smooth Scroll to Top Function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopButton = document.getElementById('scrollToTop');
    const logoLink = document.querySelector('.logo a');

    // Scroll to Top Button Click
    scrollToTopButton.addEventListener('click', scrollToTop);

    // Logo Click
    logoLink.addEventListener('click', function(e) {
        e.preventDefault();
        scrollToTop();
    });

    // Scroll Event for Button Visibility
    window.addEventListener('scroll', handleScrollToTopVisibility);

    const contextMenu = document.getElementById('contextMenu');
    
    // Prevent default context menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        
        // Position the custom context menu
        const x = e.clientX;
        const y = e.clientY;
        
        // Get menu dimensions
        const menuWidth = contextMenu.offsetWidth;
        const menuHeight = contextMenu.offsetHeight;
        
        // Get window dimensions
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Adjust position if menu would go outside window
        const adjustedX = x + menuWidth > windowWidth ? windowWidth - menuWidth : x;
        const adjustedY = y + menuHeight > windowHeight ? windowHeight - menuHeight : y;
        
        contextMenu.style.left = `${adjustedX}px`;
        contextMenu.style.top = `${adjustedY}px`;
        
        // Show the menu
        contextMenu.classList.add('visible');
    });
    
    // Hide context menu when clicking elsewhere
    document.addEventListener('click', function() {
        contextMenu.classList.remove('visible');
    });
    
    // Handle context menu actions
    contextMenu.addEventListener('click', function(e) {
        const action = e.target.closest('li')?.dataset.action;
        
        if (action) {
            switch(action) {
                case 'home':
                    document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
                    break;
                case 'programs':
                    document.querySelector('#programs').scrollIntoView({ behavior: 'smooth' });
                    break;
                case 'about':
                    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
                    break;
                case 'contact':
                    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
                    break;
                case 'top':
                    scrollToTop();
                    break;
            }
        }
    });
    
    // Hide menu when window is resized
    window.addEventListener('resize', function() {
        contextMenu.classList.remove('visible');
    });
    
    // Prevent the context menu from going off-screen
    document.addEventListener('mousemove', function(e) {
        if (contextMenu.classList.contains('visible')) {
            const menuRect = contextMenu.getBoundingClientRect();
            if (
                menuRect.left < 0 ||
                menuRect.top < 0 ||
                menuRect.right > window.innerWidth ||
                menuRect.bottom > window.innerHeight
            ) {
                contextMenu.classList.remove('visible');
            }
        }
    });

    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Mouse move handler
    window.addEventListener('mousemove', function(e) {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows cursor exactly
        cursorDot.style.transform = `translate(${posX - (cursorDot.offsetWidth / 2)}px, ${posY - (cursorDot.offsetHeight / 2)}px)`;
        
        // Outline follows with slight delay
        cursorOutline.style.transform = `translate(${posX - (cursorOutline.offsetWidth / 2)}px, ${posY - (cursorOutline.offsetHeight / 2)}px)`;
    });

    // Click animation
    document.addEventListener('mousedown', function() {
        cursorDot.classList.add('clicking');
        cursorOutline.classList.add('clicking');
    });

    document.addEventListener('mouseup', function() {
        cursorDot.classList.remove('clicking');
        cursorOutline.classList.remove('clicking');
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', function() {
        cursorDot.style.opacity = 0;
        cursorOutline.style.opacity = 0;
    });

    document.addEventListener('mouseenter', function() {
        cursorDot.style.opacity = 1;
        cursorOutline.style.opacity = 1;
    });

    // Add hover effect for all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .program-card, .submit-btn, input, textarea');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseover', () => {
            cursorDot.style.transform = 'scale(2)';
            cursorOutline.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'scale(1)';
            cursorOutline.style.transform = 'scale(1)';
        });
    });
}); 