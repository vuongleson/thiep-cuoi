/* =====================================================
   MUSIC TOGGLE (CŨ – GIỮ NGUYÊN FILE HÔM QUA)
   ===================================================== */

const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

let started = false;

musicToggle.addEventListener("click", () => {
  if (!started) {
    music
      .play()
      .then(() => {
        started = true;
        musicToggle.textContent = "🔊";
      })
      .catch((err) => {
        alert("Trình duyệt đang chặn nhạc. Vui lòng thử lại.");
        console.error(err);
      });
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

/* =====================================================
   ADD TODAY – INTRO SCREEN + CONTACT FLOAT LOGIC
   (CHỈ THÊM, KHÔNG ẢNH HƯỞNG CODE CŨ)
   ===================================================== */

const intro = document.getElementById("intro");
const enterBtn = document.getElementById("enterWedding");

const contactWrap = document.getElementById("contactWrap");
const contactMain = document.getElementById("contactMain");

/* Ghi nhớ đã vào web */
const entered = localStorage.getItem("enteredWedding");

/* ⏰ GIỜ KẾT THÚC TIỆC – BẠN CÓ THỂ SỬA */
const weddingEndTime = new Date("2026-02-14T23:00:00").getTime();

let canShowAfterDelay = false;
let hasScrolled = false;

/* ===== LOAD LẠI TRANG ===== */
if (entered === "true") {
  if (intro) intro.style.display = "none";
}

/* ===== CLICK MỞ THIỆP ===== */
enterBtn?.addEventListener("click", () => {
  localStorage.setItem("enteredWedding", "true");

  /* bật nhạc theo luật trình duyệt */
  music?.play().catch(() => {});

  intro?.classList.add("hide");
  setTimeout(() => {
    if (intro) intro.style.display = "none";
  }, 800);
});

/* ===== CONTACT MENU TOGGLE ===== */
contactMain?.addEventListener("click", () => {
  contactWrap.classList.toggle("open");
});

/* ===== SAU 4 GIÂY ===== */
setTimeout(() => {
  canShowAfterDelay = true;
  checkShowContact();
}, 4000);

/* ===== KHI CUỘN ===== */
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    hasScrolled = true;
    checkShowContact();
  }
});

/* ===== ĐIỀU KIỆN HIỆN CONTACT ===== */
function checkShowContact() {
  if (
    entered === "true" &&
    canShowAfterDelay &&
    hasScrolled &&
    Date.now() < weddingEndTime
  ) {
    contactWrap?.classList.add("show");
  }
}
