"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/ProjectGallery.module.css";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  power: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Residential Solar Installation",
    description: "5kW system installation for modern family home",
    image: "/sites/residential.jpg",
    category: "Residential",
    power: "5kW",
  },
  {
    id: 2,
    title: "Commercial Solar Project",
    description: "Large scale installation for warehouse",
    image: "/sites/commercial2.jpg",
    category: "Commercial",
    power: "50kW",
  },
  {
    id: 3,
    title: "Solar Farm Development",
    description: "Municipal solar farm project",
    image: "/sites/commercial.jpg",
    category: "Commercial",
    power: "1MW",
  },
  // Add more projects as needed
];

const ProjectGallery = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    const element = document.getElementById("gallery-section");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category.toLowerCase() === filter);

  return (
    <div
      id="gallery-section"
      className={`${styles.gallery} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.glowOverlay}></div>

      <div className={styles.content}>
        <h2 className={styles.title}>Our Projects</h2>
        <p className={styles.subtitle}>
          Explore our latest solar installations
        </p>

        <div className={styles.filters}>
          <button
            className={`${styles.filterButton} ${filter === "all" ? styles.active : ""}`}
            onClick={() => setFilter("all")}
          >
            All Projects
          </button>
          <button
            className={`${styles.filterButton} ${filter === "residential" ? styles.active : ""}`}
            onClick={() => setFilter("residential")}
          >
            Residential
          </button>
          <button
            className={`${styles.filterButton} ${filter === "commercial" ? styles.active : ""}`}
            onClick={() => setFilter("commercial")}
          >
            Commercial
          </button>
        </div>

        <div className={styles.projectGrid}>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={styles.projectCard}
              onClick={() => setSelectedProject(project)}
            >
              <div className={styles.projectImage}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.projectInfo}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span className={styles.powerBadge}>{project.power}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className={styles.modal} onClick={() => setSelectedProject(null)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => setSelectedProject(null)}
            >
              ×
            </button>
            <div className={styles.modalImage}>
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.modalInfo}>
              <h3>{selectedProject.title}</h3>
              <p>{selectedProject.description}</p>
              <div className={styles.modalDetails}>
                <span>Category: {selectedProject.category}</span>
                <span>Power Output: {selectedProject.power}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
