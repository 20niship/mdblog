
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
  if( "title" in req?.body) { page = (await dbObj.get_page_by_title(req.body.title))?._source; }
  else if("id" in req?.body){ page = (await dbObj.get_page_by_id(req.body.id))?._source; }
  res.status(page === {} ? 404 : 200);
  res.json(page);
})

router.post("/page/set", async(req, res)=> {
  const title = req?.body?.title;
  const content = req?.body?.content;
  const result = await dbObj.update_page_content_by_title(title, content);
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

module.exports = router;

