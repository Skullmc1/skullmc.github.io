document.querySelector('.container').addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
});

// Cursor trail effect
const cursor = document.querySelector('.custom-cursor');
const cursorTrail = Array.from({ length: 5 }, () => cursor.cloneNode());
cursorTrail.forEach((trail, index) => {
    trail.classList.add('cursor-trail');
    trail.style.zIndex = 9998 - index;
    document.body.appendChild(trail);
});

document.addEventListener('mousemove', (e) => {
    // Main cursor
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Trail effect
    cursorTrail.forEach((trail, index) => {
        setTimeout(() => {
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
        }, (index + 1) * 50);
    });
});

// Add lazy loading for images
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.loading = 'lazy';
});