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
  const hits = await dbObj.custom_search_q(req.query);
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
      icon:config.general.icon,
      admin : true
    },
    render_goto_top:config.pages.render_goto_top,
    render_lgtm_btn:config.pages.render_lgtm_btn,
    hits,
    nfound : hits.length,
    nresult : hits.length,
    query:req.params
  };
  
  res.render("list.ejs", data);
})


module.exports = router;
