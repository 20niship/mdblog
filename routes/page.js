
var logger = require("../backend/logger");
var router = require("express").Router();
var dbObj = require("../backend/database");
const config = require("../backend/config");
const ejs = require("ejs");
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
  const page_found = hits.length > 0;
  // console.log(hits)

  if(req.query?.action === "edit" && page_found){
    res.render("editor", { config,  page : { hits,  title }});
    return;
  }

  /*
  const page_id = r[0]["page_id"]
  hasViewRight = await dbObj.hasRight(page_id, "view", req.session.username)
  hasEditRight = await dbObj.hasRight(page_id, "edit", req.session.username)
  */
 console.log("AA = ")
 console.log(hits[0]?.content)
  const text_encoded = page_found ? md2html(hits[0]?._source?.content) : ""

  const hasViewRight = true;
  const hasEditRight = true;
  
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
    main : {
      title:config.general.title,
      text : "",
      type:"page",
      username : req?.session?.username,
      icon:"/file/logo.png"
    },
    page:{
      page_found,
      title : render_title_html(title),
      title_txt : title,
      icon:"",
      html_text : text_encoded,
      user : hits[0]?.user,
      category:hits.map(i => i["category_name"]),
      c_date: formatDate(hits[0]?.create_date) ,
      m_date: formatDate(hits[0]?.update_date),
      page_found, hasViewRight, hasEditRight, 
      render_goto_top : config.pages.render_goto_top,
      render_lgtm_btn : config.pages.render_lgtm_btn,
    },
  };
  res.render("main", data);
});

module.exports = router;
