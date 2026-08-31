// Trigger the "paint-in" underline animation on section headings
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

// Mobile menu: abre/fecha o painel de navegação no botão hambúrguer
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");
  if (!navToggle || !nav) return;

  const closeMenu = () => {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Fecha o menu ao clicar em um link (rolagem para a seção)
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Fecha o menu se a tela for redimensionada para desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) closeMenu();
  });
});
