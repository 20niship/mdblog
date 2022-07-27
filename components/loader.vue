<template>
<div id="loader-wrapper">
  <div class="loader-wrapper-2">
    <div class="cubes">
      <div class="sk-cube sk-cube1"></div>
      <div class="sk-cube sk-cube2"></div>
      <div class="sk-cube sk-cube3"></div>
      <div class="sk-cube sk-cube4"></div>
      <div class="sk-cube sk-cube5"></div>
      <div class="sk-cube sk-cube6"></div>
      <div class="sk-cube sk-cube7"></div>
      <div class="sk-cube sk-cube8"></div>
      <div class="sk-cube sk-cube9"></div>
     </div>

    <p>Waiting for connection....</p>
  </div>
</div>
</template>

<style scoped>
#loader-wrapper{ 
  position: absolute;
  left: 0; top: 0;
  width: 100vw; height: 100vh;
  background: rgba(100, 100, 100, .8);
}

.loader-wrapper-2{
  max-width: 400px;
  height: 100px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  margin: auto;
  background:none;
}

.loader-wrapper-2 p{
  text-align:center;
  font-size: 2.0rem;
  font-weight: bold;
  background:none;
}

.cubes {
  width: 80px;
  height: 80px;
  margin: auto;
  background:none;
  margin-bottom: 20px;
}

.cubes .sk-cube {
  width: 33%;
  height: 33%;
  background-color: #fff;
  float: left;
  animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
}

.cubes .sk-cube1 {animation-delay: 0.2s; }
.cubes .sk-cube2 {animation-delay: 0.3s; }
.cubes .sk-cube3 {animation-delay: 0.4s; }
.cubes .sk-cube4 {animation-delay: 0.1s; }
.cubes .sk-cube5 {animation-delay: 0.2s; }
.cubes .sk-cube6 {animation-delay: 0.3s;}
.cubes .sk-cube7 {animation-delay: 0s; }
.cubes .sk-cube8 {animation-delay: 0.1s; }
.cubes .sk-cube9 {animation-delay: 0.2s;}
@keyframes sk-cubeGridScaleDelay {
    0%,70%,100% {transform: scale3D(1, 1, 1);}
    35% {transform: scale3D(0, 0, 1);}
}
</style>


