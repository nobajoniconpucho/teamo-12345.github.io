const music = document.getElementById('bg-music');
const toggleBtn = document.getElementById('music-toggle');

// Mostrar botón automáticamente
window.addEventListener("load", () => {
    toggleBtn.classList.add("show");
});

// Click en botón
toggleBtn.addEventListener('click', function (e) {
    e.stopPropagation();

    if (!music.paused) {
        fadeOutMusic(600);
        toggleBtn.classList.remove("playing");
        toggleBtn.textContent = "🔇";
    } else {
        fadeInMusic(600);
        toggleBtn.classList.add("playing");
        toggleBtn.textContent = "🔊";
        spawnHearts();
    }
});

// Fade in
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
        }
    }, interval);
}

// Fade out
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

// Corazones
function spawnHearts() {
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement("div");
        heart.classList.add("floating-heart");
        heart.textContent = "💚";

        heart.style.left = (window.innerWidth - 100 + Math.random()*40) + "px";
        heart.style.top = (window.innerHeight - 100 + Math.random()*40) + "px";

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 2000);
    }
}
window.addEventListener("load", () => {

    toggleBtn.classList.add("show");

    // Intentar reproducir automáticamente
    music.volume = 0;
    music.play().then(() => {

        toggleBtn.classList.add("playing");
        toggleBtn.textContent = "🔊";

        fadeInMusic(1500);

    }).catch(() => {
        // Si el navegador bloquea autoplay
        console.log("Autoplay bloqueado por el navegador");
    });

});
