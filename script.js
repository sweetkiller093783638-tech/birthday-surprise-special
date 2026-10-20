// Birthday Surprise — Interactive Card Logic

const discoveredCards = new Set();

function flipCard(card) {
    const cardIndex = Array.from(
        document.querySelectorAll(".photo-card")
    ).indexOf(card);

    if (cardIndex === -1) return;

    const isFlipped = card.classList.contains("flipped");

    if (isFlipped) {
        return;
    }

        card.classList.add("flipped");
    card.setAttribute("aria-pressed", "true");

    const photoItem = card.closest(".photo-item");

    if (photoItem) {
        photoItem.classList.add("revealed");
    }

    discoveredCards.add(cardIndex);

    updateProgress();
}

function updateProgress() {
    const totalCards = document.querySelectorAll(".photo-card").length;
    const discovered = discoveredCards.size;

    const progress = document.getElementById("progress");
    const finalButton = document.getElementById("finalBtn");

    if (progress) {
        progress.textContent =
            `${discovered} of ${totalCards} surprises discovered`;
    }

    if (finalButton) {
        finalButton.style.display =
            discovered === totalCards && totalCards > 0
                ? "inline-block"
                : "none";
    }
}

function goFinal() {
    const totalCards = document.querySelectorAll(".photo-card").length;

    if (discoveredCards.size === totalCards && totalCards > 0) {
        window.location.href = "page3.html";
    }
}
// Birthday Surprise — Music System 🎵

const MUSIC_FILE = "alfaaz.mp3";
const MUSIC_START_TIME = 72;

function startBirthdayMusic() {
    const audio = new Audio(MUSIC_FILE);
    audio.loop = false;

    const savedTime = sessionStorage.getItem("birthdayMusicTime");
    const musicStarted = sessionStorage.getItem("birthdayMusicStarted");

    audio.addEventListener("loadedmetadata", () => {
        if (savedTime !== null && musicStarted === "yes") {
            audio.currentTime = Number(savedTime);
        } else {
            audio.currentTime = MUSIC_START_TIME;
            sessionStorage.setItem("birthdayMusicStarted", "yes");
        }

        audio.play().catch(error => {
            console.log("Music playback needs another user interaction.", error);
        });
    });

    const saveTime = () => {
        if (!audio.paused) {
            sessionStorage.setItem(
                "birthdayMusicTime",
                String(audio.currentTime)
            );
        }
    };

    audio.addEventListener("timeupdate", saveTime);
    window.addEventListener("pagehide", saveTime);

    window.birthdayAudio = audio;
}
