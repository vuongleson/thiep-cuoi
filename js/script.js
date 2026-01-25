document.addEventListener("DOMContentLoaded", () => {
  /* ================= INTRO + MUSIC ================= */
  const intro = document.getElementById("intro");
  const openInvitation = document.getElementById("openInvitation");
  const music = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");

  let started = false;

  if (intro && openInvitation) {
    // khóa scroll khi intro còn
    document.body.style.overflow = "hidden";

    openInvitation.addEventListener("click", () => {
      // ẩn intro
      intro.classList.add("hide");

      // phát nhạc (được phép vì có click)
      if (music) {
        music
          .play()
          .then(() => {
            started = true;
            if (musicToggle) musicToggle.textContent = "🔊";
          })
          .catch(() => {});
      }

      // remove intro khỏi DOM
      setTimeout(() => {
        intro.remove();
        document.body.style.overflow = "";
      }, 600);
    });
  }

  /* ================= MUSIC TOGGLE ================= */
  if (musicToggle && music) {
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
  }

  /* ================= RSVP MODAL ================= */
  const openRSVP = document.getElementById("openRSVP");
  const closeRSVP = document.getElementById("closeRSVP");
  const rsvpModal = document.getElementById("rsvpModal");

  openRSVP?.addEventListener("click", () => {
    rsvpModal?.classList.add("show");
    document.body.style.overflow = "hidden";
  });

  closeRSVP?.addEventListener("click", () => {
    rsvpModal?.classList.remove("show");
    document.body.style.overflow = "";
  });

  rsvpModal?.addEventListener("click", (e) => {
    if (e.target === rsvpModal) {
      rsvpModal.classList.remove("show");
      document.body.style.overflow = "";
    }
  });

  /* ================= GUESTBOOK ================= */
  const openWish = document.getElementById("openWish");
  const closeWish = document.getElementById("closeWish");
  const wishModal = document.getElementById("wishModal");
  const sendWish = document.getElementById("sendWish");
  const wishName = document.getElementById("wishName");
  const wishMessage = document.getElementById("wishMessage");
  const guestbookList = document.getElementById("guestbookList");

  openWish?.addEventListener("click", () => {
    wishModal?.classList.add("show");
    document.body.style.overflow = "hidden";
  });

  closeWish?.addEventListener("click", () => {
    wishModal?.classList.remove("show");
    document.body.style.overflow = "";
  });

  wishModal?.addEventListener("click", (e) => {
    if (e.target === wishModal) {
      wishModal.classList.remove("show");
      document.body.style.overflow = "";
    }
  });

  sendWish?.addEventListener("click", () => {
    const name = wishName?.value.trim();
    const msg = wishMessage?.value.trim();
    if (!name || !msg) return;

    const empty = guestbookList?.querySelector(".guestbook-empty");
    empty?.remove();

    const item = document.createElement("div");
    item.innerHTML = `<strong>${name}</strong><p>${msg}</p>`;
    item.style.marginBottom = "12px";

    guestbookList?.prepend(item);

    wishName.value = "";
    wishMessage.value = "";
    wishModal.classList.remove("show");
    document.body.style.overflow = "";
  });
});
