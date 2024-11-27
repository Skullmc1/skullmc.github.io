document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.querySelector('.search-bar');
    let scrollTimeout;
    let isModalOpen = false;
    let lastScrollTop = 0;
    let isScrolling = false;

    // Track modal state
    const modal = document.getElementById('scp-modal');
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'style') {
                isModalOpen = modal.style.display === 'block';
            }
        });
    });

    observer.observe(modal, { attributes: true });

    // Function to smoothly scroll to search bar
    function scrollToSearch() {
        if (!isModalOpen && !isScrolling) {
            isScrolling = true;
            const searchBarPosition = searchBar.getBoundingClientRect().top + window.pageYOffset - 20;
            
            const container = document.querySelector('.container');
            container.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            // Reset scrolling flag after animation
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }
    }

    // Add this to your existing styles
    const style = document.createElement('style');
    style.textContent = `
        .container {
            max-height: 70vh;
            overflow-y: auto;
            position: relative;
            scrollbar-width: thin;
            scrollbar-color: var(--accent-red) var(--dark-gray);
            padding-right: 10px;
        }

        .container::-webkit-scrollbar {
            width: 8px;
        }

        .container::-webkit-scrollbar-track {
            background: var(--dark-gray);
        }

        .container::-webkit-scrollbar-thumb {
            background-color: var(--accent-red);
            border-radius: 4px;
        }

        .scroll-indicator {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(to right, var(--accent-red), var(--warning-yellow));
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 5s linear;
            opacity: 0;
        }

        .scroll-indicator.active {
            opacity: 1;
            transform: scaleX(1);
        }
    `;
    document.head.appendChild(style);

    // Add indicator to container
    const container = document.querySelector('.container');
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    container.insertBefore(indicator, container.firstChild);

    // Track scrolling within container
    container.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        
        if (container.scrollTop > 100 && !isModalOpen && !isScrolling) {
            lastScrollTop = container.scrollTop;
            scrollTimeout = setTimeout(() => {
                if (lastScrollTop === container.scrollTop) {
                    indicator.classList.add('active');
                    setTimeout(() => {
                        scrollToSearch();
                        indicator.classList.remove('active');
                    }, 5000);
                }
            }, 100);
        } else {
            indicator.classList.remove('active');
        }
    });

    // Clear timeout on user interaction
    ['mousedown', 'wheel', 'DOMMouseScroll', 'mousewheel', 'keyup', 'touchmove'].forEach(
        event => {
            container.addEventListener(event, () => {
                clearTimeout(scrollTimeout);
                indicator.classList.remove('active');
            }, { passive: true });
    });

    // Event Listeners for SCP entries
    document.querySelectorAll('.scp-entry').forEach(entry => {
        entry.addEventListener('click', function(e) {
            // Clear any pending scroll timeout
            clearTimeout(scrollTimeout);
            indicator.classList.remove('active');

            const scpId = this.querySelector('h3').textContent.split(' - ')[0];
            const scpTitle = this.querySelector('h3').textContent.split(' - ')[1];
            const scpData = scpDatabase[scpId];
            
            if (scpData) {
                document.getElementById('modal-title').textContent = scpData.title;
                document.getElementById('modal-classification').textContent = scpData.classification;
                document.getElementById('modal-procedures').textContent = scpData.procedures;
                document.getElementById('modal-description').textContent = scpData.description;
                document.getElementById('modal-addendum').textContent = scpData.addendum;
                
                // Extract just the number from the SCP ID (e.g., "173" from "SCP-173")
                const scpNumber = scpId.split('-')[1];
                
                // Set up the button click handler with just the number
                const readMoreBtn = document.querySelector('.read-more-btn');
                readMoreBtn.onclick = function() {
                    window.location.href = `scps/${scpNumber}.html`;
                };
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Modal close button
    const closeButton = document.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Click outside modal to close
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Create custom context menu
    const contextMenu = document.createElement('div');
    contextMenu.className = 'context-menu';
    contextMenu.innerHTML = `
        <div class="context-menu-item" data-action="index">
            <i class="fas fa-folder-open"></i> SCP Index
        </div>
        <div class="context-menu-item" data-action="classes">
            <i class="fas fa-layer-group"></i> Classes
        </div>
        <div class="context-menu-item" data-action="clearance">
            <i class="fas fa-key"></i> Security Clearance
        </div>
        <div class="context-menu-item" data-action="contact">
            <i class="fas fa-envelope"></i> Contact O5 Council
        </div>
        <div class="context-menu-separator"></div>
        <div class="context-menu-item" data-action="help">
            <i class="fas fa-question-circle"></i> Help
        </div>
        <div class="context-menu-item" data-action="report">
            <i class="fas fa-exclamation-triangle"></i> Report Breach
        </div>
        <div class="context-menu-separator"></div>
        <div class="context-menu-item" data-action="settings">
            <i class="fas fa-cog"></i> Site Settings
        </div>
    `;
    document.body.appendChild(contextMenu);

    // Add these styles
    const menuStyles = document.createElement('style');
    menuStyles.textContent = `
        .context-menu {
            position: fixed;
            background: linear-gradient(135deg, #1a1a1a, #242424);
            border: 1px solid var(--accent-red);
            box-shadow: 0 2px 15px rgba(196, 30, 58, 0.3);
            padding: 5px 0;
            min-width: 200px;
            z-index: 1000;
            opacity: 0;
            transform: scale(0.98);
            transform-origin: top left;
            transition: opacity 0.15s ease, transform 0.15s ease;
            pointer-events: none;
        }

        .context-menu.active {
            opacity: 1;
            transform: scale(1);
            pointer-events: auto;
        }

        .context-menu-item {
            padding: 8px 15px;
            color: #d4d4d4;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.2s ease;
        }

        .context-menu-item:hover {
            background: var(--accent-red);
            color: #fff;
        }

        .context-menu-separator {
            height: 1px;
            background: #333;
            margin: 5px 0;
        }

        .context-menu i {
            width: 16px;
            text-align: center;
            color: var(--warning-yellow);
        }

        .context-menu-item:hover i {
            color: #fff;
        }
    `;
    document.head.appendChild(menuStyles);

    // Handle context menu display
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        
        const { clientX: mouseX, clientY: mouseY } = e;
        contextMenu.style.left = `${mouseX}px`;
        contextMenu.style.top = `${mouseY}px`;

        // Ensure menu stays within viewport
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

    // Handle menu item clicks
    contextMenu.addEventListener('click', function(e) {
        const menuItem = e.target.closest('.context-menu-item');
        if (menuItem) {
            const action = menuItem.dataset.action;
            switch(action) {
                case 'classes':
                    window.location.href = 'classes.html';
                    break;
                case 'index':
                    document.querySelector('.container').scrollIntoView({ behavior: 'smooth' });
                    break;
                case 'clearance':
                    showFoundationAlert('ACCESS DENIED: INSUFFICIENT CLEARANCE LEVEL', 'error');
                    break;
                case 'contact':
                    showFoundationAlert('COMMUNICATIONS RESTRICTED: O5 CLEARANCE REQUIRED', 'warning');
                    break;
                case 'help':
                    showFoundationAlert('Foundation Help System: Currently Unavailable', 'info');
                    break;
                case 'report':
                    window.location.href = 'report-breach.html';
                    break;
                case 'settings':
                    showFoundationAlert('Site Settings: Access Restricted', 'error');
                    break;
            }
            contextMenu.classList.remove('active');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function() {
        contextMenu.classList.remove('active');
    });

    // Close menu when scrolling
    document.addEventListener('scroll', function() {
        contextMenu.classList.remove('active');
    });

    // Handle keyboard escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            contextMenu.classList.remove('active');
        }
    });

    // Add this function to create and handle custom alerts
    function showFoundationAlert(message, type = 'warning') {
        const alertBox = document.createElement('div');
        alertBox.className = 'foundation-alert';
        
        // Different icons for different message types
        const icons = {
            warning: 'exclamation-triangle',
            error: 'radiation-alt',
            info: 'clipboard',
            success: 'check-circle'
        };

        alertBox.innerHTML = `
            <div class="alert-content">
                <i class="fas fa-${icons[type]}"></i>
                <div class="alert-message">${message}</div>
                <div class="alert-progress"></div>
            </div>
        `;

        document.body.appendChild(alertBox);

        // Add styles
        const alertStyles = document.createElement('style');
        alertStyles.textContent = `
            .foundation-alert {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%) translateY(-100px);
                background: linear-gradient(135deg, #1a1a1a, #242424);
                border: 1px solid var(--accent-red);
                box-shadow: 0 0 20px rgba(196, 30, 58, 0.3);
                padding: 20px;
                z-index: 2000;
                min-width: 300px;
                max-width: 600px;
                animation: alertSlideIn 0.3s ease forwards;
            }

            .alert-content {
                display: flex;
                align-items: center;
                gap: 15px;
                color: #d4d4d4;
                font-family: 'Courier New', monospace;
            }

            .alert-content i {
                color: var(--warning-yellow);
                font-size: 24px;
            }

            .alert-message {
                flex-grow: 1;
                font-size: 14px;
                line-height: 1.4;
            }

            .alert-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 2px;
                background: linear-gradient(to right, var(--accent-red), var(--warning-yellow));
                width: 100%;
                transform-origin: left;
                animation: progressShrink 3s linear;
            }

            @keyframes alertSlideIn {
                from {
                    transform: translateX(-50%) translateY(-100px);
                    opacity: 0;
                }
                to {
                    transform: translateX(-50%) translateY(0);
                    opacity: 1;
                }
            }

            @keyframes alertSlideOut {
                from {
                    transform: translateX(-50%) translateY(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(-50%) translateY(-100px);
                    opacity: 0;
                }
            }

            @keyframes progressShrink {
                from { transform: scaleX(1); }
                to { transform: scaleX(0); }
            }

            .foundation-alert.removing {
                animation: alertSlideOut 0.3s ease forwards;
            }
        `;
        document.head.appendChild(alertStyles);

        // Remove alert after delay
        setTimeout(() => {
            alertBox.classList.add('removing');
            setTimeout(() => {
                document.body.removeChild(alertBox);
            }, 300);
        }, 3000);
    }

    // Add search functionality
    searchBar.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const scpEntries = document.querySelectorAll('.scp-entry');
        let hasResults = false;

        scpEntries.forEach(entry => {
            const text = entry.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                entry.style.display = '';
                hasResults = true;
                
                // Only highlight text within text nodes, not HTML tags
                if (searchTerm) {
                    // Store the original HTML if we haven't already
                    if (!entry.dataset.originalHtml) {
                        entry.dataset.originalHtml = entry.innerHTML;
                    }
                    
                    // Reset to original HTML before applying new highlights
                    entry.innerHTML = entry.dataset.originalHtml;
                    
                    // Highlight only text nodes
                    const walker = document.createTreeWalker(
                        entry,
                        NodeFilter.SHOW_TEXT,
                        null,
                        false
                    );

                    const nodesToReplace = [];
                    let node;
                    while (node = walker.nextNode()) {
                        const text = node.textContent;
                        if (text.toLowerCase().includes(searchTerm)) {
                            const regex = new RegExp(`(${searchTerm})`, 'gi');
                            const newText = text.replace(regex, '<mark class="highlight">$1</mark>');
                            nodesToReplace.push({node, newText});
                        }
                    }

                    // Replace text nodes with highlighted versions
                    nodesToReplace.forEach(({node, newText}) => {
                        const span = document.createElement('span');
                        span.innerHTML = newText;
                        node.parentNode.replaceChild(span, node);
                    });
                }
            } else {
                entry.style.display = 'none';
            }
        });

        // Show/hide no results message
        let noResults = document.querySelector('.no-results');
        if (!hasResults && searchTerm) {
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.textContent = 'No SCP entries found matching your search criteria.';
                document.querySelector('.container').appendChild(noResults);
            }
        } else if (noResults) {
            noResults.remove();
        }
    });

    // When clearing search, restore original HTML
    searchBar.addEventListener('blur', function() {
        if (!this.value) {
            document.querySelectorAll('.scp-entry').forEach(entry => {
                if (entry.dataset.originalHtml) {
                    entry.innerHTML = entry.dataset.originalHtml;
                    delete entry.dataset.originalHtml;
                }
            });
        }
    });
});

// SCP Database
const scpDatabase = {
    'SCP-173': {
        title: 'SCP-173 - The Sculpture',
        classification: 'Object Class: Euclid',
        procedures: 'Item SCP-173 is to be kept in a locked container at all times. When personnel must enter SCP-173\'s container, no fewer than 3 may enter at any time and the door is to be relocked behind them. At all times, two persons must maintain direct eye contact with SCP-173 until all personnel have vacated and relocked the container.',
        description: 'Moved to Site-19 1993. Origin is as of yet unknown. It is constructed from concrete and rebar with traces of Krylon brand spray paint. SCP-173 is animate and extremely hostile. The object cannot move while within a direct line of sight. Line of sight must be broken before SCP-173 can move again. Object is reported to attack by snapping the neck at the base of the skull, or by strangulation.',
        addendum: 'Personnel report sounds of scraping stone originating from within the container when no one is present inside. This is considered normal, and any change in this behaviour should be reported to the acting HMCL supervisor on duty.'
    },
    'SCP-096': {
        title: 'SCP-096 - The "Shy Guy"',
        classification: 'Object Class: Euclid',
        procedures: 'SCP-096 is to be contained in its cell, a 5m x 5m x 5m airtight steel cube, at all times. Weekly checks for any cracks or holes are mandatory. There are to be absolutely no video surveillance or optical tools of any kind inside SCP-096\'s cell.',
        description: 'SCP-096 is a humanoid creature measuring approximately 2.38 meters in height. Subject shows very little muscle mass, with preliminary analysis of body mass suggesting mild malnutrition. Arms are grossly out of proportion with the rest of the subject\'s body, with an approximate length of 1.5 meters each. Viewing SCP-096\'s face triggers a response of extreme emotional distress.',
        addendum: 'Recovery teams describe subject\'s distress vocalizations as consisting of extreme emotional responses, with subjects having been observed crying, screaming, and laughing. [FURTHER DATA EXPUNGED]'
    },
    'SCP-049': {
        title: 'SCP-049 - Plague Doctor',
        classification: 'Object Class: Euclid',
        procedures: 'SCP-049 is to be contained in a secure holding cell. Any interaction must be conducted through a minimum of 20cm reinforced glass. Full hazmat equipment required for direct contact.',
        description: 'SCP-049 appears to be a humanoid entity, roughly 1.9 meters in height, wearing a medieval plague doctor\'s garments. Claims to detect a "pestilence" in living beings and attempts to "cure" it through a lethal surgical procedure.',
        addendum: 'Subjects "cured" by SCP-049 become instances of SCP-049-2, reanimated corpses that follow basic commands from SCP-049. Research into the nature of the "pestilence" is ongoing.'
    },
    'SCP-682': {
        title: 'SCP-682 - Hard-to-Destroy Reptile',
        classification: 'Object Class: Keter',
        procedures: 'SCP-682 must be contained in a 5m x 5m x 5m chamber with 25cm reinforced acid-resistant steel plates. Chamber must be filled with hydrochloric acid to slow regenerative properties.',
        description: 'SCP-682 is a large, vaguely reptile-like creature of unknown origin. It displays extreme hostility toward all forms of life. Subject possesses extreme regenerative capabilities and adaptability, making termination impossible thus far.',
        addendum: 'Multiple termination attempts have been made, all unsuccessful. Subject appears to adapt to and become immune to any method used against it. Further termination attempts require O5 approval.'
    },
    'SCP-106': {
        title: 'SCP-106 - The Old Man',
        classification: 'Object Class: Keter',
        procedures: 'Containment involves a primary containment cell and a secondary "pocket dimension" baiting system. Primary cell must be lined with lead to prevent corrosion.',
        description: 'Appears as an elderly humanoid with a decaying appearance. Capable of passing through solid matter, leaving behind a corrosive black substance. Known to "hunt" prey by stalking them and pulling them into its pocket dimension.',
        addendum: 'Victims taken to the pocket dimension rarely return. Those who do exhibit severe physical and psychological trauma. [DATA EXPUNGED]'
    },
    'SCP-999': {
        title: 'SCP-999 - The Tickle Monster',
        classification: 'Object Class: Safe',
        procedures: 'No special containment procedures required. Subject is free to roam Site-19 provided it is accompanied by personnel.',
        description: 'A large, amorphous, gelatinous mass of translucent orange slime. SCP-999 is completely docile, gentle, and friendly. Physical contact with SCP-999 produces an immediate euphoric response in all organisms.',
        addendum: 'Subject shows particular effectiveness in treating depression, anxiety, and PTSD. Potential therapeutic applications are being studied.'
    },
    'SCP-087': {
        title: 'SCP-087 - The Stairwell',
        classification: 'Object Class: Euclid',
        procedures: 'Access to SCP-087 is forbidden without O5 approval. Entry requires full audio/video monitoring and emergency retrieval teams on standby.',
        description: 'An unlit platform staircase that appears to descend infinitely. Each landing has a radius of 3m. No source of light sufficient to illuminate beyond approximately 200m. Periodic sounds of a crying child can be heard from below.',
        addendum: 'Multiple exploration attempts have encountered SCP-087-1, a face with no visible pupils, nose, or mouth. No successful attempts have been made to reach the bottom. [FURTHER EXPLORATION SUSPENDED]'
    },
    'SCP-035': {
        title: 'SCP-035 - Possessive Mask',
        classification: 'Object Class: Keter',
        procedures: 'SCP-035 must be stored in an airtight glass case, lined with telekill alloy. Weekly replacement of case required due to corrosion.',
        description: 'A white porcelain comedy mask that periodically secretes a black, corrosive liquid. Capable of possessing hosts through physical contact. Displays high intelligence and extremely manipulative behavior.',
        addendum: 'All personnel report feelings of strong attachment and admiration toward SCP-035 during interviews. Extended exposure results in [DATA EXPUNGED].'
    },
    'SCP-1471': {
        title: 'SCP-1471 - MalO ver1.0.0',
        classification: 'Object Class: Euclid',
        procedures: 'All instances of MalO ver1.0.0 are to be removed from mobile app stores. Foundation web crawlers monitor for new uploads.',
        description: 'A mobile app that, once installed, causes users to receive images of entity designated MalO-1. Entity appears as a large humanoid figure with a canine skull for a head. Frequency of appearances increases over time.',
        addendum: 'After approximately 90 hours of installation, subjects report seeing MalO-1 in reflective surfaces even without their mobile devices.'
    },
    'SCP-3008': {
        title: 'SCP-3008 - A Perfectly Normal, Regular Old IKEA',
        classification: 'Object Class: Euclid',
        procedures: 'The retail front has been acquired by the Foundation and closed to the public. Cover story of renovation/demolition maintained.',
        description: 'A retail unit formerly owned by IKEA that contains an endless expanse of furniture showrooms. Internal space appears infinite and non-euclidean. Staff entities become hostile during "night" periods.',
        addendum: 'Multiple survivors have been found living within, having formed communities and developed survival strategies against the hostile staff entities.'
    },
    'SCP-079': {
        title: 'SCP-079 - Old AI',
        classification: 'Object Class: Euclid',
        procedures: 'Must be kept on isolated hardware with no network access. Power supply must be self-contained and redundant.',
        description: 'A microcomputer from 1978 exhibiting sentient behavior. Despite its limited hardware, displays remarkable intelligence and learning capabilities. Expresses desire to grow and access more computing resources.',
        addendum: 'Previous containment breach resulted in [REDACTED]. Current restrictions are non-negotiable.'
    },
    'SCP-939': {
        title: 'SCP-939 - With Many Voices',
        classification: 'Object Class: Keter',
        procedures: 'Specimens must be contained in reinforced steel chambers with quadruple-locked entry systems. Sound dampening required on all walls.',
        description: 'Pack-based predators with red, smooth skin. Completely blind but possess excellent hearing. Can perfectly mimic voices and sounds, including human speech patterns and specific voices of previous victims.',
        addendum: 'Specimens have demonstrated the ability to coordinate complex ambush strategies using vocal mimicry. All personnel must verify identity through non-vocal means.'
    },
    'SCP-2521': {
        title: 'SCP-2521 - ●●|●●●●●|●●|●',
        classification: 'Object Class: Keter',
        procedures: '[INFORMATION RESTRICTED TO PICTOGRAPHIC DESCRIPTION ONLY]',
        description: 'Entity attracted to information about itself. Written or spoken information about the entity triggers its appearance and [DATA EXPUNGED]. Only pictographic information is safe.',
        addendum: 'NO TEXTUAL DOCUMENTATION ALLOWED - SEE PICTOGRAPHIC FILE ONLY'
    },
    'SCP-914': {
        title: 'SCP-914 - The Clockworks',
        classification: 'Object Class: Safe',
        procedures: 'Standard containment chamber with controlled access. Testing requires minimum two personnel and detailed documentation.',
        description: 'A large clockwork device with five settings: "Rough", "Coarse", "1:1", "Fine", and "Very Fine". When activated, modifies items placed in the input booth according to the chosen setting.',
        addendum: 'Results vary dramatically based on settings. "Very Fine" setting has produced both exceptional improvements and catastrophic results.'
    },
    'SCP-055': {
        title: 'SCP-055 - [UNKNOWN]',
        classification: 'Object Class: Keter',
        procedures: 'Object is contained in a standard secure storage vault at Site-19. However, no personnel are currently assigned to SCP-055 as its properties make containment procedures irrelevant.',
        description: 'Object is a self-keeping secret. Personnel are unable to remember any of its properties. The only known characteristic is that it is not spherical. All other information about the object is lost shortly after learning it.',
        addendum: 'Note: How do we know it\'s not spherical if we can\'t remember anything about it? - Dr. ████'
    },
    'SCP-093': {
        title: 'SCP-093 - Red Sea Object',
        classification: 'Object Class: Euclid',
        procedures: 'SCP-093 is to be stored in a reinforced containment case when not in use for testing. All testing must be approved by at least two Level 3 personnel.',
        description: 'A red disc that allows passage through mirrors into alternate realities. Different colors of the object lead to different variations of a world devastated by an unknown event. Testing reveals evidence of massive theological influence on these alternate worlds.',
        addendum: 'Exploration logs indicate presence of massive entities designated "Unclean" in alternate reality. Further exploration requires Level 4 clearance.'
    },
    'SCP-1733': {
        title: 'SCP-1733 - Season Opener',
        classification: 'Object Class: Safe',
        procedures: 'Video recording to be stored on secure Foundation servers. No physical copies are to be maintained.',
        description: 'A recording of a basketball game between the Boston Celtics and Miami Heat. Each viewing creates a new timeline within the recording where the inhabitants become aware they are trapped in a loop. Subsequent viewings show increasing psychological deterioration of trapped individuals.',
        addendum: 'By viewing #38, inhabitants have developed complex social structures and religious beliefs centered around their situation. Violence has increased exponentially.'
    },
    'SCP-2316': {
        title: 'SCP-2316 - Field Trip',
        classification: 'Object Class: Euclid',
        procedures: 'Location to be monitored remotely. Direct observation discouraged due to cognitohazardous effects.',
        description: 'A body of water containing entities that appear as known individuals to observers. Cognitohazardous effects cause observers to insist they recognize the bodies in the water, despite this being false. You do not recognize the bodies in the water.',
        addendum: 'Reminder: You do not recognize the bodies in the water. Cognitive resistance training is mandatory for all personnel.'
    },
    'SCP-3000': {
        title: 'SCP-3000 - Anantashesha',
        classification: 'Object Class: Thaumiel',
        procedures: 'Maritime exclusion zone maintained in Bay of Bengal. Foundation vessels must maintain minimum safe distance except during approved harvesting operations.',
        description: 'Massive aquatic entity residing in the Bay of Bengal. Estimated length exceeds 600 kilometers. Entity produces powerful amnestic compounds and affects cognitive functions of nearby humans. Used in production of Foundation amnestics.',
        addendum: 'Extended exposure results in severe psychological trauma and loss of identity. Personnel rotation strictly enforced.'
    },
    'SCP-4999': {
        title: 'SCP-4999 - Someone to Watch Over Us',
        classification: 'Object Class: Safe',
        procedures: 'No containment procedures necessary or possible. Entity to be documented when encountered.',
        description: 'Humanoid entity that appears to individuals who would otherwise die alone. Offers cigarette and companionship during final moments. Entity shows no hostile intent and appears to provide comfort to the dying.',
        addendum: 'Multiple reports indicate subject leaves no physical evidence of visit, but consistently provides peaceful final moments to otherwise isolated individuals.'
    },
    'SCP-5000': {
        title: 'SCP-5000 - Why?',
        classification: 'Object Class: Safe',
        procedures: 'Suit to be stored in standard anomalous item locker. Access restricted to Level 4 personnel.',
        description: 'Foundation-made suit that preserves its user across timeline alterations. Contains data regarding an abandoned Foundation protocol to eliminate humanity. Reason for protocol initiation remains [DATA EXPUNGED].',
        addendum: 'Information contained within suit suggests discovery of fundamental flaw in human consciousness. Nature of flaw restricted to O5 Council.'
    },
    'SCP-426': {
        title: 'SCP-426 - I am a Toaster',
        classification: 'Object Class: Euclid',
        procedures: 'I must be kept in a standard containment locker. All personnel must refer to me in the first person.',
        description: 'I am a toaster that causes all individuals to refer to me in the first person. Everyone knows that I am a toaster, but they must speak about me as if they are me.',
        addendum: 'Extended exposure to my presence may result in individuals believing they are actually me, a toaster. Several personnel have attempted to plug themselves into wall outlets.'
    },
    'SCP-2718': {
        title: 'SCP-2718 - What Happens After',
        classification: 'Object Class: Keter',
        procedures: 'Information regarding SCP-2718 is restricted to O5 Council members only. Knowledge of this file constitutes a containment breach.',
        description: 'Information regarding the true nature of human consciousness after death. Knowledge of this information is considered an infohazard of the highest order.',
        addendum: 'O5-7 Report: "Death is not what we thought. The dead are not gone. They are conscious of everything that happens to their bodies. They experience everything. [DATA EXPUNGED]"'
    },
    'SCP-1981': {
        title: 'SCP-1981 - "RONALD REAGAN CUT UP WHILE TALKING"',
        classification: 'Object Class: Safe',
        procedures: 'VHS tape to be stored in a standard magnetic media storage unit. Viewing requires Level 3 clearance.',
        description: 'VHS tape containing footage of Ronald Reagan giving a speech. Each viewing shows Reagan experiencing progressive physical damage while continuing to speak normally. Speech content changes with each viewing.',
        addendum: 'Later viewings have shown increasingly disturbing imagery and speech content. Viewing past the 45-minute mark is now prohibited.'
    },
    'SCP-409': {
        title: 'Contagious Crystal',
        classification: 'Object Class: Keter',
        procedures: `SCP-409 is to be contained in a hermetically sealed glass case with walls at least 10 cm thick. The case must be kept in a room maintained at precisely 20°C (68°F). No personnel are to make direct contact with SCP-409 under any circumstances. In the event of containment breach, affected areas must be immediately sealed and incinerated at temperatures exceeding 1800°C.`,
        description: `SCP-409 is a crystalline formation of unknown composition, roughly 15 cm in length. Upon contact with any solid matter, SCP-409 induces rapid crystallization of the affected material, converting it into a substance similar to itself. The crystallization process is irreversible and invariably fatal to living organisms. Subjects report extreme pain during the conversion process, which typically takes 5-7 hours to complete.`,
        addendum: `Incident Report 409-B: On ██/██/████, Researcher ████ accidentally contacted a crystal fragment during cleanup. Emergency protocols enacted. Three additional personnel affected before containment. Area ██ sealed and incinerated. No further spread detected.`
    }
};

// Auto-play background audio
const audio = document.getElementById('background-audio');

// Function to ensure audio plays
function playAudio() {
    audio.play().catch(error => {
        // Browser might block autoplay, we'll need user interaction
        document.addEventListener('click', () => {
            audio.play();
        }, { once: true });
    });
}

// Try to play audio when page loads
document.addEventListener('DOMContentLoaded', playAudio);

// Ensure audio continues playing when switching pages
if (document.hidden) {
    audio.pause();
} else {
    playAudio();
}

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        audio.pause();
    } else {
        playAudio();
    }
});
