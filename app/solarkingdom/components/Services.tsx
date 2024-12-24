import { FC } from "react";
import styles from "../styles/Services.module.css";
import Image from "next/image";

interface ServiceCard {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const Services: FC = () => {
  const services: ServiceCard[] = [
    {
      id: 1,
      title: "Residential Solar Installation",
      description:
        "Complete solar system design and installation for homes, including panels, inverters, and battery storage solutions.",
      icon: "/icons/home-solar.svg", // Add your icon
    },
    {
      id: 2,
      title: "Commercial Solar Solutions",
      description:
        "Large-scale solar installations for businesses and industrial facilities, optimized for maximum energy efficiency.",
      icon: "/icons/commercial-solar.svg",
    },
    {
      id: 3,
      title: "Solar Maintenance",
      description:
        "Regular maintenance, cleaning, and monitoring services to ensure your solar system performs at its best.",
      icon: "/icons/maintenance.svg",
    },
    {
      id: 4,
      title: "Energy Storage Systems",
      description:
        "Advanced battery storage solutions to maximize your solar energy usage and provide backup power.",
      icon: "/icons/battery.svg",
    },
  ];

  return (
    <div className={styles.servicesContainer}>
      <div className={styles.header}>
        <h2>Our Services</h2>
        <p>Discover how we can help you harness solar energy</p>
      </div>

      <div className={styles.servicesGrid}>
        {services.map((service) => (
          <div key={service.id} className={styles.serviceCard}>
            <div className={styles.iconContainer}>
              <Image
                src={service.icon}
                alt={service.title}
                width={50}
                height={50}
                className={styles.icon}
              />
            </div>
            <h3 className={styles.serviceTitle}>{service.title}</h3>
            <p className={styles.serviceDescription}>{service.description}</p>
            <button className={styles.learnMore}>Learn More</button>
          </div>
        ))}
      </div>

      <div className={styles.ctaSection}>
        <h3>Ready to Switch to Solar?</h3>
        <p>Get a free consultation and quote for your solar installation</p>
        <button className={styles.ctaButton}>Get Free Quote</button>
      </div>
    </div>
  );
};

export default Services;
