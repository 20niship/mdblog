const express = require("express");
const dbObj = require("./backend/database");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const crypto = require('crypto');
const WebSocket = require('ws');
const morgan = require('morgan')

const config = require("./backend/config");

// ユーザー認証
var session = require('express-session');
// const MySQLStore = require('express-mysql-session')(session);
const ESStore = require('./backend/session_store')(session);
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    // resave: false,
    // saveUninitialized: false,
    cookie : {
        path : '/',
        httpOnly : true,
        maxAge : 365 * 24 * 3600 * 1000   // One year for example
    },
    store : new ESStore()
}));

// 304 Not Modifiedレスポンスを返さないようにする
if (process.env.NODE_ENV !== 'production') {
  app.disable('etag')
}

app.use(morgan("dev"))

// テンプレートエンジンの指定
app.set("view engine", "ejs");
app.use("/user", require("./routes/user"))
app.use((req, res, next) => {
  if("username" in req.session){
    next();
  }else if(config.user.EnableAuthentication){
      res.redirect('/user/login');
  }else{
    // req.session.username = "<guest>"
    next();
  }
})

// file cache
if(config.general.expireTime > 0){
  app.all('/public*', function(req, res, next) {
    res.header("Cache-Control", "public, max-age="+config.general.expireTime.toString());
    res.header('Expires', new Date(Date.now() + config.general.expireTime).toUTCString());
    next();
  })
}

app.use('/public', express.static("./public"));
app.use('/view', require("./routes/page"))

app.use("/api", require("./routes/api"))
app.use("/list", require("./routes/search"))
app.use("/search", require("./routes/search"))

app.use("/upload", require("./routes/upload"));
app.all("/mypage",(req, res, next) => {
  if("username" in req.session){
    res.redirect('/view/user/' + req.session["username"]);
  }else{
    res.redirect('/user/login');
  }
});

app.use("/admin", require("./routes/admin"));

app.all("/latest", async(req, res) => {
  const hits = await dbObj.custom_search_q({s:"d"});
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


app.all("/", (req, res) => {
  res.writeHead(302, { 'Location': config.pages.mainPage});
  res.end();
})

// 現在編集中のWebSocketクライアント一覧
// [sodket, verifyed, username, file, createdData]
let clients = []
app.all("/ws-ticket", (req, res) => {
  if(config.user.AllowEditWithoutLogin === true || req?.session?.username){
    let token = crypto.randomBytes(64).toString("hex");
    clients.push({
      socket   : null,
      username :  req?.session?.username || "guest",
      title     : "",
      token    : token,
      created  : Date.now(),
      need_resend : false,
      verified : config.user.AllowEditWithoutLogin
    })
  
    res.send(token);
  }else{
    res.send()
  }
})

io.on('connection', (socket) => {
  const isConnected = (soc)=> {
    return soc && soc.connected //readyState === WebSocket.OPEN
  }

  // Deprecated
  socket.on("verify", (m) => {
    if(config.user.AllowEditWithoutLogin){
      if(isConnected(socket)){ socket.emit("verify", {result:true});}
      return;
    }
    const message = JSON.parse(m)
    token = message.token;
    console.log("verify", message["title"])
    for(i in clients){
      if(clients[i].token === token){
        clients[i].socket = socket;
        clients[i].title = message["title"] || ""
        if(isConnected(socket)){ socket.emit("verify", {result:true})}
        return;
      }
    }
    if(isConnected(socket)){ socket.emit("verify", {result:false})}
  })

  const getSocketIndex = (s, tkn) => {
    return clients.findIndex(({token})=> token === tkn);
  }

  const removeSock = (s) => {
    let index = clients.findIndex(({socket})=> socket === s);
    if(index >= 0){
      clients.splice(index, 1); //delete client
    }
    if(s && s.readyState != WebSocket.CLOSE) {s.close()}
  }

  socket.on('text-change', (m) => {
    console.log("text-change:", clients.length, clients.map(i=>i["title"]))
    let message = JSON.parse(m);
    let index = getSocketIndex(socket, message.token)
    if(index < 0){
      console.log(clients)
      socket.emit("error", "tokenが不正です. サーバーが再起動下可能性があります。現在のページをリロードして下さい")
      removeSock(socket)
      return;
    }
    clients[index].socket = socket;
    for (i in clients) {
      if(clients[i].socket === socket){
        clients[i].title = message.title;
      }
      // if (clients[i].title === socket.title && clients[i].sock !== socket) { 
      if (isConnected(clients[i].socket) && clients[i].socket !== socket && clients[i].title === message.title) { 
        clients[i].socket.emit("text-change", JSON.stringify({message:message.message}));
        console.log("send message!!");
      }
    }
  });


  socket.on('setall', (m) => {
    let message = JSON.parse(m);
    let index = getSocketIndex(socket, message.token)
    if(index < 0){
      console.log(clients)
      removeSock(socket)
      return;
    }
    
    clients[index].socket = socket;
    clients[index].title = message.title;

    for (i in clients) {
      // if (clients[i].title === socket.title && clients[i].sock !== socket) { 
      if (isConnected(clients[i].socket) && clients[i].socket !== socket && clients[i].title === message.title) { 
        clients[i].socket.emit("setall", JSON.stringify({result:true, message:message.message}));
        console.log("send full page_text!!", message.message);
      }
    }
  });

  socket.on('getall', (m) => {
    let message = JSON.parse(m);
    let index = getSocketIndex(socket, message.token)
    if(index < 0){
      console.log(clients)
      removeSock(socket)
      return;
    }
    clients[index].socket = socket;
    clients[index].title = message.title;
    let hasCollabEditor = false;
    for (i in clients) {
      // if (clients[i].title === socket.title && clients[i].sock !== socket) { 
      if (isConnected(clients[i].socket) && clients[i].socket !== socket && clients[i].title === message.title) { 
        clients[i].socket.emit("getall", "");
        console.log("send getall order!!");
        clients[index].need_resend = true;
        hasCollabEditor = true;
      }
    }
    if(!hasCollabEditor){
      socket.emit("setall", JSON.stringify({result:false,msg:""}));
    }
  });


   socket.on("disconnect", () => {
     removeSock(socket);
   });
});

app.use((req, res, next) => {
  res.status(404);
  res.render("error", {code:404, msg:"Page Not Found"})
});

console.log("Server start on port ", config.general.port)
console.log("Mode : ", process.env.NODE_ENV)
http.listen(config.general.port, function() {
  console.log('listening......');
});
