/// Trigger the "paint-in" underline animation on section headings
// the first time each one scrolls into view.
document.addEventListener("DOMContentLoaded", () => {
  const headings = document.querySelectorAll("h2");

  if (!("IntersectionObserver" in window)) {
    headings.forEach((h) => h.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  headings.forEach((h) => observer.observe(h));
});

  );

  headings.forEach((h) => observer.observe(h));
});
