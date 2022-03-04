
const router = require("express").Router();
const express = require("express");
const config = require("../backend/config");
const dbObj = require("../backend/database");

router.use(express.urlencoded({ extended: true }))
router.use(express.json());

router.post("/", (req, res) => {
  res.status(404).send("Page not found!");
})

router.post("/page/get", async(req, res) => {
  let page = {};
  if("url" in req?.body){ page = (await dbObj.get_page_by_url(req.body.url))?._source; }
  else if( "title" in req?.body) { page = (await dbObj.get_page_by_title(req.body.title))?._source; }
  else if("id" in req?.body){ page = (await dbObj.get_page_by_id(req.body.id))?._source; }
  res.status(page ? 200:404);
  res.json(page);
})

router.post("/page/set", async(req, res)=> {
  const url = req?.body?.url || "";
  const title = req?.body?.title;
  const content = req?.body?.content;
  if(url === ""){ res.status(500).send("URL not set!"); return;}
  console.log(url, title, content);
  const result = await dbObj.update_page_content_by_url(url, content);
  if(result?.failures.length === 0){
    res.send("ok");
  }else{
    res.status(500).send("error")
  }
})

router.post("/page/search", async(req, res)=> {
  const title = req?.body?.title;
  const content = req?.body?.content;
  const result = await dbObj.update_page_content_by_title(title, content);
  if(result?.failures.length === 0){
    res.send("ok");
  }else{
    res.status(500).send("error")
  }
})

router.post("/page/list", async(req, res) => {
  const result = await dbObj.custom_search_q(req.body);
  res.json(result);
})

router.post("/page/latest", async(req, res) => {
  const result = await dbObj.custom_search_q({s : "d"});
  res.json(result);
})

router.post("/page/create", async(req, res)=> {
  const title = req?.body?.title || "";
  if(title === ""){
     res.status(500).send("タイトルを入力してください")
  }
  const exist = await dbObj.get_page_by_title(title);
  if(exist){ res.status(403).send("Title already exists"); return }
  
  const content = req?.body?.content || `# ${title} \n\n 編集して記事を作成します`;
  const e = {
    title,
    content,
    create_time : Date.now(),
    update_time : Date.now(),
    edit_count : 0,
    lgtm_count : 0,
  }
  const result = await dbObj.insert_page(e);
  if(result?.result !== "created"){
    res.status(500).send("error")
    return;
  }
  const pageinfo = await dbObj.get_page_by_title(title);
  res.json(pageinfo?._source);
})

router.post("/page/delete", async(req, res)=> {
  const url = req?.body?.url || "";
  if(url === ""){ res.status(500).send("URL not set!"); return; }
  const result = await dbObj.delete_page_by_url(url);
  res.send("deleted!");
})
router.all("/page/category_list", async(req, res)=> {
  cats = await dbObj.get_categories();
  res.json(cats);
})

module.exports = router;

