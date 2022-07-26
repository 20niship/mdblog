<template>
<section>
<h1>Hello</h1>
<p>aaaa</p>
<div v-for="page of pages"  :key="page._id">
<PageCardLarge :page=page />
</div>
</section>
</template>

<script setup lang="ts">
const data = await useFetch('/api/page/search', {method:"POST", body:{type:"list"}})
const pages = data.data;
</script>

