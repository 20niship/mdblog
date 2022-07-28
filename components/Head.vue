<template>
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" type="text/css" href="/public/css/styles.css" />
  <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">
 
  <!-- ソースコードのハイライト -->

  <!-- Tex形式の数式をきれいに表示する -->
  <component :is="'script'" type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></component>

  <link href="https://vjs.zencdn.net/7.15.4/video-js.css" rel="stylesheet" />
  
  <component :is="'script'" src="/public/js/parser.js" type="text/javascript"></component>
  <component :is="'script'" src="/public/js/toc_creator.js" type="text/javascript"></component>
  <component :is="'script'" src="/public/js/mymessage.js" type="text/javascript"></component>

  <meta name="viewport" content="width=device-width,initial-scale=0.7,minimum-scale=0.7, maximum-scale=1.0" />

  <meta name="description" content="Free Web tutorials">
  <meta name="keywords" content="HTML, CSS, JavaScript">
  <meta name="author" content="John Doe">

  <meta property="og:title" :content= title />
  <meta property="og:type" :content=post >
  <meta property="og:description" :content=description  >
  <meta property="og:url" :content=og_url >
  <meta property="og:image" :content= og_image >
  <meta property="og:site_name" :content= title  >
  <title>{{title}}</title>
</head>
</template>


<script>

const og_title = "title";
const post = "post";
const og_url = "url";
const og_image = "og_image";
const title= "MDBlog -";
</script>
