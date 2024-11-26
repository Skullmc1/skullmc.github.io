document.addEventListener('DOMContentLoaded', () => {
    // Create and append the context menu
    const contextMenu = createContextMenu();
    document.body.appendChild(contextMenu);

    // Handle right click
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        
        contextMenu.classList.remove('active');
        
        const { clientX: mouseX, clientY: mouseY } = e;
        
        contextMenu.style.left = `${mouseX}px`;
        contextMenu.style.top = `${mouseY}px`;
        
        // Check boundaries
        const menuRect = contextMenu.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        if (menuRect.right > windowWidth) {
            contextMenu.style.left = `${windowWidth - menuRect.width}px`;
        }
        if (menuRect.bottom > windowHeight) {
            contextMenu.style.top = `${windowHeight - menuRect.height}px`;
        }
        
        contextMenu.classList.add('active');
    });

    // Hide menu on click outside
    document.addEventListener('click', () => {
        contextMenu.classList.remove('active');
    });

    // Handle menu actions
    contextMenu.addEventListener('click', (e) => {
        const menuItem = e.target.closest('.context-menu-item');
        if (!menuItem) return;
        
        const action = menuItem.dataset.action;
        switch(action) {
            case 'home':
                window.location.href = 'index.html';
                break;
            case 'consultation':
                window.location.href = 'consult.html';
                break;
            case 'share':
                if (navigator.share) {
                    navigator.share({
                        title: document.title,
                        url: window.location.href
                    });
                } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                }
                break;
            case 'print':
                window.print();
                break;
            case 'contact':
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.location.href = 'index.html#contact';
                }
                break;
        }
        
        contextMenu.classList.remove('active');
    });

    // Wrap existing slides in a container if not already wrapped
    const slideshowContainer = document.querySelector('.slideshow-container');
    const slides = document.querySelectorAll('.slide');
    
    if (!document.querySelector('.slides')) {
        const slidesWrapper = document.createElement('div');
        slidesWrapper.className = 'slides';
        slides.forEach(slide => slidesWrapper.appendChild(slide));
        slideshowContainer.insertBefore(slidesWrapper, slideshowContainer.firstChild);
    }
    
    // Initialize slideshow
    let slideIndex = 1;
    showSlides(slideIndex);

    // Make these functions global
    window.changeSlide = function(n) {
        showSlides(slideIndex += n);
    }

    window.currentSlide = function(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        const slides = document.getElementsByClassName("slide");
        const dots = document.getElementsByClassName("dot");
        const slidesContainer = document.querySelector('.slides');
        
        if (!slides.length) return;
        
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        
        // Calculate the translation distance
        const translateValue = -(slideIndex - 1) * 100;
        slidesContainer.style.transform = `translateX(${translateValue}%)`;
        
        // Update dots
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove('active');
        }
        dots[slideIndex-1].classList.add('active');
    }

    // Auto-play functionality
    function autoSlide() {
        showSlides(slideIndex += 1);
    }

    const slideInterval = setInterval(autoSlide, 15000);

    // Pause on hover
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        slideshowContainer.addEventListener('mouseleave', () => {
            clearInterval(slideInterval);
            setInterval(autoSlide, 5000);
        });
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade');
        }
    });
}, observerOptions);

document.querySelectorAll('.solution-card, .benefit-item').forEach(element => {
    observer.observe(element);
});

// Form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Newsletter form
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add newsletter subscription logic here
    alert('Thank you for subscribing to our newsletter!');
    this.reset();
});

// Consultation form handling
document.getElementById('consultationForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Here you would typically send the form data to your server
    // For now, we'll just show a success message
    alert('Thank you for requesting a consultation! Our team will contact you within 24 hours to schedule your free consultation.');
    
    // Optional: Reset the form
    this.reset();
    
    // Optional: Redirect to a thank you page
    // window.location.href = '/thank-you.html';
});

// Custom Context Menu
function createContextMenu() {
    const menu = document.createElement('div');
    menu.className = 'custom-context-menu';
    menu.innerHTML = `
        <div class="context-menu-item" data-action="home">
            <i class="fas fa-home"></i>
            <span>Home</span>
        </div>
        <div class="context-menu-item" data-action="consultation">
            <i class="fas fa-calendar-alt"></i>
            <span>Book Consultation</span>
        </div>
        <div class="context-menu-divider"></div>
        <div class="context-menu-item" data-action="share">
            <i class="fas fa-share-alt"></i>
            <span>Share Page</span>
        </div>
        <div class="context-menu-item" data-action="print">
            <i class="fas fa-print"></i>
            <span>Print Page</span>
        </div>
        <div class="context-menu-divider"></div>
        <div class="context-menu-item" data-action="contact">
            <i class="fas fa-envelope"></i>
            <span>Contact Us</span>
        </div>
    `;
    return menu;
}

// Prevent default context menu on touch devices
document.addEventListener('touchstart', (e) => {
    let touch = e.touches[0];
    let mouseEvent = new MouseEvent('contextmenu', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    e.preventDefault();
    document.dispatchEvent(mouseEvent);
}, { passive: false }); 