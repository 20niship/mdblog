<template>
<Sidebar />
<main>
<Pagelist :pages=pages :total=100 class="page-list" />
</main>
</template>

<script setup lang="ts">
const data = await useFetch('/api/page/search', {method:"POST", body:{type:"list"}})
const pages = data.data;
</script>

<style scoped>
main{
  margin:auto;
  max-width:1200px;
}
</style>
