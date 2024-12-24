const gallery = document.querySelector(".gallery-grid");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const closeLightbox = document.querySelector(".close-lightbox");

gallery.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    lightbox.classList.add("active");
    lightboxImage.src = e.target.src;
    lightboxImage.alt = e.target.alt;
  }
});

closeLightbox.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

// Close lightbox with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("active")) {
    lightbox.classList.remove("active");
  }
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Form submission
const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Add your form submission logic here
  alert("Form submitted successfully!");
  contactForm.reset();
});

// Intersection Observer for animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.5 },
);

document.querySelectorAll(".feature-card, .gallery img").forEach((element) => {
  observer.observe(element);
});
