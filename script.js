document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const mobileToggle = document.querySelector(".mobile-toggle");
  const nav = document.querySelector(".main-nav");
  const mega = document.querySelector(".mega-trigger");
  const short = document.querySelector(".short-trigger");
  const backTop = document.querySelector(".back-top");

  mobileToggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("mobile-open");
    mobileToggle.setAttribute("aria-expanded", open);
  });

  [mega, short].forEach(item => {
    const button = item?.querySelector(".nav-button");
    button?.addEventListener("click", e => {
      if (window.innerWidth <= 800) {
        e.stopPropagation();
        item.classList.toggle("open");
      }
    });
  });

  document.querySelectorAll('.main-nav a[href^="#"]').forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("mobile-open");
      mega?.classList.remove("open");
      short?.classList.remove("open");
      mobileToggle?.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("scroll", () => {
    header?.classList.toggle("scrolled", window.scrollY > 10);
    backTop?.classList.toggle("show", window.scrollY > 500);
  });

  backTop?.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));

  // Simple testimonial slider
  const cards = [...document.querySelectorAll(".quote-card")];
  let current = 0;
  const show = index => {
    cards.forEach((card, i) => card.classList.toggle("active", i === index));
    current = index;
  };
  document.querySelector(".next")?.addEventListener("click", () => show((current + 1) % cards.length));
  document.querySelector(".prev")?.addEventListener("click", () => show((current - 1 + cards.length) % cards.length));

  // Close dropdowns when clicking outside
  document.addEventListener("click", e => {
    if (!e.target.closest(".mega-trigger")) mega?.classList.remove("open");
    if (!e.target.closest(".short-trigger")) short?.classList.remove("open");
  });
});


// Scroll reveal: lightweight IntersectionObserver, with immediate fallback.
const revealItems = document.querySelectorAll('.reveal, .reveal-child');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
    });
  }, {threshold: 0.12, rootMargin: '0px 0px -40px'});
  revealItems.forEach(el => observer.observe(el));
} else revealItems.forEach(el => el.classList.add('is-visible'));

// Demo contact form feedback.
document.querySelectorAll('.contact-form').forEach(form => {
  form.addEventListener('submit', () => {
    const success = form.querySelector('.form-success');
    if (success) { success.style.display = 'block'; }
  });
});
