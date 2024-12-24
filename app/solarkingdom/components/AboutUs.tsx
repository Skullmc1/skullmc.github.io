"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/AboutUs.module.css";

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    const element = document.getElementById("about-section");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const achievements = [
    {
      number: "1000+",
      label: "Projects Completed",
      icon: "🏆",
    },
    {
      number: "98%",
      label: "Client Satisfaction",
      icon: "⭐",
    },
    {
      number: "15+",
      label: "Years Experience",
      icon: "📅",
    },
  ];

  const values = [
    {
      title: "Innovation",
      description: "Cutting-edge solar technology",
      icon: "💡",
    },
    {
      title: "Sustainability",
      description: "Eco-friendly solutions",
      icon: "🌱",
    },
    {
      title: "Quality",
      description: "Premium materials & service",
      icon: "✨",
    },
    {
      title: "Reliability",
      description: "Trusted by thousands",
      icon: "🤝",
    },
  ];

  return (
    <div
      id="about-section"
      className={`${styles.about} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.glowOverlay}></div>

      <div className={styles.content}>
        <div className={styles.textSection}>
          <h2 className={styles.title}>
            Powering a <span className={styles.highlight}>Sustainable</span>{" "}
            Future
          </h2>

          <p className={styles.description}>
            Since 2008, SolarKingdom has been at the forefront of the renewable
            energy revolution, delivering innovative solar solutions that
            transform how homes and businesses harness the power of the sun. Our
            commitment to excellence and sustainability drives everything we do.
          </p>

          <div className={styles.achievements}>
            {achievements.map((achievement, index) => (
              <div key={index} className={styles.achievementCard}>
                <span className={styles.achievementIcon}>
                  {achievement.icon}
                </span>
                <span className={styles.achievementNumber}>
                  {achievement.number}
                </span>
                <span className={styles.achievementLabel}>
                  {achievement.label}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.values}>
            {values.map((value, index) => (
              <div key={index} className={styles.valueCard}>
                <div className={styles.valueIcon}>{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.imageSection}>
          <div className={styles.imageGrid}>
            <div className={styles.mainImage}>
              <Image
                src="/about-image.jpg" // Add your image path
                alt="Solar installation"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.smallImages}>
              <div className={styles.smallImage}>
                <Image
                  src="/team.jpg" // Add your image path
                  alt="Our team"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.smallImage}>
                <Image
                  src="/panels.jpg" // Add your image path
                  alt="Solar panels"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>

          <div className={styles.certifications}>
            <div className={styles.certBadge}>
              <span>✓</span>
              <p>Certified Installer</p>
            </div>
            <div className={styles.certBadge}>
              <span>✓</span>
              <p>Industry Certified</p>
            </div>
            <div className={styles.certBadge}>
              <span>✓</span>
              <p>Licensed & Insured</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
