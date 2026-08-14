/* =========================================================
   RAYSHA'S HOUSE
   script.js
   ========================================================= */


/* =========================================================
   1. SCROLL REVEAL
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
    threshold: 0.15
  }
);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});


/* =========================================================
   2. SMOOTH SCROLL
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

  link.addEventListener("click", function (event) {

    const targetId = this.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

  });

});


/* =========================================================
   3. LIGHTS OFF MODE
   ========================================================= */

const lightsButton = document.querySelector("#lightsButton");

if (lightsButton) {

  lightsButton.addEventListener("click", () => {

    document.body.classList.toggle("lights-off");

    if (document.body.classList.contains("lights-off")) {

      lightsButton.textContent = "Turn the lights on";

    } else {

      lightsButton.textContent = "Lights off";

    }

  });

}


/* =========================================================
   4. TEA TIME NOTES
   ========================================================= */

const notes = document.querySelectorAll(".note");

const teaMessage = document.querySelector("#teaMessage");

const teaMessages = [

  "You don't have to carry everything alone.",

  "When life gets heavy, talk to someone you trust.",

  "Some days only need a little rest, not a perfect answer.",

  "A good friend can make an ordinary afternoon feel like home.",

  "You are allowed to pause before continuing.",

  "There is no shame in saying, 'I need someone today.'"

];


notes.forEach((note, index) => {

  note.addEventListener("click", () => {

    notes.forEach((item) => {
      item.classList.remove("active");
    });

    note.classList.add("active");

    if (teaMessage) {

      teaMessage.style.opacity = "0";

      setTimeout(() => {

        teaMessage.textContent =
          teaMessages[index % teaMessages.length];

        teaMessage.style.opacity = "1";

      }, 200);

    }

  });

});


/* =========================================================
   5. WISH JAR
   ========================================================= */

const wishButton = document.querySelector("#wishButton");

const wishText = document.querySelector("#wishText");


const wishes = [

  "May you always find courage in the things you create.",

  "May your ideas grow into places people will someday call home.",

  "May you never lose the part of you that loves stories.",

  "May your future be full of rooms you designed yourself.",

  "May every difficult season teach you something gentle.",

  "May you meet people who make the world feel a little kinder.",

  "May your name someday stand beside something you built with love.",

  "May you keep writing, even when the page feels empty.",

  "May you become the architect of a life that feels truly yours.",

  "May you always have somewhere to return to.",

  "May your dreams stay bigger than your fears.",

  "May the girl with all these dreams grow into someone she is proud to be."

];


let lastWish = -1;


if (wishButton && wishText) {

  wishButton.addEventListener("click", () => {

    let randomIndex;

    do {

      randomIndex =
        Math.floor(Math.random() * wishes.length);

    } while (
      randomIndex === lastWish &&
      wishes.length > 1
    );

    lastWish = randomIndex;

    wishText.style.opacity = "0";
    wishText.style.transform = "translateY(8px)";

    setTimeout(() => {

      wishText.textContent = wishes[randomIndex];

      wishText.style.opacity = "1";
      wishText.style.transform = "translateY(0)";

    }, 250);

  });

}


/* =========================================================
   6. MEMORY BOXES
   ========================================================= */

const memoryBoxes =
  document.querySelectorAll(".memory-box");

const memoryOutput =
  document.querySelector("#memoryOutput");


const memoryMessages = [

  "some memories never really leave the house.",

  "there are conversations we remember without remembering every word.",

  "some people become part of the architecture of our lives.",

  "the smallest moments often become the rooms we visit most.",

  "perhaps growing up is simply collecting places to remember."

];


memoryBoxes.forEach((box, index) => {

  box.addEventListener("click", () => {

    memoryBoxes.forEach((item) => {
      item.style.transform = "";
    });

    box.style.transform =
      "translateY(-10px) rotate(2deg)";

    if (memoryOutput) {

      memoryOutput.textContent =
        memoryMessages[index % memoryMessages.length];

    }

  });

});


/* =========================================================
   7. ARCHITECTURE HOUSE
   ========================================================= */

const architectHouse =
  document.querySelector(".architect-house");

if (architectHouse) {

  architectHouse.addEventListener("mousemove", (event) => {

    const rect =
      architectHouse.getBoundingClientRect();

    const x =
      event.clientX - rect.left;

    const y =
      event.clientY - rect.top;

    const moveX =
      (x / rect.width - 0.5) * 8;

    const moveY =
      (y / rect.height - 0.5) * 8;

    architectHouse.style.transform =
      `translate(${moveX}px, ${moveY}px)`;

  });

  architectHouse.addEventListener("mouseleave", () => {

    architectHouse.style.transform =
      "translate(0, 0)";

  });

}


/* =========================================================
   8. FLOWER WISHES
   ========================================================= */

const flowers =
  document.querySelectorAll(".flower");

const flowerWish =
  document.querySelector("#flowerWish");


const flowerMessages = [

  "For the dreamer who turns blank pages into possibilities.",

  "For every building you have imagined before it existed.",

  "For the stories you will write in places you haven't seen yet.",

  "For the courage to begin again whenever you need to.",

  "For the future version of you who will look back and smile.",

  "For every little dream that refuses to disappear."

];


flowers.forEach((flower, index) => {

  flower.addEventListener("click", () => {

    if (!flowerWish) return;

    flowerWish.style.opacity = "0";

    setTimeout(() => {

      flowerWish.textContent =
        flowerMessages[index % flowerMessages.length];

      flowerWish.style.opacity = "1";

    }, 200);

  });

});


/* =========================================================
   9. FUTURE LETTER
   ========================================================= */

const letterButton =
  document.querySelector("#openLetter");

const letterModal =
  document.querySelector("#letterModal");

const closeLetter =
  document.querySelector("#closeLetter");


if (letterButton && letterModal) {

  letterButton.addEventListener("click", () => {

    letterModal.classList.remove("hidden");

    document.body.style.overflow = "hidden";

  });

}


if (closeLetter && letterModal) {

  closeLetter.addEventListener("click", () => {

    letterModal.classList.add("hidden");

    document.body.style.overflow = "";

  });

}


/* =========================================================
   10. CLOSE MODAL WHEN CLICKING OUTSIDE
   ========================================================= */

if (letterModal) {

  letterModal.addEventListener("click", (event) => {

    if (event.target === letterModal) {

      letterModal.classList.add("hidden");

      document.body.style.overflow = "";

    }

  });

}


/* =========================================================
   11. ESCAPE TO CLOSE LETTER
   ========================================================= */

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {

    if (
      letterModal &&
      !letterModal.classList.contains("hidden")
    ) {

      letterModal.classList.add("hidden");

      document.body.style.overflow = "";

    }

  }

});


/* =========================================================
   12. RANDOM POLKADOT FLOAT
   ========================================================= */

const dotLayer =
  document.querySelector(".dot-layer");


if (dotLayer) {

  for (let i = 0; i < 18; i++) {

    const dot =
      document.createElement("span");

    dot.style.position = "fixed";

    dot.style.width =
      `${Math.floor(Math.random() * 9) + 5}px`;

    dot.style.height =
      dot.style.width;

    dot.style.borderRadius = "50%";

    dot.style.background =
      "rgba(20, 44, 76, 0.10)";

    dot.style.left =
      `${Math.random() * 100}%`;

    dot.style.top =
      `${Math.random() * 100}%`;

    dot.style.pointerEvents = "none";

    dot.style.animation =
      `floatDot ${5 + Math.random() * 7}s ease-in-out infinite`;

    dot.style.animationDelay =
      `${Math.random() * 3}s`;

    dotLayer.appendChild(dot);

  }

}


/* =========================================================
   13. FLOATING DOT ANIMATION
   ========================================================= */

const floatingStyle =
  document.createElement("style");

floatingStyle.textContent = `

@keyframes floatDot {

  0%, 100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-15px);
  }

}

#teaMessage,
#wishText,
#flowerWish,
#memoryOutput {

  transition:
    opacity 0.25s ease,
    transform 0.25s ease;

}

`;

document.head.appendChild(floatingStyle);


/* =========================================================
   14. TYPEWRITER EFFECT
   ========================================================= */

const typewriter =
  document.querySelector(".typewriter");


if (typewriter) {

  const originalText =
    typewriter.textContent.trim();

  typewriter.textContent = "";

  let character = 0;

  function typeText() {

    if (character < originalText.length) {

      typewriter.textContent +=
        originalText.charAt(character);

      character++;

      setTimeout(typeText, 45);

    }

  }

  setTimeout(typeText, 500);

}


/* =========================================================
   15. LITTLE HOUSE WELCOME
   ========================================================= */

const welcomeButton =
  document.querySelector("#enterHouse");

const livingRoom =
  document.querySelector("#living");


if (welcomeButton && livingRoom) {

  welcomeButton.addEventListener("click", () => {

    livingRoom.scrollIntoView({
      behavior: "smooth"
    });

  });

}


/* =========================================================
   16. CURRENT YEAR
   ========================================================= */

const yearElements =
  document.querySelectorAll(".current-year");

yearElements.forEach((element) => {

  element.textContent =
    new Date().getFullYear();

});


/* =========================================================
   17. CONSOLE MESSAGE
   ========================================================= */

console.log(
  `
  ┌─────────────────────────────────┐
  │         RAYSHA'S HOUSE          │
  │                                 │
  │  take your time.                │
  │  stay a little longer.          │
  │  this house remembers.          │
  └─────────────────────────────────┘
  `
);
