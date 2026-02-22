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

  /* COUNTDOWN - THEO LỄ THÀNH HÔN NHÀ TRAI */

const countdown = document.getElementById("countdown");

if (countdown) {

  // 17:00 ngày 14/03/2026
  const target = new Date("2026-03-14T17:00:00").getTime();

  setInterval(function () {

    const now = new Date().getTime();
    const distance = target - now;

    if (distance > 0) {

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);

      countdown.innerText =
        "⏳ Còn " + days + " ngày " + hours + " giờ " + minutes + " phút";

    } else {
      countdown.innerText = "💍 Hôm nay là ngày cưới!";
    }

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

  /* ================= RSVP ================= */

const openRSVP = document.getElementById("openRSVP");
const closeRSVP = document.getElementById("closeRSVP");
const rsvpModal = document.getElementById("rsvpModal");
const guestStep = document.getElementById("guestStep");
const submitRSVP = document.getElementById("submitRSVP");
const rsvpName = document.getElementById("rsvpName");
const rsvpGuests = document.getElementById("rsvpGuests");

let attend = "";

if (openRSVP && rsvpModal) {
  openRSVP.addEventListener("click", function () {
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

document.querySelectorAll(".rsvp-option").forEach(function (btn) {
  btn.addEventListener("click", function () {

    document.querySelectorAll(".rsvp-option")
      .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    attend = btn.dataset.value;

    if (attend === "Có") {
      guestStep.classList.remove("hidden");
    } else {
      guestStep.classList.add("hidden");
    }
  });
});

if (submitRSVP) {
  submitRSVP.addEventListener("click", function () {

    if (!rsvpName.value.trim()) {
      alert("Vui lòng nhập tên của bạn.");
      return;
    }

    if (!attend) {
      alert("Vui lòng chọn trạng thái tham dự.");
      return;
    }

    let guests = 0;

    if (attend === "Có") {
      guests = parseInt(rsvpGuests.value) || 1;
    }

    console.log({
      name: rsvpName.value,
      attend: attend,
      guests: guests
    });

    alert("Cảm ơn bạn đã xác nhận 💕");

    rsvpModal.classList.remove("show");
    document.body.style.overflow = "";
  });
}
/* ================= GUESTBOOK ================= */

const openWish = document.getElementById("openWish");
const closeWish = document.getElementById("closeWish");
const wishModal = document.getElementById("wishModal");
const submitWish = document.getElementById("submitWish");
const guestbookList = document.getElementById("guestbookList");

if(openWish && wishModal){
  openWish.addEventListener("click", function(){
    wishModal.classList.add("show");
    document.body.style.overflow="hidden";
  });
}

if(closeWish && wishModal){
  closeWish.addEventListener("click", function(){
    wishModal.classList.remove("show");
    document.body.style.overflow="";
  });
}

if(submitWish){
  submitWish.addEventListener("click", function(){

    const name = document.getElementById("wishName").value.trim();
    const message = document.getElementById("wishMessage").value.trim();

    if(!name || !message){
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const empty = guestbookList.querySelector(".guestbook-empty");
    if(empty) empty.remove();

    const div = document.createElement("div");
    div.className="wish-item";
    div.innerHTML = "<strong>"+name+"</strong><p>"+message+"</p>";

    guestbookList.prepend(div);

    wishModal.classList.remove("show");
    document.body.style.overflow="";
  });
}


