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
</style>
