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
