"use client";
import { useEffect } from "react";
import "../cursor.css";

export default function CursorEffect() {
  useEffect(() => {
    const start = new Date().getTime();

    const originPosition = { x: 0, y: 0 };

    const last = {
      starTimestamp: start,
      starPosition: originPosition,
      mousePosition: originPosition,
    };

    const config = {
      starAnimationDuration: 1500,
      minimumTimeBetweenStars: 250,
      minimumDistanceBetweenStars: 75,
      glowDuration: 75,
      maximumGlowPointSpacing: 10,
      colors: ["249 146 253", "252 254 255"],
      sizes: ["1.4rem", "1rem", "0.6rem"],
      animations: ["fall-1", "fall-2", "fall-3"],
    };

    let count = 0;

    const rand = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const selectRandom = (items: string[]): string =>
      items[rand(0, items.length - 1)];

    const withUnit = (value: number, unit: string) => `${value}${unit}`;
    const px = (value: number) => withUnit(value, "px");
    const ms = (value: number) => withUnit(value, "ms");

    const calcDistance = (
      a: { x: number; y: number },
      b: { x: number; y: number },
    ) => {
      const diffX = b.x - a.x;
      const diffY = b.y - a.y;
      return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
    };

    const calcElapsedTime = (start: number, end: number) => end - start;

    const createStar = (position: { x: number; y: number }) => {
      const star = document.createElement("span");
      const color = selectRandom(config.colors);

      star.className = "star";
      star.innerHTML = "💀";

      star.style.left = px(position.x);
      star.style.top = px(position.y);
      star.style.fontSize = selectRandom(config.sizes);
      star.style.color = `rgb(${color})`;
      star.style.textShadow = `0px 0px 1.5rem rgb(${color} / 0.5)`;
      star.style.animationName = config.animations[count++ % 3];
      star.style.animationDuration = ms(config.starAnimationDuration);

      document.body.appendChild(star);
      setTimeout(() => star.remove(), config.starAnimationDuration);
    };

    const createGlowPoint = (position: { x: number; y: number }) => {
      const glow = document.createElement("div");
      glow.className = "glow-point";
      glow.style.left = px(position.x);
      glow.style.top = px(position.y);

      document.body.appendChild(glow);
      setTimeout(() => glow.remove(), config.glowDuration);
    };

    const determinePointQuantity = (distance: number) =>
      Math.max(Math.floor(distance / config.maximumGlowPointSpacing), 1);

    const createGlow = (
      last: { x: number; y: number },
      current: { x: number; y: number },
    ) => {
      const distance = calcDistance(last, current);
      const quantity = determinePointQuantity(distance);

      const dx = (current.x - last.x) / quantity;
      const dy = (current.y - last.y) / quantity;

      Array.from(Array(quantity)).forEach((_, index) => {
        const x = last.x + dx * index;
        const y = last.y + dy * index;

        createGlowPoint({ x, y });
      });
    };

    const updateLastStar = (position: { x: number; y: number }) => {
      last.starTimestamp = new Date().getTime();
      last.starPosition = position;
    };

    const updateLastMousePosition = (position: { x: number; y: number }) => {
      last.mousePosition = position;
    };

    const adjustLastMousePosition = (position: { x: number; y: number }) => {
      if (last.mousePosition.x === 0 && last.mousePosition.y === 0) {
        last.mousePosition = position;
      }
    };

    const handleOnMove = (e: MouseEvent | Touch) => {
      const mousePosition = { x: e.clientX, y: e.clientY };

      adjustLastMousePosition(mousePosition);

      const now = new Date().getTime();
      const hasMovedFarEnough =
        calcDistance(last.starPosition, mousePosition) >=
        config.minimumDistanceBetweenStars;
      const hasBeenLongEnough =
        calcElapsedTime(last.starTimestamp, now) >
        config.minimumTimeBetweenStars;

      if (hasMovedFarEnough || hasBeenLongEnough) {
        createStar(mousePosition);
        updateLastStar(mousePosition);
      }

      createGlow(last.mousePosition, mousePosition);
      updateLastMousePosition(mousePosition);
    };

    const handleMouseMove = (e: MouseEvent) => handleOnMove(e);
    const handleTouchMove = (e: TouchEvent) => handleOnMove(e.touches[0]);
    const handleMouseLeave = () => updateLastMousePosition(originPosition);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return null;
}
