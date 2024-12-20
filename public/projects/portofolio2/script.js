document.addEventListener("contextmenu", (e) => {
    e.preventDefault();

    const customMenu = document.getElementById("customMenu");
    customMenu.style.display = "block";
    customMenu.style.left = `${e.pageX}px`;
    customMenu.style.top = `${e.pageY}px`;

    // Adding subtle scale animation for better visual appeal
    customMenu.style.transform = "scale(0)";
    setTimeout(() => {
        customMenu.style.transform = "scale(1)";
    }, 10);
});

document.addEventListener("click", () => {
    const customMenu = document.getElementById("customMenu");
    customMenu.style.display = "none";
    customMenu.style.transform = "scale(0)";
});

document.getElementById("shareItem").addEventListener("click", () => {
    // Check if the Web Share API is supported
    if (navigator.share) {
        navigator.share({
            title: 'Qclid Website',
            text: 'Check out this amazing website!',
            url: window.location.href, // Share the current page URL
        }).then(() => {
            alert('Thanks for sharing!');
        }).catch((err) => {
            console.error("Error sharing", err);
            alert('Sharing failed. Please try again.');
        });
    } else {
        // If Web Share API is not available, fall back to showing a link
        alert('Web Share API is not supported on this device. You can manually copy this link: ' + window.location.href);
    }
});

document.getElementById("terminalItem").addEventListener("click", () => {
    window.open("https://www.loschicos.online", "_blank");
});

document.querySelector('.discord-btn').addEventListener('click', () => {
    const discordUsername = 'v_late';
    navigator.clipboard.writeText(discordUsername).then(() => {
        alert('Discord username copied: ' + discordUsername);
    }).catch(err => {
        console.error('Failed to copy Discord username:', err);
    });
});