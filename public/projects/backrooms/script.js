document.addEventListener("DOMContentLoaded", function () {
  // Audio and overlay setup
  const overlay = document.getElementById("start-overlay");
  const audio = document.getElementById("ambient-audio");
  const muteButton = document.getElementById("muteButton");
  const volumeSlider = document.getElementById("volumeSlider");
  const images = document.querySelectorAll("img");

  // Audio controls
  if (audio) {
    audio.volume = volumeSlider.value / 100;

    muteButton.addEventListener("click", () => {
      audio.muted = !audio.muted;
      muteButton.querySelector(".icon").textContent = audio.muted ? "🔇" : "🔊";
    });

    volumeSlider.addEventListener("input", (e) => {
      audio.volume = e.target.value / 100;
      if (audio.muted && audio.volume > 0) {
        audio.muted = false;
        muteButton.querySelector(".icon").textContent = "🔊";
      }
    });
  }

  // Start overlay
  let assetsLoaded = false;
  Promise.all(
    Array.from(images).map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => img.addEventListener("load", resolve));
    }),
  ).then(() => {
    assetsLoaded = true;
    overlay.style.cursor = "pointer";
  });

  overlay.addEventListener("click", function () {
    if (!assetsLoaded) return;

    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 0.5s ease";

    setTimeout(() => {
      overlay.style.display = "none";
      if (audio) {
        audio.play().catch(function (error) {
          console.log("Audio play failed:", error);
        });
      }
      document.getElementById("backroom").style.animation = "fadeIn 1s ease-in";
    }, 500);
  });

  // Map Generator Class
  class MapGenerator {
    constructor() {
      console.log("Initializing MapGenerator");
      this.mapGrid = document.getElementById("map-grid");
      this.generateButton = document.getElementById("generate-map");
      this.cellSize = 40;
      this.playerPosition = null;
      this.grid = null;
      this.moves = 0;
      this.currentLevel = 1;
      this.levels = null;

      this.initialize();
    }

    async initialize() {
      try {
        await this.loadLevels();
        this.initializeEventListeners();
        this.loadLevel(this.currentLevel);
      } catch (error) {
        console.error("Initialization error:", error);
      }
    }

    async loadLevels() {
      try {
        console.log("Loading levels...");
        const response = await fetch("maps.json");
        console.log("Fetch response:", response);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Loaded data:", data);
        this.levels = data.levels;

        if (!this.levels || !this.levels.length) {
          throw new Error("No levels found in data");
        }
      } catch (error) {
        console.error("Error loading levels:", error);
        // Fallback level data
        this.levels = [
          {
            id: 1,
            name: "Level 1: First Steps",
            grid: [
              ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
              ["wall", "entry", "room", "room", "room", "room", "room", "wall"],
              ["wall", "wall", "wall", "wall", "room", "wall", "room", "wall"],
              ["wall", "room", "room", "room", "room", "wall", "room", "wall"],
              ["wall", "room", "wall", "wall", "wall", "wall", "room", "wall"],
              ["wall", "room", "room", "room", "room", "room", "exit", "wall"],
              ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
            ],
          },
        ];
      }
    }

    initializeEventListeners() {
      if (this.generateButton) {
        this.generateButton.textContent = "Restart Level";
        this.generateButton.addEventListener("click", () => {
          this.loadLevel(this.currentLevel);
        });
      }

      this.mapGrid.addEventListener("click", (e) => this.handleMovement(e));
    }

    loadLevel(levelId) {
      console.log("Loading level:", levelId);
      const level = this.levels.find((l) => l.id === levelId);
      if (!level) {
        console.error("Level not found:", levelId);
        return;
      }

      this.grid = level.grid;

      const levelDisplay =
        document.querySelector(".level-display") || this.createLevelDisplay();
      levelDisplay.textContent = level.name;

      this.renderGrid(this.grid);
      this.initializePlayer();
      this.moves = 0;
      this.updateGameStats();
    }

    createLevelDisplay() {
      const display = document.createElement("div");
      display.className = "level-display";
      this.mapGrid.parentElement.insertBefore(display, this.mapGrid);
      return display;
    }

    handleMovement(e) {
      if (!this.playerPosition) return;

      const rect = this.mapGrid.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / this.cellSize);
      const y = Math.floor((e.clientY - rect.top) / this.cellSize);

      if (this.isValidMove(x, y)) {
        this.movePlayer(x, y);
        if (this.grid[y][x] === "exit") {
          this.handleLevelComplete();
        }
      }
    }

    handleLevelComplete() {
      if (this.currentLevel < this.levels.length) {
        alert(
          `Level ${this.currentLevel} Complete!\nMoves taken: ${this.moves}`,
        );
        this.currentLevel++;
        this.loadLevel(this.currentLevel);
      } else {
        alert(
          `Congratulations! You've completed all levels!\nTotal moves: ${this.moves}`,
        );
        this.currentLevel = 1;
        this.loadLevel(this.currentLevel);
      }
    }

    isValidMove(x, y) {
      if (!this.playerPosition) return false;

      if (y < 0 || y >= this.grid.length || x < 0 || x >= this.grid[0].length) {
        return false;
      }

      const dx = Math.abs(x - this.playerPosition.x);
      const dy = Math.abs(y - this.playerPosition.y);

      return (
        ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) &&
        (this.grid[y][x] === "room" || this.grid[y][x] === "exit")
      );
    }

    movePlayer(x, y) {
      this.playerPosition = { x, y };
      this.moves++;

      const player = document.querySelector(".player-cell");
      // Center the player in the cell
      const xPos = x * this.cellSize;
      const yPos = y * this.cellSize;
      player.style.left = `${xPos}px`;
      player.style.top = `${yPos}px`;

      this.updateGameStats();
      this.showValidMoves();
    }

    showValidMoves() {
      document.querySelectorAll(".valid-move").forEach((cell) => {
        cell.classList.remove("valid-move");
      });

      const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];
      directions.forEach(([dx, dy]) => {
        const newX = this.playerPosition.x + dx;
        const newY = this.playerPosition.y + dy;

        if (
          newX >= 0 &&
          newX < this.grid[0].length &&
          newY >= 0 &&
          newY < this.grid.length &&
          (this.grid[newY][newX] === "room" || this.grid[newY][newX] === "exit")
        ) {
          const index = newY * this.grid[0].length + newX;
          const cell = this.mapGrid.children[index];
          if (cell) cell.classList.add("valid-move");
        }
      });
    }

    updateGameStats() {
      const stats = document.querySelector(".game-stats");
      if (!stats) {
        const statsDiv = document.createElement("div");
        statsDiv.className = "game-stats";
        this.mapGrid.parentElement.appendChild(statsDiv);
      }
      document.querySelector(".game-stats").textContent =
        `Level ${this.currentLevel} | Moves: ${this.moves}`;
    }

    renderGrid(grid) {
      if (!this.mapGrid || !grid) {
        console.error("Missing map grid or grid data");
        return;
      }

      this.mapGrid.innerHTML = "";

      this.mapGrid.style.gridTemplateColumns = `repeat(${grid[0].length}, ${this.cellSize}px)`;
      this.mapGrid.style.gridTemplateRows = `repeat(${grid.length}, ${this.cellSize}px)`;
      this.mapGrid.style.position = "relative";

      for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
          const cell = document.createElement("div");
          cell.className = `map-cell ${grid[y][x]}-cell`;
          cell.dataset.x = x;
          cell.dataset.y = y;
          this.mapGrid.appendChild(cell);
        }
      }
    }

    initializePlayer() {
      const existingPlayer = document.querySelector(".player-cell");
      if (existingPlayer) {
        existingPlayer.remove();
      }

      const player = document.createElement("div");
      player.className = "player-cell";
      const playerImg = document.createElement("img");
      playerImg.src = "images/player.png";
      playerImg.alt = "Player";
      player.appendChild(playerImg);

      // Find entry point and position player
      for (let y = 0; y < this.grid.length; y++) {
        for (let x = 0; x < this.grid[y].length; x++) {
          if (this.grid[y][x] === "entry") {
            this.playerPosition = { x, y };
            const xPos = x * this.cellSize;
            const yPos = y * this.cellSize;
            player.style.left = `${xPos}px`;
            player.style.top = `${yPos}px`;
            break;
          }
        }
      }

      this.mapGrid.appendChild(player);
      this.showValidMoves();
    }
  }

  // Initialize MapGenerator
  try {
    console.log("Starting MapGenerator initialization");
    new MapGenerator();
  } catch (error) {
    console.error("Error in MapGenerator initialization:", error);
  }
});
