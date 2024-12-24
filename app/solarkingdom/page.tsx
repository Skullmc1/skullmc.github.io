"use client";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import ProjectGallery from "./components/ProjectGallery";
import styles from "./styles/SolarKingdom.module.css";

export default function SolarKingdom() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.loader}>
          <div className={styles.solarIcon}>☀️</div>
          <p>Solar Kingdom</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <section id="home" className={styles.section}>
          <LandingPage />
        </section>
        <section id="about" className={styles.section}>
          <AboutUs />
        </section>
        <section id="services" className={styles.section}>
          <Services />
        </section>
        <section id="gallery" className={styles.section}>
          <ProjectGallery />
        </section>
      </main>
    </div>
  );
}
