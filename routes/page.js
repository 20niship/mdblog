
var router = require("express").Router();
var dbObj = require("../backend/database");
const config = require("../backend/config");
const md2html = require("../public/js/parser")

router.get("/", (req, res) => {
  res.writeHead(302, { 'Location': "/view/" + config.pages.mainPage });
  res.end();
})

router.get("/*", async(req, res) => {
  const title = decodeURI(req.url).split("?")[0].slice(1).replace(/(.^\/)*\/+$/gm, "$1")
  console.log("TiTLE=", title);

  if(!dbObj.is_connected()) {
    res.render("error", {code:500, msg:"Internal Server Error"})
    console.log("Not connected to database!!")
    return;
  }
  const hits = await dbObj.get_page_by_title(title);
  const found = hits !== null;
  // console.log(hits)

  if(req.query?.action === "edit" && found){
    res.render("editor", { config,  page : { hits,  title }});
    return;
  }

  /*
  const page_id = r[0]["page_id"]
  has_view_right = await dbObj.hasRight(page_id, "view", req.session.username)
  has_edit_right = await dbObj.hasRight(page_id, "edit", req.session.username)
  */
  // const text_encoded = found ? md2html(hits?._source?.content) : ""
  const text_encoded = found ? md2html(hits?._source?.content) : "";

  const has_view_right = true;
  const has_edit_right = true;
  
  console.log("bb")  
  const render_title_html = (_title) => {
    let title_html = `<a href="/"><i class="fas fa-home"></i>/</a>`;
    let t_s = _title.split("/")
    let t_d = "/view/"
    t_s.forEach(tt => {
      title_html += `<a href=\"${t_d + tt}\">${tt}</a>/`;
      t_d += (tt + "/");
    });
    title_html = title_html.slice(0,-1);
    return title_html;
  }

  const formatDate = (dt) => {
    try{
      var y = dt.getFullYear();
      var m = ('00' + (dt.getMonth()+1)).slice(-2);
      var d = ('00' + dt.getDate()).slice(-2);
      return (y + '-' + m + '-' + d);
    }catch{
      console.log("ERROR unkown datetime", dt)
      // logger.a_error("Unknown datetime --> 0000-00-00")
      return "0000-00-00"
    }
  }
  var data = {
    head : {
      title:config.general.title,
      description:config.general.description,
      keywords: "hogehoge",
      author : "author",
      og_title :  "検索結果 -- " + config.general.title,
      og_url: config.general.url,
      og_image : config.general.icon,
      og_site_name : config.general.title,
      title :   "検索結果 -- " + config.general.title
    },
    header : {
      description : config.general.description,
      title : config.general.title,
      logined : true,
      admin : true
    },
    page:{
      found,
      title : render_title_html(title),
      title_txt : title,
      icon:"/file/logo.png",
      content : text_encoded,
      username : hits?.user,
      category:[hits?._source?.category] || [],
      c_date: formatDate(hits?.create_date) ,
      m_date: formatDate(hits?.update_date),
      found, has_view_right, has_edit_right, 
      render_goto_top : config.pages.render_goto_top,
      render_lgtm_btn : config.pages.render_lgtm_btn,
    },
  };
  console.log(data.page.category)
  res.render("main", data);
});

module.exports = router;
