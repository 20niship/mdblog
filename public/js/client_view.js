const setType = (url) => {
  const base = url.split("/")[1]
  switch(base){
    case "search":
    case "config":
    case "api":
      return base;

    case "view":
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      if(params["action"] === "edit"){
        return "edit";
      }else{
        return "view";
      }
    default:
      return "unknown"
  }
}


let status={
  type : setType(decodeURIComponent(document.location.pathname)),
  title_txt: decodeURIComponent(document.location.pathname.split("/view/")[1]),
  c_date: "",
  m_date: "",
  categories: "",
  text:""
}

console.log(status)

const loadText = async() => {
  let toc = document.getElementById("toc");
  let main_wrapper = document.getElementById("post-content");
  const post = main_wrapper.innerHTML;
  if(post.length > 500 && post.indexOf("<markdown>[:notoc{}]</markdown>") < 0){
    if(status.title_txt.indexOf("作業日誌") > 0){
      createCalenderToc(main_wrapper, toc)
    }else{
      createSimpleToc(main_wrapper, toc)
    }
  }
  main_wrapper.innerHTML = RenderEmbed(main_wrapper.innerHTML);
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

if(status.type === "view"){
  loadText()
}

window.onload=()=>{
  // Tex記法の数式をきれいに表示する
  MathJax.Hub.Config({
    TeX: { equationNumbers: { autoNumber: "AMS" } },
    tex2jax: {
      inlineMath: [['$', '$'], ["\\(", "\\)"]],
      processEscapes: true
    },
    "HTML-CSS": { matchFontHeight: false },
    displayAlign: "left",
    displayIndent: "2em"
  });
  // プログラムのハイライト
  hljs.highlightAll();

}

const isSmartPhone = () => {
  if (window.matchMedia && window.matchMedia('(max-device-width: 900px)').matches) {
    return true;
  } else {
    return false;
  }
}

/**********************   Sidebar Settings    **************************** */
const setSidebars = () => {

const side_content = document.getElementById("sidenav-content")

const side_history = document.getElementById('sidenav_history');
const side_search = document.getElementById('sidenav_search');
const side_star = document.getElementById('sidenav_star');
const side_mypage = document.getElementById('sidenav_mypage');
const side_myedit = document.getElementById('sidenav_myedit');

// Deafult
setDefaultSidebar = async(e) => {
  const response = await fetch("/api/page", {
    method:"POST", headers: {'Content-Type': 'application/json'},
    body:JSON.stringify({query:`get`, page_title:"sidebar", format:"txt_html"})
  })
  if(response.ok){
    let text = await response.text()
    text = RenderEmbed(text)
    side_content.innerHTML = "<h1>Custom Sidebar</h1>" + text;
  }else if(response.status === 404){
    side_content.innerHTML = "<p>カスタムサイドバーが定義されていません</p><p><a href='/view/sidebar'>sidebar</a>に書いた内容がここにデフォルトで表示されます"
  }else{
    side_content.innerHTML = "<p>サーバーとの接続でエラーがありました</p>"
  }
};

if(isSmartPhone()){
  side_history.onclick = (e)=>{ document.location.href = "/search?sort=update_r"; }
  side_search.onclick = (e) => { document.location.href = "/search?sort=update_r"; }
  side_star.onclick = (e)=>{ document.location.href = "/search?favorite=true&format=tile"; }
  side_mypage.onclick = (e)=>{ document.location.href = "/mypage"; }
  side_myedit.onclick = (e)=>{ alert("501 - Not Implemented Error") }
}else{
  side_history.onclick = async(e)=>{
    const response = await fetch("/api/pagesearch?sort=update_r&format=tile");
    if(response.ok){
      side_content.innerHTML = "<h1>Recently Edited</h1>" + await response.text();
    }
  }
  
  side_search.onclick = async(e) => {
    const response = await fetch("/search?n=0");
    if(response.ok){
      let temp_element = document.createElement("div");
      temp_element.innerHTML = await response.text();
      const search_form = temp_element.getElementsByTagName("form")[1];
      side_content.innerHTML = `<form action="/search">${search_form.innerHTML}</form>`;
    }
  }
  
  side_star.onclick = async(e)=>{
    const response = await fetch("/api/pagesearch?favorite=true&format=tile");
    if(response.ok){
      side_content.innerHTML = "<h1>Your Favorites</h1>" + await response.text();
    }
  }
  
  side_mypage.onclick = (e)=>{
    document.location.href = "/mypage";
  }
  
  
  side_myedit.onclick = async(e)=>{
    alert("501 - Not Implemented Error")
  }
}

setDefaultSidebar();
}


const create_new_page = async(baseDir, type) => {
  const title = baseDir + document.getElementById(`f_page_title_${type}`).value;
  const err_el = document.getElementById("create-new-page-err-msg");
  const response = await fetch("/api/page/create", {
    method:"POST", headers: {'Content-Type': 'application/json'},
    body:JSON.stringify({title})
  })
  if(response.status === 403){
    err_el.innerText = `[ ERROR ] 記事　${title}　は既に存在します`
  }else if(!(response.ok)){
    err_el.innerText = "[ ERROR ] サーバーと接続できません。"
  }else{
    MyMessage({msg:"記事を作成しました"})
    const js = await response.json();
    document.location.href = "/view/" + js.url + "?action=edit"
  }
}

setSidebars();

/**********************   Sidebar Settings    **************************** */
const favorite = async() =>{
  const response = await fetch("/api/extra?query=togglefavorite&page_title=" + status.title_txt);
  if(response.ok){
    const jmsg = await response.json();
    const el = document.getElementById("lgtm-btn-icon");
    console.log(el.classList)
    if(jmsg.nowFavo){
      el.classList.add("fas")
      el.classList.remove("far")
      await MyMessage({msg:"お気に入りに登録完了", type:"simple", "duration":2000})
    }else{
      el.classList.add("far")
      el.classList.remove("fas")
      await MyMessage({msg:"お気に入りから削除完了", type:"simple", "duration":2000})
    }
  }else{
    await MyMessage({msg:"お気に入り失敗。ログインして下さい", "duration":2000})
  }
}





