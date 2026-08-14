```javascript
/* =========================
   LOADING SCREEN
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        document
            .getElementById("loader")
            .classList.add("hide");

    }, 1000);

});


/* =========================
   ROOM SYSTEM
========================= */

const overlay = document.getElementById("roomOverlay");

const rooms = document.querySelectorAll(".room-content");


function openRoom(roomId){

    overlay.classList.add("show");

    document.body.style.overflow = "hidden";

    rooms.forEach(room => {
        room.classList.remove("active");
    });

    const selectedRoom = document.getElementById(roomId);

    if(selectedRoom){
        selectedRoom.classList.add("active");
    }

}


function closeRoom(){

    overlay.classList.remove("show");

    document.body.style.overflow = "auto";

    rooms.forEach(room => {
        room.classList.remove("active");
    });

}


/* Close when clicking outside content */

overlay.addEventListener("click", function(event){

    if(event.target === overlay){
        closeRoom();
    }

});


/* ESC KEY */

document.addEventListener("keydown", function(event){

    if(event.key === "Escape"){
        closeRoom();
    }

});


/* =========================
   MUSIC
========================= */

const musicToggle =
    document.getElementById("musicToggle");

const audioPlayer =
    document.getElementById("audioPlayer");


let musicPlaying = false;


musicToggle.addEventListener("click", () => {

    if(!audioPlayer) return;

    if(musicPlaying){

        audioPlayer.pause();

        musicPlaying = false;

        musicToggle.innerHTML = "♫";

    }else{

        audioPlayer.play()
            .then(() => {

                musicPlaying = true;

                musicToggle.innerHTML = "❚❚";

            })
            .catch(() => {

                alert(
                    "Open the Music Room and press play ♡"
                );

            });

    }

});


if(audioPlayer){

    audioPlayer.addEventListener("play", () => {

        musicPlaying = true;
        musicToggle.innerHTML = "❚❚";

    });


    audioPlayer.addEventListener("pause", () => {

        musicPlaying = false;
        musicToggle.innerHTML = "♫";

    });

}


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    ".room, .intro, .garden-quote, .final-note"
);


const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                    "translateY(0)";

            }

        });

    },
    {
        threshold:0.12
    }
);


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity .8s ease, transform .8s ease";

    observer.observe(element);

});


/* =========================
   SMOOTH NAVIGATION
========================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener("click", function(event){

        const target =
            document.querySelector(
                this.getAttribute("href")
            );

        if(target){

            event.preventDefault();

            target.scrollIntoView({
                behavior:"smooth"
            });

        }

    });

});
```
