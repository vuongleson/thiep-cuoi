document.addEventListener("DOMContentLoaded",function(){

/* INTRO */
const intro=document.getElementById("intro");
const openInvitation=document.getElementById("openInvitation");
const music=document.getElementById("bgMusic");

if(intro&&openInvitation){
document.body.style.overflow="hidden";
openInvitation.addEventListener("click",function(){
intro.classList.add("hide");
music&&music.play().catch(()=>{});
setTimeout(()=>{intro.remove();document.body.style.overflow="";},600);
});
}

/* COUNTDOWN */
const countdown=document.getElementById("countdown");
if(countdown){
const target=new Date("2026-03-14T17:00:00").getTime();
setInterval(function(){
const now=new Date().getTime();
const d=target-now;
if(d>0){
const days=Math.floor(d/86400000);
countdown.innerText="⏳ Còn "+days+" ngày đến lễ thành hôn";
}else{
countdown.innerText="💍 Hôm nay là ngày cưới!";
}
},1000);
}

/* RSVP */
const openRSVP=document.getElementById("openRSVP");
const closeRSVP=document.getElementById("closeRSVP");
const rsvpModal=document.getElementById("rsvpModal");
const guestStep=document.getElementById("guestStep");
const submitRSVP=document.getElementById("submitRSVP");
let attend="";

openRSVP&&openRSVP.addEventListener("click",()=>{rsvpModal.classList.add("show");});
closeRSVP&&closeRSVP.addEventListener("click",()=>{rsvpModal.classList.remove("show");});

document.querySelectorAll(".rsvp-option").forEach(btn=>{
btn.addEventListener("click",()=>{
document.querySelectorAll(".rsvp-option").forEach(b=>b.classList.remove("active"));
btn.classList.add("active");
attend=btn.dataset.value;
if(attend==="Có"){guestStep.classList.remove("hidden");}
else{guestStep.classList.add("hidden");}
});
});

submitRSVP&&submitRSVP.addEventListener("click",()=>{
if(!attend){alert("Vui lòng chọn trạng thái");return;}
alert("Cảm ơn bạn đã xác nhận 💕");
rsvpModal.classList.remove("show");
});

/* WISH */
const openWish=document.getElementById("openWish");
const closeWish=document.getElementById("closeWish");
const wishModal=document.getElementById("wishModal");
const submitWish=document.getElementById("submitWish");
const guestbookList=document.getElementById("guestbookList");

openWish&&openWish.addEventListener("click",()=>wishModal.classList.add("show"));
closeWish&&closeWish.addEventListener("click",()=>wishModal.classList.remove("show"));

submitWish&&submitWish.addEventListener("click",()=>{
const name=document.getElementById("wishName").value.trim();
const msg=document.getElementById("wishMessage").value.trim();
if(!name||!msg){alert("Vui lòng nhập đầy đủ");return;}
const div=document.createElement("div");
div.innerHTML="<strong>"+name+"</strong><p>"+msg+"</p>";
guestbookList.prepend(div);
wishModal.classList.remove("show");
});

});
