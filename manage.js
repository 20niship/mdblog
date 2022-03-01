const config = require("./backend/config");
var dbObj = require("./backend/database");
const bcrypt = require('bcrypt');
const readline = require('readline');
const fs = require("fs");

if(process.argv.length < 3){
  console.log("Please input at least one arg")
  console.log("---------- commands -----------")
  console.log("create_index   :  create indexes ")
  console.log("flush          :  delete all docs from elasticserachindexes")
  console.log("delte_index    :  delete all indexes ")
  console.log("createuser     :  create normal user and save to mysql database")
  console.log("deleteuser     :  delete user")
  console.log("healthcheck    :  healthcheck")
  console.log("json_restore   :  restore page data from json file")
}

/* -------------------------------- */
const getInput = async (msg) => {
  const answer = await question(msg + "> ");
  return answer.trim();
};

const question = (question) => {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise((resolve) => {
    readlineInterface.question(question, (answer) => {
      resolve(answer);
      readlineInterface.close();
    });
  });
};
/* -------------------------------- */


const create_user = async()=> {
  const username = await getInput("username : ");
  const password = await getInput("password : ");
  const email    = await getInput("email    : ");
  const admin    = await getInput("admin(y/n) : ") === "y";

  const hash = bcrypt.hashSync(password, config.backend.salt);
  console.log(username, password, email, admin)

  if(! new RegExp(/^([a-zA-Z0-9]{4,100})$/).test(username)){
    console.error("usernameが半角英数字ではありません")
    return;
  }
    // TOOO: 同名のユーザーが存在するかちぇっく
    // TODO: insert user
}

const delete_user = async()=> {
  const username = await getInput("username : ");
  // TODO: delete user
}

const create_group = async()=> {
    const username = await getInput("username : ");
    // TODO: delete user
}

const flush = async()=> { if( (await getInput("delete all data OK ? y/n")) === "y") { await dbObj.flush(); }}
const create_index = async()=> { if( (await getInput("delete all data OK ? y/n")) === "y") { await dbObj.create_index(); }}
const delete_index = async()=> { if( (await getInput("delete all index OK ? y/n")) === "y") { await dbObj.delete_all(); }}

const healthcheck = async() => {
    await dbObj.check_connection();
    console.log("Database connection  : ", dbObj.is_connected() ? "True" : "False")
}

const json_restore = async() => {
  const fname = await getInput("json file name --> ");
  const data = fs.readFileSync(fname);
  const json_data = JSON.parse(data);
  if(!dbObj.connected){
    console.log("ERROR not connected to database!");
    return;
  }
  if("page" in json_data){
     console.log(`${json_data.page.length} page found! inserting to database ........`);
     for(i = 0; i<json_data.page.length; i++){
       const e = json_data.page[i];
       console.log("title = ", e?.title);
       await dbObj.insert_page(e);
     }
  }else{
    console.log("page key not in json file!! ");
  }

}

(async() => {
  switch(process.argv[2]){
    case "createuser" : await create_user();break;
    case "deleteuser" : await delete_user();break;
    case "creategroup" : await create_group();break;
    case "deletegroup" : await delete_group();break;
    case "flush" : await flush();break;
    case "healthcheck" : await healthcheck();break;
    case "create_index" : await create_index();break;
    case "delete_index" : await delete_index();break;
    case "json_restore" : await json_restore();break;
    default:console.log("not supported input : ", process.argv)
  }
  console.log("Done!!!")

  process.exit(1);
})();


