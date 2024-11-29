document.addEventListener('DOMContentLoaded', function() {
    // Preloader removal after 2 seconds
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.remove();
            }, 500); // Remove after fade animation
        }
    }, 1000);

    // First remove any existing plague doctors (to prevent duplicates)
    const existingDoctors = document.querySelectorAll('.plague-doctor');
    existingDoctors.forEach(doctor => doctor.remove());

    // Create plague doctor element
    const plagueDoctor = document.createElement('div');
    plagueDoctor.className = 'plague-doctor';
    
    // Add speech bubble
    const speechBubble = document.createElement('div');
    speechBubble.className = 'plague-speech';
    plagueDoctor.appendChild(speechBubble);
    
    // Add image (using createElement instead of innerHTML)
    const doctorImage = document.createElement('img');
    doctorImage.src = 'images/plague-doctor.png';
    doctorImage.alt = 'Plague Doctor';
    plagueDoctor.appendChild(doctorImage);
    
    document.body.appendChild(plagueDoctor);

    // Create trigger area (remove existing one first)
    const existingTrigger = document.querySelector('.plague-trigger');
    if (existingTrigger) existingTrigger.remove();
    
    const trigger = document.createElement('div');
    trigger.className = 'plague-trigger';
    document.body.appendChild(trigger);

    let isNearCorner = false;
    let hideTimeout;
    let talkTimeout;

    let isDialogueOpen = false; // Add this flag to track dialogue state

    const dialogueOptions = {
        greeting: [
            "Greetings, mortal...",
            "Ah... a new patient approaches.",
            "Yes? What ails you?",
            "I sense the disease in you...",
            "You seek my expertise?"
        ],
        about_pestilence: [
            "The Pestilence is everywhere. I can smell it.",
            "It is a disease that corrupts both mind and body.",
            "Only I can see it. Only I can cure it.",
            "It spreads like wildfire among the ignorant."
        ],
        about_scp: [
            "The Foundation... they think they can contain everything.",
            "Secure. Contain. Protect. But they cannot stop the disease.",
            "They keep many secrets. Many diseases.",
            "I work alongside them... for now."
        ],
        cure: [
            "Leeches. Always leeches.",
            "Your humors are unbalanced. I have the cure.",
            "My methods are most effective. Do not resist.",
            "The cure may be... uncomfortable."
        ]
    };

    // Create dialogue choice buttons
    const dialogueChoices = document.createElement('div');
    dialogueChoices.className = 'dialogue-choices';
    dialogueChoices.innerHTML = `
        <button class="dialogue-btn" data-type="greeting">"Hello?"</button>
        <button class="dialogue-btn" data-type="about_pestilence">"What is the Pestilence?"</button>
        <button class="dialogue-btn" data-type="about_scp">"Tell me about the SCPs."</button>
        <button class="dialogue-btn" data-type="cure">"Can you cure me?"</button>
    `;

    // Modified speak function to handle dialogue types
    function speak(dialogueType = 'greeting') {
        if (!plagueDoctor.classList.contains('peek')) return;
        
        const availablePhrases = dialogueOptions[dialogueType];
        const phrase = availablePhrases[Math.floor(Math.random() * availablePhrases.length)];
        
        speechBubble.textContent = phrase;
        speechBubble.classList.add('show');
        plagueDoctor.classList.add('talking');

        if (talkTimeout) clearTimeout(talkTimeout);

        talkTimeout = setTimeout(() => {
            speechBubble.classList.remove('show');
            plagueDoctor.classList.remove('talking');
        }, 3000);
    }

    // Modified show dialogue function
    plagueDoctor.addEventListener('click', function(e) {
        if (!plagueDoctor.classList.contains('peek')) return;
        
        isDialogueOpen = true;
        
        // Get plague doctor position
        const doctorRect = plagueDoctor.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const dialogueWidth = 220;
        const dialogueHeight = 200;
        const bottomPadding = 30; // Increased bottom padding

        // Calculate position with padding
        let left = doctorRect.left - dialogueWidth;
        let top = Math.min(
            doctorRect.top,
            viewportHeight - dialogueHeight - bottomPadding // Ensure bottom padding
        );

        dialogueChoices.classList.add('show');
        
        // Then set position
        requestAnimationFrame(() => {
            dialogueChoices.style.top = `${top}px`;
            dialogueChoices.style.left = `${left}px`;
        });

        // Prevent event bubbling
        e.stopPropagation();
    });

    // Add close button to dialogue
    const closeButton = document.createElement('span');
    closeButton.innerHTML = '×';
    closeButton.className = 'dialogue-close';
    dialogueChoices.appendChild(closeButton);

    // Handle dialogue close
    closeButton.addEventListener('click', function() {
        dialogueChoices.classList.remove('show');
        isDialogueOpen = false; // Reset flag when dialogue closes
    });

    // Handle dialogue choice clicks
    dialogueChoices.addEventListener('click', function(e) {
        if (e.target.classList.contains('dialogue-btn')) {
            const dialogueType = e.target.dataset.type;
            dialogueChoices.classList.remove('show'); // Close dialogue box immediately
            isDialogueOpen = false; // Reset dialogue state
            speak(dialogueType); // Show the speech bubble
        }
    });

    // Add dialogue choices to the document
    document.body.appendChild(dialogueChoices);

    // Modified mouse move handler to check both dialogue and talking states
    function handleMouseMove(e) {
        if (isDialogueOpen || plagueDoctor.classList.contains('talking')) return; // Don't retreat if talking or dialogue is open

        const triggerRect = trigger.getBoundingClientRect();
        const mouseIsNear = (
            e.clientX >= triggerRect.left &&
            e.clientX <= triggerRect.right &&
            e.clientY >= triggerRect.top &&
            e.clientY <= triggerRect.bottom
        );

        if (mouseIsNear && !isNearCorner) {
            isNearCorner = true;
            clearTimeout(hideTimeout);
            plagueDoctor.classList.add('peek');
        } else if (!mouseIsNear && isNearCorner) {
            isNearCorner = false;
            hideTimeout = setTimeout(() => {
                plagueDoctor.classList.remove('peek');
                // Only hide speech and stop vibrating if not talking and dialogue isn't open
                if (!isDialogueOpen && !plagueDoctor.classList.contains('talking')) {
                    speechBubble.classList.remove('show');
                    plagueDoctor.classList.remove('talking');
                }
            }, 300);
        }
    }

    document.addEventListener('mousemove', handleMouseMove);

    // Add click outside handler to close dialogue
    document.addEventListener('click', function(e) {
        if (isDialogueOpen && 
            !dialogueChoices.contains(e.target) && 
            !plagueDoctor.contains(e.target)) {
            dialogueChoices.classList.remove('show');
            isDialogueOpen = false;
        }
    });
});
