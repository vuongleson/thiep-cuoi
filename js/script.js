const intro = document.getElementById("intro");
const openBtn = document.getElementById("openInvitation");
const music = document.getElementById("bgMusic");

openBtn.addEventListener("click", () => {
  // Kích hoạt animation phong bì mở
  intro.classList.add("open");

  // Phát nhạc (được phép vì có click)
  if (music) {
    music.play().catch(() => {});
  }

  // Xóa intro sau khi animation xong
  setTimeout(() => {
    intro.remove();
  }, 1600);
});


let started = false;

/* LUÔN HIỆN INTRO – KHÔNG NHỚ TRẠNG THÁI */
intro.style.display = "flex";

/* BẤM NÚT MỚI VÀO THIỆP */
enterBtn.addEventListener("click", () => {
  // Cuộn về đầu cho chắc
  window.scrollTo({ top: 0, behavior: "instant" });

  // Play nhạc (đúng luật iOS)
  music
    .play()
    .then(() => {
      started = true;
      musicToggle.textContent = "🔊";
    })
    .catch(() => {});

  // Ẩn intro
  intro.classList.add("hide");
  setTimeout(() => {
    intro.style.display = "none";
  }, 600);
});

/* TOGGLE NHẠC */
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

