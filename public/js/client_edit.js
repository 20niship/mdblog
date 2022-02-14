let _is_sidebar_collapsed = true;
let _last_sidebar_type = "";

const side_section_main   = document.getElementById("editor-side-sec-main");
const side_section_loading = document.getElementById("editor-side-sec-loading");


// const timer = 3000    // ミリ秒で間隔の時間を指定
// window.addEventListener('load',function(){
//   setInterval('location.reload()',timer);
// });
var editor = document.getElementById('editor');
var preview = document.getElementById('preview');
var onCmUpdate = null;
var cm;

let decoded_url = document.location.pathname.replace("/view/", "").replace(/(.^\/)*\/+$/gm, "$1");
let title = decodeURI(decoded_url)

function setVisualMode(){
  switch(document.querySelector('input[name="view"]:checked').value){
    case "mode_Both":
      document.getElementsByClassName("editor")[0].style.display = "block";
      document.getElementsByClassName("preview")[0].style.display = "block";
      document.getElementsByClassName("editor")[0].style.width = "50%";
      document.getElementsByClassName("preview")[0].style.width = "50%";
      break;
    case "mode_View":
      document.getElementsByClassName("editor")[0].style.display = "none";
      document.getElementsByClassName("preview")[0].style.display = "block";
      document.getElementsByClassName("preview")[0].style.width = "100%";
      break;
    case "mode_Edit":
      document.getElementsByClassName("editor")[0].style.display = "block";
      document.getElementsByClassName("preview")[0].style.display = "none";
      document.getElementsByClassName("editor")[0].style.width = "100%";
      break;
  }
}


function toggleSidebar(type){
  const close = () => {
    _is_sidebar_collapsed = false;
    document.getElementById("e-sidebar-main-content").style.display = "none";
    document.getElementById("sidebar").style.width ="50px";
    document.getElementById("main").style.marginRight ="50px";
  }

  const open = () => {
    _is_sidebar_collapsed = true;
    document.getElementById("e-sidebar-main-content").style.display = "table-cell";
    document.getElementById("sidebar").style.width ="300px";
    document.getElementById("main").style.marginRight ="300px";
  }

    if(type === _last_sidebar_type && _is_sidebar_collapsed){
      console.log("Close")
      close();
    }else{
      open();
      side_section_main.style.display = "none"
      side_section_loading.style.display = "inline"

      setSideView(type);
      side_section_main.style.display = "inline"
      side_section_loading.style.display = "none"
      _last_sidebar_type = type
    }
}

const setRightsState = async(type, groupid) => {
  if(groupid>0){
    const enabled = document.getElementById(`toggle-${type}-group` + groupid).checked;
    const result =  await fetch("/api/page", {
              method:"POST", headers: {'Content-Type': 'application/json'},
              body:JSON.stringify({query:`set${type}right`, usergroup_id:groupid, state:enabled,page_title:title})
            })
    if(result.ok){
      MyMessage({msg:"グループ設定を変更しました", type:"simple"})
    }else{
      MyMessage({msg:"グループ設定を変更しました", type:"simple"})
    }
  }else{
    const enabled_admin = document.getElementById(`admin-rights-checkbox`).checked;
    const enabled_all = document.getElementById(`all-rights-checkbox`).checked;
    const result =  await fetch("/api/page", {
        method:"POST", headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({query:`set${type}right`, allow_admin:enabled_admin, allow_all:enabled_all, page_title:title})
      })
    if(result.ok){
      MyMessage({msg:"設定を変更しました"})
    }else{
      MyMessage({msg:"設定変更に失敗しました", type:"simple"})
    }
  }
  setSideView(type);
}

const setCategory = async(c) => {
  let new_category = c === "" ? document.getElementById("category-set").value : c;
  if((await MyMessage({title:"カテゴリ追加", msg:`${new_category}を追加しますか？`})) === "ok"){
    const response = await fetch("/api/page", {
      method:"POST", headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({ query:`setcategory`, category:new_category, page_title:title })
    })
    if(response.ok){
      MyMessage({msg:"カテゴリー設定完了", duration:2000})
      setSideView("setting")
    }
  }
}

const deleteCategory = async(c) => {
  let new_category = c === "" ? document.getElementById("category-set").value : c;
  if((await MyMessage({title:"カテゴリ追加", msg:`${new_category}を削除しますか？`})) === "ok"){
    const response = await fetch("/api/page", {
      method:"POST", headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({ query:`deletecategory`, category:c, page_title:title })
    })
    if(response.ok){
      MyMessage({msg:"カテゴリー削除完了", duration:2000})
      setSideView("setting")
    }
  }
}


const pageMove = async() => {
  let new_page_title = document.getElementById("page-move").value;
  save();
  console.log(new_page_title)
  const response = await fetch("/api/page", {
    method:"POST", headers: {'Content-Type': 'application/json'},
    body:JSON.stringify({ query:`move`, page_title:title, new_page_title:new_page_title })
  })
  if(response.ok){
    MyMessage({msg:"ページの移動が完了しました", duration:3000})
    document.location.href = "/view/" + new_page_title;
  }else{
    MyMessage({msg:"エラー！", duration:3000})
  }
}

const pageRemove = async() => {
  const result = await MyMessage({title:"削除しますか？", msg:`${title} を本当に削除しますか？（この操作は戻せません）`, type:"confirm"})
  if(result !== "ok"){return;}

  const response = await fetch("/api/page", {
    method:"POST", headers: {'Content-Type': 'application/json'},
    body:JSON.stringify({ query:`remove`, page_title:title})
  })
  if(response.ok){
    socket.emit("force-finish", JSON.stringify({token:token, title:title}));
    await MyMessage({title:"削除完了", msg:`このページは既に正常に削除されました`, type:"confirm"})
    document.location.href = "/";
  }else{
    MyMessage({msg:"権限がありません"})
  }
}

const setSideView = async(type)=> {
  const image = async() => {
    side_section_main.innerHTML = "<h1>Not implemented</h1>";
  }

  const file = async() => {
    side_section_main.innerHTML = "<h1>Not implemented</h1>";
  }


  const setting = async() => {
    let category_datalist = "";
    let category_list = ""
    let category = ""
    const response = await fetch("/api/component?query=category&format=json")
    if(response.ok){
      const res_json = (await response.json())["categories"];
      console.log(res_json);
      for (i in res_json){
        category_datalist += `<option value="${res_json[i]}">${res_json[i]}</option>`
        category_list += `<div class="category" onclick="setCategory('${res_json[i]}')" style="cursor:pointer;">${res_json[i]}</div>`;
      }
    }

    let current_category = "";
    const response2 = await fetch("/api/page", {
      method:"POST", headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({ query:`getcategory`, page_title:title})
    })
    if(response.ok){
      category = (await response2.json())["categories"];
      console.log(category)
      if(category.length === 0){
        current_category = "<P>カテゴリーなし</P>"
      }else{
        current_category = "<table>"
        for(let i in category){
          current_category += `<tr><td><div class="category">${category[i]}</div></td>
                       <td><button class="form-submit-btn-small" onclick="deleteCategory('${category[i]}')">削除</button></td></tr>`
        }
        current_category += "</table>";
      }
    }
    let html = `
<h1>カテゴリー設定</h1>
<p>カテゴリーを1つ設定して下さい。</p>
<p>現在の設定：</p>${current_category}
<hr>
<br>
<p>設定</p>
<div class="my-form my-form-oneline">
<input type="text" name="category" id="category-set" list="category_datalist" value=${status.categories || ""}>
<datalist id="category_datalist">${category_datalist}</datalist>
<button class="form-submit-btn-small" onclick="setCategory('')">設定</button>
</div>
<br>
<p>現在のカテゴリ一覧</p><p>クリックするとそのカテゴリーがセットされます</p>${category_list}<br><br>
<h1>タイトル変更</h1>
<p>タイトルを変更する際は、一度内容を保存して下さい。</p>
<div class="my-form my-form-oneline">
<input type="text" id="page-move" value=${status.title || ""}>
<button class="form-submit-btn-small" onclick="pageMove()">変更</button>
</div>
<h1>削除</h1>
<p style="color:#f22;">注意：一度削除した記事は復活できません</p>
<div class="my-form my-form-oneline">
<button class="form-submit-btn-small" onclick="pageRemove()">削除する</button>
</div>`;
    side_section_main.innerHTML = html
  }

  const rights = async(type) => {
    let html = ""
    const result = await fetch("/api/page", {
                method:"POST", headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({query:`get${type}right`, page_title:title})
              })
    if(!result.ok){
      html += `<p>データベースとの接続でエラーが発生しました。adminに問い合わせて下さい</p>`
    }else{
      const res_json = await result.json();

      const admin_checked = res_json.admin ? "checked" : "";
      const all_checked = res_json.all ? "checked" : "";
  
      html = `
  <h1>${(type==="edit")?"編集" : "閲覧"}権限設定</h1>
  <p>以下のチェックボックスにチェックをつけるとその人が${(type==="edit")?"編集" : "閲覧"}できます</p>
  <p>Admin/全員のグループをOFFにし、更にグループの設定もOFFにすると、このページの作成者のみが${(type==="edit")?"編集" : "閲覧"}できるようになります</p><br>
  <table><tr><td>Admin</td><td>
  <div class="toggle_switch"><input type="checkbox" id="admin-rights-checkbox" ${admin_checked}  onclick="setRightsState('${type}',-1)" >
  <label for="admin-rights-checkbox"></label></div></td></tr>
  <tr><td>全員</td><td>
  <div class="toggle_switch"><input type="checkbox" id="all-rights-checkbox" ${all_checked} onclick="setRightsState('${type}',-1)" >
  <label for="all-rights-checkbox"></label></div></td></tr>
  </table><br><hr><br>`
      if(res_json.groups.length === 0){
        html += `<p>グループがありません。<a href='/config/usersgroups'>/config/usersgroups</a>ページで
        設定して下さい</p>`
      }else{
        const groups = res_json.groups;
        let table = document.createElement("table");
        const th = document.createElement('tr');
        th.innerHTML = `<th>ID</th><th>name</th><th>check</th>`
        table.appendChild(th)
        for(g in groups){
          let tr = document.createElement('tr');
          const checked = groups[g].ok ? "checked" : "";
          tr.innerHTML = `
<td>${groups[g].usergroup_id}</td><td>${groups[g].usergroup_name}</td>
<td><div class="toggle_switch"><input type="checkbox" name="ss-${type}-group-${groups[g].usergroup_name}"
id="toggle-${type}-group${groups[g].usergroup_id}" onclick="setRightsState('${type}', ${groups[g].usergroup_id})" ${checked}>
<label for="toggle-${type}-group${groups[g].usergroup_id}"></label></div></td>`;
          table.appendChild(tr);
        }
        html += `<table class="side-sec-group-select">${table.innerHTML}</table>`
      }
    }
    side_section_main.innerHTML = html;
  }

  switch(type){
    case "image": await image() ; break;
    case "setting": await setting(); break;
    case "file": await file(); break;
    case "view":
    case "edit":
      await rights(type); 
      break;
  }
}

function updatePreview(content){
    let md = cm.getValue();
    preview.contentWindow.document.open();
    preview.contentWindow.document.write(md2html(md, render_component=false));
    preview.contentWindow.document.close();
}

const save = async() => {
  console.log("saves all!")
  const data = {
    query     : "set",
    page_title: title,
    text      : cm.getValue(),
  };
  const result = await fetch("/api/page", {
    method:"POST", headers: {'Content-Type': 'application/json'},
    body:JSON.stringify(data)
  })
  if (result.ok) {MyMessage({msg:"上書き保存しました", duration:1500, type:"simple"})}
  else {MyMessage({msg:"保存できなかった！！", duration:1500, type:"simple"})}
  
  console.log("Done")
}

const exitWithoutSave = async() => {
  let r = await MyMessage({title:"MDWiki Notification", msg:"保存しますか？", type:"confirm"})
  if(r === "ok"){await save()};
  window.location = window.location.pathname;
}


let token = "";
let socket = "";
let loader = document.getElementById("loader-wrapper");

const setDefaultText = async() => {
  try {
    let response = await fetch("/ws-ticket", {method:"POST"});
    token = await response.text();

    await setupWS();

    response = await fetch("/api/page", {
      method:"POST", headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({query:`get`, page_title:title, format:"txt_markdown"})
    })
    let text = await response.text();
    await cm.setValue(text, "");

    socket.emit("getall", JSON.stringify({token:token, title:title}))
  } catch (e) {
    console.log("Unable to get token : ", e)
  }
};

const setupWS = async() => {
    socket = io.connect(`ws://${document.location.host}`);
    console.log("Connecting to server .......");

    socket.on('connect', function () {
      const isNullJSON = function(obj) {
        return obj && obj.constructor === Object
      }

      socket.emit("verify", JSON.stringify({token:token, title:title}));

      console.log("token = ", token)
      
      socket.on('text-change', (msg)=> {
        console.log(msg)
        var jmsg = JSON.parse(msg);
        let val = document.getElementById('EditorTextArea');

        console.log("remote change!");
        let from    = jmsg.message.from;
        let to      = jmsg.message.to;
        let removed = jmsg.message.removed;
        let text    = jmsg.message.text;

        let insert_str = "";
        text.forEach(t => {
          insert_str += t + "\n";
        })
        insert_str = insert_str.slice(0,-1);


        if(removed.length > 0){
          cm.replaceRange("", from, to, "@ignore")
        }

        if(text.length > 0){
          cm.replaceRange(insert_str, from, to, "@ignore")
        }
      });

      socket.on("getall", function(msg){
        socket.emit("setall", JSON.stringify({token:token, message:cm.getValue(), title:title}));
      })

      socket.on("setall", (msg)=> {
        let jmsg = JSON.parse(msg);
        console.log("get value from websocket")
        if(jmsg.result){
          cm.setValue(jmsg.message, "")
        }
        loader.style.display = "none";
      })

      socket.on("error", async(msg) => {
        await MyMessage({title:"ERROR", msg:msg, type:"confirm"});
        const ok = await MyMessage({title:"NOTICE", msg:"再読込しますか？", type:"confirm"});
        if(ok){
          socket.close();
          document.location.reload()
        }
      })

      socket.on('disconnect',function(msg){//終了を受け取ったらSocket通信を終了する
        console.log(msg);
        socket.disconnect()
      });
    });
}

/**
 * Keyboard shortcut for Hide or show Editor and Preview window
 * CTRL+Shift+O = Open File
 * CTRL+Shift+S = Save File
 * CTRL+Shift+B = Word wrap
 * CTRL+Shift+E = Hide/Show Editor
 * CTRL+Shift+W = Hide/Show Preview
 */


editor.addEventListener ("paste", function (e) {
    console.log(e);
    if (! (e.clipboardData && e.clipboardData.items)) {
        return;
    }
 
    for (var i = 0, len = e.clipboardData.items.length; i <len; i ++) {
        var item = e.clipboardData.items [i];
        if (item.kind === "string") {
            item.getAsString (function (str) {
               //str is the obtained string
            })
        } else if (item.kind === "file") {
            var pasteFile = item.getAsFile ();
            console.log(pasteFile)
           //pasteFile is the obtained file
        }
    }
});

window.onbeforeunload = function(e) {
  e.returnValue = "ページを離れようとしています。よろしいですか？";
}

window.onload = () => {
  toggleSidebar("");
  cm = CodeMirror.fromTextArea(editor, {
      lineNumbers: true,
      styleActiveLine: true,
      mode: 'text/x-markdown',
      theme: 'monokai',
      // KeyMap : "vim",
      matchBrackets: true,
      showCursorWhenSelecting: true,
      highlightFormatting: true,
      fencedCodeBlockHighlighting:true,
      smartIndent:true,
      newlineAndIndentEnter : true,
      lineWrapping: true,
      // theme: "default",
      extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
  });


  // CodeMirror.on(editor, 'vim-keypress', function(key) {
  //   keys = keys + key;
  //   commandDisplay.innerText = keys;
  // });
  // CodeMirror.on(editor, 'vim-command-done', function(e) {
  //   keys = '';
  //   commandDisplay.innerHTML = keys;
  // });
  // var vimMode = document.getElementById('vim-mode');
  // CodeMirror.on(editor, 'vim-mode-change', function(e) {
  //   vimMode.innerText = JSON.stringify(e);
  // });


  cm.on('change', (vm, e)=> {
    updatePreview();
    console.log("get update", e, e.origin)
    if(e.origin !== "@ignore" && e.origin !== "setValue"){
      socket.emit("text-change", JSON.stringify({token:token, message:e, title:title}));
    }
  });

  cm.on("drop", async(cm, e) => {
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
        var start_cursor = cm.getCursor();  //I need to get the cursor position
        cm.replaceSelection(`![${result.originalfilename}](/file/${result.filename})`);
      }else{
        MyMessage({msg:"アップロード失敗"})
      }
      // var xhr = new XMLHttpRequest();
      // xhr.open("post", "/upload", true);
      // xhr.onreadystatechange = function(){
      //      if (xhr.readyState === 4){ // 通信終了
      //         let result = JSON.parse(xhr.responseText);
      //         alert(result);
      //         var start_cursor = cm.getCursor();  //I need to get the cursor position
      //         console.log(start_cursor);  //Cursor position 
      //         cm.replaceSelection(`![${result.originalfilename}](/file/${result.filename})`);
      //      }
      //  };
      //  xhr.send(data);
    }
  })

  setDefaultText();

  // CodeMirror.commands.save = async() => {
  //   await save(); 
  // };
    
  cm.addKeyMap({
    "Ctrl-S":async(cm) => { await save(); },
    "Ctrl-W": (cm) => { exitWithoutSave(); }
  } );

  updatePreview();
  cm.scrollTo(0, 0);
}

