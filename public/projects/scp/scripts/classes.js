// Get the audio element
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

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        audio.pause();
    } else {
        playAudio();
    }
});

// Initial check for page visibility
if (document.hidden) {
    audio.pause();
} else {
    playAudio();
} 