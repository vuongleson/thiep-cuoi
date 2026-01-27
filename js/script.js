const GOOGLE_API_URL = "PASTE_URL_GOOGLE_APPS_SCRIPT";

document.addEventListener("DOMContentLoaded", () => {
  /* INTRO + MUSIC */
  const intro = document.getElementById("intro");
  const openInvitation = document.getElementById("openInvitation");
  const music = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");
  let started = false;

  if (intro && openInvitation) {
    document.body.style.overflow = "hidden";
    openInvitation.onclick = () => {
      intro.classList.add("hide");
      music?.play().catch(() => {});
      setTimeout(() => {
        intro.remove();
        document.body.style.overflow = "";
      }, 600);
    };
  }

  musicToggle.onclick = () => {
    if (music.paused) music.play();
    else music.pause();
  };

  /* COUNTDOWN */
  const target = new Date("2026-02-14T10:00:00").getTime();
  setInterval(() => {
    const d = target - new Date().getTime();
    if (d <= 0) return;
    document.getElementById("countdown").innerText =
      `⏳ ${Math.floor(d / 86400000)} ngày`;
  }, 1000);

  /* RSVP */
 /* ================= RSVP CHAT LOGIC ================= */
let attendValue = "";

document.querySelectorAll(".rsvp-option").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".rsvp-option").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    attendValue = btn.dataset.value;

    // Hiện số người nếu "Có"
    const guestStep = document.getElementById("guestStep");
    if (attendValue === "Có") {
      guestStep.classList.remove("hidden");
    } else {
      guestStep.classList.add("hidden");
    }
  });
});

document.getElementById("submitRSVP")?.addEventListener("click", () => {
  const name = document.getElementById("rsvpName").value.trim();
  const guests = document.getElementById("rsvpGuests")?.value || 0;

  if (!name || !attendValue) {
    alert("Vui lòng nhập tên và chọn trạng thái tham dự.");
    return;
  }

  // Gửi Google Sheet
  fetch(GOOGLE_API_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "RSVP",
      name,
      attend: attendValue,
      guests,
      ua: navigator.userAgent
    })
  });

  alert("Cảm ơn bạn đã xác nhận 💕");

  document.getElementById("rsvpModal").classList.remove("show");
  document.body.style.overflow = "";
});


  /* GUESTBOOK */
  openWish.onclick = () => wishModal.classList.add("show");
  closeWish.onclick = () => wishModal.classList.remove("show");

  sendWish.onclick = () => {
    fetch(GOOGLE_API_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        type: "WISH",
        name: wishName.value,
        message: wishMessage.value,
      }),
    });
    wishModal.classList.remove("show");
  };
});

