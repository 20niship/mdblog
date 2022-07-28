<template>
<div class="card">
<a :href='"/view/" + page.title'><img :src=page.icon :alt=page.title class="card-thumb" onerror="this.classList.add('undefined-img')"></a>
<p class="card-title"><a :href='"/view/" + page.title'>{{page.title}}</a></p>
<Tags :tag=page.tag />
</div>

</template>


<script lang="ts">
export default {
  /* props:["title", "content", "icon", "description", "update", "create", "url"] */
   props:["page"],
}
</script>

<style scoped>
.card{
  margin:0px 0px 15px 0px;
  overflow: hidden;
  position: relative;
  border-bottom: solid 1px #888;
  padding : 7px;
}

.card-thumb{
  margin:0;
  padding:0;
  height: 40px;
  width: 40px;
  padding-right: 8px;
  padding-bottom: 8px;
  float: left;
}

.card-title,
.card-title a{
  font-weight:bold;
  font-size: 0.8rem;
  text-decoration: none;
  padding-top:0px;
  margin:0px;
  padding:0px;
  border:none;
}
</style>
