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

// Slider logic removed (static only)

// Contact modal
const contactModal = document.getElementById("contact-modal");
const getInTouchBtn = document.getElementById("get-in-touch");
const blinqButton = document.getElementById("blinq-button");
const contactActions = document.getElementById("contact-actions");
const contactQr = document.getElementById("contact-qr");
const qrCloseButton = document.getElementById("qr-close");

const openContactModal = () => {
  if (!contactModal) return;
  contactModal.classList.add("is-open");
  contactModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeContactModal = () => {
  if (!contactModal) return;
  contactModal.classList.remove("is-open");
  contactModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

if (getInTouchBtn && contactModal) {
  getInTouchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openContactModal();
  });

  contactModal.addEventListener("click", (e) => {
    if (e.target.dataset.dismissModal !== undefined) {
      closeContactModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && contactModal.classList.contains("is-open")) {
      closeContactModal();
    }
  });

  const closeButton = contactModal.querySelector(".contact-modal__close");
  if (closeButton) {
    closeButton.addEventListener("click", closeContactModal);
  }
}

const showBlinq = () => {
  if (!contactActions || !contactQr) return;
  contactActions.hidden = true;
  contactQr.hidden = false;
};

const showActions = () => {
  if (!contactActions || !contactQr) return;
  contactQr.hidden = true;
  contactActions.hidden = false;
};

if (blinqButton) {
  blinqButton.addEventListener("click", showBlinq);
}

if (qrCloseButton) {
  qrCloseButton.addEventListener("click", showActions);
}
