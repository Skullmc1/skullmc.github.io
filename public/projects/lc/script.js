document.addEventListener('DOMContentLoaded', () => {
    const contextMenu = document.querySelector('.context-menu');
    
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        
        const x = e.clientX;
        const y = e.clientY;
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        const menuWidth = contextMenu.offsetWidth;
        const menuHeight = contextMenu.offsetHeight;
        
        const xPosition = x + menuWidth > winWidth ? winWidth - menuWidth : x;
        const yPosition = y + menuHeight > winHeight ? winHeight - menuHeight : y;
        
        contextMenu.style.left = `${xPosition}px`;
        contextMenu.style.top = `${yPosition}px`;
        
        contextMenu.classList.add('active');
    });
    
    document.addEventListener('click', () => {
        contextMenu.classList.remove('active');
    });
    
    document.querySelectorAll('.context-menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const action = e.target.closest('.context-menu-item').textContent.trim().toLowerCase();
            
            switch(action) {
                case 'home':
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    break;
                case 'about':
                    document.querySelector('#about').scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                    break;
                case 'copy':
                    if (window.getSelection().toString()) {
                        navigator.clipboard.writeText(window.getSelection().toString());
                    }
                    break;
                case 'paste':
                    navigator.clipboard.readText()
                        .then(text => {
                            if (document.activeElement.isContentEditable) {
                                document.execCommand('insertText', false, text);
                            }
                        });
                    break;
                case 'share':
                    if (navigator.share) {
                        navigator.share({
                            title: document.title,
                            url: window.location.href
                        });
                    }
                    break;
            }
        });
    });
    
    window.addEventListener('resize', () => {
        contextMenu.classList.remove('active');
    });
    
    document.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}); 