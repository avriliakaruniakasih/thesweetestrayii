/* =========================================
   RUMAH RAYSHA — INTERACTION SCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     1. MUSIC PLAYER
     =============================== */

  const music = document.getElementById("backgroundMusic");
  const musicButton = document.getElementById("musicButton");
  const musicIcon = document.getElementById("musicIcon");
  const musicText = document.getElementById("musicText");

  let isPlaying = false;

  if (music && musicButton) {
    musicButton.addEventListener("click", () => {

      if (music.paused) {
        music.play()
          .then(() => {
            isPlaying = true;

            if (musicIcon) musicIcon.textContent = "Ⅱ";
            if (musicText) musicText.textContent = "pause the music";
            musicButton.classList.add("playing");
          })
          .catch(() => {
            alert("Musiknya belum bisa diputar. Pastikan file music.mp3 ada di folder yang sama dengan index.html.");
          });

      } else {
        music.pause();

        isPlaying = false;

        if (musicIcon) musicIcon.textContent = "▶";
        if (musicText) musicText.textContent = "play our song";
        musicButton.classList.remove("playing");
      }

    });
  }


  /* ===============================
     2. LAMP INTERACTION
     =============================== */

  const lamps = document.querySelectorAll(".lamp");

  lamps.forEach((lamp) => {

    lamp.addEventListener("click", () => {

      lamp.classList.toggle("lamp-on");

      document.body.classList.toggle("warm-mode");

    });

  });


  /* ===============================
     3. SURAT DARI MASA DEPAN
     =============================== */

  const mailbox = document.getElementById("mailbox");
  const letterModal = document.getElementById("letterModal");
  const closeLetter = document.getElementById("closeLetter");

  function openLetter() {
    if (!letterModal) return;

    letterModal.classList.add("show");
    document.body.classList.add("modal-open");
  }

  function closeLetterBox() {
    if (!letterModal) return;

    letterModal.classList.remove("show");
    document.body.classList.remove("modal-open");
  }

  if (mailbox) {

    mailbox.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      openLetter();
    });

  }

  if (closeLetter) {

    closeLetter.addEventListener("click", (event) => {
      event.preventDefault();
      closeLetterBox();
    });

  }


  /* Klik area luar surat untuk menutup */

  if (letterModal) {

    letterModal.addEventListener("click", (event) => {

      if (event.target === letterModal) {
        closeLetterBox();
      }

    });

  }


  /* ESC untuk menutup surat */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      closeLetterBox();
    }

  });


  /* ===============================
     4. FOTO LIGHTBOX
     =============================== */

  const photos = document.querySelectorAll(".memory-photo");

  photos.forEach((photo) => {

    photo.addEventListener("click", () => {

      const src = photo.getAttribute("src");

      if (!src) return;

      const viewer = document.createElement("div");

      viewer.className = "photo-viewer";

      viewer.innerHTML = `
        <div class="photo-viewer-inner">
          <button class="photo-close">&times;</button>
          <img src="${src}" alt="memory">
        </div>
      `;

      document.body.appendChild(viewer);

      requestAnimationFrame(() => {
        viewer.classList.add("show");
      });

      const close = viewer.querySelector(".photo-close");

      close.addEventListener("click", () => {
        viewer.classList.remove("show");

        setTimeout(() => {
          viewer.remove();
        }, 250);
      });

      viewer.addEventListener("click", (event) => {

        if (event.target === viewer) {
          viewer.classList.remove("show");

          setTimeout(() => {
            viewer.remove();
          }, 250);
        }

      });

    });

  });


  /* ===============================
     5. SMALL POLKA DOT FLOATING EFFECT
     =============================== */

  const dotContainer = document.querySelector(".floating-dots");

  if (dotContainer) {

    for (let i = 0; i < 18; i++) {

      const dot = document.createElement("span");

      dot.classList.add("floating-dot");

      const size = Math.floor(Math.random() * 8) + 4;

      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;

      dot.style.left = `${Math.random() * 100}%`;
      dot.style.top = `${Math.random() * 100}%`;

      dot.style.animationDelay = `${Math.random() * 5}s`;

      dotContainer.appendChild(dot);

    }

  }


  /* ===============================
     6. SCROLL REVEAL
     =============================== */

  const revealElements = document.querySelectorAll(
    ".room-card, .memory-card, .quote-card, .architecture-card, .future-note"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("revealed");

          revealObserver.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
  });


  /* ===============================
     7. NAVIGATION
     =============================== */

  const navLinks = document.querySelectorAll("[data-scroll]");

  navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      event.preventDefault();

      const targetID = link.getAttribute("data-scroll");
      const target = document.getElementById(targetID);

      if (target) {

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });


  /* ===============================
     8. TEA NOTE
     =============================== */

  const teaNote = document.getElementById("teaNote");
  const teaButton = document.getElementById("teaButton");

  if (teaButton && teaNote) {

    teaButton.addEventListener("click", () => {

      teaNote.classList.toggle("open");

      if (teaNote.classList.contains("open")) {
        teaButton.textContent = "close the note";
      } else {
        teaButton.textContent = "read the note";
      }

    });

  }


  /* ===============================
     9. ARCHITECTURE CARDS
     =============================== */

  const architectureCards =
    document.querySelectorAll(".architecture-card");

  architectureCards.forEach((card) => {

    card.addEventListener("click", () => {

      architectureCards.forEach((item) => {
        item.classList.remove("selected");
      });

      card.classList.add("selected");

    });

  });


  /* ===============================
     10. WINDOW DAY/NIGHT EFFECT
     =============================== */

  const windowButton = document.getElementById("windowButton");

  if (windowButton) {

    windowButton.addEventListener("click", () => {

      document.body.classList.toggle("night-mode");

      const isNight =
        document.body.classList.contains("night-mode");

      windowButton.setAttribute(
        "aria-label",
        isNight ? "Switch to daytime" : "Switch to nighttime"
      );

    });

  }


  /* ===============================
     11. TYPEWRITER EFFECT
     =============================== */

  const typewriter = document.querySelector(".typewriter");

  if (typewriter) {

    const originalText = typewriter.textContent;

    typewriter.textContent = "";

    let index = 0;

    function typeText() {

      if (index < originalText.length) {

        typewriter.textContent += originalText.charAt(index);

        index++;

        setTimeout(typeText, 45);

      }

    }

    setTimeout(typeText, 500);

  }


  /* ===============================
     12. RANDOM LITTLE ROOM DETAILS
     =============================== */

  const tinyDetails = document.querySelectorAll(".tiny-detail");

  tinyDetails.forEach((detail, index) => {

    detail.style.animationDelay = `${index * 0.15}s`;

  });


  /* ===============================
     13. MOBILE MENU
     =============================== */

  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

      mobileMenu.classList.toggle("open");

      menuButton.classList.toggle("active");

    });

    const mobileLinks =
      mobileMenu.querySelectorAll("a");

    mobileLinks.forEach((link) => {

      link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");
        menuButton.classList.remove("active");

      });

    });

  }


  /* ===============================
     14. MAKE SURE MAILBOX IS CLICKABLE
     =============================== */

  if (mailbox) {

    mailbox.style.cursor = "pointer";

    mailbox.setAttribute(
      "role",
      "button"
    );

    mailbox.setAttribute(
      "tabindex",
      "0"
    );

    mailbox.addEventListener("keydown", (event) => {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();
        openLetter();

      }

    });

  }


  /* ===============================
     15. LITTLE "HOME" FEELING
     =============================== */

  const homeObjects =
    document.querySelectorAll(".home-object");

  homeObjects.forEach((object) => {

    object.addEventListener("mouseenter", () => {
      object.classList.add("object-hover");
    });

    object.addEventListener("mouseleave", () => {
      object.classList.remove("object-hover");
    });

  });


  /* ===============================
     16. CURRENT YEAR
     =============================== */

  const yearElements =
    document.querySelectorAll("[data-year]");

  yearElements.forEach((element) => {

    element.textContent =
      new Date().getFullYear();

  });


  console.log(
    "Welcome home, Raysha."
  );

});
