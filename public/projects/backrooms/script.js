document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('start-overlay');
    const audio = document.getElementById('ambient-audio');
    const images = document.querySelectorAll('img');

    // Add loading state
    let assetsLoaded = false;

    // Check if all images are loaded
    Promise.all(Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => img.addEventListener('load', resolve));
    })).then(() => {
        assetsLoaded = true;
        overlay.style.cursor = 'pointer';
    });

    // Improved audio handling
    if(audio) {
        audio.volume = 0.2;
        
        // Add volume control with keyboard
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp' && audio.volume < 1.0) {
                audio.volume = Math.min(1, audio.volume + 0.1);
            }
            if (e.key === 'ArrowDown' && audio.volume > 0) {
                audio.volume = Math.max(0, audio.volume - 0.1);
            }
            if (e.key === 'M') {
                audio.muted = !audio.muted;
            }
        });
    }

    // Improved overlay click handler
    overlay.addEventListener('click', function() {
        if (!assetsLoaded) return; // Don't proceed if assets aren't loaded

        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.5s ease';

        setTimeout(() => {
            overlay.style.display = 'none';
            if(audio) {
                audio.play().catch(function(error) {
                    console.log("Audio play failed:", error);
                });
            }
            // Add entrance animation for content
            document.getElementById('backroom').style.animation = 'fadeIn 1s ease-in';
        }, 500);
    });

    // Add scroll-based animations
    const rooms = document.querySelectorAll('.room');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    rooms.forEach(room => {
        room.style.opacity = '0';
        room.style.transform = 'translateY(20px)';
        room.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(room);
    });

    // Create random no-clip zones
    function createNoClipZones() {
        const rooms = document.querySelectorAll('.room');
        
        rooms.forEach(room => {
            // Keep the 75% chance per room
            if (Math.random() > 0.1) {
                const noClipZone = document.createElement('div');
                noClipZone.className = 'no-clip-zone';
                
                // Square shape: use same value for width and height
                const size = Math.random() * 20 + 20 + '%';  // 20-40% size
                noClipZone.style.position = 'absolute';
                noClipZone.style.width = size;
                noClipZone.style.height = size;
                
                // Adjust positioning to allow full squares
                noClipZone.style.left = Math.random() * 60 + '%';
                noClipZone.style.top = Math.random() * 60 + '%';
                
                room.style.position = 'relative';
                room.appendChild(noClipZone);
            }
        });
    }

    // Create initial no-clip zones
    createNoClipZones();

    // Keep the 5-second interval
    setInterval(() => {
        document.querySelectorAll('.no-clip-zone').forEach(zone => zone.remove());
        createNoClipZones();
    }, 5000);
});