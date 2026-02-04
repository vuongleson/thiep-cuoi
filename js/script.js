const GOOGLE_API_URL = "PASTE_URL_GOOGLE_APPS_SCRIPT";

document.addEventListener("DOMContentLoaded", () => {
  /* INTRO + MUSIC */
  const intro = document.getElementById("intro");
  const openInvitation = document.getElementById("openInvitation");
  const music = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");

  const openRSVP = document.getElementById("openRSVP");
  const rsvpModal = document.getElementById("rsvpModal");
  const closeRSVP = document.getElementById("closeRSVP");

  const openWish = document.getElementById("openWish");
  const wishModal = document.getElementById("wishModal");
  const closeWish = document.getElementById("closeWish");
  const sendWish = document.getElementById("sendWish");
  const wishName = document.getElementById("wishName");
  const wishMessage = document.getElementById("wishMessage");

  const updateMusicToggle = () => {
    if (!musicToggle) return;
    musicToggle.textContent = music?.paused ? "🔈" : "🔊";
  };

  if (intro && openInvitation) {
    document.body.style.overflow = "hidden";
    openInvitation.onclick = () => {
      intro.classList.add("hide");
      music?.play().catch(() => {});
      updateMusicToggle();
      setTimeout(() => {
        intro.remove();
        document.body.style.overflow = "";
      }, 600);
    };
  }

  musicToggle?.addEventListener("click", () => {
    if (!music) return;
    if (music.paused) music.play();
    else music.pause();
    updateMusicToggle();
  });

  updateMusicToggle();

  /* COUNTDOWN */
  const countdown = document.getElementById("countdown");
  const target = new Date("2026-02-14T10:00:00").getTime();
  setInterval(() => {
    if (!countdown) return;
    const d = target - new Date().getTime();
    if (d <= 0) {
      countdown.innerText = "⏳ Hôm nay là ngày trọng đại!";
      return;
    }
    countdown.innerText = `⏳ ${Math.floor(d / 86400000)} ngày`;
  }, 1000);

  /* RSVP */
  let attendValue = "";

  document.querySelectorAll(".rsvp-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".rsvp-option")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      attendValue = btn.dataset.value;

      const guestStep = document.getElementById("guestStep");
      if (!guestStep) return;
      if (attendValue === "Có") {
        guestStep.classList.remove("hidden");
      } else {
        guestStep.classList.add("hidden");
      }
    });
  });

  openRSVP?.addEventListener("click", () => {
    rsvpModal?.classList.add("show");
    document.body.style.overflow = "hidden";
  });

  const closeRsvpModal = () => {
    rsvpModal?.classList.remove("show");
    document.body.style.overflow = "";
  };

  closeRSVP?.addEventListener("click", closeRsvpModal);
  rsvpModal?.addEventListener("click", (event) => {
    if (event.target === rsvpModal) closeRsvpModal();
  });

  document.getElementById("submitRSVP")?.addEventListener("click", () => {
    const name = document.getElementById("rsvpName")?.value.trim();
    const guestsValue = document.getElementById("rsvpGuests")?.value;
    const guests = guestsValue ? Number(guestsValue) : 0;

    if (!name || !attendValue) {
      alert("Vui lòng nhập tên và chọn trạng thái tham dự.");
      return;
    }

    if (attendValue === "Có" && (!guests || guests < 1)) {
      alert("Vui lòng nhập số lượng người tham dự.");
      return;
    }

    fetch(GOOGLE_API_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "RSVP",
        name,
        attend: attendValue,
        guests,
        ua: navigator.userAgent,
      }),
    });

    alert("Cảm ơn bạn đã xác nhận 💕");
    closeRsvpModal();
  });

  /* GUESTBOOK */
  openWish?.addEventListener("click", () => {
    wishModal?.classList.add("show");
    document.body.style.overflow = "hidden";
  });

  const closeWishModal = () => {
    wishModal?.classList.remove("show");
    document.body.style.overflow = "";
  };

  closeWish?.addEventListener("click", closeWishModal);
  wishModal?.addEventListener("click", (event) => {
    if (event.target === wishModal) closeWishModal();
  });

  sendWish?.addEventListener("click", () => {
    const name = wishName?.value.trim();
    const message = wishMessage?.value.trim();

    if (!name || !message) {
      alert("Vui lòng nhập tên và lời chúc.");
      return;
    }

    fetch(GOOGLE_API_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        type: "WISH",
        name,
        message,
      }),
    });
    closeWishModal();
  });
});

