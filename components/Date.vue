<template>
<a :href='"/search?d=" + date' class="date"><i class="fas fa-clock icon"></i>{{ fd }}</a>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

const format_date = (dt_:string) => {
  try{
    const dt = new Date(dt_);
    const y = dt.getFullYear();
    const m = ('00' + (dt.getMonth()+1)).slice(-2);
    const d = ('00' + dt.getDate()).slice(-2);
    return (y + '-' + m + '-' + d);
  }catch{
    console.log("ERROR unkown datetime", dt_)
    return "0000-00-00"
  }
}

</script>

<script lang="ts">
export default{
  props: ["date"],
  data(){ return {fd :this.format_date(this.date)} }
}
</script>


<style scoped>
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
</style>
