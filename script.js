/* =========================================
   1. MUSIC PLAYER
========================================= */

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

let isPlaying = false;

musicBtn.addEventListener("click", () => {
  if (!isPlaying) {
    music.play();
    musicBtn.textContent = "Ⅱ";
    isPlaying = true;
  } else {
    music.pause();
    musicBtn.textContent = "▶";
    isPlaying = false;
  }
});


/* =========================================
   2. JAR OF WISHES
========================================= */

const wishButton = document.getElementById("wishButton");
const wishDisplay = document.getElementById("wishDisplay");

const wishes = [
  "May your ideas always find a place to grow.",

  "May your future be bigger than your fears.",

  "I hope you never lose the curiosity that makes you keep learning.",

  "May you build a life that feels as beautiful as the spaces you dream of creating.",

  "Semoga setiap langkah kecilmu selalu membawa kamu sedikit lebih dekat dengan apa yang kamu impikan.",

  "Semoga nanti ada hari ketika kamu melihat semua yang telah kamu bangun and quietly think — I made it.",

  "May you meet people who believe in your dreams even on the days you don't.",

  "Semoga tulisanmu terus menemukan pembacanya, dan mimpimu menemukan jalannya.",

  "May you always have a reason to keep creating.",

  "Wherever life takes you, I hope you always remember that someone is quietly rooting for you."
];

let lastWish = -1;

wishButton.addEventListener("click", () => {

  let randomWish;

  do {
    randomWish = Math.floor(Math.random() * wishes.length);
  } while (randomWish === lastWish);

  lastWish = randomWish;

  wishDisplay.style.opacity = "0";
  wishDisplay.style.transform = "translateY(10px)";

  setTimeout(() => {

    wishDisplay.textContent = wishes[randomWish];

    wishDisplay.style.opacity = "1";
    wishDisplay.style.transform = "translateY(0)";

  }, 250);

});


/* =========================================
   3. FUTURE LETTER
========================================= */

const envelope = document.getElementById("envelope");
const letterButton = document.getElementById("letterButton");

letterButton.addEventListener("click", () => {

  envelope.classList.toggle("open");

  if (envelope.classList.contains("open")) {
    letterButton.textContent = "close the letter";
  } else {
    letterButton.textContent = "open the letter";
  }

});


/* =========================================
   4. QUOTE CAROUSEL
========================================= */

const quotes = document.querySelectorAll(".quote");

let currentQuote = 0;

setInterval(() => {

  quotes[currentQuote].classList.remove("active");

  currentQuote++;

  if (currentQuote >= quotes.length) {
    currentQuote = 0;
  }

  quotes[currentQuote].classList.add("active");

}, 4500);


/* =========================================
   5. SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
  ".section, .dream-board, .blueprint, .ui-card, .word-card, .build-grid > div"
);

const revealObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
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


/* =========================================
   6. POLKADOT PARALLAX
========================================= */

const polkas = document.querySelectorAll(".polka");

window.addEventListener("mousemove", (event) => {

  const x =
    (event.clientX / window.innerWidth - 0.5) * 20;

  const y =
    (event.clientY / window.innerHeight - 0.5) * 20;

  polkas.forEach((polka, index) => {

    const speed = (index + 1) * 0.35;

    polka.style.transform =
      `translate(${x * speed}px, ${y * speed}px)`;

  });

});


/* =========================================
   7. BLUEPRINT ANIMATION
========================================= */

const blueprint = document.querySelector(".blueprint");

if (blueprint) {

  const blueprintObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          blueprint.classList.add("blueprint-active");
        }

      });

    },
    {
      threshold: 0.25
    }
  );

  blueprintObserver.observe(blueprint);

}


/* =========================================
   8. IMAGE FALLBACK
========================================= */

const images = document.querySelectorAll("img");

images.forEach((img) => {

  img.addEventListener("error", () => {

    img.style.display = "none";

    if (img.parentElement) {
      img.parentElement.classList.add("image-missing");
    }

  });

});


/* =========================================
   9. LITTLE CLICK EFFECT
========================================= */

document.addEventListener("click", (event) => {

  const sparkle = document.createElement("span");

  sparkle.textContent = "✦";

  sparkle.style.position = "fixed";
  sparkle.style.left = `${event.clientX}px`;
  sparkle.style.top = `${event.clientY}px`;

  sparkle.style.pointerEvents = "none";
  sparkle.style.zIndex = "9999";

  sparkle.style.fontSize = "14px";
  sparkle.style.color = "#b86c65";

  sparkle.style.animation = "clickSparkle 0.7s ease forwards";

  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 700);

});
