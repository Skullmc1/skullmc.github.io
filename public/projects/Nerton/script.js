document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Eerie hover effects
    const perfectElements = document.querySelectorAll('.perfect');
    perfectElements.forEach(element => {
        element.addEventListener('mouseover', () => {
            element.style.transition = 'color 0.3s ease';
            element.style.color = '#e74c3c';
        });
        element.addEventListener('mouseout', () => {
            element.style.color = '#27ae60';
        });
    });

    // Join button click event
    const joinBtn = document.getElementById('joinBtn');
    if (joinBtn) {
        joinBtn.addEventListener('click', () => {
            // Add creepy messages
            const messages = [
                "We've been waiting for you...",
                "The town welcomes you...",
                "You'll never want to leave...",
                "Become one with Nerton...",
                "Perfect... just perfect..."
            ];
            alert(messages[Math.floor(Math.random() * messages.length)]);
        });

        // Make the join button more unsettling
        joinBtn.addEventListener('mouseover', () => {
            const messages = [
                "Join Us...",
                "Become Perfect...",
                "Stay Forever...",
                "No Escape..."
            ];
            joinBtn.querySelector('span').textContent = 
                messages[Math.floor(Math.random() * messages.length)];
        });

        joinBtn.addEventListener('mouseout', () => {
            joinBtn.querySelector('span').textContent = "Join Us Today";
        });
    }

    // Subtle animation for eerie text
    const eerieElements = document.querySelectorAll('.eerie');
    eerieElements.forEach(element => {
        element.style.transition = 'opacity 0.5s ease';
        setInterval(() => {
            element.style.opacity = '0.7';
            setTimeout(() => {
                element.style.opacity = '1';
            }, 500);
        }, 5000);
    });

    // Track mouse position for watching elements
    let root = document.documentElement;
    document.addEventListener('mousemove', (e) => {
        root.style.setProperty('--mouse-x', e.clientX);
        root.style.setProperty('--mouse-y', e.clientY);
    });

    // Make elements watch the cursor
    const watchingElements = document.querySelectorAll('.watching');
    watchingElements.forEach(element => {
        element.style.transform = 'translate(0, 0)';
    });

    // Random text flicker effect
    const eerieTexts = document.querySelectorAll('.eerie, .eerie-small');
    eerieTexts.forEach(text => {
        setInterval(() => {
            if(Math.random() < 0.1) {
                text.style.opacity = '0';
                setTimeout(() => {
                    text.style.opacity = '1';
                }, 100);
            }
        }, 3000);
    });

    // Make the counter randomly change
    const counter = document.getElementById('counter');
    if(counter) {
        setInterval(() => {
            const currentNumber = parseInt(counter.textContent);
            const change = Math.random() < 0.5 ? -1 : 1;
            counter.textContent = Math.max(1, currentNumber + change);
            
            if(currentNumber <= 3) {
                counter.style.color = 'var(--eerie-red)';
                counter.classList.add('flickering');
            }
        }, 10000);
    }

    // Add unsettling hover effects to images
    const images = document.querySelectorAll('img:not(.resident-image)');
    images.forEach(img => {
        img.addEventListener('mouseover', () => {
            img.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                img.style.filter = 'none';
            }, 200);
        });
    });

    // Make testimonials more alive
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach(testimonial => {
        const quote = testimonial.querySelector('.quote');
        const originalText = quote.textContent;
        
        testimonial.addEventListener('mouseover', () => {
            const eerieTexts = [
                "The town... it speaks through us...",
                "You'll be perfect too... soon...",
                "Join us... become perfect...",
                "We're all one here... all perfect..."
            ];
            quote.textContent = eerieTexts[Math.floor(Math.random() * eerieTexts.length)];
        });

        testimonial.addEventListener('mouseout', () => {
            quote.textContent = originalText;
        });
    });

    // Add class to elements when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('alive');
            }
        });
    });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Scrollbar Glitch Effect
    function triggerScrollbarGlitch() {
        document.documentElement.style.animation = 'scrollbarGlitch 2s steps(1) forwards';
        
        setTimeout(() => {
            document.documentElement.style.animation = 'none';
        }, 2000);
    }

    // Trigger glitch on scroll with cooldown
    let canGlitch = true;
    window.addEventListener('scroll', () => {
        if (canGlitch && Math.random() < 0.1) { // 10% chance to trigger on scroll
            canGlitch = false;
            triggerScrollbarGlitch();
            
            // Cooldown period
            setTimeout(() => {
                canGlitch = true;
            }, 5000); // Wait 5 seconds before allowing another glitch
        }
    });

    // Occasional random glitch
    setInterval(() => {
        if (canGlitch && Math.random() < 0.3) { // 30% chance every interval
            triggerScrollbarGlitch();
        }
    }, 10000); // Check every 10 seconds

    // Glitch when hovering over eerie elements
    document.querySelectorAll('.eerie, .eerie-small').forEach(element => {
        element.addEventListener('mouseover', () => {
            if (canGlitch) {
                triggerScrollbarGlitch();
            }
        });
    });

    // Add smooth scroll behavior with occasional "stutter"
    function smoothScrollWithGlitch(target) {
        const start = window.pageYOffset;
        const distance = target - start;
        const duration = 1000;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            // Add random "stutters" to the scroll
            const stutter = Math.random() < 0.1 ? Math.sin(progress * 10) * 10 : 0;
            
            window.scrollTo(0, start + distance * progress + stutter);
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    // Apply smooth scroll with glitch to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                smoothScrollWithGlitch(target.offsetTop);
            }
        });
    });

    // Whisper text effect on hover
    document.querySelectorAll('.perfect, .eerie').forEach(element => {
        const originalText = element.textContent;
        element.addEventListener('mouseover', () => {
            const whispers = [
                "join us...",
                "stay forever...",
                "become perfect...",
                "no escape...",
                "the town needs you..."
            ];
            
            // Create whisper element
            const whisper = document.createElement('div');
            whisper.className = 'whisper';
            whisper.textContent = whispers[Math.floor(Math.random() * whispers.length)];
            document.body.appendChild(whisper);
            
            // Follow cursor with slight delay
            const updateWhisperPosition = (e) => {
                whisper.style.left = (e.pageX + 15) + 'px';
                whisper.style.top = (e.pageY + 15) + 'px';
            };
            document.addEventListener('mousemove', updateWhisperPosition);
            
            element.addEventListener('mouseout', () => {
                whisper.remove();
                document.removeEventListener('mousemove', updateWhisperPosition);
            }, { once: true });
        });
    });

    // Random image distortion (update this section)
    function setupImageEffects() {
        const siteImages = document.querySelectorAll('img:not(.resident-image)');
        siteImages.forEach(img => {
            // Add hover effect
            img.addEventListener('mouseover', () => {
                img.style.filter = 'hue-rotate(180deg)';
                setTimeout(() => {
                    img.style.filter = 'none';
                }, 200);
            });

            // Add random distortion
            setInterval(() => {
                if(Math.random() < 0.05) { // 5% chance
                    img.style.filter = 'hue-rotate(180deg) brightness(1.2) contrast(1.5)';
                    setTimeout(() => {
                        img.style.filter = 'none';
                    }, 100);
                }
            }, 5000);
        });
    }

    // Call the function in your DOMContentLoaded event
    setupImageEffects();

    // Text scramble effect
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }
        
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        
        update() {
            let output = '';
            let complete = 0;
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="glitch">${char}</span>`;
                } else {
                    output += from;
                }
            }
            this.el.innerHTML = output;
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }

    // Random favicon change
    setInterval(() => {
        if(Math.random() < 0.1) {
            document.getElementById('favicon').href = 'favicon-alt.ico';
            setTimeout(() => {
                document.getElementById('favicon').href = 'favicon-normal.ico';
            }, 100);
        }
    }, 10000);

    // Add cursor effects near testimonials
    document.querySelectorAll('.testimonial').forEach(testimonial => {
        testimonial.addEventListener('mousemove', (e) => {
            const cursor = document.createElement('div');
            cursor.className = 'cursor-trail';
            cursor.style.left = e.pageX + 'px';
            cursor.style.top = e.pageY + 'px';
            document.body.appendChild(cursor);
            
            setTimeout(() => cursor.remove(), 500);
        });
    });

    // Add subtle noise effect to images on scroll
    window.addEventListener('scroll', () => {
        const noise = Math.random() * 0.15;
        document.querySelectorAll('img:not(.resident-image)').forEach(img => {
            img.style.filter = `brightness(1) contrast(1) saturate(1) sepia(${noise})`;
            setTimeout(() => {
                img.style.filter = 'none';
            }, 100);
        });
    });

    // Random text replacement in navigation
    const navLinks = document.querySelectorAll('nav a');
    setInterval(() => {
        if(Math.random() < 0.05) {
            const randomLink = navLinks[Math.floor(Math.random() * navLinks.length)];
            const originalText = randomLink.textContent;
            randomLink.textContent = 'JOIN US';
            setTimeout(() => {
                randomLink.textContent = originalText;
            }, 200);
        }
    }, 5000);

    // Add to your existing DOMContentLoaded event listener
    function setupFaviconGlitch() {
        const favicon = document.getElementById('favicon');
        
        // Random favicon change
        setInterval(() => {
            if(Math.random() < 0.1) {
                favicon.href = 'favicon-alt-32x32.png';
                setTimeout(() => {
                    favicon.href = 'favicon-normal-32x32.png';
                }, 100);
            }
        }, 10000);

        // Change favicon when hovering over eerie elements
        document.querySelectorAll('.eerie, .eerie-small').forEach(element => {
            element.addEventListener('mouseover', () => {
                favicon.href = 'favicon-alt-32x32.png';
            });
            element.addEventListener('mouseout', () => {
                favicon.href = 'favicon-normal-32x32.png';
            });
        });
    }

    // Call the function in your DOMContentLoaded event
    setupFaviconGlitch();

    // Prevent default context menu everywhere
    window.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const existingMenus = document.querySelectorAll('.custom-context-menu');
        existingMenus.forEach(menu => menu.remove());
        
        const contextMenu = document.createElement('div');
        contextMenu.className = 'custom-context-menu';
        
        // Menu items with functions
        const menuItems = [
            { 
                text: 'The town is watching...', 
                class: 'context-eerie',
                action: () => {
                    // Create floating eyes that follow cursor
                    const eye = document.createElement('div');
                    eye.className = 'floating-eye';
                    eye.style.left = `${e.pageX}px`;
                    eye.style.top = `${e.pageY}px`;
                    document.body.appendChild(eye);
                    setTimeout(() => eye.remove(), 5000);
                }
            },
            { 
                text: 'Join us', 
                class: 'context-perfect',
                action: () => {
                    // Scroll to join section with glitch effect
                    document.documentElement.style.filter = 'hue-rotate(90deg) contrast(150%)';
                    setTimeout(() => {
                        document.documentElement.style.filter = '';
                        document.querySelector('#join').scrollIntoView({ behavior: 'smooth' });
                    }, 500);
                }
            },
            { 
                text: 'Stay forever', 
                class: 'context-eerie',
                action: () => {
                    // Create glitch text overlay
                    const overlay = document.createElement('div');
                    overlay.className = 'glitch-overlay';
                    overlay.textContent = 'FOREVER AND EVER AND EVER';
                    document.body.appendChild(overlay);
                    setTimeout(() => overlay.remove(), 2000);
                }
            },
            { 
                text: 'No escape', 
                class: 'context-perfect',
                action: () => {
                    // Make the page "breathe"
                    document.body.style.animation = 'pageBreathing 3s ease-in-out';
                    setTimeout(() => {
                        document.body.style.animation = '';
                    }, 3000);
                }
            },
            { 
                text: '⊗ Close ⊗', 
                class: 'context-close',
                action: () => contextMenu.remove()
            }
        ];
        
        menuItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = `context-menu-item ${item.class}`;
            menuItem.textContent = item.text;
            
            // Add hover effect
            menuItem.addEventListener('mouseover', () => {
                const glitchTexts = [
                    'JOIN US',
                    'PERFECT',
                    'FOREVER',
                    'STAY',
                    'ONE OF US'
                ];
                if(Math.random() < 0.3) {
                    menuItem.textContent = glitchTexts[Math.floor(Math.random() * glitchTexts.length)];
                    setTimeout(() => {
                        menuItem.textContent = item.text;
                    }, 100);
                }
            });
            
            // Add click action
            menuItem.addEventListener('click', () => {
                item.action();
                contextMenu.remove();
            });
            
            contextMenu.appendChild(menuItem);
        });

        // Position menu
        document.body.appendChild(contextMenu);
        
        const x = e.pageX;
        const y = e.pageY;
        
        contextMenu.style.left = x + 'px';
        contextMenu.style.top = y + 'px';
        
        // Adjust if off screen
        const menuRect = contextMenu.getBoundingClientRect();
        const bodyRect = document.body.getBoundingClientRect();
        
        if (menuRect.right > bodyRect.right) {
            contextMenu.style.left = (x - menuRect.width) + 'px';
        }
        
        if (menuRect.bottom > window.innerHeight) {
            contextMenu.style.top = (y - menuRect.height) + 'px';
        }
    }, { capture: true }); // Use capture phase
}); 