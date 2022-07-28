<template>
<Header />
<NuxtPage />
<Footer />
</template>


<style>
html,
body {
  background-color: #000;
  width:100%;height:100vh;
  color: #fff;
  padding-left:3px;
  padding-right:10px;
}
*{font-size:1.0rem; font-family:'arial';}

a {color:rgb(219, 241, 250);;text-decoration: underline;}
a:visited {color: rgb(159, 228, 255);}
a:hover {font-weight: bold;}

h1 {
  position: relative;
  color:#000;
  padding: 0.2em;
  background: #e1e0e0;
  border-left:solid 10px #000;
  font-size:2.0rem;
  margin:30px 0px 5px 2px;
}

h1:after {
    position: absolute;
    top: 100%;
    left: 30px;
    content: '';
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top: 12px solid #e1e0e0;
}

h2{
  border-left:solid 12px #e1e0e0;
  border-bottom:solid 6px #e1e0e0;
  color:#000;
  background: #333;
  padding: 0.2em;
  font-size:1.7rem;
  color:#fff;
  margin:30px 0px 5px 2px;

}

h3{
  border-left:solid 6px #e1e0e0;
  border-bottom:solid 2px #e1e0e0;
  color:#000;
  background: #333;
  padding: 0.2em;
  font-size:1.2rem;
  color:#fff;
}


.undefined-img{
  content: "NO IMAGE";
  text-align: center;
  background-color: #666;
  font-size: 0;
  border:solid 2px #fff;
  color:#fff;
  margin:5px;
  padding:15px;
}


/* ---------------------------  Table  -------------------------*/

table,th, td{
  background-color: #000;
  border-collapse: collapse;
  border:1px solid #fff;
  margin:0px;
  padding:3px 10px;
}

tbody tr:hover td{
  background-color: #444;
}

.sort.desc:after {
  content:"▼";
}
.sort.asc:after {
  content:"▲";
}


pre{
  width:100%;
  padding: 0px;
  overflow-x: scroll;
  border : solid 1px #fff;
  padding:10px;
  scrollbar-base-color: #eee;
}


.title_list_table,
.title_list_table td,
.title_list_table tr{
  background-color:rgba(0, 0, 0, 0);
  border:none;
}

.title_list_table tr:hover td{
  background-color:rgba(0, 0, 0, 0);
}

@media (min-width: 509px) {
  .title_list_table_wrapper{
    overflow-x: scroll;
    border:solid 1px #fff;
  }
}

pre{
  width:100%;
  padding: 0px;
  overflow-x: scroll;
  border : solid 1px #fff;
  padding:10px;
  scrollbar-base-color: #eee;
}

</style>
