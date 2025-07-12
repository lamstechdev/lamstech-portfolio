document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-in");

  const scrollCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(scrollCallback, {
    threshold: 0.1
  });

  elements.forEach(el => observer.observe(el));

  const header = document.querySelector("header");
  const marker = document.getElementById("scroll-marker");

  if (header && marker) {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      },
      {
        root: null,
        threshold: 0,
      }
    );

    headerObserver.observe(marker);
  }

  const toggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('nav ul');

  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      navList.classList.toggle('active');
    });
  }

  document.addEventListener("click", function (e) {
    const toggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('nav ul');

    if (
      !toggle.contains(e.target) &&
      !navList.contains(e.target)
    ) {
      navList.classList.remove('active');
    }
  });

  async function loadPartial(id, url) {
    const el = document.getElementById(id);
    if (el) {
      const res = await fetch(url);
      if (res.ok) {
        el.innerHTML = await res.text();
      }
    }
  }

  loadPartial("header-placeholder", "partials/header.html");
  loadPartial("footer-placeholder", "partials/footer.html");

  tsParticles.load("hero-particles", {
    fullScreen: { enable: false },
    background: {
      color: "transparent"
    },
    particles: {
      number: { value: 60 },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: {
        value: 0.2,
        random: true
      },
      size: {
        value: { min: 2.5, max: 6 },
        random: true
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        outMode: "bounce"
      },
      links: {
        enable: true,
        distance: 120,
        color: "#ffffff",
        opacity: 0.1,
        width: 1
      }
    },
    responsive: [
      {
        maxWidth: 768,
        options: {
          particles: {
            size: {
              value: { min: 2, max: 3.5 }
            },
            number: { value: 40 }
          }
        }
      }
    ],
    detectRetina: true
  });

  document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
      const tab = button.dataset.tab;

      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

      button.classList.add('active');
      document.getElementById(tab).classList.add('active');
    });
  });

});