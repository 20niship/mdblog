<template> 
<section>
  <p class="h2">Categories</p>
  <div class="chart-wrapper"><Pie :chart-data="chart_category" :chart-options=options /></div>
  <p class="h2">Language</p>
  <div class="chart-wrapper"><Pie :chart-data="chart_lang" :chart-options=options /></div>

</section>
</template> 

<script setup lang="ts">

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)


const bg =  [
  'rgba(255, 99, 132, 0.6)',
  'rgba(54, 162, 235, 0.6)',
  'rgba(255, 206, 86, 0.6)',
  'rgba(75, 192, 192, 0.6)',
  'rgba(153, 102, 255, 0.6)',
  'rgba(255, 159, 64, 0.6)',
  'rgba(100, 255, 184, 0.6)',
];
const bc = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(100, 255, 184, 1)',
];

const data = await useFetch('/api/stats', {method:"POST", body:{query:"all_tags"}})
let all_tags_ = data.data.value?.tags;
all_tags_ = all_tags_.filter((x:any)=> x._id[0] != "");
all_tags_.sort((a, b) => b.count -  a.count);

let all_tags = all_tags_.slice(0, 6);
const rest = all_tags_.slice(7).reduce((sum, el) => {return sum + el.count}, 0);
all_tags.push({_id:["other"], count:rest});

const chart_category = {
  labels: all_tags.map((x : any) => x._id[0]),
  datasets: [
    {
      backgroundColor: bg,
      borderColor: bc,
      borderWidth:1.0,
      data: all_tags.map((x: any)=> x.count)
    },
  ],
};

const lang_data = [
  {_id:["TypeScript"], count:35},
  {_id:["C++"], count:30},
  {_id:["Python"], count:20},
  {_id:["HTML"], count:15},
  {_id:["CSS"], count:15},
]
const chart_lang = {
  labels: lang_data.map((x : any) => x._id[0]),
  datasets: [
    {
      backgroundColor: bg,
      borderColor: bc,
      borderWidth:1.0,
      data: lang_data.map((x: any)=> x.count)
    },
  ],
};

const options = {
    responsive: true,
    legend: {
      display: true,
      position: 'right',
    },
}
</script>

<script lang="ts">
import { Pie } from 'vue-chartjs'
export default {
  components:Pie
}
</script>
