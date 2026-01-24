const intro = document.getElementById("intro");
const openBtn = document.getElementById("openInvitation");
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

let started = false;

// khóa scroll khi còn intro
document.body.style.overflow = "hidden";

openBtn.addEventListener("click", () => {
  intro.classList.add("hide");

  // phát nhạc (được phép vì có click)
  if (music) {
    music.play().then(() => {
      started = true;
      musicToggle.textContent = "🔊";
    }).catch(() => {});
  }

  // mở khóa trang & remove intro
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
