const state={hunger:72,energy:84,happy:91,clean:76,friend:67,xp:245,level:3,activities:{fed:2,played:1,talked:5,slept:8}};
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
function toast(t){const x=$("#toast");x.textContent=t;x.classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>x.classList.remove("show"),1800)}
function render(){["hunger","energy","happy","clean","friend"].forEach(k=>{let el=$("#"+k),bar=$("#"+k+"Bar");if(el)el.textContent=state[k]+"%";if(bar)bar.style.width=state[k]+"%"});$("#xpBar").style.width=(state.xp/5)+"%";$("#xpMini").style.width=(state.xp/5)+"%";$("#xpText").textContent=`${state.xp} / 500 XP`;$("#xpTextSide").textContent=`${state.xp} / 500 XP`;$("#level").textContent=state.level;$("#levelSide").textContent=state.level}
const replies=[
"Yayyy! I love talking with you! 🐾💙",
"That sounds exciting! Tell me more! ✨",
"Don't forget to take care of yourself too, Sangam! 😊",
"I'll remember that! My memory is getting stronger. 🧠",
"Can we play after this? Pleaseee! 🎮🐺"
];
function send(input,box){let text=input.value.trim();if(!text)return;box.insertAdjacentHTML("beforeend",`<div class="msg user">${escapeHtml(text)}</div>`);input.value="";state.friend=Math.min(100,state.friend+1);state.xp=Math.min(500,state.xp+5);state.activities.talked++;render();setTimeout(()=>{box.insertAdjacentHTML("beforeend",`<div class="msg pet"><span>🐺</span><div>${replies[Math.floor(Math.random()*replies.length)]}</div></div>`);box.scrollTop=box.scrollHeight},450)}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function action(a){let msg="";if(a==="feed"){state.hunger=Math.min(100,state.hunger+20);state.happy=Math.min(100,state.happy+3);state.activities.fed++;msg="Riya enjoyed the food! 🍖"}if(a==="play"){state.energy=Math.max(0,state.energy-8);state.happy=Math.min(100,state.happy+7);state.friend=Math.min(100,state.friend+3);state.activities.played++;msg="Riya had so much fun! 🎮"}if(a==="sleep"){state.energy=Math.min(100,state.energy+25);state.hunger=Math.max(0,state.hunger-5);state.activities.slept+=1;msg="Riya is feeling refreshed! 🌙"}if(a==="pet"){state.happy=Math.min(100,state.happy+5);state.friend=Math.min(100,state.friend+4);msg="Riya is wagging her tail! ❤️"}if(a==="gift"){state.happy=Math.min(100,state.happy+10);state.friend=Math.min(100,state.friend+6);state.xp=Math.min(500,state.xp+20);msg="Riya loved your gift! 🎁"}state.xp=Math.min(500,state.xp+10);if(state.xp>=500){state.level++;state.xp-=500;toast("🎉 Riya leveled up!")}else toast(msg);render()}
$$(".nav").forEach(btn=>btn.onclick=()=>{$$(".nav").forEach(x=>x.classList.remove("active"));btn.classList.add("active");$$(".section").forEach(s=>s.classList.remove("active"));$("#"+btn.dataset.section).classList.add("active");window.scrollTo(0,0)});
$$("[data-action]").forEach(b=>b.onclick=()=>action(b.dataset.action));
$("#chatForm").onsubmit=e=>{e.preventDefault();send($("#chatInput"),$("#messages"))};
$("#chatForm2").onsubmit=e=>{e.preventDefault();send($("#chatInput2"),$("#messages2"))};
$("#mic").onclick=()=>{if("webkitSpeechRecognition" in window){let r=new webkitSpeechRecognition();r.lang="en-IN";r.onresult=e=>{$("#chatInput").value=e.results[0][0].transcript};r.start();toast("🎙 Listening...")}else toast("Voice input is not supported here.")};
$("#voice").onclick=()=>toast("🎙 Voice mode ready");
$("#saveSettings").onclick=()=>{toast("Settings saved successfully! ⚙️")};
render();
