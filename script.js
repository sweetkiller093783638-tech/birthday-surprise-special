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
