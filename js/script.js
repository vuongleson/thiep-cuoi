document.addEventListener("DOMContentLoaded",function(){

/* INTRO */
const intro=document.getElementById("intro");
const openBtn=document.getElementById("openInvitation");
openBtn?.addEventListener("click",()=>intro.classList.add("hidden"));

/* COUNTDOWN */
const target=new Date("2026-03-14T17:00:00").getTime();
const ids=["days","hours","minutes","seconds"];
if(document.getElementById("days")){
setInterval(()=>{
const now=new Date().getTime();
const d=target-now;
if(d>0){
document.getElementById("days").innerText=Math.floor(d/86400000);
document.getElementById("hours").innerText=Math.floor((d/(1000*60*60))%24);
document.getElementById("minutes").innerText=Math.floor((d/(1000*60))%60);
document.getElementById("seconds").innerText=Math.floor((d/1000)%60);
}
},1000);
}

/* RSVP */
const modal=document.getElementById("rsvpModal");
document.getElementById("openRSVP")?.addEventListener("click",()=>modal.classList.add("show"));
document.getElementById("closeRSVP")?.addEventListener("click",()=>modal.classList.remove("show"));

let attend="";
document.querySelectorAll(".rsvp-option").forEach(btn=>{
btn.addEventListener("click",()=>{
document.querySelectorAll(".rsvp-option").forEach(b=>b.classList.remove("active"));
btn.classList.add("active");
attend=btn.dataset.value;
document.getElementById("guestField").classList.toggle("hidden",attend!=="Có");
});
});

document.getElementById("submitRSVP")?.addEventListener("click",()=>{
if(!attend){alert("Vui lòng chọn trạng thái");return;}
alert("Cảm ơn bạn đã xác nhận!");
modal.classList.remove("show");
});

/* WISH */
const wishModal=document.getElementById("wishModal");
document.getElementById("openWish")?.addEventListener("click",()=>wishModal.classList.add("show"));
document.getElementById("closeWish")?.addEventListener("click",()=>wishModal.classList.remove("show"));

document.getElementById("submitWish")?.addEventListener("click",()=>{
const name=document.getElementById("wishName").value.trim();
const msg=document.getElementById("wishMessage").value.trim();
if(!name||!msg){alert("Vui lòng nhập đầy đủ");return;}
const div=document.createElement("div");
div.innerHTML="<strong>"+name+"</strong><p>"+msg+"</p>";
document.getElementById("guestbookList").prepend(div);
wishModal.classList.remove("show");
});

});
