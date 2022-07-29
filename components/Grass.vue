<template>
<div>
<table class="grass">
<tr v-for= "(dd, y) of d"><td v-for="(ddd, m) of dd">
<div class="grass-td" :style="'opacity:' + ddd || 0. + ';'"></div>
<span class="fukidashi">{{min_year+ y}}/{{m}} - {{ddd * max_commit}}commits</span>
</td></tr>
</table>
</div>
</template>

<script setup lang="ts">
const data = await useFetch('/api/stats', {method:"POST", body:{query:"month_aggregate"}})
const agg = data.data.value;

const get_year = (a : string) => { return parseInt(a.slice(0, 4)); }
const get_month = (a : string) => { return parseInt(a.slice(5)); }
/* const get_min_year = ()=>{ */
/*   let m = 9999; */
/*   for(let a of agg) m = Math.min(get_year(a._id), m); */
/*   return m; */
/* } */
const get_max_commit = () => { return agg.reduce((sum:any, x:any) => Math.max(x.count, sum), 0);}
const get_min_year = () => { return agg.reduce((sum:any, x:any) => Math.min(get_year(x._id), sum), 99999);}
const min_year = get_min_year();
const max_commit = get_max_commit();

let d :number[][] = [];
for(const a of agg){
  const year_offset = get_year(a._id) - min_year;
  const month = get_month(a._id);
  console.log(year_offset, month)
  if(d[year_offset]==undefined) d[year_offset] = [];
  d[year_offset][month-1] = a.count / max_commit;
}

for(let y=0; y<d.length; y++)for(let x=0; x<d[y].length; x++){
  /* if(d[y][x] != undefined) d[y][x] = Math.max(0.1, d[y][x]); */
  if(d[y][x] == undefined) d[y][x] = 0;
}
</script>

<style scoped >
.grass{
  border:none;
  width:95%;
}

.grass td{
  width:95%;
  border:solid 1px #777;
  padding:1px;
}

.grass tr{ 
  width:100%;
  height:20px;
  background-color:#000;
  padding:0;
}

.grass-td{
  background-color:#0f0;
  width:18px;
  height:18px;
  border-radius:3px;
  margin:0;
  padding:0;
}


.grass td{
  position:relative;
}

.fukidashi {
  width:100px;
  z-index:5;
  display: none;
  padding-left:0 5px;
  position: absolute;
  opacity:0.8;
  top: 25px;
  left: 25px;
  padding: 2px;
  border-radius: 5px;
  background:rgba(255, 0, 200, 1.0);
  color: rgba(255, 255, 255, 1.0);
}

.grass td:hover span{
  display: block;
}

</style>


