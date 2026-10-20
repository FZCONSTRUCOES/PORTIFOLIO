'use strict';
const menuBtn=document.querySelector('#menuBtn'),menu=document.querySelector('#menu');
function closeMenu(){menu.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');menuBtn.setAttribute('aria-label','Abrir menu');}
menuBtn.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));menuBtn.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
const photos=[...document.querySelectorAll('.photo')],more=document.querySelector('#showMore');
more.addEventListener('click',()=>{const expanded=more.getAttribute('aria-expanded')==='true';photos.slice(6).forEach(p=>p.hidden=expanded);more.setAttribute('aria-expanded',String(!expanded));more.innerHTML=expanded?'Ver todos os registros <span>+</span>':'Mostrar menos registros <span>−</span>';if(expanded)document.querySelector('#portfolio').scrollIntoView();});
const viewer=document.querySelector('#viewer'),full=document.querySelector('#fullPhoto');let current=0;
function show(i){current=(i+photos.length)%photos.length;const im=photos[current].querySelector('img');full.src=im.getAttribute('src');full.alt=im.alt;document.querySelector('#caption').textContent=im.alt;document.querySelector('#counter').textContent=`${current+1} / ${photos.length}`;}
photos.forEach((p,i)=>p.addEventListener('click',()=>{show(i);viewer.showModal();document.body.style.overflow='hidden';}));
document.querySelector('#closeViewer').addEventListener('click',()=>viewer.close());viewer.addEventListener('close',()=>document.body.style.overflow='');
document.querySelector('#previous').addEventListener('click',()=>show(current-1));document.querySelector('#next').addEventListener('click',()=>show(current+1));
viewer.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();show(current-1);}if(e.key==='ArrowRight'){e.preventDefault();show(current+1);}});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
