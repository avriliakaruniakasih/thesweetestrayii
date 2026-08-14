/* ==========================================
   MUSIC
========================================== */

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

let playing = false;

musicBtn.addEventListener("click", () => {

  if (!playing) {

    music.play();

    musicBtn.textContent = "Ⅱ";

    playing = true;

  } else {

    music.pause();

    musicBtn.textContent = "▶";

    playing = false;

  }

});


/* ==========================================
   WISH JAR
========================================== */

const wishButton = document.getElementById("wishButton");
const wishDisplay = document.getElementById("wishDisplay");


const wishes = [

  "May your ideas always find a place to grow.",

  "Semoga suatu hari nanti kamu sibuk mengejar mimpi yang dulu pernah terasa terlalu jauh.",

  "May you never become too busy to read one more page.",

  "Semoga tulisanmu terus menemukan jalan pulang kepada orang-orang yang membutuhkannya.",

  "I hope the future surprises you kindly.",

  "May you build a life that feels unmistakably yours.",

  "Semoga setiap langkah kecilmu membawa kamu sedikit lebih dekat kepada versi dirimu yang kamu bayangkan.",

  "I hope you keep finding beautiful things in ordinary days.",

  "May you always have something worth writing about.",

  "And on the days when everything feels uncertain, I hope you remember that you are still becoming.",

  "Semoga nanti kamu melihat semua yang sudah kamu bangun lalu tersenyum kecil dan berpikir — ternyata aku sampai juga.",

  "I hope life is gentle with the girl who dreams this much."

];


let previousWish = -1;


wishButton.addEventListener("click", () => {

  let randomIndex;

  do {

    randomIndex =
      Math.floor(Math.random() * wishes.length);

  } while (randomIndex === previousWish);


  previousWish = randomIndex;


  wishDisplay.style.opacity = "0";

  wishDisplay.style.transform =
    "translateY(10px)";


  setTimeout(() => {

    wishDisplay.textContent =
      wishes[randomIndex];

    wishDisplay.style.opacity = "1";

    wishDisplay.style.transform =
      "translateY(0)";

  }, 250);

});


/* ==========================================
   FUTURE LETTER
========================================== */

const envelope =
  document.getElementById("envelope");

const letterButton =
  document.getElementById("letterButton");


letterButton.addEventListener("click", () => {

  envelope.classList.toggle("open");


  if (envelope.classList.contains("open")) {

    letterButton.textContent =
      "close it";

  } else {

    letterButton.textContent =
      "open it";

  }

});


/* ==========================================
   QUOTE CAROUSEL
========================================== */

const quotes =
  document.querySelectorAll(".quote");


let currentQuote = 0;


setInterval(() => {

  quotes[currentQuote]
    .classList.remove("active");


  currentQuote++;


  if (currentQuote >= quotes.length) {
    currentQuote = 0;
  }


  quotes[currentQuote]
    .classList.add("active");


}, 5000);


/* ==========================================
   POLKADOT PARALLAX
========================================== */

const dots =
  document.querySelectorAll(".dot");


window.addEventListener("mousemove", (event) => {

  const x =
    (event.clientX / window.innerWidth - .5) * 15;

  const y =
    (event.clientY / window.innerHeight - .5) * 15;


  dots.forEach((dot, index) => {

    const speed =
      (index + 1) * .25;


    dot.style.transform =
      `translate(
        ${x * speed}px,
        ${y * speed}px
      )`;

  });

});


/* ==========================================
   SCROLL REVEAL
========================================== */

const sections =
  document.querySelectorAll(".section");


const observer =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("show");

        }

      });

    },
    {
      threshold: .1
    }
  );


sections.forEach((section) => {

  section.classList.add("reveal");

  observer.observe(section);

});


/* ==========================================
   IMAGE FALLBACK
========================================== */

const images =
  document.querySelectorAll("img");


images.forEach((image) => {

  image.addEventListener("error", () => {

    image.style.opacity = "0";

    image.parentElement.classList.add(
      "photo-missing"
    );

  });

});
