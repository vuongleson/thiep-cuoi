document.addEventListener("DOMContentLoaded",function(){

/* INTRO */
const intro=document.getElementById("intro");
const openBtn=document.getElementById("openInvitation");
if(intro&&openBtn){
openBtn.addEventListener("click",function(){
intro.classList.add("hidden");
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
countdown.innerText="Còn "+days+" ngày đến lễ thành hôn";
}
},1000);
}

/* RSVP */
const openRSVP=document.getElementById("openRSVP");
const closeRSVP=document.getElementById("closeRSVP");
const modal=document.getElementById("rsvpModal");
const guestField=document.getElementById("guestField");
let attend="";

openRSVP&&openRSVP.addEventListener("click",()=>modal.classList.add("show"));
closeRSVP&&closeRSVP.addEventListener("click",()=>modal.classList.remove("show"));

document.querySelectorAll(".rsvp-option").forEach(btn=>{
btn.addEventListener("click",()=>{
document.querySelectorAll(".rsvp-option").forEach(b=>b.classList.remove("active"));
btn.classList.add("active");
attend=btn.dataset.value;
if(attend==="Có"){guestField.classList.remove("hidden");}
else{guestField.classList.add("hidden");}
});
});

document.getElementById("submitRSVP")?.addEventListener("click",()=>{
if(!attend){alert("Vui lòng chọn trạng thái");return;}
alert("Cảm ơn bạn đã xác nhận!");
modal.classList.remove("show");
});

/* WISH */
const openWish=document.getElementById("openWish");
const closeWish=document.getElementById("closeWish");
const wishModal=document.getElementById("wishModal");
const submitWish=document.getElementById("submitWish");
const guestbook=document.getElementById("guestbookList");

openWish&&openWish.addEventListener("click",()=>wishModal.classList.add("show"));
closeWish&&closeWish.addEventListener("click",()=>wishModal.classList.remove("show"));

submitWish&&submitWish.addEventListener("click",()=>{
const name=document.getElementById("wishName").value.trim();
const msg=document.getElementById("wishMessage").value.trim();
if(!name||!msg){alert("Vui lòng nhập đầy đủ");return;}
const div=document.createElement("div");
div.innerHTML="<strong>"+name+"</strong><p>"+msg+"</p>";
guestbook.prepend(div);
wishModal.classList.remove("show");
});

});
