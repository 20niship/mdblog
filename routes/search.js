const dbObj = require("../backend/database");
const config = require("../backend/config");
const router = require("express").Router();

router.get("/", async(req, res) => {
  // 検索に使われるパラメータ
  // q : 検索用語
  // p : page 1からスタート
  // n : 表示数
  // c : カテゴリー
  // ds : 投稿日のスタート（date start）
  // de : 投稿日のエンド(date end)

  // s : sort (0:デフォルト（検索語区順位）、d:日程, v:Visited, s:Stard, ) dr, vr, sr (reverse)がついたときには逆順
  const params = req.query;
  for(i in params){ console.log(i);  if(params[i] === ""){ delete params[i]; } }
  let search_query= {};
  const default_hit_size = 20;
  const max_hit_size = 50;
  search_query["size"] = Math.min(max_hit_size, params?.n || default_hit_size)
  search_query["from"] = (params?.page || 0) * search_query["size"];
  switch(params?.s && 0){
    case "0": break;
    case "d":  search_query["sort"] = { "create_time ": { "order": "desc" } }; break;
    case "dr": search_query["sort"] = { "create_time ": { "order": "asec" } };break;
    case "v":  search_query["sort"] = { "view_count": { "order": "desc" } };break;
    case "vr": search_query["sort"] = { "view_count": { "order": "asec" } };break;
    case "s":  search_query["sort"] = { "lgtm_count": { "order": "desc" } };break;
    case "sr": search_query["sort"] = { "lgtm_count": { "order": "asec" } };break;
  }

   const default_search_query = {bool: {should:[], filter:[]}};
   search_query["query"] =default_search_query; 
   if("q" in params) search_query.query.bool.should.push({"match":{"title" : params.q}});
   if("c" in params) search_query.query.bool.filter.push({"match":{"tag" : params.c}});
   if("ds" in params) search_query.query.bool.filter.push({"range": {"create_time": {"gt": params.ds}}});
   if("de" in params) search_query.query.bool.filter.push({"range": {"create_time": {"lt": params.de}}});

   if(search_query.query.bool.should === [] && search_query.boolfilter === []) { 
     search_query["query"] ={"match_all":{}}; 
   }

  console.log(JSON.stringify(search_query, null, 4));
//     if("drange" in params ){
//     const temp = decodeURIComponent(params["drange"])
//     const reg_str = /([0-9]{4})\/([0-9]{2}) \- ([0-9]{4})\/([0-9]{2})/
//     console.log(temp);
//     params["dstart"] = temp.replace(reg_str, "$1-$2-01") 
//     let dy = parseInt(temp.replace(reg_str, "$3"));
//     let dm = parseInt(temp.replace(reg_str, "$4"));
//     if(dm === 12){dy += 1; dm= 1;}else{dm += 1}
//     params["dend"] = `${dy}-${('000' + dm).slice(-2)}-01` 
//   }
//   }

  const hits = await dbObj.custom_search(search_query);
  const hits_formatted = hits.map(e => { return {
    title  : e._source?.title|| "",
    icon   : e._source?.icon || "",
//    user   : e._source?.user,
    c_date : e._source?.create_time || "0000-00-00",
    m_date : e._source?.update_time || "0000-00-00",
    edit_count : e._source?.edit_count || 0,
    lgtm_count : e._source?.lgtm_count || 0,
    content_short :"hoge", 
    // content_short : e._source?.text_markdown.slice(10) || "no content",
    tag : e._source?.tag || []
  }});


  const data = {
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
    render_goto_top:config.pages.render_goto_top,
    render_lgtm_btn:config.pages.render_lgtm_btn,
    hits:hits_formatted,
    nfound : hits.length,
    nresult : hits.length,
    query:params
  };
  
  res.render("list.ejs", data);
})


module.exports = router;
