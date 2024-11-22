async function getJoke() {
    try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Miscellaneous,Pun,Christmas?safe-mode&blacklistFlags=nsfw,religious,political,racist,sexist,explicit');
        const data = await response.json();
        
        const jokeElement = document.getElementById('joke');
        
        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.textContent = 'Copy';
        
        if (data.type === 'single') {
            jokeElement.textContent = data.joke;
        } else {
            jokeElement.innerHTML = `${data.setup}<br><br>${data.delivery}`;
        }
        
        // Add copy button to joke element
        jokeElement.appendChild(copyButton);
        
        // Add copy functionality
        copyButton.addEventListener('click', async () => {
            const jokeText = data.type === 'single' ? 
                data.joke : 
                `${data.setup}\n\n${data.delivery}`;
                
            await navigator.clipboard.writeText(jokeText);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'copy-success';
            successMessage.textContent = 'Joke copied!';
            document.body.appendChild(successMessage);
            
            // Remove success message after animation
            setTimeout(() => {
                successMessage.remove();
            }, 2000);
        });
    } catch (error) {
        document.getElementById('joke').textContent = 'Failed to load joke. Please try again!';
    }
}

// Load initial joke
getJoke();

// Refresh joke when page is refreshed
window.onload = getJoke; 

// Custom right-click menu
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    const menu = document.querySelector('.custom-menu');
    menu.style.display = 'block';
    menu.style.left = e.pageX + 'px';
    menu.style.top = e.pageY + 'px';
});

document.addEventListener('click', function() {
    document.querySelector('.custom-menu').style.display = 'none';
});

// Handle menu item clicks
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        const action = this.dataset.action;
        if (action === 'refresh') {
            getJoke();
        } else if (action === 'navigate') {
            window.location.href = '../index.html';
        }
    });
}); 