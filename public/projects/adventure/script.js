const GEMINI_API_KEY = "AIzaSyBKZPKWgBnSzFmkxMxSadABo-Nag1sqKKQ"; // Replace with your API key
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

let currentStory = "";
let characterName = "";
let selectedGenre = "";

document
  .getElementById("startAdventure")
  .addEventListener("click", startNewAdventure);
document.querySelectorAll(".choice-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => makeChoice(e.target.textContent));
});
function showStorySection() {
  const setupSection = document.querySelector(".setup-section");
  const storySection = document.querySelector(".story-section");

  // Fade out setup section
  setupSection.classList.add("fade-out");

  // Show story section with fade-in effect
  setTimeout(() => {
    setupSection.style.display = "none";
    storySection.style.display = "block";
    // Force a reflow
    storySection.offsetHeight;
    storySection.classList.add("visible");
  }, 500);
}
async function startNewAdventure() {
  characterName = document.getElementById("characterName").value;
  selectedGenre = document.getElementById("genre").value;

  if (!characterName) {
    alert("Please enter a character name!");
    return;
  }
  showStorySection();
  toggleStoryLoader(true);
  const prompt = `Create the beginning of a ${selectedGenre} adventure story featuring a character named ${characterName}.
                      End with exactly three distinct choices for what happens next. Format the choices as: "1.", "2.", and "3.".`;
  try {
    const response = await generateStorySegment(prompt);
    toggleStoryLoader(false); // Hide loader
    displayStoryAndChoices(response);
  } catch (error) {
    console.error("Error:", error);
    toggleStoryLoader(false); // Hide loader
    document.getElementById("storyText").textContent =
      "An error occurred while generating the story.";
  }
}

async function makeChoice(choice) {
  // Show loader
  toggleStoryLoader(true);

  const prompt = `Continue the story where ${characterName} ${choice.toLowerCase()}.
                    Add to the story and provide three new choices. Format the choices as: "1.", "2.", and "3.".`;

  try {
    const response = await generateStorySegment(prompt);
    toggleStoryLoader(false); // Hide loader
    displayStoryAndChoices(response);
  } catch (error) {
    console.error("Error:", error);
    toggleStoryLoader(false); // Hide loader
    document.getElementById("storyText").textContent =
      "An error occurred while generating the story.";
  }
}

async function generateStorySegment(prompt) {
  const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate story segment");
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

function displayStoryAndChoices(response) {
  const storyParts = response.split(/[1-3]\./);
  const mainStory = storyParts[0];
  const choices = storyParts.slice(1).map((choice) => choice.trim());

  // Add fade effect to story text
  const storyText = document.getElementById("storyText");
  storyText.style.opacity = "0";
  storyText.textContent = mainStory;

  // Fade in story text
  setTimeout(() => {
    storyText.style.opacity = "1";
  }, 10);

  const choiceButtons = document.querySelectorAll(".choice-btn");
  choices.forEach((choice, index) => {
    if (choiceButtons[index]) {
      const btn = choiceButtons[index];
      btn.style.opacity = "0";
      btn.textContent = choice;
      btn.style.display = "block";

      // Stagger the fade-in of choice buttons
      setTimeout(
        () => {
          btn.style.opacity = "1";
        },
        100 * (index + 1),
      );
    }
  });
}
document.addEventListener("DOMContentLoaded", function () {
  const backgroundMusic = document.getElementById("backgroundMusic");
  const toggleMusicBtn = document.getElementById("toggleMusic");
  let isMusicPlaying = false;

  // Function to start playing music
  function playBackgroundMusic() {
    backgroundMusic
      .play()
      .then(() => {
        isMusicPlaying = true;
        toggleMusicBtn.classList.remove("muted");
      })
      .catch((error) => {
        console.log("Playback failed:", error);
      });
  }

  // Function to handle music toggle
  function toggleMusic() {
    if (isMusicPlaying) {
      backgroundMusic.pause();
      isMusicPlaying = false;
      toggleMusicBtn.classList.add("muted");
    } else {
      playBackgroundMusic();
    }
  }

  // Add click event listener to music button
  toggleMusicBtn.addEventListener("click", toggleMusic);

  // Add event listener for when user starts the adventure
  document
    .getElementById("startAdventure")
    .addEventListener("click", function () {
      if (!isMusicPlaying) {
        playBackgroundMusic();
      }
    });

  // Set initial volume
  backgroundMusic.volume = 0.3; // Adjust this value between 0.0 and 1.0
});
const volumeSlider = document.getElementById("volumeSlider");
const volumeTrack = document.querySelector(".volume-track");

function updateVolumeTrack() {
  const value = volumeSlider.value;
  volumeTrack.style.setProperty("--value", `${value}%`);
}

volumeSlider.addEventListener("input", function () {
  backgroundMusic.volume = this.value / 100;
  updateVolumeTrack();
});

// Initial update
updateVolumeTrack();
document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.getElementById("preloader");
  const progressBar = document.querySelector(".progress-bar");
  let loadProgress = 0;

  // List of assets to preload
  const assetsToLoad = [
    "background.mp3",
    // Add other assets here (images, etc.)
  ];

  let loadedAssets = 0;

  // Function to update progress bar
  function updateProgress(progress) {
    progressBar.style.width = `${progress}%`;
  }

  // Function to load individual assets
  function loadAsset(asset) {
    return new Promise((resolve, reject) => {
      if (asset.endsWith(".mp3")) {
        const audio = new Audio();
        audio.addEventListener("canplaythrough", resolve);
        audio.addEventListener("error", reject);
        audio.src = asset;
      } else {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = asset;
      }
    });
  }

  // Simulate minimum loading time for effect
  const minimumLoadingTime = 2000; // 2 seconds
  const startTime = Date.now();

  // Load all assets
  Promise.all(
    assetsToLoad.map((asset) =>
      loadAsset(asset)
        .then(() => {
          loadedAssets++;
          const progress = (loadedAssets / assetsToLoad.length) * 100;
          updateProgress(progress);
        })
        .catch((error) =>
          console.error(`Failed to load asset: ${asset}`, error),
        ),
    ),
  ).then(() => {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, minimumLoadingTime - elapsedTime);

    // Ensure minimum loading time is met
    setTimeout(() => {
      preloader.classList.add("fade-out");
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }, remainingTime);
  });

  // Fallback: Hide preloader after maximum wait time
  setTimeout(() => {
    preloader.classList.add("fade-out");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }, 8000); // 8 seconds maximum loading time
});
function toggleStoryLoader(show) {
  const loader = document.getElementById("storyLoader");
  const storyText = document.getElementById("storyText");
  const choices = document.querySelector(".choices");

  if (show) {
    loader.classList.remove("hidden");
    setTimeout(() => loader.classList.add("visible"), 10);
    storyText.style.display = "none";
    choices.style.display = "none";
  } else {
    loader.classList.remove("visible");
    setTimeout(() => {
      loader.classList.add("hidden");
      storyText.style.display = "block";
      choices.style.display = "block";
    }, 300);
  }
}
