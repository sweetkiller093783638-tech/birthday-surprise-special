// ===== MUSIC SETUP =====
const music = document.getElementById("bg-music");
const btn = document.getElementById("startBtn");

let savedTime = localStorage.getItem("musicTime");

if (music) {
  if (savedTime) {
    music.currentTime = parseFloat(savedTime);
  } else {
    music.currentTime = 55;
  }

  music.volume = 0.7;

  music.play().catch(() => {
    // autoplay block ho sakta hai, ignore
  });

  setInterval(() => {
    localStorage.setItem("musicTime", music.currentTime);
  }, 500);
}

if (btn && music) {
  btn.addEventListener("click", () => {
    music.play();
    setTimeout(() => {
      window.location.href = "page2.html";
    }, 800);
  });
}

// ===== CARD FLIP LOGIC =====
let flippedCount = 0;

function flipCard(card) {
  if (!card.classList.contains("flipped")) {
    card.classList.add("flipped");
    flippedCount++;

    if (flippedCount === 3) {
      const finalBtn = document.getElementById("finalBtn");
      if (finalBtn) {
        finalBtn.style.display = "inline-block";
      }
    }
  }
}

function goFinal() {
  window.location.href = "page3.html";
}

// ===== BALLOONS =====
const balloonContainer = document.querySelector(".balloons");

if (balloonContainer) {
  for (let i = 0; i < 20; i++) {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.style.left = Math.random() * 100 + "vw";
    balloon.style.animationDuration = 8 + Math.random() * 5 + "s";
    balloon.style.animationDelay = Math.random() * 5 + "s";
    balloonContainer.appendChild(balloon);
  }
}
