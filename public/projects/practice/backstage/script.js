document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".magazine-section");
  const body = document.body;

  // Change background color on scroll
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const color = entry.target.dataset.color;
        body.style.backgroundColor = color;

        // Update navigation
        const sectionId = entry.target.id;
        updateNavigation(sectionId);
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });

  // Update navigation active state
  function updateNavigation(sectionId) {
    const navLinks = document.querySelectorAll(".issue-navigation a");
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${sectionId}`) {
        link.classList.add("active");
      }
    });
  }

  // Smooth scroll for navigation links
  document.querySelectorAll(".issue-navigation a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      targetElement.scrollIntoView({ behavior: "smooth" });
    });
  });
});
