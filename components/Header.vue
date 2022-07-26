<template>
  <header>
    <div class="header_wrapper">
      <div class="header_start">
        <img :src=header_icon width=50 class="h_logo"/>
        <a href="/" class="h_title">{{title}}</a>
        <span class="h_desc">{{description}}</span>
      </div>

      <div class="header_end">
        <div class="h_search">
          <form action = "/search" class="search-form" method = “get”>
            <input type="text" class="searchTerm" name="q" placeholder="What are you looking for?">
            <input type="submit" class="searchButton" value="&#xf002">
          </form>
        </div>
        
        <nav class="header_nav">
          <label for="show-header-menu" class="show-header-menu-label"><i class="fa fa-bars"></i></label>
          <input type="checkbox" id="show-header-menu" role="button">
          <div class="hmenu-bg" onclick="document.getElementById('show-header-menu').checked = false;"></div>
          <ul class="h_nav_wrapper">
            <li><a href="/">Home</a></li>
            <li>
              <!-- <a href="#">WorkShop</a> -->
              <input type="checkbox" id="show-h-menu-1" role="button">
              <label for="show-h-menu-1" class="show-header-menu-child-label">WorkShop</label>
                <ul>
                    <li><a href="#">投擲班</a></li>
                    <li><a href="#">Swerve班</a></li>
                    <li><a href="#">ROS2班</a></li>
                    <li><a href="#">機械屋</a></li>
                    <li><a href="#">回路屋</a></li>
                    <li><a href="#">制御屋</a></li>
                </ul>
            </li>
            <li>
              <input type="checkbox" id="show-h-menu-2" role="button">
              <label for="show-h-menu-2" class="show-header-menu-child-label">RC2021</label>
              <ul>
                <li><a href="#">投擲班</a></li>
                <li><a href="#">Swerve班</a></li>
                <li><a href="#">ROS2班</a></li>
                <li><a href="#">機械屋</a></li>
                <li><a href="#">回路屋</a></li>
                <li><a href="#">制御屋</a></li>
              </ul>
            </li>
            <li>
              <input type="checkbox" id="show-h-menu-3" role="button">
              <label for="show-h-menu-3" class="show-header-menu-child-label">F3RC</label>
              <ul>
                <li><a href="#">A班</a></li>
                <li><a href="#">B班</a></li>
                <li><a href="#">C班</a></li>
                <li><a href="#">D班</a></li>
                <li><a href="#">E班</a></li>
                <li><a href="#">F班</a></li>
                <li><a href="#">その他</a></li>
              </ul>
            </li>
            <li>
              <input type="checkbox" id="show-h-menu-4" role="button">
              <label for="show-h-menu-4" class="show-header-menu-child-label">User</label>
              <ul>
            <li v-if="logined"><a href="/user/logout">Logout</a></li>
            <li v-if="logined"><a href="/mypage">マイページ</a></li>
            <li v-if="logined"><a href="myedit">最近編集した記事</a></li>
            <li v-if="!logined "><a href="/user/login">Login</a></li>
            <li v-if="!logined"><a href="/user/logout">Register</a></li>
              </ul>
            </li>
            <li>
            <input type="checkbox" id="show-h-menu-6" role="button">
            <label for="show-h-menu-6" class="show-header-menu-child-label">System</label>
            <ul>
              <li><a href="/special/performance">プロファイリング</a></li>
              <li><a href="/special/config">About</a> </li>
              <li><a href="/special/config/user">ユーザー設定</a> </li>
              <li><a href="/special/config/usergroup">グループ設定</a></li>
              <li><a href="/special/config/page">/ページ設定</a> </li>
            </ul>
          </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>


<style soped>
body {
  background-color: #333333;
  width:100%;height:100vh;
  color: #fff;
  padding-left:3px;
  padding-right:10px;
}
*{font-size:1.0rem; font-family:'arial';}
a {color:rgb(219, 241, 250);;text-decoration: underline;}
a:visited {color: rgb(159, 228, 255);}
a:hover {font-weight: bold;}


/*  ###################################
   #####       ヘッダー        #######
   ###################################*/
.h_title {
  font-weight: bold;
  font-size: 1.8rem; 
  text-decoration: none;
}

.h_title,
.h_title:hover,
.h_title:visited{
  color:#fff;
}

.h_desc{ padding-left:0.7rem;font-size: 1.1rem;}

header {
  /* position: fixed; */
  /* top: 0; */
  /* left: 50%; */
  /* transform: translate(-50%, 0%); */
  background-color: #222; 
  height:60px;
  padding-top: 10px;
  padding-left: 20px;
  z-index:5;
  width:100%;
}

.header_start {
  display: flex;
  align-items: center; 
}

.header_end {
  display: flex;
  align-items: center; 
  height:50px;
}

.header_wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem; 
  
  max-width: 1140px;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: auto;
  margin-right: auto;
}

.header_wrapper {
  padding-top: 0;
  padding-bottom: 0;
} 

.show-header-menu-label,
.h_nav_wrapper input[type="checkbox"],
#show-header-menu{
  display:none;
}

.h_nav_wrapper,
.h_nav_wrapper ul,
.h_nav_wrapper li,
.h_nav_wrapper a, 
.h_nav_wrapper label{ 
  margin: 0; 
  padding: 0; 
  line-height: normal; 
  list-style: none; 
  display: block; 
  position: relative; 
}

.h_nav_wrapper {
  display: flex; 
  list-style-type:none;
  margin:0;
  padding:0;
  margin-left: 55px;
}


@media (max-width: 799px) {
  .h_desc{
    display:none;
  }
}

.hmenu-bg{
  position:absolute;
  width:0px;
  opacity:0;
  height:100vh;
  top:70px;
  z-index: 1;
  left:0;
  right:0;
  background-color: rgba(0,0,0,0.5);
  transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
}

.h_nav_wrapper ul { 
  opacity: 0; 
  position: absolute; 
  top: 100%; 
  left: -9999px; 
  z-index: 13; 
}
.h_nav_wrapper li:hover > ul {
   left: 0; opacity: 1; z-index: 1000; 
}

.h_nav_wrapper ul li:hover > ul { 
  top: 0; left: 100%; 
}

.h_nav_wrapper li ,
.h_nav_wrapper label { 
  cursor: default; float: left; white-space: nowrap; 
}

.h_nav_wrapper ul li { 
  float: none; 
}

.h_nav_wrapper ul { 
  min-width: 12em;
}

.h_nav_wrapper { float: right; right: 50%; }
.h_nav_wrapper > li { left: 50%; }

.h_nav_wrapper a ,
.h_nav_wrapper label { 
  padding: 0 10px;
  font-size: 1.1rem;
  color:#fff;
  line-height: 40px;
  text-decoration: none;
  border-bottom: solid 2px #aaa;
}

.h_nav_wrapper a:hover,
.h_nav_wrapper a:focus,
.h_nav_wrapper li:hover a {
  background: #444;
}

.h_nav_wrapper li li a,
.h_nav_wrapper li:hover li a {
  padding: 8px 10px;
  background: #113;
  color: #FFF;
  line-height: normal;
}

.h_nav_wrapper li:hover li a:hover,
.h_nav_wrapper li:hover li a:focus,
.h_nav_wrapper li:hover li:hover a,
.h_nav_wrapper li:hover li:hover li a {
  background: #444;
}

.h_nav_wrapper li:hover li:hover li a:hover,
.h_nav_wrapper li:hover li:hover li:hover a {
  background: #333;
}


.h_search {
  display: flex;
  margin-left: 1rem;
  z-index:10;
}

@media (max-width: 1100px) {
  .h_desc{
    display: none;
  }
}

@media (max-width : 800px) {
  .show-header-menu-label{
    width:50px;
    width:50px;
    font-size: 30px;
    text-align: center;
    margin:auto;
    margin-right: 25px;
    display:block
  }

  .show-header-menu-label i{
    font-size: 40px;
    line-height: 40px;
    text-align: center;
  }

  .h_nav_wrapper{
    display:block;
    opacity: 0;
    position:absolute;
    right:0;
    width:0;
    height:100vh;
    transition:all 0.5s ease;
    -moz-transition: all 0.3s ease;
    z-index: 20;
  }

  .h_nav_wrapper label{
    float:none;
  }

  .h_nav_wrapper label::before{
    content:" ▼ "
  }

  .h_nav_wrapper input[type="checkbox"]:checked ~ label::before{
    content:" ▲ "
  }
  
  #show-header-menu:checked ~ .h_nav_wrapper{
    display:block;
    position:absolute;
    background-color: #000;
    float:none;
    opacity:1;
    right:0;
    margin-top: 10px;
    width:80vw;
    max-width: 300px;
    height:100vh;
    overflow-y: scroll;
    transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
  }

  #show-header-menu:checked ~ .hmenu-bg{
    width:100vw;
    opacity: 1;
    transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
  }

  .h_nav_wrapper li {
    width: 100%;
    list-style-type: none;
    padding: 5px;
    margin:3px;
    text-align: center;
    left:auto;
  }

  .h_nav_wrapper input[type="checkbox"] ~ ul{
    opacity: 1;
    height:0;
    overflow: hidden;
  }

  .h_nav_wrapper input[type="checkbox"]:checked ~ ul{
    display: block;
    position:unset;
    height:unset;
    width: 90%;
    position: block;
    top: unset;
    left: unset;
    z-index: inherit;
  }

  .h_nav_wrapper li ul li{
    width: 80%;
    list-style-type: none;
    margin:0;
    padding: 0px;
    margin-left:40px ;
    text-align: center;
    left:auto;
    background:none;
  }
}


@media (max-width: 509px) {
  .h_search{
    display: none;
  }
}

.search-form{
  color:#fff;
  width:95%;
  height: 32px;
  border: 2px #ddd solid;
  display: block;
  margin:30px 30px;
  margin-left: auto;
  margin-right: auto;
}

.search-form input{
  vertical-align: top;
  margin: 0px;
  height: 100%;
  box-sizing: border-box;
  background-color: transparent;
}
.search-form{
  border-radius: 10px;
}


.searchTerm{
  border: none;
  color:#fff;
  padding-left: 10px;
  padding-right: 10px;
  width: calc(100% - 39px);
}

.searchTerm:focus{font-weight:bold;}

.searchButton{
  width: 30px;
  color:#fff;
  border: none;
  font-family: FontAwesome; 
  background: none;
}

.detail-search{
  width:80%;
  max-width:900px;
  margin:30px;
  font-weight:bold;
  border:solid 1px;
  border-radius:10px;
}

</style>

<script setup lang="ts">

const title = "Title";
const description = "description";
const logined =false;
const header_icon = "https://deliver.commons.nicovideo.jp/thumbnail/nc52154?size=l"
</script>
