const intro = document.getElementById("intro");
const enterBtn = document.getElementById("enterWedding");
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const contactWrap = document.getElementById("contactWrap");
const contactMain = document.getElementById("contactMain");

let started = false;

if (localStorage.getItem("enteredWedding") === "true") {
  intro.style.display = "none";
}

enterBtn.addEventListener("click", () => {
  window.scrollTo(0,0);
  localStorage.setItem("enteredWedding","true");

  music.play().then(()=>{
    started = true;
    musicToggle.textContent="🔊";
  }).catch(()=>{});

  intro.classList.add("hide");
  setTimeout(()=>intro.style.display="none",600);
});

musicToggle.addEventListener("click",()=>{
  if(!started){
    music.play().then(()=>started=true);
  }else{
    music.paused ? music.play() : music.pause();
  }
});

contactMain.addEventListener("click",()=>{
  contactWrap.classList.toggle("open");
});
