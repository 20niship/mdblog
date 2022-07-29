<template>
<div class="all-tags">
<Tags :tag=all_tags_string />
</div>
</template>

<script setup lang="ts">
const data = await useFetch('/api/stats', {method:"POST", body:{query:"all_tags"}})
const all_tags = data.data.value?.tags;
const all_tags_string= all_tags.map(x => x._id[0]);
</script>

<style scoped>
.all-tags{
  margin:auto;
  max-width:1200px;
}

</style>
