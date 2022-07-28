<template>
<section>
<!-- ソースコードのハイライト -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/monokai-sublime.min.css">
<component :is="'script'" src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/highlight.min.js"></component>
<div id="pagetop" style="width:0;height:0"></div>
<div class="main-wrapper">
  <Sidebar class="sidebar" />
  <NotFound v-if="!found" />
  <main class="page-view" v-else >
    <div class="page-status">
      <Date :date=page.created />
      <Date :date=page.updated />
      <Tags :tag=page.tag />
      <div style="width=100%"></div>
      <span class="page-title">{{ page.title }} </span>
    <div :v-if="editable">
      <input type="button" value="edit" @click="edit_page()" class="text-button" />
      <input type="button" value="new" @click="new_page()" class="text-button" />
      <input type="button" value="delete" onclick="delete_this_page()" class="text-button" />
    </div>
    </div>

    <div class="page-content">
      <div id="toc"></div>
      <div id="post-content" v-html="page.markdown"></div>
    </div>
    <GotoTop :v-if="render.goto_top" />
    <Lgtm :v-if="render.lgtm" />
    <CreateNewPage v-if="render.new_page_modal" :title=page_title :endcb=close_create_page :username=username />
  </main>
</div>
</section>
</template>

<script setup lang="ts">
import md2html from '../../backend/md';
import {onMounted }from "vue";

const edit_page =  function(){  window.location = "/edit/" + page_title; };
const new_page  =  function(){  render.new_page_modal = true; };
const close_create_page  =  function(){render.new_page_modal= false;};
const render = {goto_top: true, lgtm : true, new_page_modal : false};
const username =  "test";
const editable =true;

const route = useRoute()
const t= route.params?.id || "";
const page_title= t.join("/");
const { data }= await useFetch("/api/page/get", { method:"POST", body:{title: page_title} })
const page = data?.value || undefined;
const found = page != undefined;
if(found){
page.markdown = md2html(page.content);
}

onMounted(() => {hljs.initHighlightingOnLoad();});
</script>

<style scoped>
.main-wrapper{
  max-width: 1500px;
  margin: auto;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}

.page-status, 
.page-content{
  background-color:#223;
  padding:10px;
  margin:6px;
  border-radius:15px;
  border: solid 0.1px #444;
}

.page-title {
  font-size:1.5rem;
  font-weight: bolder;
}

.text-button{
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
</style>
