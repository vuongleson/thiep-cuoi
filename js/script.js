const intro = document.getElementById("intro");
const enterBtn = document.getElementById("enterWedding");
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

let started = false;

/* LUÔN HIỆN INTRO – KHÔNG NHỚ TRẠNG THÁI */
intro.style.display = "flex";

/* BẤM NÚT MỚI VÀO THIỆP */
enterBtn.addEventListener("click", () => {
  // Cuộn về đầu cho chắc
  window.scrollTo({ top: 0, behavior: "instant" });

  // Play nhạc (đúng luật iOS)
  music
    .play()
    .then(() => {
      started = true;
      musicToggle.textContent = "🔊";
    })
    .catch(() => {});

  // Ẩn intro
  intro.classList.add("hide");
  setTimeout(() => {
    intro.style.display = "none";
  }, 600);
});

/* TOGGLE NHẠC */
musicToggle.addEventListener("click", () => {
  if (!started) {
    music
      .play()
      .then(() => {
        started = true;
        musicToggle.textContent = "🔊";
      })
      .catch(() => {});
  } else {
    if (music.paused) {
      music.play();
      musicToggle.textContent = "🔊";
    } else {
      music.pause();
      musicToggle.textContent = "🔇";
    }
  }
});
// RSVP MODAL
const openRSVP = document.getElementById("openRSVP");
const closeRSVP = document.getElementById("closeRSVP");
const rsvpModal = document.getElementById("rsvpModal");

if (openRSVP && closeRSVP && rsvpModal) {
  openRSVP.addEventListener("click", () => {
    rsvpModal.classList.add("show");
    document.body.style.overflow = "hidden";
  });

  closeRSVP.addEventListener("click", () => {
    rsvpModal.classList.remove("show");
    document.body.style.overflow = "";
  });

  // click ra ngoài để đóng
  rsvpModal.addEventListener("click", (e) => {
    if (e.target === rsvpModal) {
      rsvpModal.classList.remove("show");
      document.body.style.overflow = "";
    }
  });
}
