const express = require("express")
const router = require("express").Router();
const dbObj = require("../backend/database");
const config = require("../backend/config");
const { user } = require("../backend/config");

router.get("/login", (req, res) => {
  res.render("login.ejs", {msg:""});
})

router.get("/register", (req, res) =>{
  res.render("login.ejs", {msg:""});
})

router.use(express.urlencoded({ extended: true }))
router.use(express.json());

router.post("/login", async(req, res) => {
  if(!("username" in req.body && "password" in req.body)){
    console.log("username of password not defined!")
    res.status(500).render("login.ejs", {type:"error", msg:"ユーザー名とパスワードを入力してください"});
    return;
  }
  let username = req.body.username;
  let password = req.body.password;

  const verified = await dbObj.verify_user(username, password);
  console.log(verified)

  if (!verified){
    res.status(500).render("login.ejs", {type:"error", msg:"ユーザー名またはパスワードが間違っています"});
    return;
  }

  req.session.regenerate((err) => {
    req.session.username = username;
    res.redirect("/")
  })
})

router.post("/register", async(req, res) => {
  if(!("username" in req.body && "password" in req.body && "email" in req.body)){
    res.status(500).render("login.ejs", {type:"error", msg:`無効な入力です。`});
    return; 
  }

  let username = req.body.username;
  let password = req.body.password;

  if(! new RegExp(/^([a-zA-Z0-9]{4,100})$/).test(username)){
    res.status(500).render("login.ejs", {type:"error", msg:`ユーゼー名「${username}」は半角英数字で4〜100文字以内ではありません`});
    return;
  }

  const exit_user = await dbObj.get_user_by_username(username);
  if(exit_user !== {}){
    res.status(500).render("login.ejs", {type:"error", msg:`すでに${username}というユーザー名が存在します。`});
    return;
  }
  
  const results = await dbObj.register_user(username, password); 
  res.send("<h1>Register Finished!</h1><p><a href=\"/user/login\">Please Login</a></p>")
})


router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  }); 
})

module.exports = router;

