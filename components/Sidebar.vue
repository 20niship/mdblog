<template>  
<div class="sidebar">

<div class="sidebar-item">
   <p class="sidebar-item-title">記事を検索</p>
  <SimpleSearch /> 
</div>

<div class="sidebar-item">
   <p class="sidebar-item-title">About</p>
  <About /> 
  <Graph />
   <p class="sidebar-item-title">更新頻度</p>
  <Grass />
</div>
<div class="sidebar-item">
   <p class="sidebar-item-title">カテゴリー覧</p>
  <AllTags />
</div>
<div class="sidebar-item">
   <p class="sidebar-item-title">最新記事</p>
  <Latest />
</div>

</div>
</template>


<style scoped>
.sidebar-item{
  background-color:#223;
  padding:10px;
  margin:10px;
  border-radius:15px;
  border: solid 0.1px #444;
}

.sidebar{
  max-width:300px;
}

.sidebar-item-title{
  font-weight:bold;
  text-align:center;
  margin:7px;
  font-size:1.1rem;
}
</style>

