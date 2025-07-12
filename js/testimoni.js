document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll('.testimonial-item');
  let currentIndex = 0;

  function showNextTestimonial() {
    items[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % items.length;
    items[currentIndex].classList.add('active');
  }

  setInterval(showNextTestimonial, 4000);
});