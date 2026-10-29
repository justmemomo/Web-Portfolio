// Highlights the current section link in the nav
const links=[...document.querySelectorAll('.nav ul a')];
const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.style.color=l.getAttribute('href')==='#'+e.target.id?'var(--text)':'')}})},{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('section[id]').forEach(s=>obs.observe(s));

// Dark / Light mode toggle
const root=document.documentElement;
const btn=document.getElementById('themeToggle');
const icon=document.getElementById('themeIcon');
const label=document.getElementById('themeLabel');
function paint(){
  const t=root.getAttribute('data-theme');
  icon.textContent=t==='dark'?'🌙':'☀️';
  label.textContent=t==='dark'?'Dark':'Light';
}
paint();
btn.addEventListener('click',()=>{
  const next=root.getAttribute('data-theme')==='dark'?'light':'dark';
  root.setAttribute('data-theme',next);
  try{localStorage.setItem('theme',next)}catch(e){}
  paint();
});

// Twinkling starfield (visible in dark mode)
(function(){
  const c=document.getElementById('stars'); if(!c) return;
  const ctx=c.getContext('2d');
  const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w,h,stars=[];
  function resize(){
    const dpr=window.devicePixelRatio||1;
    w=c.width=innerWidth*dpr; h=c.height=innerHeight*dpr;
    const n=Math.min(220,Math.floor(innerWidth*innerHeight/7000));
    stars=Array.from({length:n},()=>({x:Math.random()*w,y:Math.random()*h,r:(Math.random()*1.4+.3)*dpr,p:Math.random()*6.28,s:Math.random()*.02+.005}));
  }
  function draw(){
    ctx.clearRect(0,0,w,h);
    for(const s of stars){
      s.p+=s.s;
      ctx.globalAlpha=.35+.65*Math.abs(Math.sin(s.p));
      ctx.fillStyle='#fff';
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,6.283); ctx.fill();
    }
    if(!reduce) requestAnimationFrame(draw);
  }
  addEventListener('resize',resize);
  resize(); draw();
})();

// Scroll reveal
(function(){
  const els=document.querySelectorAll('.panel,.project,.metric,section h2,.lead');
  if(!('IntersectionObserver' in window)){return}
  els.forEach(e=>e.classList.add('reveal'));
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08});
  els.forEach(e=>io.observe(e));
})();
