const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav ul li a');

// Change nav style on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Update active nav item on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile Menu Functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu ul li a');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking a link
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Enhanced smooth cursor movement
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Show cursor when mouse moves
    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        mouseX = e.clientX - 20;
        mouseY = e.clientY - 20;
    });
    
    // Hide cursor when it leaves the window
    document.addEventListener('mouseout', () => {
        cursor.style.display = 'none';
    });
    
    // Smooth cursor animation
    function animate() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Interactive elements hover effect
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
});

// Custom Context Menu
document.addEventListener('DOMContentLoaded', () => {
    const contextMenu = document.querySelector('.context-menu');
    
    // Prevent default context menu and show custom menu
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        
        // Get cursor position
        let x = e.clientX;
        let y = e.clientY;
        
        // Show menu
        contextMenu.style.display = 'block';
        
        // Adjust menu position if it goes off screen
        const menuRect = contextMenu.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        if (x + menuRect.width > windowWidth) {
            x = windowWidth - menuRect.width - 10;
        }
        
        if (y + menuRect.height > windowHeight) {
            y = windowHeight - menuRect.height - 10;
        }
        
        contextMenu.style.left = `${x}px`;
        contextMenu.style.top = `${y}px`;
        
        // Add active class for animation
        contextMenu.classList.add('active');
    });
    
    // Hide menu on click outside
    document.addEventListener('click', () => {
        contextMenu.style.display = 'none';
        contextMenu.classList.remove('active');
    });
    
    // Handle menu item clicks
    const menuItems = document.querySelectorAll('.context-menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent immediate closing
            
            // Add your click handlers here
            const action = item.textContent.trim();
            console.log(`Selected: ${action}`);
            
            // Close menu after short delay
            setTimeout(() => {
                contextMenu.style.display = 'none';
                contextMenu.classList.remove('active');
            }, 150);
        });
    });
    
    // Prevent menu from going off screen on window resize
    window.addEventListener('resize', () => {
        if (contextMenu.style.display === 'block') {
            const menuRect = contextMenu.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            
            let x = parseInt(contextMenu.style.left);
            let y = parseInt(contextMenu.style.top);
            
            if (x + menuRect.width > windowWidth) {
                x = windowWidth - menuRect.width - 10;
            }
            
            if (y + menuRect.height > windowHeight) {
                y = windowHeight - menuRect.height - 10;
            }
            
            contextMenu.style.left = `${x}px`;
            contextMenu.style.top = `${y}px`;
        }
    });
});

// Modal functionality
function initializeModals() {
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.close-modal');

    function closeModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }

    // Close modal when clicking close button
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            closeModal(modal);
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Calculator Form
    const calculatorForm = document.getElementById('calculatorForm');
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const monthlyBill = parseFloat(document.getElementById('monthlyBill').value);
            const sunlightHours = parseFloat(document.getElementById('sunlightHours').value);
            const roofArea = parseFloat(document.getElementById('roofArea').value);

            // Simple calculations (you can make these more sophisticated)
            const annualSavings = monthlyBill * 12 * 0.7; // Assume 70% savings
            const systemSize = (monthlyBill * 0.1); // Rough estimate
            const co2Reduction = systemSize * 1.5; // Rough estimate

            // Display results
            document.getElementById('annualSavings').textContent = `$${annualSavings.toFixed(2)}`;
            document.getElementById('systemSize').textContent = `${systemSize.toFixed(1)} kW`;
            document.getElementById('co2Reduction').textContent = `${co2Reduction.toFixed(1)} tons/year`;

            document.getElementById('calculationResults').classList.remove('hidden');
        });
    }

    // Consultation Form
    const consultationForm = document.getElementById('consultationForm');
    if (consultationForm) {
        consultationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Here you would typically send this data to your server
            alert('Thank you! We will contact you soon to confirm your consultation.');
            closeModal(consultationForm.closest('.modal'));
        });
    }

    // Update context menu click handlers
    const menuItems = document.querySelectorAll('.context-menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const text = item.textContent.trim();
            
            if (text.includes('Solar Calculator')) {
                openModal('solarCalculator');
            } else if (text.includes('Schedule Consultation')) {
                openModal('consultationModal');
            }
            
            // Close context menu
            document.querySelector('.context-menu').style.display = 'none';
        });
    });
}

// Initialize modals when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeModals); 