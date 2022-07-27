<template>
<section>
<component :is="'script'">
  // JS Here
</component>
  <!-- ソースコードのハイライト -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/monokai-sublime.min.css">

<component :is="'script'" src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/highlight.min.js"></component>
  <div class="page-status-wrapper">
    <a :href='"/search?d=" + page.created' class="date"><i class="fas fa-clock icon"></i>{{ page.created }}</a>
    <a :href='"/search?d=" + page.updated' class="date"><i class="fas fa-code-branch"></i>{{page.updated}}</a>
    <a v-for="t in page.tag" :href='"/search?c=" + t' class="category">{{t}}</a>
  </div>

  <div class="page-title-wrapper"><span class="page-title">{{ page.title }} </span></div>
  <div :v-if="editable">
    <input type="button" value="edit" @click="edit_page()" class="text-button" />
    <input type="button" value="new" @click="new_page()" class="text-button" />
    <input type="button" value="delete" onclick="delete_this_page()" class="text-button" />

  </div>
  <div id="pagetop" style="width:0;height:0"></div>
  <div id="maintext">
    <div id="toc"></div>
    <div id="post-content" v-html="page.markdown"></div>
  </div>

<div :v-if=render.goto_top id="goto-top"><span class="page-top-icon"><a href="#pagetop"> top </a></span></div>
<div :v-if=render.lgtm> <label id="lgtm-btn" onclick="favorite()"><i class="fas fa-star" id="lgtm-btn-icon"></i><span  class="fa fa-stack-1x"><span>ふぁぼ</span></span></label></div>

<CreateNewPage v-if="render.new_page_modal" :title=page_title :endcb=close_create_page :username=username />
</section>
</template>

<script setup lang="ts">
import md2html from '../../backend/md';
const route = useRoute()
const page_title= route.params?.id || "";
const { data }= await useFetch("/api/page/get", { method:"POST", body:{title: page_title} })
const page = data.value;
page.markdown = md2html(page.content);
</script>


<script lang="ts">
export default {
  data(){
    return  {
      render:{goto_top: true, lgtm : true, new_page_modal : false},
      username: "test",
      editable : true
    }
  },
  mounted(){
    hljs.initHighlightingOnLoad();
  },

  methods:{
    edit_page: function(){  window.location = "/edit/" + this.page_title; },
    new_page : function(){  this.render.new_page_modal = true; },
    close_create_page : function(){this.render.new_page_modal= false;},
  }
}
</script>

<style scoped>
pre{
  width:100%;
  padding: 0px;
  overflow-x: scroll;
  border : solid 1px #fff;
  padding:10px;
  scrollbar-base-color: #eee;
}


.main-content{
  display:block;
  margin-left: 350px;
  margin-top: 85px;
  -moz-transition: margin-left 0.3s ease;
  transition: margin-left 0.3s ease;
  overflow-x: unset;
  word-break: normal;
  overflow-wrap: normal;
}


.main-view {
  max-width: 1500px;
  padding-left: 1rem;
  padding-right: 1rem;
  margin: auto;
  margin-bottom: 100px;
  position:relative;
}


.text-button{
  border: solid 1.5px #fff;
  font-weight: bold;
  border-radius: 7px;
  background-color: #000;
  color:#fff;
  margin:7px;
  padding:5px 10px;
}

.text-button:hover{
  background-color: #fff;
  color:#000;
}

  

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

.category,
.date{
  font-size: 0.9rem;
}
 .date {
    background:#000;
    color:#fff;
    font-weight:bold;
    padding:3px 10px;
    margin:3px 10px;
    text-decoration:none;
    display:inline-block;
}

.date:hover,
.date:visited,
.category:hover,
.category:visited{
  color:#fff;
}

.date i{
  padding:0px;
  padding-right:7px;
  color:#fff;
}

.category {    
  display: inline-block;
  height: 24px;
  line-height: 24px;
  position: relative;
  margin: 0 16px 8px 10px;
  padding: 0 10px 0 12px;
  background: #111;    
  -webkit-border-bottom-right-radius: 3px;    
  border-bottom-right-radius: 3px;
  -webkit-border-top-right-radius: 3px;    
  border-top-right-radius: 3px;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
}


.category:before {
  content: "";
  position: absolute;
  top:0;
  left: -12px;
  width: 0;
  height: 0;
  border-color: transparent #111 transparent transparent;
  border-style: solid;
  border-width: 12px 12px 12px 0;        
  }

.category:after {
  content: "";
  position: absolute;
  top: 10px;
  left: 1px;
  float: left;
  width: 5px;
  height: 5px;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  background: #fff;
}



/*  #######################################
#####       トップへ戻る      ########
###########################################*/    
#page-top {
    position: fixed;
    width: 80px;
    height: 40px;
    right: 30px;
    bottom: 30px;
    background-color: #20fff7;
    border-radius: 20px;
    z-index: 10;
}

.page-top-icon {
    font-size: 16px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-weight: bold;
}

.page-top-icon a{color:#000;}
</style>
