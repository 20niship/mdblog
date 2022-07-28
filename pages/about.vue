<template>
<main>
<h1>About Page</h1>
<div class="bg is-animated">
<p class="shuffle">HOGEHOGEHOGEHOGE</p>
<img src="https://deliver.commons.nicovideo.jp/thumbnail/nc52154?size=l">

<div class="anim">背景色が消えてから表示される</div>
<div class="anim">背景色が消えてから表示される</div>
<div class="anim">背景色が消えてから表示される</div>
<div class="anim">背景色が消えてから表示される</div>

<div class="anim">
<img src="https://deliver.commons.nicovideo.jp/thumbnail/nc52154?size=l">
</div>
</div>
</main>
</template>

<style scoped>
main{
  width:300px;
}

@keyframes mask-bg {
  0% { opacity: 1.0; transform: translate(-101%,0)}
  40%, 60% { transform: translate(0%, 0)  }
  100% {transform: translate(100% , 0)  }
}
.mask-bg {
  display: inline-block;
  overflow: hidden;
  position: relative;
}

.anim *{opacity:0.0;}
.mask-bg *{
  opacity: 1.0;
  transition: opacity 0ms 450ms;
}

.mask-bg::after {
  background: linear-gradient(to right, #362ae0 0%,#3b79cc 50%,#42d3ed 100%);
  animation: mask-bg 1.2s cubic-bezier(0.8, 0, 0.170, 1);
  content: '';
  display: block;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  transform: translate(100%,0);
}

</style>

<script setup lang="ts">

let shuffle_elms = [];
let bg_animations = [];

const shuffle_str = (text : string) => {
  let obj = [];
  for (let _ of text)  obj.push(text[Math.floor(Math.random() * 100000 % text.length) ]);
  return obj.join('');
}

const shuffle_start = (el, original) => {
  el.style.opacity = "1.0";
  shuffle_elms= shuffle_elms.filter(i=> i.el !== el);
  let i=0;
  const shuffle= function(){
    i++;
    if(i < original.length + 10) setTimeout(shuffle, 20);
    const s = (i < original.length) ? 10 : original.length + 10 - i;
    const s2 = Math.min(original.length, i);
    el.textContent = original.substr(0, s2) + shuffle_str(original).substr(0, s);
  }
  shuffle();
}

const onscroll = function(){
  for(const e of shuffle_elms){
    const position = e.el.getBoundingClientRect();
    const top = position.top;
    if(top >= 0 && position.bottom <= window.innerHeight) {
      shuffle_start(e.el, e.text);
    }
  }

  for(let e of bg_animations){
    const position = e.getBoundingClientRect();
    const top = position.top;
    if(top >= 0 && position.bottom <= window.innerHeight - 100) {e.classList.add("mask-bg")}
  }
}

onMounted(() => {
  scrollTo(0,0);
  console.log("Mounted");
  const els = document.getElementsByClassName("shuffle");
  for(const e of els){shuffle_elms.push({el:e, text:e.textContent});}
  for(const e of shuffle_elms){ e.el.style.opacity = "0.0";  }

  const bgs = document.getElementsByClassName("anim");
  for(const e of bgs){bg_animations.push(e);}
  window.addEventListener('scroll', onscroll);
});
</script>

