<template>  
    <input id="slide-opener" type="checkbox" role="button" />
    <label for="slide-opener" id="side-opener-label">
      <i class="fas fa-bars"></i>
    </label> 
<aside class="sidenav">
  <div class="side-menu-fixed">
    <table>
      <tr>
        <td>
          <input type="radio" id="sidenav_history" class="nodisplay" name="sidemenu" >
          <label for="sidenav_history"><i class="fas fa-history"></i><p>recent</p></label>
        </td>
        <td>
          <input type="radio" id="sidenav_search" class="nodisplay" name="sidemenu" >
          <label for="sidenav_search"><i class="fas fa-search"></i><p>search</p></label>
        </td>
        <td>
          <input type="radio" id="sidenav_star" class="nodisplay" name="sidemenu" >
          <label for="sidenav_star"><i class="fas fa-star"></i><p>favorite</p> </label>
        </td>
        <td>
          <input type="radio" id="sidenav_mypage" class="nodisplay" name="sidemenu"  >
          <label for="sidenav_mypage"><i class="fas fa-user"></i><p>mypage</p></label>
        </td>
        <td>
          <input type="radio" id="sidenav_myedit" class="nodisplay" name="sidemenu"  >
          <label for="sidenav_myedit"><i class="fas fa-pen"></i><p>myedit</p></label>
        </td>
      </tr>
    </table>
  </div>
  <div class="side-scroll">
      <section id="sidenav-content"></section>
  </div>
</aside>
</template>


<style scoped>
.sidenav {
  height: 100%;
  width: 300px;
  position: fixed;
  z-index: 1;
  top: 0;
  background-color: #111;
  padding:0;
  overflow-x: hidden;
  padding-top: 80px;
  padding-left:10px;
  -moz-transition: width 0.3s ease;
  transition: width 0.3s ease;
}

.side-menu-fixed{
  position: sticky;
  top: -9px;
  background-color: #000;
  width:100%;
  z-index: 1;
  border-bottom: solid 1px #ccc;
}

.side-menu-fixed label i{
  font-size:25px;
  color:#ddd;
}

.side-menu-fixed span{
  font-size: 1.1rem;
}

.side-menu-fixed table,
.side-menu-fixed tr{
  width: 100%;
  table-layout: fixed;
  text-align: center;
}

.side-menu-fixed table, 
.side-menu-fixed td, 
.side-menu-fixed th {
  border:none;
  padding:0;
  text-align: center;
  background-color: #000;
}
.side-menu-fixed td label{
  text-align: center;
}

.side-menu-fixed table{
  border-collapse: unset;
  padding-right: 35px;
}

.side-menu-fixed table td p{
  margin-top: 3px;
  margin-bottom: 0px;
  font-size: 0.7rem;
}

.side-menu-fixed tbody tr:hover td{
  background-color: #000;
}

.side-menu-fixed table td:hover{
  background-color: #333;
}

.side-menu-fixed label:hover{
  cursor: pointer;
  color: #fff;
}

.side-menu-fixed label:checked{
  color: #fff;
}


.nodisplay{display:none;}
  

.side-scroll{
  display: block;
  overflow:hidden;
  width:100%;
}
  
#slide-opener[type=checkbox] {
  display: none;
}

#side-opener-label {
 z-index: 10;
 position: fixed;
 margin-left: 270px;
 top: 85px;
 background-color: rgba(0,0,0,0.5);
 border-radius: 5px;
 -moz-transition: margin-left 0.3s ease;
 transition: margin-left 0.3s ease;
}

#side-opener-label i{
  font-size: 30px;
  line-height: 30px;
  text-align: center;
  color:#fff;
}

#slide-opener:checked ~ .sidenav { 
 width: 0px;
 left:30px;
 border-right:solid 1px #fff;
 -moz-transition: width 0.3s ease;
 transition: width 0.3s ease;
}

#slide-opener:checked ~ .main-content { 
 margin-left: 20px;
 -moz-transition: margin-left 0.3s ease;
 transition: margin-left 0.3s ease;
}

#slide-opener:checked ~ label {
 margin-left: -25px;
 -moz-transition: margin-left 0.3s ease;
 transition: margin-left 0.3s ease;
}

#slide-opener:checked label i{
  font-size: 30px;
  line-height: 30px;
}

.sidenav h1,
#editor-side-sec-main h1{
    background: #ddd;
    font-size: 1.1rem;
    color:#000;
    border-radius:5px;
    border: none;
    font-weight:bold;
    text-align:center;
    width:90%;
    padding: 5px;
    position: relative;
    margin: 10px 0px;
}
.sidenav h1::after,
#editor-side-sec-main h1::after{
    border: none;
    border-left: solid 15px transparent;
    border-right: solid 15px transparent;
    border-top: solid 15px #ddd;
    bottom: -12px;
    content:"";
    display:block;
    height:0;
    left:50%;
    margin-left:-8px;
    position: absolute;
    width:0;
} 


.aside-article-link{
  margin:0px 0px 15px 0px;
  width: 90%;
  position: relative;
  border-bottom: solid 1px #ddd;
  padding : 7px;
  min-height: 75px;
}

.sidenav .card-link-thumb{
  padding-bottom:0px;
  width:40px;
  height: 40px;
}


.category-module{
  clear:both;
  overflow: hidden;
}
  
.one-category{
  float:left;
  position:relative;
  background:#000;
  border:none;
  height:25px;
  font-size: 1.1rem;
  color:#eee;
  font-weight:bold;
  line-height:20px;
  margin:3px 9px;
  padding:0 7px;
  text-decoration:none;
  text-align: center;
}

.one-category:before {
  border-top: 11px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid #000;
  content: '';
  display: block;
  margin-left: -9.5px;
  position: absolute;
  left: 0;
}

.one-category:hover {
  background-color: #fff;
  color:#000;
}
.one-category:hover:before {
  border-right: 10px solid #fff;
}
</style>
