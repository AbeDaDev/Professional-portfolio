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
const certificateModal = document.getElementById("codecademy-modal");
const codecademyTrigger = document.getElementById("codecademy-trigger");
const scrimbaModal = document.getElementById("scrimba-modal");
const scrimbaTrigger = document.getElementById("scrimba-trigger");

const updateBodyScroll = () => {
  const contactOpen = contactModal?.classList.contains("is-open");
  const certificateOpen = certificateModal?.classList.contains("is-open");
  const scrimbaOpen = scrimbaModal?.classList.contains("is-open");
  document.body.style.overflow =
    contactOpen || certificateOpen || scrimbaOpen ? "hidden" : "";
};

const openContactModal = () => {
  if (!contactModal) return;
  contactModal.classList.add("is-open");
  contactModal.setAttribute("aria-hidden", "false");
  updateBodyScroll();
};

const closeContactModal = () => {
  if (!contactModal) return;
  contactModal.classList.remove("is-open");
  contactModal.setAttribute("aria-hidden", "true");
  updateBodyScroll();
};

const openTouchSafe = (e) => {
  e.preventDefault();
  e.stopPropagation();
  openContactModal();
};

if (getInTouchBtn && contactModal) {
  getInTouchBtn.addEventListener("click", openTouchSafe, { passive: false });
  getInTouchBtn.addEventListener("touchend", openTouchSafe, { passive: false });

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

if (blinqButton) {
  blinqButton.addEventListener("click", () => {
    window.open(
      "https://blinq.me/cmfvxg4pi00gws60mw6ox44rn?bs=icl",
      "_blank",
      "noopener,noreferrer"
    );
  });
}

// Certificate modal (Codecademy)
const initCertificateModal = (triggerEl, modalEl) => {
  if (!triggerEl || !modalEl) return;

  const open = () => {
    modalEl.classList.add("is-open");
    modalEl.setAttribute("aria-hidden", "false");
    updateBodyScroll();
  };

  const close = () => {
    modalEl.classList.remove("is-open");
    modalEl.setAttribute("aria-hidden", "true");
    updateBodyScroll();
  };

  triggerEl.addEventListener("click", open);

  modalEl.addEventListener("click", (e) => {
    if (e.target.dataset.dismissModal !== undefined) {
      close();
    }
  });

  document.addEventListener("keydown", (e) => {
    const isOpen = modalEl.classList.contains("is-open");
    if (e.key === "Escape" && isOpen) {
      close();
    }
  });

  const closeButton = modalEl.querySelector(".certificate-modal__close");
  if (closeButton) {
    closeButton.addEventListener("click", close);
  }
};

initCertificateModal(codecademyTrigger, certificateModal);
initCertificateModal(scrimbaTrigger, scrimbaModal);

// Header typing effect
const typingItems = Array.from(document.querySelectorAll("[data-typing]")).map(
  (el) => ({
    el,
    text: el.dataset.typing || el.textContent.trim(),
  })
);
const typingCursor = document.querySelector(".typing-cursor");

if (typingItems.length && typingCursor) {
  typingItems.forEach((item) => {
    item.el.textContent = "";
  });

  const typeText = (item, speed = 45) =>
    new Promise((resolve) => {
      let i = 0;
      const id = setInterval(() => {
        item.el.textContent += item.text.charAt(i);
        i += 1;
        if (i >= item.text.length) {
          clearInterval(id);
          setTimeout(resolve, 200);
        }
      }, speed);
    });

  const runSequence = async () => {
    typingCursor.classList.remove("is-active");
    typingItems.forEach((item) => (item.el.textContent = ""));
    for (const item of typingItems) {
      await typeText(item);
    }
    typingCursor.classList.add("is-active");
  };

  runSequence();
  setInterval(runSequence, 30000);
}
