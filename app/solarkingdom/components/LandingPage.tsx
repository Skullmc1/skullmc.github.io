"use client";
import { useEffect, useState } from "react";
import styles from "../styles/LandingPage.module.css";

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={styles.landing}>
      <div className={styles.overlay} />

      {/* Animated background elements */}
      <div className={styles.animatedBg}>
        <div className={styles.solarPanel1} />
        <div className={styles.solarPanel2} />
        <div className={styles.solarPanel3} />
      </div>

      <div className={`${styles.content} ${isVisible ? styles.visible : ""}`}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.highlight}>SolarKingdom</span>
        </h1>

        <div className={styles.subtitle}>
          <span className={styles.rotating}>Sustainable Energy Solutions</span>
        </div>

        <p className={styles.description}>
          Transform your home with clean, renewable solar energy. Join thousands
          of satisfied customers who&apos;ve made the switch to solar power.
        </p>

        <div className={styles.buttonGroup}>
          <button className={`${styles.ctaButton} ${styles.primary}`}>
            Get Free Quote
          </button>
          <button className={`${styles.ctaButton} ${styles.secondary}`}>
            Learn More
          </button>
        </div>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>1000+</span>
            <span className={styles.statLabel}>Installations</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>98%</span>
            <span className={styles.statLabel}>Satisfied Clients</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>15+</span>
            <span className={styles.statLabel}>Years Experience</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
