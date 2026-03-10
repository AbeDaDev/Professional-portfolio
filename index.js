/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

// Sliders (about + freelance)
document.querySelectorAll('.about__slider').forEach((slider) => {
  const slides = Array.from(slider.querySelectorAll('.about__slide'));
  const prev = slider.querySelector('[data-dir=\"prev\"]');
  const next = slider.querySelector('[data-dir=\"next\"]');
  if (!slides.length) return;

  let current = slides.findIndex((s) => s.classList.contains('about__slide--active'));
  if (current === -1) current = 0;

  const total = slides.length;

  const setActive = (index) => {
    slides.forEach((s) => s.classList.remove('about__slide--active'));
    current = (index + total) % total;
    slides[current].classList.add('about__slide--active');
  };

  const advance = (step = 1) => setActive(current + step);

  let timer = null;
  const startTimer = () => {
    clearInterval(timer);
    if (total > 1) {
      timer = setInterval(() => advance(1), 5000);
    }
  };

  prev?.addEventListener('click', () => {
    advance(-1);
    startTimer();
  });

  next?.addEventListener('click', () => {
    advance(1);
    startTimer();
  });

  startTimer();
});
