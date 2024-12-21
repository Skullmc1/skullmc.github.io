"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import styles from "./styles.module.css";

const CubeRunner = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(0.1); // Initial slower speed
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 1, 50); // Add fog for depth effect
    scene.background = new THREE.Color(0x000000);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 3, 7);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // Player cube
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      emissive: 0x006600,
      shininess: 30,
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.position.y = 1;
    scene.add(cube);

    // Trail effect
    const trailGeometry = new THREE.BufferGeometry();
    const trailMaterial = new THREE.PointsMaterial({
      color: 0x00ff00,
      size: 0.1,
      blending: THREE.AdditiveBlending,
    });
    const trailPositions = new Float32Array(300); // 100 points * 3 coordinates
    trailGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(trailPositions, 3),
    );
    const trail = new THREE.Points(trailGeometry, trailMaterial);
    scene.add(trail);

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(100, 10);
    const groundMaterial = new THREE.MeshPhongMaterial({
      color: 0x333333,
      wireframe: false,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Grid helper
    const grid = new THREE.GridHelper(100, 20, 0x555555, 0x555555);
    grid.position.y = 0.1;
    scene.add(grid);

    // Lighting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 10, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Particle system for effects
    const particles = new THREE.Points(
      new THREE.BufferGeometry(),
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
        blending: THREE.AdditiveBlending,
      }),
    );
    scene.add(particles);

    // Game state
    let jumping = false;
    const obstacles: THREE.Mesh[] = [];
    let jumpHeight = 0;
    const maxJumpHeight = 3;
    let velocity = 0;
    const gravity = -0.01;
    let trailIndex = 0;

    const jump = () => {
      if (jumping || gameOver) return;
      jumping = true;
      velocity = 0.2;
    };

    const updateJump = () => {
      if (!jumping) return;

      cube.position.y += velocity;
      velocity += gravity;

      if (cube.position.y <= 1) {
        cube.position.y = 1;
        jumping = false;
        velocity = 0;
      }
    };

    const createObstacle = () => {
      const height = Math.random() * 1.5 + 1;
      const geometry = new THREE.BoxGeometry(1, height, 1);
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(Math.random(), 1, 0.5),
        emissive: new THREE.Color().setHSL(Math.random(), 1, 0.2),
        shininess: 30,
      });
      const obstacle = new THREE.Mesh(geometry, material);
      obstacle.position.set(15, height / 2, 0);
      obstacle.castShadow = true;
      scene.add(obstacle);
      obstacles.push(obstacle);
    };

    const updateTrail = () => {
      const positions = trail.geometry.attributes.position.array;
      for (let i = positions.length - 3; i >= 3; i -= 3) {
        positions[i] = positions[i - 3];
        positions[i + 1] = positions[i - 2];
        positions[i + 2] = positions[i - 1];
      }
      positions[0] = cube.position.x;
      positions[1] = cube.position.y;
      positions[2] = cube.position.z;
      trail.geometry.attributes.position.needsUpdate = true;
    };

    const updateObstacles = () => {
      for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].position.x -= gameSpeed;
        obstacles[i].rotation.y += 0.02;

        // Collision detection
        if (
          obstacles[i].position.x < cube.position.x + 0.5 &&
          obstacles[i].position.x + 0.5 > cube.position.x &&
          cube.position.y < obstacles[i].scale.y + 0.5
        ) {
          setGameOver(true);
        }

        if (obstacles[i].position.x < -15) {
          scene.remove(obstacles[i]);
          obstacles.splice(i, 1);
        }
      }
    };

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!gameOver && isStarted) {
        updateJump();
        updateTrail();
        updateObstacles();

        // Increase game speed based on score
        setGameSpeed((prev) => Math.min(0.4, 0.1 + score / 5000));

        cube.rotation.y += 0.02;
        setScore((prev) => prev + 1);

        // Create obstacles with varying frequency based on game speed
        if (Math.random() < 0.01 + gameSpeed * 0.1) {
          createObstacle();
        }
      }

      renderer.render(scene, camera);
    };

    // Event listeners
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        if (!isStarted) {
          setIsStarted(true);
        }
        jump();
      }
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, [gameOver, gameSpeed, isStarted]);

  return (
    <div className={styles.gameContainer}>
      <div className={styles.score}>Score: {score}</div>
      <div ref={mountRef} className={styles.canvas} />
      {!isStarted && (
        <div className={styles.startScreen}>
          <h2>Cube Runner</h2>
          <p>Press SPACE to start</p>
        </div>
      )}
      {gameOver && (
        <div className={styles.gameOver}>
          <h2>Game Over!</h2>
          <p>Final Score: {score}</p>
          <button onClick={() => window.location.reload()}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default CubeRunner;
