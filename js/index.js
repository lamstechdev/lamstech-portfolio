document.addEventListener("DOMContentLoaded", () => {
  const logo = document.getElementById("logo");
  const popup = document.getElementById("logoPopup");
  const overlay = document.getElementById("logoOverlay");

  if (logo && popup && overlay) {
    logo.addEventListener("click", () => {
      popup.classList.add("active");
      overlay.classList.add("active");
    });

    overlay.addEventListener("click", () => {
      popup.classList.remove("active");
      overlay.classList.remove("active");
    });
  }

  logo.addEventListener("click", () => {
    popup.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("scroll-lock");
  });

  overlay.addEventListener("click", () => {
    popup.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("scroll-lock");
  });

  const canvas = document.getElementById('bouncy-ball');
  const ctx = canvas.getContext('2d');

  let width, height;
  let ball = {
    x: 100,
    y: 100,
    radius: 20,
    dx: 0.5,
    dy: 0.4,
    color: "#ffffff",
    stretch: 1,
    squashTimer: 0,
    scaleX: 1,
    scaleY: 1,
    targetScaleX: 1,
    targetScaleY: 1,
    spring: 0.2
  };
  let showTooltip = true;
  let quotes = [
    "Hei!", "Lempar aku!", "Ayo main!", "Jangan diam saja~", "Klik aku dong!",
    "Auw!", "Seret aku yuk!", "Wuuu~", "Hahaha", "Weee!", "Siap dilempar!",
    "Seru juga ya!", "Tolongg~", "Aku bola pintar", "Hehe", "Awas!", "Cepat banget!",
    "Mau ke mana?", "Uhuy!", "Let's go!", "Gaskeun!", "Jangan kasar!", "Lebih pelan dong!",
    "Yuk lagi!", "Siniin dong", "Aku capek!", "Lagi dong!", "Santai aja", "Wushhh~",
    "Wow!", "Lempar mantap!", "Aku pusing...", "Woi!", "Kenceng banget!",
    "Tolong pelan!", "Yah nabrak!", "Yeay!", "Huahaha", "Ngakak!", "Eh jatuh!",
    "Mantul!", "Asik!", "Woohoo!", "Lempar dong!", "Cie cie", "Aduh~", "Plak!",
    "Tertangkap!", "Horeee!", "Nyaris!", "Coba lagi!", "Kejar aku!", "Ngepot!",
    "Keren!", "Hebat kamu!", "Ayo dong!", "Aku bisa!", "Gaspol!", "Santuy~", "Zzzz...",
    "Huahhh", "Cepetan!", "Yuk lempar!", "Seret aku~", "Banting aja!", "Ups!",
    "Waaah!", "Bling!", "Keren kan?", "Jangan baper~", "Wkwkwk", "Ayo lari!",
    "Olahraga dulu!", "Awas jatuh!", "Muter muter!", "Aku terbang!", "Ngilang nih~",
    "Nempel tembok!", "Ngak nyangka!", "Yok!", "Sudah siap?", "Aku hidup!",
    "Main yok!", "Sstt!", "Lempar pelan!", "Nabrak lagii", "Lompat!", "Haha lucu!",
    "Upsy daisy!", "Kepala pusing~", "Wow wow wow", "Lariii!", "Capek deh!",
    "Lempar lebih jauh!", "Mundur dikit!", "Hehe maap!", "Ayo cepet!", "Ngilang~",
    "Aku licin~", "Gelinding!", "Liat aku!", "Ngumpet~", "Hiks!"
  ];
  quotes.sort(() => Math.random() - 0.5);
  let currentQuote = "";
  let quoteTimer = 0;
  let quoteIndex = 0;
  let quoteCooldown = 0;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = document.querySelector(".hero").offsetHeight;
  }

  resizeCanvas();

  ball.x = Math.random() * (width - 2 * ball.radius) + ball.radius;
  ball.y = Math.random() * (height - 2 * ball.radius) + ball.radius;

  setTimeout(() => {
    showTooltip = false;
  }, 4000);

  window.addEventListener("resize", resizeCanvas);

  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let velocityX = 0;
  let velocityY = 0;

  canvas.addEventListener("mousedown", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dist = Math.hypot(ball.x - x, ball.y - y);

    if (dist <= ball.radius) {
      isDragging = true;
      dragOffsetX = x - ball.x;
      dragOffsetY = y - ball.y;
      lastMouseX = x;
      lastMouseY = y;
      ball.dx = 0;
      ball.dy = 0;
    }
  });

  canvas.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      velocityX = x - lastMouseX;
      velocityY = y - lastMouseY;

      ball.x = x - dragOffsetX;
      ball.y = y - dragOffsetY;

      lastMouseX = x;
      lastMouseY = y;
    }
  });

  canvas.addEventListener("mouseup", () => {
    if (isDragging) {
      ball.dx = velocityX * 0.75;
      ball.dy = velocityY * 0.75;
      isDragging = false;
    }
  });

  canvas.addEventListener("touchstart", (e) => {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const dist = Math.hypot(ball.x - x, ball.y - y);

    if (dist <= ball.radius) {
      e.preventDefault();
      isDragging = true;
      dragOffsetX = x - ball.x;
      dragOffsetY = y - ball.y;
      lastMouseX = x;
      lastMouseY = y;
      ball.dx = 0;
      ball.dy = 0;
    }
  }, { passive: false });

  canvas.addEventListener("touchmove", (e) => {
    if (isDragging) {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      velocityX = x - lastMouseX;
      velocityY = y - lastMouseY;

      ball.x = x - dragOffsetX;
      ball.y = y - dragOffsetY;

      lastMouseX = x;
      lastMouseY = y;
    }
  }, { passive: false });

  canvas.addEventListener("touchend", () => {
    if (isDragging) {
      ball.dx = velocityX * 0.75;
      ball.dy = velocityY * 0.75;
      isDragging = false;
    }
  });

  function updateBall() {
    if (isDragging) return;

    ball.x += ball.dx;
    ball.y += ball.dy;

    const speed = Math.sqrt(ball.dx ** 2 + ball.dy ** 2);
    const stretch = Math.min(1.8, 1 + speed * 0.05);

    ball.targetScaleX = stretch;
    ball.targetScaleY = 1 / stretch;

    if (ball.x + ball.radius > width || ball.x - ball.radius < 0) {
      ball.dx *= -1;
      ball.x = Math.max(ball.radius, Math.min(ball.x, width - ball.radius));

      ball.targetScaleX = 1.4;
      ball.targetScaleY = 0.6;
    }

    if (ball.y + ball.radius > height || ball.y - ball.radius < 0) {
      ball.dy *= -1;
      ball.y = Math.max(ball.radius, Math.min(ball.y, height - ball.radius));

      ball.targetScaleX = 1.4;
      ball.targetScaleY = 0.6;
    }

    ball.scaleX += (ball.targetScaleX - ball.scaleX) * ball.spring;
    ball.scaleY += (ball.targetScaleY - ball.scaleY) * ball.spring;

    ball.dx *= 0.98;
    ball.dy *= 0.98;

    if (!showTooltip) {
      if (quoteTimer > 0) {
        quoteTimer--;
        if (quoteTimer === 0) {
          currentQuote = "";
        }
      } else if (quoteCooldown > 0) {
        quoteCooldown--;
      } else {
        if (Math.random() < 0.01) {
          currentQuote = quotes[quoteIndex % quotes.length];
          quoteIndex++;
          quoteTimer = 60 + currentQuote.length * 4;
          quoteCooldown = 300 + Math.random() * 600;
        }
      }
    }
  }

  function drawBall() {
    ctx.clearRect(0, 0, width, height);

    const angle = Math.atan2(ball.dy, ball.dx);

    ctx.save();
    ctx.translate(ball.x, ball.y);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.ellipse(0, 0, ball.radius * ball.scaleX, ball.radius * ball.scaleY, 0, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();

    ctx.restore();

    if (showTooltip) {
      ctx.save();
      ctx.font = "16px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.shadowColor = "#000000";
      ctx.shadowBlur = 4;
      ctx.fillText("Klik & lempar aku!", ball.x, ball.y - ball.radius - 15);
      ctx.restore();
    }

    if (!showTooltip && currentQuote) {
      ctx.save();
      ctx.font = "14px sans-serif";
      ctx.fillStyle = "#ffcc00";
      ctx.textAlign = "center";
      ctx.shadowColor = "#000";
      ctx.shadowBlur = 3;
      ctx.fillText(currentQuote, ball.x, ball.y - ball.radius - 15);
      ctx.restore();
    }

  }

  function animate() {
    drawBall();
    updateBall();
    requestAnimationFrame(animate);
  }
  animate();

  const items = document.querySelectorAll('.testimonial-item');
  let currentIndex = 0;

  function showNextTestimonial() {
    items[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % items.length;
    items[currentIndex].classList.add('active');
  }

  setInterval(showNextTestimonial, 4000);
});