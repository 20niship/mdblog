<template>
<div class="card-link">
<a :href='"/search?d=" + page.create' class="date"><i class="fas fa-clock icon"></i>{{ page.created }}</a>
<a :href='"/search?d=" + page.update' class="date"><i class="fas fa-code-branch"></i>{{page.update}}</a>
  <a v-for="t in page.tag" :href='"/search?c=" + t' class="category">{{t}}</a>
<div width="100%"></div>
<a :href='"/view/" + page.title'>
<img :src=page.icon :alt=title class="card-link-thumb" onerror="this.classList.add('undefined-img')"></a>
<p class="card-link-title"><a :href='"/view/" + page.title'>{{page.title}}</a></p>
<p class="card-link-desc"> {{page.content}}</p>
</div>

</template>


<script lang="ts">
export default {
  /* props:["title", "content", "icon", "description", "update", "create", "url"] */
   props:["page"],
}
</script>

<style scoped>
.card-link{
  margin:0px 0px 15px 0px;
  width: 90%;
  max-width: 480px;
  max-height: 130px;
  overflow: hidden;
  position: relative;
  border-radius: 15px;
  border: solid 1px #aaa;
  padding : 7px;
  min-height: 75px;
}

.search-result .card-link { max-width: 1100px; }

.card-link-favicon{
  width:16px;
  height:16px;
}

.card-link-url{
  padding:0;
  margin:0;
  text-decoration: none;
}

.card-link-thumb{
  margin:0;
  padding:0;
  height: 80px;
  width: 80px;
  padding-right: 8px;
  padding-bottom: 8px;
  float: left;
}

.card-link-title {
  font-weight:bold;
  font-size: 1.3rem;
  text-decoration: none;
  padding-top:0px;
  margin:0px;
  padding:0px;
  border:none;
}

.card-link-desc{
  font-size: 0.9rem;
  text-decoration: none;
  padding-top:0px;
  margin:3px;
  border:none;
}

.card-link br {
  display: none;
}


.card-link .date,
.card-link .category{
  padding:4px;
  margin:3px;
}

.card-link .date,
.card-link .category{
  font-size: 0.8rem;
}

.card-link .date i,
.card-link .category i{
  font-size: 0.8rem;
}

</style>
