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
  openRSVP.onclick = () => rsvpModal.classList.add("show");
  closeRSVP.onclick = () => rsvpModal.classList.remove("show");

  rsvpForm.onsubmit = (e) => {
    e.preventDefault();
    fetch(GOOGLE_API_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        type: "RSVP",
        name: rsvpName.value,
        attend: document.querySelector("input[name=attend]:checked").value,
        guests: rsvpGuests.value || 0,
      }),
    });
    alert("Cảm ơn bạn đã xác nhận 💕");
    rsvpModal.classList.remove("show");
  };

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
