document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const closeBtn = document.querySelector('.close-btn');
    const menuLinks = document.querySelectorAll('.sidebar-menu a');

    function toggleSidebar() {
        menuToggle.classList.toggle('active');
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }

    menuToggle.addEventListener('click', toggleSidebar);
    closeBtn.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', toggleSidebar);

    // Enhanced smooth scrolling for menu links
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Close sidebar first (on mobile)
            if (window.innerWidth <= 768) {
                toggleSidebar();
            }

            // Smooth scroll to target section
            setTimeout(() => {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, window.innerWidth <= 768 ? 500 : 0); // Add delay for mobile to allow sidebar to close
        });
    });

    // Add scroll reveal animation for sections
    const revealElements = document.querySelectorAll('section');
    
    const revealOnScroll = function() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial styles for sections
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 1s ease-out';
    });

    // Listen for scroll events
    window.addEventListener('scroll', revealOnScroll);
    // Initial check
    revealOnScroll();

    // Custom Right Click Menu
    const customMenu = document.querySelector('.custom-menu');
    const menuItems = document.querySelectorAll('.custom-menu-item');
    let menuVisible = false;

    const toggleMenu = (command) => {
        customMenu.style.display = command === "show" ? "block" : "none";
        menuVisible = command === "show";
    };

    const setPosition = (e) => {
        // Get cursor position relative to the viewport
        const x = e.clientX;
        const y = e.clientY;
        
        // Get viewport dimensions
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Get menu dimensions
        const menuWidth = customMenu.offsetWidth;
        const menuHeight = customMenu.offsetHeight;
        
        // Calculate position, accounting for scroll
        let posX = x + window.scrollX;
        let posY = y + window.scrollY;
        
        // Adjust if menu would go outside viewport
        if (x + menuWidth > windowWidth) {
            posX = posX - menuWidth;
        }
        
        if (y + menuHeight > windowHeight) {
            posY = posY - menuHeight;
        }
        
        // Set the position
        customMenu.style.left = `${posX}px`;
        customMenu.style.top = `${posY}px`;
    };

    window.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        
        // Hide menu first (if visible)
        if (menuVisible) {
            customMenu.classList.remove('active');
            toggleMenu("hide");
        }
        
        // Show menu at cursor position
        toggleMenu("show");
        setPosition(e);
        
        // Add active class for animation
        requestAnimationFrame(() => {
            customMenu.classList.add('active');
        });
    });

    document.addEventListener("click", (e) => {
        if (menuVisible && !customMenu.contains(e.target)) {
            customMenu.classList.remove('active');
            setTimeout(() => {
                toggleMenu("hide");
            }, 200);
        }
    });

    // Handle menu item clicks
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const text = item.textContent.trim().toLowerCase();
            switch(text) {
                case 'home':
                    window.location.href = '#home';
                    break;
                case 'contact us':
                    window.location.href = '#contact';
                    break;
                case 'shop now':
                    window.location.href = '#features';
                    break;
                case 'membership':
                    window.location.href = '#membership';
                    break;
                case 'share':
                    if (navigator.share) {
                        navigator.share({
                            title: 'EcoMart Supermarket',
                            text: 'Check out this eco-friendly supermarket!',
                            url: window.location.href
                        });
                    }
                    break;
            }
            
            // Hide menu after click
            customMenu.classList.remove('active');
            setTimeout(() => {
                toggleMenu("hide");
            }, 200);
        });
    });

    // Close menu on scroll
    window.addEventListener('scroll', () => {
        if (menuVisible) {
            customMenu.classList.remove('active');
            setTimeout(() => {
                toggleMenu("hide");
            }, 200);
        }
    });

    // Close menu with Escape key
    window.addEventListener('keyup', (e) => {
        if (e.key === 'Escape' && menuVisible) {
            customMenu.classList.remove('active');
            setTimeout(() => {
                toggleMenu("hide");
            }, 200);
        }
    });
}); 