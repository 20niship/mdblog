<template>
<div>
<PageCardSmall v-for="page in pages" :page=page />
</div>
</template>

<script setup lang="ts">
const data = await useFetch('/api/search?limit=10', {method:"GET"})
const pages = data.data;
</script>

