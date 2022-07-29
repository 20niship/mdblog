<template>
<div>
<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
<form method="get" action="#" class="search_container">
  <input type="text" size="25" placeholder="キーワード検索">
  <input type="submit" value="&#xf002">
</form>
<span class="search-btn-a" ><a href="/">記事一覧 </a></span>
<span class="search-btn-a"><a href="/latest">最近の記事 </a></span>
</div>
</template>

<style scped> 
.search-btn-a{
  padding:12px;
  background:#000;
  margin:10px;
  border-radius:4px;
}

.search-btn-a a, 
.search-btn-a a:visited{
  color:#fff;
  text-decoration:none;
}

.search_container{
  box-sizing: border-box;
  position: relative;
  border: 1px solid #999;
  display: block;
  padding: 3px 10px;
  border-radius: 20px;
  height: 2.3em;
  width: 260px;
  overflow: hidden;
  margin-bottom:15px;
}

.search_container input[type="text"]{
  border: none;
  color: #eee;
  background:transparent;
  height: 2.0em;
}
.search_container input[type="text"]:focus {
  outline: 0;
}
.search_container input[type="submit"]{
  cursor: pointer;
  font-family: FontAwesome;
  font-size: 1.3em;
  border: none;
  background: transparent;
  color: #eee;
  position: absolute;
  width: 2.5em;
  height: 2.5em;
  right: 0;
  top: -10px;
  outline : none;
}
</style>


