<template>
<div class="main-wrapper">
<Sidebar />
<Pagelist :pages=pages :total=100 class="page-list" />
</div>
</template>
<script setup lang="ts">
const data = await useFetch('/api/search', {method:"GET", body:{type:"latest"}})
const pages = data.data;
</script>

<style scoped>
.main-wrapper{
  max-width: 1500px;
  margin: auto;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}

.page-status, 
.page-content{
  background-color:#223;
  padding:10px;
  margin:6px;
  border-radius:15px;
  border: solid 0.1px #444;
}
</style>
