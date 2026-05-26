const STORAGE_KEY='paraguay-slide';
const slides=document.querySelectorAll('.slide'),total=slides.length;
let cur=0;
const dc=document.getElementById('dots');
for(let i=0;i<total;i++){
  const d=document.createElement('button');
  d.className='dot'+(i===0?' on':'');
  d.onclick=()=>goTo(i);
  dc.appendChild(d);
}
function saveState(){
  try{localStorage.setItem(STORAGE_KEY,cur.toString());}catch(e){/* no-op */}
}
function loadState(){
  try{
    const saved=localStorage.getItem(STORAGE_KEY);
    const n=saved!==null?parseInt(saved,10):0;
    return Number.isInteger(n)&&n>=0&&n<total?n:0;
  }catch(e){return 0;}
}
function updateNav(){
  document.getElementById('counter').textContent=(cur+1)+' / '+total;
  document.getElementById('btnP').disabled=cur===0;
  const nb=document.getElementById('btnN');
  nb.disabled=cur===total-1;
  nb.className='nav-btn nav-next'+(cur>=total-2?' nav-fin':'');
  nb.textContent=cur===total-1?'✓ Fin':'Siguiente →';
}
function goTo(n){
  slides[cur].classList.remove('active');
  document.querySelectorAll('.dot')[cur].classList.remove('on');
  cur=n;
  slides[cur].classList.add('active');
  document.querySelectorAll('.dot')[cur].classList.add('on');
  updateNav();
  saveState();
}
function go(d){
  if(cur+d>=0&&cur+d<total)goTo(cur+d);
}
cur=loadState();
if(cur>0){
  slides[0].classList.remove('active');
  document.querySelectorAll('.dot')[0].classList.remove('on');
  slides[cur].classList.add('active');
  document.querySelectorAll('.dot')[cur].classList.add('on');
}
updateNav();
saveState();
document.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight'||e.key==='ArrowDown')go(1);
  if(e.key==='ArrowLeft'||e.key==='ArrowUp')go(-1);
});
