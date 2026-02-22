document.addEventListener("DOMContentLoaded", function () {

  /* =====================================================
     INTRO + MUSIC
  ===================================================== */

  const intro = document.getElementById("intro");
  const openInvitation = document.getElementById("openInvitation");
  const music = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");

  let musicStarted = false;

  if (intro && openInvitation) {
    document.body.style.overflow = "hidden";

    openInvitation.addEventListener("click", function () {
      intro.classList.add("hide");

      if (music) {
        music.play().then(function () {
          musicStarted = true;
          if (musicToggle) musicToggle.textContent = "🔊";
        }).catch(function () {});
      }

      setTimeout(function () {
        intro.remove();
        document.body.style.overflow = "";
      }, 600);
    });
  }

  if (musicToggle && music) {
    musicToggle.addEventListener("click", function () {
      if (!musicStarted) {
        music.play().then(function () {
          musicStarted = true;
          musicToggle.textContent = "🔊";
        }).catch(function () {});
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

  /* =====================================================
     COUNTDOWN
  ===================================================== */

  const countdownEl = document.getElementById("countdown");
  if (countdownEl) {
    const weddingDate = new Date("2026-02-14T10:00:00").getTime();

    setInterval(function () {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance <= 0) {
        countdownEl.innerText = "💍 Hôm nay là ngày cưới!";
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);

      countdownEl.innerText =
        "⏳ " + days + " ngày " + hours + " giờ " + minutes + " phút";
    }, 1000);
  }

  /* =====================================================
     RSVP MODAL (FIX LỖI KHÔNG HIỆN)
  ===================================================== */

  const openRSVP = document.getElementById("openRSVP");
  const closeRSVP = document.getElementById("closeRSVP");
  const rsvpModal = document.getElementById("rsvpModal");

  if (openRSVP && rsvpModal) {
    openRSVP.addEventListener("click", function (e) {
      e.preventDefault();
      rsvpModal.classList.add("show");
      document.body.style.overflow = "hidden";
    });
  }

  if (closeRSVP && rsvpModal) {
    closeRSVP.addEventListener("click", function () {
      rsvpModal.classList.remove("show");
      document.body.style.overflow = "";
    });
  }

  if (rsvpModal) {
    rsvpModal.addEventListener("click", function (e) {
      if (e.target === rsvpModal) {
        rsvpModal.classList.remove("show");
        document.body.style.overflow = "";
      }
    });
  }

  /* =====================================================
     RSVP CHAT LOGIC
  ===================================================== */

  const guestStep = document.getElementById("guestStep");
  const rsvpName = document.getElementById("rsvpName");
  const rsvpGuests = document.getElementById("rsvpGuests");
  const submitRSVP = document.getElementById("submitRSVP");

  let attendValue = "";

  const optionButtons = document.querySelectorAll(".rsvp-option");

  optionButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {

      optionButtons.forEach(function (b) {
        b.classList.remove("active");
      });

      btn.classList.add("active");
      attendValue = btn.getAttribute("data-value");

      if (guestStep) {
        if (attendValue === "Có") {
          guestStep.classList.remove("hidden");
        } else {
          guestStep.classList.add("hidden");
        }
      }
    });
  });

  if (submitRSVP) {
    submitRSVP.addEventListener("click", function () {

      if (!rsvpName || !rsvpName.value.trim() || !attendValue) {
        alert("Vui lòng nhập tên và chọn trạng thái tham dự.");
        return;
      }

      alert("Cảm ơn bạn đã xác nhận 💕");

      if (rsvpModal) {
        rsvpModal.classList.remove("show");
      }

      document.body.style.overflow = "";
    });
  }

});
