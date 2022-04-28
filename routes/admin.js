const router = require("express").Router();
const config = require("../backend/config");
const dbObj = require("../backend/database");

const header = {
  description : config.general.description,
  title : config.general.title,
  logined : true,
  icon:config.general.icon,
  admin : true
}

router.get("/performance" , (req, res) => {
  let data = {
    title : config.general.title,
    description : config.general.description,
    username : req.session.username,
    show_no_admin_error : false,
    page_title : "Performance",
  }
  res.render("performance.ejs", data)
})

router.get("/user", async(req, res)=> {
  const users = await dbObj.get_users();
  let data = {
    title : config.general.title,
    description : config.general.description,
    username : req.session.username,
    show_no_admin_error : false,
    page_title : "Config Home",
    page : "user",
    user_list :users 
  }
  res.render("config.ejs", data);
})

router.get("/page", async(req, res)=> {
  const pages = await dbObj.page_all();
  let data = {
    title : config.general.title,
    description : config.general.description,
    username : req.session.username,
    show_no_admin_error : false,
    page_title : "pages",
    page : "page",
    pages : pages
  }
  res.render("config.ejs", data);
})
router.get("/usergroup", async(req, res)=> {
  if(!check_admin_or_404(req, res)){return;}

  const sql = "SELECT * FROM usergroup";
  const con = dbObj.getConnection();
  const [results, fields, err] = await con.query(sql, []);
  if(err){
    res.status(500).send("Internal Server Error")
    return;
  }
  var relation_data = [];

  for(let i =0; i<results.length; i++){
    const r = results[i];
    const sql2 = "select users.user_id, users.user_name, users.user_icon, users.user_admin from users inner join usergroup_relation on usergroup_relation.user_id = users.user_id where usergroup_id = ?"
    const [r2, f, err2] = await con.query(sql2, [r.usergroup_id]);
    if(err2){
      console.log(err2)
    }
    let user_string = "";
    for(j in r2){
      user_string += r2[j].user_name + ",  "
    }
    relation_data.push({
      usergroup_id : r.usergroup_id,
      usergroup_name : r.usergroup_name,
      usergroup_registration : r.usergroup_registration,
      usergroup_enabled : r.usergroup_enabled,
      users : r2,
      user_string:user_string,
      status : !(err || err2),
      err : err + ", " + err2
    })
  }

  let data = {
    title : config.general.title,
    description : config.general.description,
    username : req.session.username,
    show_no_admin_error : false,
    page_title : "Usergroup Concig",
    page : "usergroup",
    relation_data : relation_data
  }
  res.render("../template/config.ejs", data);
})



router.get("/config", (req, res) => {
  if(!check_admin_or_404(req, res)){return;}

  let data = {
    title : config.general.title,
    description : config.general.description,
    username : req.session.username,
    show_no_admin_error : false,
    page_title : "Config Home",
    page : "list",
    config:config,
    user_list : []
  }
  res.render("../template/config.ejs", data);
})


const special_res = (req, res, next) => {
  const type = req.originalUrl.split("/special/")[1]
  let data = {
    title : config.general.title,
    description : config.general.description,
    username : req.session.username,
    show_no_admin_error : false,
    type : type,
    page_title : "Performance",
  }
  res.render("special.ejs", data)
}
router.use(special_res)


module.exports = router;

