<template>
  <a v-for="t in tag" :href='"/search?c=" + t' class="category">{{t}}</a>
</template>

<script lang="ts">
export default{
  props:["tag"]
}
</script>


<style scoped>
.category {
  font-size:0.8rem;
  display: inline-block;
  height: 20px;
  line-height: 20px;
  position: relative;
  margin: 0 16px 8px 10px;
  padding: 0 10px 0 10px;
  background: #ddd;    
  -webkit-border-bottom-right-radius: 3px;    
  border-bottom-right-radius: 3px;
  -webkit-border-top-right-radius: 3px;    
  text-decoration: none;
  font-weight: bold;
  color:#000;
}

.category:before {
  content: "";
  position: absolute;
  top:0;
  left: -9px;
  width: 0;
  height: 0;
  border-color: transparent #ddd transparent transparent;
  border-style: solid;
  border-width: 10px 10px 10px 0;        
}

.category:after {
  content: "";
  position: absolute;
  top: 10px;
  left: 1px;
  float: left;
  width: 5px;
  height: 5px;
  border-radius: 50%;
}
</style>
