// MUSIC
const music = document.getElementById("bgMusic");
document.body.addEventListener("click", () => music.play(), { once: true });

musicToggle.onclick = () => {
  if (music.paused) {
    music.play();
    musicToggle.textContent = "🔊";
  } else {
    music.pause();
    musicToggle.textContent = "🔇";
  }
};

// RSVP GOOGLE FORM
const FORM_URL = "https://docs.google.com/forms/d/e/FORM_ID/formResponse";

rsvpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const fd = new FormData();
  fd.append("entry.111111111", name.value);
  fd.append("entry.222222222", attend.value);
  fd.append("entry.333333333", side.value);
  fd.append("entry.444444444", guests.value);
  fd.append("entry.555555555", note.value);

  fetch(FORM_URL, {
    method: "POST",
    mode: "no-cors",
    body: fd,
  });

  rsvpMessage.innerText = "Cảm ơn bạn đã xác nhận ❤️";
  rsvpForm.reset();
});
