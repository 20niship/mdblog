<template>
<section>
<Loader v-if="render.loader" />
<meta name="viewport" content="width=device-width,initial-scale=0.7,minimum-scale=0.7, maximum-scale=1.0" />

<div class="editor-menu">
  <div class="menu-btn-list">
    <span class="page-title-editor">{{ page_title }}</span>
    <button id="openNav" class="text-button" @click="save()">保存</button>
    <button id="openNav" class="text-button" @click="exitWithoutSave()">終了</button>

    <input type="radio" id="btn_mode_view" name="view" class="nodisplay" value="mode_View" @click="setVisualMode()" >
    <label for="btn_mode_view" class="editor-mode-label"><i class="fas fa-eye"></i></label>
    
    <input type="radio" id="btn_mode_both" name="view" class="nodisplay" value="mode_Both" @click="setVisualMode()" checked>
    <label for="btn_mode_both" class="editor-mode-label"><i class="fas fa-columns"></i> </label>

    <input type="radio" id="btn_mode_edit" name="view" class="nodisplay" value="mode_Edit" @click="setVisualMode()">
    <label for="btn_mode_edit" class="editor-mode-label"><i class="fas fa-pen-nib"></i></label>
  </div>
</div>

<main  class="main" id="main">
<div class="editor" id="editor">
  <codemirror
    v-model="markdown_txt"
    placeholder="Code goes here..."
    :style="{ height: '100%' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    @change="updatePreview"
  />
</div>

<div class="preview">
<iframe id="preview"></iframe>
</div>
<div style="clear:both;"></div>
</main>
<EditorSidebar />

</section>
</template>

<script lang="ts">
import md2html from '../../backend/md';
import { Codemirror } from 'vue-codemirror'
import { markdown} from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'

export default {
  components: { Codemirror },
  setup : async function() {
    const route = useRoute()
    const page_title= route.params?.id || "";
    const { data }= await useFetch("/api/page/get", { method:"POST", body:{title: page_title} })
    const page = data.value;
    return {extensions : [ markdown(), oneDark ],page, page_title, markdown_txt:page.content}
  },
  data(){
    return  {
      render:{loader: true},
      username: "test",
      page_title: this.$route.params?.id || "",
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
    this.updatePreview();
    this.render.loader = false; 
  },

  methods:{
    updatePreview : function() {
      const md = this.markdown_txt;
      this.ctx.preview.contentWindow.document.open();
      this.ctx.preview.contentWindow.document.write(md2html(md));
      this.ctx.preview.contentWindow.document.close();
    },

    save : async function() {
      console.log("saves all!")
      const title = this.page_title;
      const content= this.markdown_txt;
      const result = await ("/api/page/set", {
        method:"POST", headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({ title, content })
      })
      if (result.ok && result.status === 200) 
        Notifications( {group: 'foo',title: '',text: 'Hello user! This is a notification!'});
      else 
        Notifications( {group: 'foo',title: '',text: 'Hello user! This is a notification!'});
      console.log("Done")
    },

    ondrop : async function(cm : any, e: any){
      console.log(e);
      let data = new FormData();
      let files = e.dataTransfer.files;
      let len = 0;
      for(let i=0; i<files.length; i++){
        const extention = files[i].name.split('.').pop().toLowerCase();
        console.log(extention)
        if(["jpg", "gif", "bmp", "png", "mp4", "mp3", "wav", "ogg", "pdf", "bin"].indexOf(extention) >= 0){
          data.append("file", files[i]);
          console.log("Add file")
          len += 1;
        }
      }
      if(len > 0){
        const response =  await fetch("/upload", {
          method:"POST",
          body:data
        })
        if(response.ok){
          MyMessage({msg:"アップロード完了"})
          let result = await response.json();
          console.log(result);
          var start_cursor = this.ctx.cm.getCursor();  //I need to get the cursor position
          this.ctx.cm.replaceSelection(`![${result.originalfilename}](/file/${result.filename})`);
        }else{
          MyMessage({msg:"アップロード失敗"})
        }
      }
    },
  }
}
</script>

<style scoped>
section{
  background:#000;
  z-index:100;
  width: auto; 
  top:80px;
  position:fixed;
  height:calc(100% - 80px);
  /* margin:10px; */
  width: auto;
  /* overflow:hidden; */
}

.editor-menu{
  height:50px;
  width:100%;
}

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
