/* =========================================================
   MARVEL — OUR STORY ❤️
   Complete JavaScript
========================================================= */

"use strict";

/* =========================================================
   CONFIG
========================================================= */

const PASSWORD = "مارڤولتي";

// تاريخ بداية العلاقة
// غيّره لو محتاج التاريخ/الوقت بالضبط
const START_DATE = new Date("2026-03-31T00:00:00");

const YOUTUBE_VIDEO_ID = "pDbOeLns9e0";


/* =========================================================
   DOM
========================================================= */

const gate = document.getElementById("gate");
const experience = document.getElementById("experience");

const passwordInput = document.getElementById("passwordInput");
const unlockBtn = document.getElementById("unlockBtn");
const wrongPassword = document.getElementById("wrongPassword");

const secretBtn = document.getElementById("secretBtn");
const secretMessage = document.getElementById("secretMessage");

const playSong = document.getElementById("playSong");
const playerContainer = document.getElementById("playerContainer");
const youtubePlayer = document.getElementById("youtubePlayer");

const particlesCanvas = document.getElementById("particles");
const heartsLayer = document.getElementById("heartsLayer");

const cursorGlow = document.querySelector(".cursor-glow");


/* =========================================================
   PASSWORD GATE
========================================================= */

function unlockExperience() {

    const enteredPassword = passwordInput.value.trim();

    if (enteredPassword === PASSWORD) {

        // إخفاء رسالة الخطأ
        if (wrongPassword) {
            wrongPassword.classList.remove("show");
        }

        // تأثير فتح
        gate.classList.add("unlocking");

        setTimeout(() => {

            gate.classList.add("hidden");

            experience.classList.remove("hidden");

            document.body.classList.add("experience-active");

            // بداية الأنيميشن
            startExperience();

        }, 800);

    } else {

        showWrongPasswordMessage();

    }
}


/* =========================================================
   WRONG PASSWORD POPUP
========================================================= */

function showWrongPasswordMessage() {

    const messages = [
        "دلعك يروح يا روحي ❤️",
        "غلط يا قلبي 🥺 اكتبي اسم إنّة بحبه ❤️",
        "يا مارڤولتي 😂 ركزي شوية واكتبيها صح ❤️",
        "مش دي يا قلبي 🥺 إنتِ عارفة كلمة السر ❤️",
        "حاولي تاني يا روحي... أنا مستنيكي ❤️"
    ];

    const message =
        messages[Math.floor(Math.random() * messages.length)];

    // حذف أي Popup قديم
    const oldPopup =
        document.querySelector(".wrong-password-popup");

    if (oldPopup) {
        oldPopup.remove();
    }

    const popup = document.createElement("div");

    popup.className = "wrong-password-popup";

    popup.innerHTML = `
        <div class="popup-hearts">
            ❤️ ✨ ❤️
        </div>

        <div class="popup-message">
            ${message}
        </div>

        <div class="popup-small">
            حاولي تاني يا مارڤولتي 🥺❤️
        </div>
    `;

    document.body.appendChild(popup);

    // اهتزاز بسيط للـinput
    passwordInput.classList.add("shake");

    setTimeout(() => {
        passwordInput.classList.remove("shake");
    }, 500);

    // إزالة الرسالة
    setTimeout(() => {

        popup.classList.add("hide");

        setTimeout(() => {
            popup.remove();
        }, 500);

    }, 3000);
}


/* =========================================================
   PASSWORD EVENTS
========================================================= */

if (unlockBtn) {
    unlockBtn.addEventListener("click", unlockExperience);
}

if (passwordInput) {

    passwordInput.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {
            unlockExperience();
        }

    });

    passwordInput.addEventListener("input", () => {

        if (wrongPassword) {
            wrongPassword.classList.remove("show");
        }

    });
}


/* =========================================================
   START EXPERIENCE
========================================================= */

function startExperience() {

    // تشغيل reveal
    setupReveal();

    // تشغيل عداد
    updateCounter();

    setInterval(updateCounter, 1000);

    // قلوب
    startFloatingHearts();

    // particles
    startParticles();

}


/* =========================================================
   COUNTER
========================================================= */

function updateCounter() {

    const now = new Date();

    let difference =
        now.getTime() - START_DATE.getTime();

    if (difference < 0) {
        difference = 0;
    }

    const totalSeconds =
        Math.floor(difference / 1000);

    const days =
        Math.floor(totalSeconds / 86400);

    const hours =
        Math.floor((totalSeconds % 86400) / 3600);

    const minutes =
        Math.floor((totalSeconds % 3600) / 60);

    const seconds =
        totalSeconds % 60;


    setText("days", days);
    setText("hours", formatNumber(hours));
    setText("minutes", formatNumber(minutes));
    setText("seconds", formatNumber(seconds));
}


function formatNumber(number) {

    return String(number).padStart(2, "0");

}


function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {
        element.textContent = value;
    }

}


/* =========================================================
   REVEAL ON SCROLL
========================================================= */

function setupReveal() {

    const revealElements =
        document.querySelectorAll(".reveal");

    if (!revealElements.length) {
        return;
    }


    if (!("IntersectionObserver" in window)) {

        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

        return;
    }


    const observer =
        new IntersectionObserver(
            (entries, obs) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        obs.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    revealElements.forEach((element) => {
        observer.observe(element);
    });

}


/* =========================================================
   SMOOTH SCROLL BUTTONS
========================================================= */

document.querySelectorAll("[data-scroll]")
    .forEach((button) => {

        button.addEventListener("click", () => {

            const targetId =
                button.getAttribute("data-scroll");

            const target =
                document.getElementById(targetId);

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


/* =========================================================
   SECRET MESSAGE
========================================================= */

if (secretBtn && secretMessage) {

    secretBtn.addEventListener("click", () => {

        secretMessage.classList.toggle("show");

        if (secretMessage.classList.contains("show")) {

            secretBtn.textContent =
                "السر اتفتح ❤️";

            createHeartBurst();

        } else {

            secretBtn.textContent =
                "افتحي السر ❤️";

        }

    });

}


/* =========================================================
   FLOATING HEARTS
========================================================= */

function startFloatingHearts() {

    if (!heartsLayer) {
        return;
    }

    const heartSymbols = [
        "♥",
        "♡",
        "❤️",
        "💕",
        "✨"
    ];


    setInterval(() => {

        createFloatingHeart();

    }, 900);

}


function createFloatingHeart() {

    if (!heartsLayer) {
        return;
    }

    const heart =
        document.createElement("span");

    heart.className =
        "floating-heart";

    heart.textContent =
        ["♥", "♡", "❤️", "💕", "✨"]
        [Math.floor(Math.random() * 5)];


    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.animationDuration =
        (5 + Math.random() * 5) + "s";

    heart.style.fontSize =
        (10 + Math.random() * 18) + "px";

    heart.style.opacity =
        (0.2 + Math.random() * 0.5).toFixed(2);


    heartsLayer.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, 10000);

}


/* =========================================================
   HEART BURST
========================================================= */

function createHeartBurst() {

    const container =
        document.createElement("div");

    container.className =
        "heart-burst";

    document.body.appendChild(container);


    for (let i = 0; i < 18; i++) {

        const heart =
            document.createElement("span");

        heart.textContent =
            ["❤️", "💕", "♥", "✨"]
            [Math.floor(Math.random() * 4)];


        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            80 + Math.random() * 180;


        heart.style.setProperty(
            "--x",
            Math.cos(angle) * distance + "px"
        );

        heart.style.setProperty(
            "--y",
            Math.sin(angle) * distance + "px"
        );


        container.appendChild(heart);

    }


    setTimeout(() => {
        container.remove();
    }, 1600);

}


/* =========================================================
   CURSOR GLOW
========================================================= */

if (cursorGlow) {

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    document.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

    });


    function animateCursor() {

        currentX +=
            (mouseX - currentX) * 0.12;

        currentY +=
            (mouseY - currentY) * 0.12;


        cursorGlow.style.transform =
            `translate3d(${currentX}px, ${currentY}px, 0)`;


        requestAnimationFrame(animateCursor);

    }


    animateCursor();

}


/* =========================================================
   PARTICLES
========================================================= */

function startParticles() {

    if (!particlesCanvas) {
        return;
    }

    const canvas =
        particlesCanvas;

    const ctx =
        canvas.getContext("2d");


    let width = 0;
    let height = 0;


    function resizeCanvas() {

        width =
            window.innerWidth;

        height =
            window.innerHeight;


        const dpr =
            Math.min(window.devicePixelRatio || 1, 2);


        canvas.width =
            width * dpr;

        canvas.height =
            height * dpr;


        canvas.style.width =
            width + "px";

        canvas.style.height =
            height + "px";


        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

    }


    resizeCanvas();


    window.addEventListener(
        "resize",
        resizeCanvas
    );


    const particles = [];

    const particleCount =
        Math.min(
            90,
            Math.floor(
                window.innerWidth / 12
            )
        );


    for (let i = 0; i < particleCount; i++) {

        particles.push({

            x: Math.random() * width,

            y: Math.random() * height,

            size:
                Math.random() * 1.8 + 0.5,

            speed:
                Math.random() * 0.35 + 0.05,

            opacity:
                Math.random() * 0.5 + 0.15

        });

    }


    function animateParticles() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        particles.forEach((particle) => {

            particle.y -= particle.speed;


            if (particle.y < -10) {

                particle.y =
                    height + 10;

                particle.x =
                    Math.random() * width;

            }


            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );


            ctx.globalAlpha =
                particle.opacity;


            ctx.fill();


        });


        ctx.globalAlpha = 1;


        requestAnimationFrame(
            animateParticles
        );

    }


    animateParticles();

}


/* =========================================================
   YOUTUBE PLAYER
========================================================= */

let youtubeAPIReady = false;
let youtubePlayerInstance = null;


function loadYouTubeAPI() {

    if (window.YT && window.YT.Player) {

        youtubeAPIReady = true;

        createYouTubePlayer();

        return;

    }


    const existingScript =
        document.querySelector(
            'script[src="https://www.youtube.com/iframe_api"]'
        );


    if (!existingScript) {

        const script =
            document.createElement("script");

        script.src =
            "https://www.youtube.com/iframe_api";

        document.head.appendChild(script);

    }


    window.onYouTubeIframeAPIReady = () => {

        youtubeAPIReady = true;

        createYouTubePlayer();

    };

}


function createYouTubePlayer() {

    if (!youtubePlayer || youtubePlayerInstance) {
        return;
    }


    youtubePlayerInstance =
        new YT.Player(
            youtubePlayer,
            {

                videoId:
                    YOUTUBE_VIDEO_ID,

                playerVars: {

                    autoplay: 0,

                    controls: 1,

                    rel: 0,

                    modestbranding: 1,

                    playsinline: 1

                },

                events: {

                    onReady: () => {

                        if (playerContainer) {

                            playerContainer.classList.add(
                                "ready"
                            );

                        }

                    }

                }

            }
        );

}


/* =========================================================
   MUSIC BUTTON
========================================================= */

if (playSong) {

    playSong.addEventListener("click", () => {

        loadYouTubeAPI();


        if (playerContainer) {

            playerContainer.classList.add("show");

        }


        setTimeout(() => {

            if (
                youtubePlayerInstance &&
                typeof youtubePlayerInstance.playVideo === "function"
            ) {

                youtubePlayerInstance.playVideo();

            }

        }, 800);


        playSong.classList.add("playing");

        playSong.innerHTML =
            "🎵 الأغنية شغالة... ❤️";

    });

}


/* =========================================================
   PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden &&
            youtubePlayerInstance &&
            typeof youtubePlayerInstance.pauseVideo === "function"
        ) {

            youtubePlayerInstance.pauseVideo();

        }

    }
);


/* =========================================================
   PREVENT DOUBLE CLICK ISSUES
========================================================= */

document.addEventListener(
    "click",
    (event) => {

        const button =
            event.target.closest("button");

        if (!button) {
            return;
        }

        button.style.transform =
            "scale(0.97)";


        setTimeout(() => {

            button.style.transform = "";

        }, 120);

    }
);


/* =========================================================
   INITIAL STATE
========================================================= */

if (experience) {

    experience.classList.add("hidden");

}


if (secretMessage) {

    secretMessage.classList.remove("show");

}


console.log(
    "❤️ MARVEL — Our Story is ready."
);
