const intro = document.getElementById("intro");
const openBtn = document.getElementById("openInvitation");
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

let started = false;

// khóa scroll khi còn intro
document.body.style.overflow = "hidden";

openBtn.addEventListener("click", () => {
  intro.classList.add("hide");

  if (music) {
    music.play().then(() => {
      started = true;
      musicToggle.textContent = "🔊";
    }).catch(() => {});
  }

  setTimeout(() => {
    intro.remove();
    document.body.style.overflow = "";
  }, 600);
});

musicToggle.addEventListener("click", () => {
  if (!started) {
    music.play().then(() => {
      started = true;
      musicToggle.textContent = "🔊";
    }).catch(() => {});
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
