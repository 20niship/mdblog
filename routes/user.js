const express = require("express")
const router = require("express").Router();
const dbObj = require("../backend/database");
const config = require("../backend/config");

router.get("/login", (req, res) => {
  const data = {
    main : {
      title: "Wiki Sample",
      text : "",
      type:"page"
    },
    icon : {
      shortcut_icon:"",
      apple_touch_icon:"",
      favicon:""
    },
  };
  res.render("login.ejs", data);
})

router.get("/register", (req, res) =>{
  const data = {
    main : {
      title: "Wiki Sample",
      text : "",
      type:"page"
    },
    icon : {
      shortcut_icon:"",
      apple_touch_icon:"",
      favicon:""
    },
  };
  res.render("login.ejs", data);
})

router.use(express.urlencoded({ extended: true }))
router.use(express.json());

router.post("/login", async(req, res) => {
  if(!("username" in req.body && "password" in req.body)){
    logger.a_error("Undefinded parameters found!")
    res.status(500).end()
    return;
  }
  let username = req.body.username;
  let password = req.body.password;
  const verified = await dbObj.verify_user(username, password);
  console.log(verified)

  if (!verified){
    res.status(500).end();
    return;
  }

  req.session.regenerate(function(err) {
    req.session.username = username;
    res.redirect("/view")
  })
})

router.post("/register", async(req, res) => {
  if(!("username" in req.body && "password" in req.body && "email" in req.body)){
    res.status(500).end();return;
  }

  let username = req.body.username;
  let password = req.body.password;

  if(! new RegExp(/^([a-zA-Z0-9]{4,100})$/).test(username)){
    logger.a_error("usernameが半角英数字ではありません")
    res.status(500).send("usernameが半角英数字ではありません");
    return;
  }

  const results = await dbObj.register_user(username, password); 

  console.log(results)
  res.send("<h1>Register Finished!</h1><p><a href=\"/user/login\">Please Login</a></p>")
})


router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  }); 
})

module.exports = router;

