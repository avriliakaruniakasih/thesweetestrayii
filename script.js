/* =========================================================
   RAYSHA'S HOUSE
   script.js
   ========================================================= */


/* =========================================================
   1. REVEAL ANIMATION
   ========================================================= */

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});


/* =========================================================
   2. LIGHTS ON / OFF
   ========================================================= */

const lightsButton = document.querySelector(".lights-button");

if (lightsButton) {

  lightsButton.addEventListener("click", () => {

    document.body.classList.toggle("lights-off");

    const isOff =
      document.body.classList.contains("lights-off");

    lightsButton.textContent =
      isOff
        ? "turn the lights on"
        : "turn the lights off";

  });

}


/* =========================================================
   3. MUSIC PLAYER
   ========================================================= */

const musicButton =
  document.querySelector(".music-button");

const audio =
  document.querySelector("#background-music");

let musicPlaying = false;


if (musicButton && audio) {

  musicButton.addEventListener("click", async () => {

    try {

      if (!musicPlaying) {

        await audio.play();

        musicPlaying = true;

        musicButton.textContent =
          "pause our song";

      } else {

        audio.pause();

        musicPlaying = false;

        musicButton.textContent =
          "play our song";

      }

    } catch (error) {

      console.log(
        "Audio belum bisa diputar:",
        error
      );

      musicButton.textContent =
        "tap again";

    }

  });


  audio.addEventListener(
    "ended",
    () => {

      musicPlaying = false;

      musicButton.textContent =
        "play our song";

    }
  );

}


/* =========================================================
   4. MEMORY WALL
   ========================================================= */

const memoryBoxes =
  document.querySelectorAll(".memory-box");

const memoryOutput =
  document.querySelector(".memory-output");


const memories = [
  "Some friendships feel like a room you can always come home to.",
  "There are conversations we remember long after the words are gone.",
  "Maybe growing up is simply learning how to carry the people we love.",
  "Some chapters end. The good ones leave the door unlocked."
];


memoryBoxes.forEach((box, index) => {

  box.addEventListener("click", () => {

    if (!memoryOutput) return;

    memoryOutput.style.opacity = "0";

    setTimeout(() => {

      memoryOutput.textContent =
        memories[index] ||
        "Some memories are better kept quietly.";

      memoryOutput.style.opacity = "1";

    }, 180);

  });

});


/* =========================================================
   5. WISH JAR
   ========================================================= */

const wishButton =
  document.querySelector(".wish-button");

const wishText =
  document.querySelector(".wish-text");


const wishes = [

  "May you find courage for the rooms you have not entered yet.",

  "May your ideas become places where people feel safe.",

  "May you never lose the part of you that loves beautiful words.",

  "May every difficult season lead you somewhere gentler.",

  "May the future meet you with doors you are ready to open.",

  "May your dreams grow slowly, surely, and beautifully.",

  "May you always remember that you don't have to figure everything out at once.",

  "May you build a life that feels like home.",

  "May you keep reading, writing, wondering, and becoming.",

  "And when life feels too heavy, may you remember that you don't have to carry it alone."

];


let lastWish = -1;


if (wishButton && wishText) {

  wishButton.addEventListener("click", () => {

    let randomIndex;

    do {

      randomIndex =
        Math.floor(
          Math.random() * wishes.length
        );

    } while (
      randomIndex === lastWish &&
      wishes.length > 1
    );

    lastWish = randomIndex;

    wishText.style.opacity = "0";

    wishText.style.transform =
      "translateY(8px)";

    setTimeout(() => {

      wishText.textContent =
        wishes[randomIndex];

      wishText.style.opacity = "1";

      wishText.style.transform =
        "translateY(0)";

    }, 200);

  });

}


/* =========================================================
   6. FLOWER WISH
   ========================================================= */

const flowers =
  document.querySelectorAll(".flower");

const flowerWish =
  document.querySelector(".flower-wish");


const flowerMessages = [

  "for the girl who keeps turning ideas into possibilities.",

  "for every little dream that has not found its shape yet.",

  "for the future architect with a heart full of stories.",

  "for all the places you will create someday.",

  "for the version of you who will look back and be proud.",

  "for every quiet effort that nobody else gets to see."

];


flowers.forEach((flower, index) => {

  flower.addEventListener("click", () => {

    if (!flowerWish) return;

    flowerWish.style.opacity = "0";

    setTimeout(() => {

      flowerWish.textContent =
        flowerMessages[
          index % flowerMessages.length
        ];

      flowerWish.style.opacity = "1";

    }, 180);

  });

});


/* =========================================================
   7. FUTURE LETTER MODAL
   ========================================================= */

const letterButton =
  document.querySelector(".letter-button");

const letterModal =
  document.querySelector(".letter-modal");

const closeLetter =
  document.querySelector(".close-letter");


function openLetter() {

  if (!letterModal) return;

  letterModal.classList.remove("hidden");

  document.body.style.overflow =
    "hidden";

}


function closeLetterModal() {

  if (!letterModal) return;

  letterModal.classList.add("hidden");

  document.body.style.overflow =
    "";

}


if (letterButton) {

  letterButton.addEventListener(
    "click",
    openLetter
  );

}


if (closeLetter) {

  closeLetter.addEventListener(
    "click",
    closeLetterModal
  );

}


/* =========================================================
   8. CLOSE LETTER WHEN CLICKING OUTSIDE
   ========================================================= */

if (letterModal) {

  letterModal.addEventListener(
    "click",
    (event) => {

      if (
        event.target === letterModal
      ) {

        closeLetterModal();

      }

    }
  );

}


/* =========================================================
   9. ESC KEY FOR LETTER
   ========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {

      closeLetterModal();

    }

  }
);


/* =========================================================
   10. IMAGE FALLBACK
   ========================================================= */

const images =
  document.querySelectorAll("img");


images.forEach((image) => {

  image.addEventListener(
    "error",
    () => {

      image.style.display =
        "none";

      const parent =
        image.parentElement;

      if (!parent) return;

      parent.classList.add(
        "image-missing"
      );

    }
  );

});


/* =========================================================
   11. GENTLE PARALLAX HOUSE
   ========================================================= */

const heroHouse =
  document.querySelector(".hero-house");


if (
  heroHouse &&
  window.innerWidth > 700
) {

  window.addEventListener(
    "mousemove",
    (event) => {

      const x =
        (event.clientX /
          window.innerWidth -
          0.5);

      const y =
        (event.clientY /
          window.innerHeight -
          0.5);

      heroHouse.style.transform =
        `translate(${x * 7}px, ${y * 5}px)`;

    }
  );

}


/* =========================================================
   12. RANDOM POLKADOT FLOATERS
   ========================================================= */

const dotLayer =
  document.querySelector(".dot-layer");


function createFloatingDot() {

  if (!dotLayer) return;

  const dot =
    document.createElement("span");

  dot.style.position =
    "fixed";

  dot.style.width =
    `${Math.random() * 5 + 3}px`;

  dot.style.height =
    dot.style.width;

  dot.style.borderRadius =
    "50%";

  dot.style.background =
    "rgba(16, 42, 76, 0.16)";

  dot.style.left =
    `${Math.random() * 100}vw`;

  dot.style.top =
    `${Math.random() * 100}vh`;

  dot.style.pointerEvents =
    "none";

  dot.style.zIndex =
    "-1";

  dot.style.transition =
    "transform 5s ease-in-out, opacity 5s ease";

  dotLayer.appendChild(dot);


  requestAnimationFrame(() => {

    dot.style.transform =
      `translate(
        ${(Math.random() - 0.5) * 60}px,
        ${(Math.random() - 0.5) * 60}px
      )`;

    dot.style.opacity =
      "0";

  });


  setTimeout(() => {

    dot.remove();

  }, 5000);

}


setInterval(
  createFloatingDot,
  1800
);


/* =========================================================
   13. SMOOTH NAVIGATION
   ========================================================= */

const navLinks =
  document.querySelectorAll(
    '.nav-links a[href^="#"]'
  );


navLinks.forEach((link) => {

  link.addEventListener(
    "click",
    (event) => {

      const targetId =
        link.getAttribute("href");

      const target =
        document.querySelector(
          targetId
        );

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }
  );

});


/* =========================================================
   14. PAGE LOAD
   ========================================================= */

window.addEventListener(
  "load",
  () => {

    document.body.classList.add(
      "page-loaded"
    );

    console.log(
      "Welcome to Raysha's House."
    );

  }
);
