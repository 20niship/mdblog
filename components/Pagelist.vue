<template>
<section>
<div v-for="page of pages" class="page-list">
  <div class="page-view">
    <div class="thumb-wrapper"> <img :src=page.icon :alt=title class="thumb" onerror="this.classList.add('undefined-img')" /></div>
    <div>
      <p class="page-title"><a :href='"/view/" + page.title'>{{page.title}}</a></p>
      <a :href='"/search?d=" + page.create' class="date"><i class="fas fa-clock icon"></i>{{ format_date(new Date(page.created)) }}</a>
      <a :href='"/search?d=" + page.update' class="date"><i class="fas fa-code-branch"></i>{{format_date(new Date(page.updated)) }}</a>
      <a v-for="t in page.tag" :href='"/search?c=" + t' class="category">{{t}}</a>
      <p class="page-desc"> {{page.content}}</p>
  </div>
  </div>
</div>
</section>
</template>

<script lang="ts">
export default {
  props: ["pages", "total", "page"],
  data(){
    return {
    }
  },
  methods:{
    format_date: function(dt: Date){
      try{
        const y = dt.getFullYear();
        const m = ('00' + (dt.getMonth()+1)).slice(-2);
        const d = ('00' + dt.getDate()).slice(-2);
        return (y + '-' + m + '-' + d);
      }catch{
        console.log("ERROR unkown datetime", dt)
        return "0000-00-00"
      }
    }
 }
}
</script>

<style scoped>
.page-view{
  margin:0px 0px 15px 0px;
  width: 90%;
  max-width: 800px;
  height: 180px;
  overflow: hidden;
  position: relative;
  border-radius: 15px;
  border: solid 1px #aaa;
  padding : 11px;
  display:flex;
}

.thumb-wrapper{
  margin-right:20px;
}

.thumb{
  margin:0;
  padding:0;
  height: 150px;
  width: 180px;
  padding-right: 8px;
  padding-bottom: 8px;
}

.page-title{ margin:0; }
.page-title a {
  font-weight:bold;
  font-size: 1.2rem;
  text-decoration: none;
  padding-top:0px;
  color:#fff;
  margin:0px;
  padding:0px;
  border:none;
}

.page-desc{
  font-size: 0.9rem;
  color:#eee;
  text-decoration: none;
  padding-top:0px;
  margin:3px;
  border:none;
}

.date,
.category{
  padding:4px;
  margin:3px;
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


</style>
