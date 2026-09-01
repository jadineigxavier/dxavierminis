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

// Logo: clicar sempre volta suavemente para o topo do site
document.addEventListener("DOMContentLoaded", () => {
  const logo = document.getElementById("logo-home");
  if (!logo) return;

  logo.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Galeria: abre um modal com a imagem maior e os detalhes ao clicar
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  if (!lightbox || !lightboxImg || !lightboxCaption) return;

  let lastFocused = null;

  const openLightbox = (item, trigger) => {
    const img = item.querySelector("img");
    const caption = item.querySelector("figcaption");
    if (!img) return;

    lastFocused = trigger;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || "";
    lightboxCaption.innerHTML = caption ? caption.innerHTML : "";
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    lightbox.querySelector(".lightbox-close").focus();
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.classList.remove("lightbox-open");
    if (lastFocused) lastFocused.focus();
  };

  document.querySelectorAll(".gallery-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      openLightbox(trigger.closest(".gallery-item"), trigger);
    });
  });

  lightbox.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
});
