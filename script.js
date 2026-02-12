const heartScreen = document.getElementById('heart-screen');
const mainContent = document.getElementById('main-content');
const music = document.getElementById('bg-music');
const toggleBtn = document.getElementById('music-toggle');

/* ============================= */
/* 🔥 INICIO (PC + CELULAR) */
/* ============================= */

function startSite() {

    if (!heartScreen.classList.contains('hidden')) {

        heartScreen.classList.add('hidden');

        setTimeout(() => {
            mainContent.classList.remove('hidden');

            toggleBtn.classList.remove('hidden');
            toggleBtn.classList.add('show');

            spawnHearts();
            initScrollReveal();

        }, 600);

        fadeInMusic(2000);
    }
}

// PC
document.addEventListener('click', startSite);

// CELULAR
document.addEventListener('touchstart', startSite);


/* ============================= */
/* 🔊 BOTÓN MÚSICA */
/* ============================= */

toggleBtn.addEventListener('click', function (e) {
    e.stopPropagation();

    if (!music.paused) {
        fadeOutMusic(800);
        toggleBtn.classList.remove("playing");
        toggleBtn.textContent = "🔇";
    } else {
        fadeInMusic(800);
        toggleBtn.classList.add("playing");
        toggleBtn.textContent = "🔊";
        spawnHearts();
    }
});

function fadeInMusic(duration) {
    music.volume = 0;
    music.play().catch(()=>{});
    let step = 0.05;
    let interval = duration * step;

    let fade = setInterval(() => {
        if (music.volume < 1) {
            music.volume = Math.min(music.volume + step, 1);
        } else {
            clearInterval(fade);
            toggleBtn.classList.add("playing");
        }
    }, interval);
}

function fadeOutMusic(duration) {
    let step = 0.05;
    let interval = duration * step;

    let fade = setInterval(() => {
        if (music.volume > 0) {
            music.volume = Math.max(music.volume - step, 0);
        } else {
            music.pause();
            clearInterval(fade);
        }
    }, interval);
}


/* ============================= */
/* 💖 CORAZONES FLOTANDO */
/* ============================= */

function spawnHearts() {
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement("div");
        heart.classList.add("floating-heart");
        heart.textContent = "❤️";

        heart.style.left = (window.innerWidth - 100 + Math.random()*40) + "px";
        heart.style.top = (window.innerHeight - 100 + Math.random()*40) + "px";

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 2000);
    }
}


/* ============================= */
/* ✨ SCROLL REVEAL */
/* ============================= */

function initScrollReveal() {

    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, {
        threshold: 0.15
    });

    reveals.forEach(el => observer.observe(el));
}


/* ============================= */
/* 🎵 SLIDER DE CANCIONES */
/* ============================= */

const links = document.querySelectorAll(".song-link");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

let currentIndex = 0;

function showSlide(index) {
    links.forEach(link => link.classList.remove("active"));
    links[index].classList.add("active");
}

function nextSlide() {
    currentIndex++;
    if (currentIndex >= links.length) {
        currentIndex = 0;
    }
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = links.length - 1;
    }
    showSlide(currentIndex);
}

rightArrow.addEventListener("click", function(e){
    e.stopPropagation();
    nextSlide();
});

leftArrow.addEventListener("click", function(e){
    e.stopPropagation();
    prevSlide();
});

links.forEach((link, index) => {
    link.addEventListener("click", function(e) {

        if (!link.classList.contains("active")) {
            e.preventDefault();
            currentIndex = index;
            showSlide(currentIndex);
        }

    });
});


/* ============================= */
/* 🔐 CANCIÓN SECRETA */
/* ============================= */

const secretBtn = document.getElementById("secret-btn");
const PASSWORD = "12345"; // Cambiá esto si querés

secretBtn.addEventListener("click", function(e) {
    e.stopPropagation();

    const userInput = prompt("Ingresa la contraseña 💌");

    if (userInput === PASSWORD) {
        window.location.href = "secreto/index.html";
    } else if (userInput !== null) {
        alert("❌ Contraseña incorrecta");
    }
});
