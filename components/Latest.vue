<template>
<div>
<PageCardSmall v-for="page in pages" :page=page />
</div>
</template>

<script setup lang="ts">
const data = await useFetch('/api/page/search', {method:"POST", body:{type:"list"}})
const pages = data.data;
</script>

