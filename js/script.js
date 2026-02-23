/* =========================================
   SCRIPT CHUẨN – PREMIUM WEDDING
   Nguyễn Thị Hoài Thương & Vương Lê Sơn
========================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ================= INTRO ================= */
  const intro = document.getElementById("intro");
  const openInvitation = document.getElementById("openInvitation");

  openInvitation?.addEventListener("click", function () {
    intro?.classList.add("hidden");
  });

  /* ================= COUNTDOWN ================= */
  const targetDate = new Date("2026-03-14T17:00:00").getTime();

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (daysEl) {
    setInterval(function () {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        daysEl.innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
        hoursEl.innerText = Math.floor((distance / (1000 * 60 * 60)) % 24);
        minutesEl.innerText = Math.floor((distance / (1000 * 60)) % 60);
        secondsEl.innerText = Math.floor((distance / 1000) % 60);
      }
    }, 1000);
  }

  /* ================= RSVP ================= */

  const RSVP_URL = "https://script.google.com/macros/s/AKfycbyN9aCMI-BPvf7AmdxFvWVHPp_EeuyjgUGFCefZTgjMbSRDFK0YpSnr-vInoyGaDskC/exec";

  const rsvpModal = document.getElementById("rsvpModal");
  const openRSVP = document.getElementById("openRSVP");
  const closeRSVP = document.getElementById("closeRSVP");
  const guestField = document.getElementById("guestField");
  const submitRSVP = document.getElementById("submitRSVP");

  let attend = "";

  openRSVP?.addEventListener("click", () => {
    rsvpModal?.classList.add("show");
  });

  closeRSVP?.addEventListener("click", () => {
    rsvpModal?.classList.remove("show");
  });

  document.querySelectorAll(".rsvp-option").forEach(btn => {
    btn.addEventListener("click", function () {

      document.querySelectorAll(".rsvp-option")
        .forEach(b => b.classList.remove("active"));

      this.classList.add("active");
      attend = this.dataset.value;

      if (attend === "Có") {
        guestField?.classList.remove("hidden");
      } else {
        guestField?.classList.add("hidden");
      }
    });
  });

  submitRSVP?.addEventListener("click", function () {

    const name = document.getElementById("rsvpName").value.trim();
    const guests = document.getElementById("rsvpGuests").value || 1;

    if (!name) {
      alert("Vui lòng nhập tên của bạn.");
      return;
    }

    if (!attend) {
      alert("Vui lòng chọn trạng thái tham dự.");
      return;
    }

    // Gửi dữ liệu lên Google Sheet
    fetch(RSVP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        attend: attend,
        guests: guests
      })
    });

    alert("Cảm ơn bạn đã xác nhận tham dự 💕");

    rsvpModal?.classList.remove("show");
  });

  /* ================= GUESTBOOK ================= */

  const wishModal = document.getElementById("wishModal");
  const openWish = document.getElementById("openWish");
  const closeWish = document.getElementById("closeWish");
  const submitWish = document.getElementById("submitWish");
  const guestbookList = document.getElementById("guestbookList");

  openWish?.addEventListener("click", () => {
    wishModal?.classList.add("show");
  });

  closeWish?.addEventListener("click", () => {
    wishModal?.classList.remove("show");
  });

  submitWish?.addEventListener("click", function () {

    const name = document.getElementById("wishName").value.trim();
    const message = document.getElementById("wishMessage").value.trim();

    if (!name || !message) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    // Hiển thị ngay trên web
    const div = document.createElement("div");
    div.innerHTML = "<strong>" + name + "</strong><p>" + message + "</p>";
    guestbookList?.prepend(div);

    wishModal?.classList.remove("show");
  });

});
