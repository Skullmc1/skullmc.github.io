"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
        <div className={styles.logoContainer}>
          <h1>Solar Kingdom</h1>
        </div>

        <button
          className={`${styles.menuButton} ${isOpen ? styles.active : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <Image
            src="/icons/menu.svg"
            alt="Menu"
            width={24}
            height={24}
            className={styles.menuIcon}
          />
        </button>
      </div>

      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <nav className={styles.navigation}>
          <div className={styles.navLinks}>
            <button
              className={`${styles.navLink} ${activeSection === "home" ? styles.active : ""}`}
              onClick={() => scrollToSection("home")}
            >
              <span className={styles.icon}>🏠</span>
              Home
            </button>
            <button
              className={`${styles.navLink} ${activeSection === "about" ? styles.active : ""}`}
              onClick={() => scrollToSection("about")}
            >
              <span className={styles.icon}>ℹ️</span>
              About Us
            </button>
            <button
              className={`${styles.navLink} ${activeSection === "services" ? styles.active : ""}`}
              onClick={() => scrollToSection("services")}
            >
              <span className={styles.icon}>⚡</span>
              Services
            </button>
            <button
              className={`${styles.navLink} ${activeSection === "gallery" ? styles.active : ""}`}
              onClick={() => scrollToSection("gallery")}
            >
              <span className={styles.icon}>🖼️</span>
              Projects
            </button>
            <button
              className={`${styles.navLink} ${activeSection === "contact" ? styles.active : ""}`}
              onClick={() => (window.location.href = "/solarkingdom/contact")}
            >
              <span className={styles.icon}>📞</span>
              Contact Us
            </button>
          </div>

          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <span className={styles.icon}>📞</span>
              <a href="tel:+94777579852">(94) 777-579-852</a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.icon}>📧</span>
              <a href="mailto:sales@solarkingdom.lk">sales@solarkingdom.lk</a>
            </div>
          </div>
        </nav>
      </div>

      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default Navbar;
