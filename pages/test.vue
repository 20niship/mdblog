<template>
<section>
<Loader v-if="render.loader" />
<meta name="viewport" content="width=device-width,initial-scale=0.7,minimum-scale=0.7, maximum-scale=1.0" />
<component :is="'script'" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/codemirror.js"></component>
<component :is="'script'" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/mode/markdown/markdown.js" ></component>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/codemirror.min.css" >
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/theme/monokai.min.css" >

<component :is="'script'" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.18.2/codemirror.min.js"></component>
<component :is="'script'" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.18.2/addon/mode/overlay.min.js"></component>
<component :is="'script'" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.18.2/mode/markdown/markdown.min.js"></component>
<component :is="'script'" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.18.2/mode/gfm/gfm.min.js"></component>
<component :is="'script'" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.18.2/addon/edit/continuelist.min.js"></component>
<component :is="'script'" src="http://cdnjs.cloudflare.com/ajax/libs/marked/0.3.5/marked.min.js"></component>

<main  class="main" id="main">
<div class="editor">
<textarea id="editor"></textarea>
</div>

<div class="preview">
<iframe id="preview"></iframe>
</div>
</main>

</section>
</template>

<script setup lang="ts">
const route = useRoute()
const page_title= "【PA】REAPERの日本語化";
const { data }= await useFetch("/api/page/get", { method:"POST", body:{title: page_title} })
const page = data.value;
</script>


<script lang="ts">
import md2html from '../backend/md';

export default {
  data(){
    return  {
      render:{loader: true},
      username: "test",
      editable : true,

      ctx:{
        editor:undefined,
        preview: undefined,
        cm: undefined,
      }
    }
  },
  
  mounted(){
    this.ctx.editor = document.getElementById("editor");
    this.ctx.preview= document.getElementById("preview");
    this.setup_cm();
    this.setDefaultText();
  },
  methods:{
    setDefaultText : async function() {
      try {
        console.log("Getting page data.....")
        /* await this.ctx.cm.setValue(this.page.content); */
        this.ctx.cm.setValue(this.page?.content || "");
        this.render.loader = false;
      } catch (e: any) {
        console.log("Error: ", e)
      }
    },

    setup_cm: function(){
      this.ctx.cm = CodeMirror.fromTextArea(this.ctx.editor, {
          /* styleActiveLine: true, */
          /* mode: 'text/markdown', */
          mode: 'markdown',
          theme: 'monokai',
          lineNumbers: true,
          // KeyMap : "vim",
          /* matchBrackets: true, */
          /* showCursorWhenSelecting: true, */
          /* highlightFormatting: true, */
          /* fencedCodeBlockHighlighting:true, */
          /* smartIndent:true, */
          /* newlineAndIndentEnter : true, */
          /* /1* lineWrapping: true, *1/ */
          /* /1* // theme: "default", *1/ */
          /* extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"} */
      });
    }
  }
}
</script>

<style >
main{
  width:100%;
  height:100%;
  display:flex;
  /* padding-top: 50px; */
  /* margin-right: 400px; */
}
.CodeMirror {
  height: 100%;
  width: 100%;
  position: relative;
}
.editor,
#editor,
.preview {
  height: 100%;
  height: calc(100% - 50px);
  width: 50%;
  padding-bottom: 0;
}
.preview #preview {
  height: 100%;
  width: 100%;
  border: none;
  background-color: #fff;
}

.menu {
  width: 300px;
  border-right: 1px dotted #999;
  border-bottom: 1px dotted #999;
}



/*----------------------------------------------------------
                    Codemirror Settings
----------------------------------------------------------*/
.CodeMirror {
    font-size: 15px;
    width: 100%, ;
    height: 100%;
  }

.CodeMirror-scroll { 
  height: 100%; overflow-y: hidden; overflow-x: auto;
}
.CodeMirror * {
  font-size: 1.0rem;
}

.list-line.list-line-1.CodeMirror-line {
  padding-left: 1.3em;
  text-indent: -1.3em;
}

.list-line.list-line-2.CodeMirror-line {
  padding-left: 2.4em;
  text-indent: -2.4em;
}

.list-line.list-line-3.CodeMirror-line {
  padding-left: 3.5em;
  text-indent: -3.5em;
}

/*----------------------------------------------------------
                    Header
----------------------------------------------------------*/
.edit-header{
background-color: #444;
border-bottom: solid 1px #fff;
position: fixed; 
top: 0px;
left: 0px; 
width: 100%;
height: 85px;
z-index: 10;
}
.title-edit-area{
  margin-left: 15px;
}

.title-edit-area span{
font-size: 1.1rem;
}
.title-edit-area input{
font-size: 1.4rem;
font-weight:bold;
background-color: #000;
color:#fff;
}

.page-title-editor{
  font-weight: bold;
  font-size: 1.3rem;
}

.editor-logo{
width:20px;
margin-left: 20px;
margin-top:3px;
}
.editor-title{
font-size: 1.2rem;
text-align: center;
margin:0;
padding:0;
}

.nodisplay{
display: none;
}

.menu-btn-list label i,
.menu-btn-list label a i{
color:#fff;
}

.menu-btn-list label {
border: 2px solid #999;
border-radius: 3px;
text-align: center;
font-size:15px;
padding:3px 15px;
display: inline-block;
}

.menu-btn-list input:checked + label,
.menu-btn-list input:checked + label i {
color: #000;
background-color: #ddd;
}

.menu-btn-list label:hover {
  border: 2px solid #ddd;
  cursor: pointer;
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

.editor-mode-label{
  padding:5px;
  width:40px;
  height:30px;
}

.editor-mode-label i{
  font-size: 20px;
  line-height:30px;
}
</style>
