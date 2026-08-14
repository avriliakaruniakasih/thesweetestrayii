/* =========================================
   RUMAH RAYSHA — INTERACTIVE SCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     1. ELEMENTS
  ========================= */

  const body = document.body;

  const lamp = document.querySelector(".lamp");
  const lightSwitch = document.querySelector("#lightSwitch");

  const music = document.querySelector("#backgroundMusic");
  const musicButton = document.querySelector("#musicButton");
  const musicText = document.querySelector("#musicText");

  const door = document.querySelector(".door");
  const doorButton = document.querySelector("#doorButton");

  const letter = document.querySelector(".future-letter");
  const letterButton = document.querySelector("#letterButton");
  const closeLetter = document.querySelector("#closeLetter");

  const photoItems = document.querySelectorAll(".memory-photo");

  const roomItems = document.querySelectorAll("[data-room]");

  /* =========================
     2. WELCOME EFFECT
  ========================= */

  setTimeout(() => {
    body.classList.add("loaded");
  }, 150);


  /* =========================
     3. LIGHT SWITCH
  ========================= */

  if (lightSwitch) {

    lightSwitch.addEventListener("click", () => {

      body.classList.toggle("lights-on");

      const isOn = body.classList.contains("lights-on");

      lightSwitch.setAttribute(
        "aria-label",
        isOn ? "Turn lights off" : "Turn lights on"
      );

      lightSwitch.setAttribute(
        "title",
        isOn ? "Turn lights off" : "Turn lights on"
      );

      if (lamp) {
        lamp.classList.toggle("active", isOn);
      }

    });

  }


  /* =========================
     4. MUSIC PLAYER
  ========================= */

  if (music && musicButton) {

    musicButton.addEventListener("click", async () => {

      try {

        if (music.paused) {

          await music.play();

          musicButton.classList.add("playing");

          if (musicText) {
            musicText.textContent = "music playing";
          }

        } else {

          music.pause();

          musicButton.classList.remove("playing");

          if (musicText) {
            musicText.textContent = "play our song";
          }

        }

      } catch (error) {

        console.log("Music belum bisa dimainkan:", error);

        if (musicText) {
          musicText.textContent = "tap again to play";
        }

      }

    });


    music.addEventListener("ended", () => {

      musicButton.classList.remove("playing");

      if (musicText) {
        musicText.textContent = "play our song";
      }

    });

  }


  /* =========================
     5. DOOR INTERACTION
  ========================= */

  if (doorButton && door) {

    doorButton.addEventListener("click", () => {

      door.classList.toggle("open");

      const isOpen = door.classList.contains("open");

      doorButton.textContent = isOpen
        ? "close the door"
        : "open the door";

    });

  }


  /* =========================
     6. FUTURE LETTER
  ========================= */

  if (letterButton && letter) {

    letterButton.addEventListener("click", () => {

      letter.classList.add("show");

      body.classList.add("letter-open");

    });

  }


  if (closeLetter && letter) {

    closeLetter.addEventListener("click", () => {

      letter.classList.remove("show");

      body.classList.remove("letter-open");

    });

  }


  /* =========================
     7. CLICK OUTSIDE LETTER
  ========================= */

  if (letter) {

    letter.addEventListener("click", (event) => {

      if (event.target === letter) {

        letter.classList.remove("show");

        body.classList.remove("letter-open");

      }

    });

  }


  /* =========================
     8. ESCAPE CLOSE LETTER
  ========================= */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

      if (letter) {
        letter.classList.remove("show");
      }

      body.classList.remove("letter-open");

    }

  });


  /* =========================
     9. PHOTO LIGHTBOX
  ========================= */

  photoItems.forEach((photo) => {

    photo.addEventListener("click", () => {

      const source =
        photo.getAttribute("src") ||
        photo.querySelector("img")?.getAttribute("src");

      if (!source) return;

      createLightbox(source);

    });

  });


  function createLightbox(source) {

    const existing = document.querySelector(".image-lightbox");

    if (existing) {
      existing.remove();
    }

    const overlay = document.createElement("div");

    overlay.className = "image-lightbox";

    overlay.innerHTML = `
      <div class="lightbox-inner">
        <button class="lightbox-close" aria-label="Close image">
          ×
        </button>

        <img src="${source}" alt="A memory from our little house">
      </div>
    `;

    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.classList.add("active");
    });

    const close = overlay.querySelector(".lightbox-close");

    close.addEventListener("click", () => {
      closeLightbox(overlay);
    });

    overlay.addEventListener("click", (event) => {

      if (event.target === overlay) {
        closeLightbox(overlay);
      }

    });

  }


  function closeLightbox(overlay) {

    overlay.classList.remove("active");

    setTimeout(() => {
      overlay.remove();
    }, 250);

  }


  /* =========================
     10. ROOM OBJECTS
  ========================= */

  roomItems.forEach((item) => {

    item.addEventListener("click", () => {

      item.classList.add("room-object-active");

      setTimeout(() => {
        item.classList.remove("room-object-active");
      }, 500);

    });

  });


  /* =========================
     11. SCROLL REVEAL
  ========================= */

  const revealItems =
    document.querySelectorAll(
      ".reveal, .room-section, .memory-card, .note-card"
    );

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      (entries, obs) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            obs.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );

    revealItems.forEach((item) => {
      observer.observe(item);
    });

  } else {

    revealItems.forEach((item) => {
      item.classList.add("visible");
    });

  }


  /* =========================
     12. LITTLE FLOATING DOTS
  ========================= */

  const dotContainer =
    document.querySelector(".floating-dots");

  if (dotContainer) {

    for (let i = 0; i < 18; i++) {

      const dot = document.createElement("span");

      dot.className = "floating-dot";

      dot.style.left = `${Math.random() * 100}%`;

      dot.style.animationDelay =
        `${Math.random() * 5}s`;

      dot.style.animationDuration =
        `${5 + Math.random() * 6}s`;

      dotContainer.appendChild(dot);

    }

  }


  /* =========================
     13. TYPING EFFECT
  ========================= */

  const typingElement =
    document.querySelector("#typingText");

  if (typingElement) {

    const words = [
      "a little place to rest.",
      "a corner for your dreams.",
      "a home for every version of you.",
      "a reminder that you are never alone."
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeText() {

      const currentWord = words[wordIndex];

      if (!deleting) {

        typingElement.textContent =
          currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

          deleting = true;

          setTimeout(typeText, 1800);

          return;

        }

      } else {

        typingElement.textContent =
          currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

          deleting = false;

          wordIndex =
            (wordIndex + 1) % words.length;

        }

      }

      setTimeout(
        typeText,
        deleting ? 45 : 75
      );

    }

    typeText();

  }


  /* =========================
     14. SECRET MESSAGE
  ========================= */

  const secretButton =
    document.querySelector("#secretButton");

  const secretMessage =
    document.querySelector("#secretMessage");

  if (secretButton && secretMessage) {

    secretButton.addEventListener("click", () => {

      secretMessage.classList.toggle("show");

      const visible =
        secretMessage.classList.contains("show");

      secretButton.textContent =
        visible
          ? "okay, that's enough"
          : "one more little thing";

    });

  }


  /* =========================
     15. SMOOTH SCROLL
  ========================= */

  document.querySelectorAll("a[href^='#']")
    .forEach((link) => {

      link.addEventListener("click", (event) => {

        const targetId =
          link.getAttribute("href");

        if (!targetId || targetId === "#") {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) {
          return;
        }

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      });

    });


  /* =========================
     16. CONSOLE MESSAGE
  ========================= */

  console.log(
    "%cWelcome to Raysha's little house.",
    "font-size:18px;font-weight:bold;"
  );

  console.log(
    "%cSome places are built with walls. Some are built with memories.",
    "font-size:13px;"
  );

});
