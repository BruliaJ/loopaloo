/* ===================== WORLD BACKDROP ===================== */
const BD={
 lagoon:{bg:"linear-gradient(180deg,#C9F3F1 0%,#9DE3DA 55%,#5FC3B4 100%)",hill:["#7FD4C6","#4FB3A3"],parts:i=>`<div class="amb rise bub" style="left:${(i*37)%100}vw;width:${14+(i*7)%26}px;height:${14+(i*7)%26}px;animation-duration:${9+(i*3)%9}s;animation-delay:-${(i*1.7)%12}s"></div>`},
 lane:{bg:"linear-gradient(180deg,#CFEAFF 0%,#E9F7FF 45%,#DDF3C8 100%)",hill:["#B6E38E","#86C766"],parts:i=>i%2?`<div class="amb drift" style="top:${6+(i*11)%30}vh;font-size:${50+(i*9)%40}px;opacity:.85;animation-duration:${30+(i*7)%25}s;animation-delay:-${(i*5)%30}s">☁️</div>`:`<div class="amb fly" style="left:${(i*29)%95}vw;top:${30+(i*13)%40}vh;font-size:26px;animation-duration:${5+(i%4)}s">🦋</div>`},
 castle:{bg:"linear-gradient(180deg,#2A1E5C 0%,#5B3FA8 50%,#B79CFF 100%)",hill:["#4A3590","#2F2266"],parts:i=>`<div class="amb tw" style="left:${(i*41)%100}vw;top:${(i*23)%60}vh;font-size:${10+(i*5)%14}px;color:#FFF6B0;animation-delay:-${(i*.7)%2}s">✦</div>`},
 swamp:{bg:"linear-gradient(180deg,#24453F 0%,#3F6E55 50%,#8DB876 100%)",hill:["#4C7A45","#2F5A33"],parts:i=>`<div class="amb fly" style="left:${(i*31)%95}vw;top:${25+(i*17)%55}vh;animation-duration:${4+(i%5)}s;animation-delay:-${i%4}s"><div class="amb tw ff" style="position:static;width:8px;height:8px;animation-delay:-${(i*.5)%2}s"></div></div>`}};
let bdNow="";
function renderBackdrop(id){if(bdNow===id)return;bdNow=id;const b=BD[id];const el=$("#backdrop");el.style.background=b.bg;
  el.innerHTML=Array.from({length:16},(_,i)=>b.parts(i)).join("")+`<svg class="bd-hills" viewBox="0 0 1200 300" preserveAspectRatio="none"><path d="M0 150 Q 200 60 420 140 T 820 120 T 1200 110 V300 H0Z" fill="${b.hill[0]}"/><path d="M0 220 Q 260 150 520 210 T 1000 190 T 1200 200 V300 H0Z" fill="${b.hill[1]}"/></svg>`;
  document.body.style.background=b.bg}

/* ===================== SILLY MINI-GAMES ===================== */
const GAMES={
 lagoon:{name:"Bubble Pop",ic:"🫧",cls:"bubbleI",bg:"linear-gradient(180deg,#B8F0F2,#4CB9B0)",how:"Pop every bubble that has the cursive letter on it!"},
 lane:{name:"Word Traffic",ic:"🚗",cls:"carI",bg:"linear-gradient(180deg,#BDE7A4 0 12%,#6B6F7A 12% 88%,#BDE7A4 88%)",how:"Tap the car carrying the word for the picture. Beep beep!"},
 castle:{name:"Dragon Snacks",ic:"🐉",cls:"cookieI",bg:"linear-gradient(180deg,#2A1E5C,#8E6CD8)",how:"The dragon is hungry! Tap the cookie with the right capital."},
 swamp:{name:"Firefly Catch",ic:"✨",cls:"flyI",bg:"linear-gradient(180deg,#14302B,#3F6E55)",how:"Catch the firefly glowing with the word!"}};
const POWERS={
 shell:{classic:["Snail sense","The right one wiggles every few seconds."],strawberry:["Berry blast","Catch 3 in a row and every right one on screen pops!"],ocean:["Bubble shield","Your first 3 wrong taps don't cost a point."],
  donut:["Sugar rush","Every 10 points adds 5 seconds."],watermelon:["Juicy combo","5 in a row earns 2 bonus points."],galaxy:["Star freeze","Every 12 seconds, everything freezes for 3 seconds."],
  rainbow:["Rainbow luck","More of the right ones show up."],gold:["Golden touch","Gold bonus items, plus 10 extra coins at the end."]},
 hat:{none:["No hat yet","Buy a hat in Skins for another power!"],crown:["Royal riches","Every point earns double coins."],wizard:["Slow-mo spell","Everything moves in slow motion."],
  cowboy:["Giant lasso","Everything is bigger and easier to grab. Yee-haw!"],party:["Party mode","Confetti on every catch, plus 5 bonus seconds."],bow:["Bow-nus time","10 extra seconds on the clock."],flower:["Lucky daisy","Golden bonus things pop up worth 3 points."]},
 pen:{berry:["Blue splash","Every 3 in a row adds 1 second."],grape:["Sticky jelly","Things move a little slower."],bubble:["Gum bubble","4 in a row earns a bonus point."],
  neon:["Glow-up","The right ones glow so they're easier to spot."],lava:["Hot streak","Every 5th catch is worth 3 points."],rainbow:["Double rainbow","After 5 in a row, every catch counts double."],glitter:["Glitter coins","Every catch drops an extra coin."]},
 paper:{notebook:["Doodle margin","3 extra seconds."],candy:["Sugar sprinkles","Things show up faster, so there's more to catch."],ocean:["Floaty water","Things float a little slower."],
  chalk:["Eraser","Your first 2 wrong taps get erased (no point lost)."],space:["Zero gravity","Every 15 seconds, everything floats still for 3 seconds."]}};
const CAT_IC={shell:"🐚",hat:"🎩",pen:"🖊️",paper:"📄"};
function powerList(){return ["shell","hat","pen","paper"].map(c=>{const it=({shell:SHELLS,hat:HATS,pen:PENS,paper:PAPERS})[c][S.eq[c]];const p=POWERS[c][S.eq[c]];return {c,name:it.n,p}})}
function gameParams(){const e=S.eq,P={slow:1,big:1,time:30,coinMul:1,shield:0,goldEvery:0,goldPts:3,luck:.42,spawnMul:1,hint:0,glow:0,blast:0,rush:0,combo5:0,freezeEvery:0,perCatch:0,bonus:0,streakSec:0,gum:0,lava:0,rdouble:0,party:0};
  ({classic:()=>P.hint=1,strawberry:()=>P.blast=1,ocean:()=>P.shield+=3,donut:()=>P.rush=1,watermelon:()=>P.combo5=1,galaxy:()=>P.freezeEvery=12,rainbow:()=>P.luck=.6,gold:()=>{P.goldEvery=6;P.bonus=10}})[e.shell]?.();
  ({crown:()=>P.coinMul=2,wizard:()=>P.slow*=.6,cowboy:()=>P.big=1.25,party:()=>{P.party=1;P.time+=5},bow:()=>P.time+=10,flower:()=>P.goldEvery=P.goldEvery?4:5})[e.hat]?.();
  ({berry:()=>P.streakSec=1,grape:()=>P.slow*=.85,bubble:()=>P.gum=1,neon:()=>P.glow=1,lava:()=>P.lava=1,rainbow:()=>P.rdouble=1,glitter:()=>P.perCatch=1})[e.pen]?.();
  ({notebook:()=>P.time+=3,candy:()=>P.spawnMul=1.35,ocean:()=>P.slow*=.88,chalk:()=>P.shield+=2,space:()=>P.freezeEvery=P.freezeEvery?10:15})[e.paper]?.();
  return P}
function paperOverlay(){const id=S.eq.paper;let h="";
  if(id==="notebook")h=`<div style="position:absolute;inset:0;background:repeating-linear-gradient(transparent 0 38px,rgba(80,130,220,.22) 38px 40px);pointer-events:none"></div>`;
  if(id==="candy")h=Array.from({length:18},(_,i)=>`<div class="amb gfall" style="left:${(i*37)%100}%;width:12px;height:4px;border-radius:2px;background:${["#FF6FA8","#FFD93D","#3EA6FF","#4CD964","#fff"][i%5]};animation-duration:${4+(i%4)}s;animation-delay:-${i*.4}s"></div>`).join("");
  if(id==="ocean")h=Array.from({length:12},(_,i)=>`<div class="amb grise bub" style="left:${(i*29)%100}%;width:${10+(i*5)%16}px;height:${10+(i*5)%16}px;animation-duration:${5+(i%5)}s;animation-delay:-${i*.6}s"></div>`).join("");
  if(id==="chalk")h=`<div style="position:absolute;inset:0;box-shadow:inset 0 0 0 10px #8A5A2B,inset 0 0 0 14px #5E3A16;pointer-events:none;z-index:3"></div>`+Array.from({length:30},(_,i)=>`<div style="position:absolute;left:${(i*37)%100}%;top:${(i*53)%100}%;width:3px;height:3px;border-radius:50%;background:rgba(255,255,255,.5)"></div>`).join("");
  if(id==="space")h=Array.from({length:26},(_,i)=>`<div class="amb tw" style="left:${(i*41)%100}%;top:${(i*23)%100}%;font-size:${8+(i%3)*4}px;color:#FFF6B0;animation-delay:-${(i*.3)%2}s">✦</div>`).join("")+`<div style="position:absolute;right:14px;top:10px;font-size:40px">🪐</div>`;
  return `<div style="position:absolute;inset:0;pointer-events:none;overflow:hidden">${h}</div>`}
let GM=null;
function stopGame(){if(GM){GM.dead=true;cancelAnimationFrame(GM.raf);clearInterval(GM.tick);GM=null}}
$("#gquit").onclick=()=>{stopGame();show("map")};
function startGame(rid){killPad();stopGame();show("game");renderBackdrop(rid);const gm=GAMES[rid];$("#gtitle").textContent=gm.ic+" "+gm.name;
  $("#gstage").innerHTML=`<div class="card"><div class="mode">Silly game</div><div class="scene" style="background:${gm.bg};font-size:64px">${gm.ic}<span>🐌</span></div>${bubble(gm.how)}
   <div class="power"><span class="dance">${snailSVG()}</span><div style="display:grid;gap:6px;min-width:0"><b>Loopy's skin powers</b>${powerList().map(x=>`<div class="pwrow"><span>${CAT_IC[x.c]}</span><div><strong>${esc(x.p[0])}</strong> <em>(${esc(x.name)})</em><br>${esc(x.p[1])}</div></div>`).join("")}</div></div>
   <p class="hint">Every skin you own changes the game. Swap skins to try new combos! 30 seconds. Right taps score points, wrong taps lose one. Points turn into coins!</p><button class="btn mint big" id="ggo">Go!</button></div>`;
  $("#ggo").onclick=()=>play(rid)}
function gamePool(rid){
  if(rid==="lagoon"){const L=REGIONS[0].lessons.filter((_,i)=>S.done[lkey("lagoon",i)]).flat();return (L.length>=4?L:"aceilmnostu".split("")).map(c=>({id:c,show:c,lab:c,kind:"low"}))}
  if(rid==="castle")return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(c=>({id:c,show:c,lab:c,kind:"cap"}));
  const W=WORDS.flat().concat(EXTRAWORDS);return W.map(([w,e])=>({id:w,show:rid==="lane"?e:w,lab:w,kind:"low"}))}
function play(rid){stopGame();const gm=GAMES[rid],P=gameParams();const slow=P.slow,big=P.big;
  let time=P.time,score=0,streak=0,spawnN=0,catches=0,shield=P.shield,freezeUntil=0,nextRush=10,frozenAcc=0;const pool=gamePool(rid);
  $("#gstage").innerHTML=`<div class="card" style="padding:14px"><div class="game-top"><span class="gpill" id="gtime">⏱ ${time}</span><div class="target" id="gtarget"></div><span class="gpill" id="gscore">⭐ 0</span></div>
    <div class="arena" id="arena" style="background:${gm.bg}">${paperOverlay()}<div class="freeze" id="gfreeze" hidden>❄️ Freeze!</div></div></div>`;
  const A=$("#arena");const AW=()=>A.clientWidth,AH=()=>A.clientHeight;
  if(rid==="castle")A.insertAdjacentHTML("beforeend",`<div class="dragon" id="dragon">🐲</div>`);
  if(rid==="lane")A.insertAdjacentHTML("beforeend",`<svg style="position:absolute;inset:0;width:100%;height:100%" preserveAspectRatio="none" viewBox="0 0 100 100"><path d="M0 37 H100 M0 63 H100" stroke="#fff" stroke-width=".8" stroke-dasharray="4 4"/></svg>`);
  if(rid==="lagoon")A.insertAdjacentHTML("beforeend",Array.from({length:4},(_,i)=>`<div style="position:absolute;left:${10+i*24}%;bottom:${8+(i%2)*14}%;width:70px;height:24px;border-radius:50%;background:#2FA35A;opacity:.8"></div>`).join(""));
  if(rid==="swamp")A.insertAdjacentHTML("beforeend",Array.from({length:7},(_,i)=>`<div style="position:absolute;bottom:0;left:${i*15+3}%;font-size:44px;opacity:.75">🌾</div>`).join(""));
  if(rid!=="castle")A.insertAdjacentHTML("beforeend",`<div class="gsnail" id="gsnail">${snailSVG()}</div>`);else A.insertAdjacentHTML("beforeend",`<div class="gsnail" id="gsnail" style="width:90px">${snailSVG()}</div>`);
  let target=null,hits=0;
  function newTarget(){target=pick(pool.filter(p=>!target||p.id!==target.id));hits=0;$("#gtarget").innerHTML=rid==="lane"?`Find <b>${target.show}</b>`:`Find <b style="font-family:var(--f-body)">${esc(target.show)}</b>`;say(rid==="lane"?target.lab:target.kind==="cap"?"capital "+target.lab:target.lab)}
  newTarget();
  const items=[];
  function label(p,h){
    const c=cursiveCanvas(p.lab,h,{paper:PAPERS.notebook});return c}
  function spawn(){spawnN++;const good=Math.random()<P.luck;const p0=good?target:pick(pool.filter(x=>x.id!==target.id));const gold=P.goldEvery&&spawnN%P.goldEvery===0;const Pi=gold?target:p0;
    const el=document.createElement("div");el.className="gi "+gm.cls+(gold?" gold":"")+(P.glow&&Pi.id===target.id?" glowI":"");const inner=document.createElement("div");inner.className="inner";inner.style.cssText="display:grid;place-items:center;width:100%;height:100%;position:relative";el.appendChild(inner);
    const W=AW(),H=AH();let it={el,p:Pi,gold,t:0,dead:false};
    if(rid==="lagoon"){const c=label(Pi,74);inner.appendChild(c);it.x=20+Math.random()*(W-140);it.y=H+10;it.vy=-(55+Math.random()*35)*slow;it.vx=0;it.ph=Math.random()*6}
    if(rid==="lane"){const col=pick(["#F25C54","#3EA6FF","#FFB81F","#8E5BFF","#12A386"]);inner.innerHTML=`<svg viewBox="0 0 150 84" style="position:absolute;inset:0;width:100%;height:100%"><path d="M8 58 V34 Q8 22 22 20 L36 6 Q40 2 48 2 H104 Q112 2 118 8 L132 22 Q144 24 144 36 V58 Z" fill="${col}" stroke="rgba(0,0,0,.35)" stroke-width="3"/><circle cx="36" cy="64" r="14" fill="#262150" stroke="#fff" stroke-width="3"/><circle cx="116" cy="64" r="14" fill="#262150" stroke="#fff" stroke-width="3"/><circle cx="140" cy="40" r="4" fill="#FFE27A"/></svg>`;
      const lab=document.createElement("div");lab.className="lab";const c=label(Pi,52);c.style.width="auto";c.style.height="36px";c.style.maxWidth="100px";c.style.objectFit="contain";lab.appendChild(c);inner.appendChild(lab);
      const lane=spawnN%3;it.y=H*[.12,.38,.64][lane];it.x=-170;it.vx=(85+Math.random()*50)*slow;it.vy=0}
    if(rid==="castle"){inner.appendChild(label(Pi,80));it.x=20+Math.random()*(W-140);it.y=-110;it.vy=(60+Math.random()*30)*slow;it.vx=0}
    if(rid==="swamp"){const c=label(Pi,58);inner.appendChild(c);const left=Math.random()<.5;it.x=left?-140:W+20;it.vx=(left?1:-1)*(55+Math.random()*35)*slow;it.base=40+Math.random()*(H-180);it.y=it.base;it.ph=Math.random()*6}
    el.style.setProperty("--s",big);A.appendChild(el);items.push(it);
    el.addEventListener("pointerdown",e=>{e.preventDefault();if(it.dead||!GM)return;tap(it)})}
  function plus(it,t,col){const d=document.createElement("div");d.className="plus";d.textContent=t;d.style.left=(it.x+30)+"px";d.style.top=(it.y)+"px";if(col)d.style.color=col;A.appendChild(d);setTimeout(()=>d.remove(),800)}
  function catchIt(it,silent){it.dead=true;catches++;streak++;hits++;let pts=it.gold?P.goldPts:1;if(P.lava&&catches%5===0)pts=Math.max(pts,3);if(P.rdouble&&streak>5)pts*=2;
      if(P.combo5&&streak%5===0)pts+=2;if(P.gum&&streak%4===0)pts+=1;score+=pts;if(P.streakSec&&streak%3===0){time++;$("#gtime").textContent="⏱ "+time}
      if(P.rush&&score>=nextRush){nextRush+=10;time+=5;$("#gtime").textContent="⏱ "+time;plus(it,"+5s","#FFE27A")}
      if(!silent)sfx.good();plus(it,"+"+pts);
      it.el.style.setProperty("--t",`translate(${it.x}px,${it.y}px)`);
      if(rid==="castle"){const W=AW(),H=AH();it.el.style.transition="transform .35s ease-in";it.el.style.transform=`translate(${W/2-50}px,${H-110}px) scale(.3)`;setTimeout(()=>{const d=$("#dragon");if(d){d.classList.add("chomp");setTimeout(()=>d.classList.remove("chomp"),180)}it.el.remove()},350)}
      else{it.el.classList.add("popped");setTimeout(()=>it.el.remove(),360)}
      mood($("#gsnail"),"happy");if(P.party&&!silent)confetti();$("#gscore").textContent="⭐ "+score}
  function tap(it){if(it.p.id===target.id){catchIt(it);
      if(P.blast&&streak%3===0){items.filter(x=>!x.dead&&x.p.id===target.id).forEach(x=>catchIt(x,true));plus(it,"Berry blast!","#FF6B7D")}
      if(hits>=3)newTarget()}
    else{streak=0;sfx.bad();it.el.classList.remove("nope");void it.el.offsetWidth;it.el.classList.add("nope");
      if(shield>0){shield--;plus(it,"🛡️ saved!","#BFE9FF")}else{score=Math.max(0,score-1);plus(it,"-1","#FF8A80")}mood($("#gsnail"),"sad");$("#gscore").textContent="⭐ "+score}}
  let last=performance.now(),acc=0,hintAcc=0,frzAcc=0;const every=950/slow/P.spawnMul;
  GM={dead:false,raf:0,tick:0};
  function frame(now){if(!GM||GM.dead)return;const dt=Math.min(.05,(now-last)/1000);last=now;
    if(P.freezeEvery){frzAcc+=dt;if(frzAcc>=P.freezeEvery){frzAcc=0;freezeUntil=now+3000;$("#gfreeze").hidden=false;tone(1500,.3,"sine",.06)}}
    const frozen=now<freezeUntil;if(!frozen)$("#gfreeze").hidden=true;
    if(frozen){GM.raf=requestAnimationFrame(frame);return}
    acc+=dt*1000;if(acc>=every){acc=0;spawn()}
    if(P.hint){hintAcc+=dt;if(hintAcc>4){hintAcc=0;const r=items.find(x=>!x.dead&&x.p.id===target.id);if(r){const inn=r.el.querySelector(".inner");inn.classList.remove("wigl");void inn.offsetWidth;inn.classList.add("wigl")}}}
    const W=AW(),H=AH();
    items.forEach(it=>{if(it.dead&&!it.el.isConnected)return;if(it.dead)return;it.t+=dt;it.x+=it.vx*dt;it.y+=it.vy*dt;
      if(rid==="lagoon")it.x+=Math.sin(it.t*2+it.ph)*.6;
      if(rid==="swamp")it.y=it.base+Math.sin(it.t*2.2+it.ph)*36;
      it.el.style.transform=`translate(${it.x}px,${it.y}px) scale(${big})`;
      if(it.y<-140||it.y>H+20&&rid==="castle"||it.x>W+30&&it.vx>0||it.x<-200&&it.vx<0){it.dead=true;it.el.remove()}
      if(rid==="castle"&&it.y>H-150&&!it.dead){it.dead=true;it.el.style.transition="opacity .3s";it.el.style.opacity=0;setTimeout(()=>it.el.remove(),300)}});
    for(let i=items.length-1;i>=0;i--)if(items[i].dead&&!items[i].el.isConnected)items.splice(i,1);
    GM.raf=requestAnimationFrame(frame)}
  spawn();GM.raf=requestAnimationFrame(frame);
  GM.tick=setInterval(()=>{time--;$("#gtime").textContent="⏱ "+time;if(time<=5&&time>0)tone(500,.08,"square",.05);if(time<=0)end()},1000);
  function end(){stopGame();const coins=Math.min(30,score)*P.coinMul+catches*P.perCatch+(score>0?P.bonus:0);S.coins+=coins;S.best=S.best||{};const best=Math.max(S.best[rid]||0,score);const isBest=score>(S.best[rid]||0)&&score>0;S.best[rid]=best;save();renderHUD();sfx.win();if(score>0)confetti();
    $("#gstage").innerHTML=`<div class="card reward"><div class="rays"></div><h2>${score>=12?"Superstar snail!":score>=6?"Great catching!":"Nice try!"}</h2><div class="dance">${snailSVG()}</div>
     <div class="row ctr"><span class="gpill">⭐ ${score} points</span><span class="gpill">🏆 Best ${best}</span></div>${isBest?`<p class="sticker" style="font-family:var(--f-display);font-weight:700;color:var(--mint);margin:0">New best score!</p>`:""}<div class="coinsup">+${coins} coins</div>
     <div class="row ctr"><button class="btn mint big" id="gagain">Play again</button><button class="btn alt" id="gmap">Map</button><button class="btn sun" id="gskin">Try a new hat</button></div></div>`;
    $("#gagain").onclick=()=>play(rid);$("#gmap").onclick=()=>show("map");$("#gskin").onclick=()=>show("shop")}}
