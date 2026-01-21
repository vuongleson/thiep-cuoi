const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

let musicStarted = false;

// CLICK NÚT 🔊 LÀ BẬT NHẠC (100% ĐƯỢC PHÉP)
musicToggle.addEventListener("click", (e) => {
  e.stopPropagation();

  if (!musicStarted) {
    music
      .play()
      .then(() => {
        musicStarted = true;
        musicToggle.textContent = "🔊";
      })
      .catch((err) => {
        console.log("Audio blocked:", err);
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
