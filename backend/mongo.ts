import * as mongoDB from "mongodb";
import {Page} from "./global"

const mongo_pagename = "mongo";
const mongo_pass = "mongoPass";
const authMechanism = "DEFAULT";

const url = `mongodb://${mongo_pagename}:${mongo_pass}@localhost:27017/?authMechanism=${authMechanism}`;

const client = new mongoDB.MongoClient(url);

export const collections: { pages?: mongoDB.Collection } = {}

export const connect = async () => {
  console.log("Connecting to mongodb.....")
  await client.connect();
  const db = client.db("example");
  // const auth_res = await db.authenticate("mongo", "mongopass")
  // console.log(auth_res)
  collections.pages = db.collection("page");
  console.log("Connected!")
}

export const page_list = async () => {
  return await collections.pages?.find({}).toArray();
}

export const get_page_by_url = async (url: string) => {
  return (await collections.pages?.find({ url }).toArray());
}
export const get_page_by_id = async (id: number) => {
  return (await collections.pages?.find({ id }).toArray());
}
export const get_page_by_title = async (title: string) => {
  const pages = await collections.pages?.find({ title }).toArray();
  return pages[0];
}


export const insert_ppage = async (page: Page) => {
  return await collections.pages?.insertOne(page)
}

export const delete_all_pages = async() => {
  collections.pages?.deleteMany({});
}
  //users.deleteone({"age":0});//ageが0のデータを一つ削除
  //users.deletemany({"age":{"$lte": 4}}) //ageが4以下のデータを削除
  // users.deletemany({}) // 全データ削除

  // ====================
  // データ個数を調べる 
  // ====================
export const count_pages = async()=>{
  const res = await collections.pages?.count({});
  console.log("count = ", res);
  return res;
}


export const get_collections = () => { return collections; }

const main = async () => {
  connect();
}

connect();
