<template>
<div class="lgtm" @click="favorite()">
  <i class="fas fa-star" id="lgtm-btn-icon"></i>
  <span>Favorite</span>
</div>
</template>

<script setup lang="ts">
const favorite = () => {
  alert("Favorite");
}
</script>

<style scoped>
.lgtm{
    position: fixed;
    width: 80px;
    height: 40px;
    right: 30px;
    bottom: 80px;
    background-color: #20fff7;
    border-radius: 20px;
    z-index: 10;
}

.lgtm span{
  font-size: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  font-weight: bold;
  color:#000;
}
</style>
