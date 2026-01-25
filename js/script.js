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
    music
      .play()
      .then(() => {
        started = true;
        musicToggle.textContent = "🔊";
      })
      .catch(() => {});
  }

  setTimeout(() => {
    intro.remove();
    document.body.style.overflow = "";
  }, 600);
});

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
// GUESTBOOK – LỜI CHÚC
const openWish = document.getElementById("openWish");
const closeWish = document.getElementById("closeWish");
const wishModal = document.getElementById("wishModal");
const wishForm = document.getElementById("wishForm");
const guestbookList = document.getElementById("guestbookList");

if (openWish && closeWish && wishModal) {
  openWish.addEventListener("click", () => {
    wishModal.classList.add("show");
    document.body.style.overflow = "hidden";
  });

  closeWish.addEventListener("click", () => {
    wishModal.classList.remove("show");
    document.body.style.overflow = "";
  });

  wishModal.addEventListener("click", (e) => {
    if (e.target === wishModal) {
      wishModal.classList.remove("show");
      document.body.style.overflow = "";
    }
  });
}

// Xử lý submit lời chúc
if (wishForm) {
  wishForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("wishName").value.trim();
    const message = document.getElementById("wishMessage").value.trim();

    if (!name || !message) return;

    // Xóa text "chưa có lời chúc"
    const empty = guestbookList.querySelector(".guestbook-empty");
    if (empty) empty.remove();

    // Tạo lời chúc mới
    const item = document.createElement("div");
    item.className = "wish-item";
    item.innerHTML = `<strong>${name}</strong><p>${message}</p>`;

    guestbookList.prepend(item);

    // Reset & đóng modal
    wishForm.reset();
    wishModal.classList.remove("show");
    document.body.style.overflow = "";
  });
}
