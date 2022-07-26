import fs from 'fs';
import readline from 'readline';
import process from 'node:process';
import * as db from "./backend/mongo"
import { Page } from "./backend/global"

process.on('uncaughtException', function(err) {
  // console.log(JSON.stringify(err, null, 4)); // (Optional) beautiful indented output.
  console.log(err);
});

const sleep = (msec: number) => new Promise(resolve => setTimeout(resolve, msec));

const json_file = "../nodejs/hatena_to_markdown_js/output.json";

/*
const insert_pages = async () => {
  console.log("---------     insert items start -------------------")
  const stream = fs.createReadStream(json_file);
  const rl = readline.createInterface({
    input: stream
  });
  const insert_data = async (dataset: Page[]) => {
  }
  let dataset: Page[] = [];
  let iter = 0;
  for await (const line of rl) {
    // const line2 = line.replace(/\bNaN\b/g, "null").replace(/(<([^>]+)>)/gi, "").replace("\n", " ").replace("<br>", " ");
    try {
      let body: Page = JSON.parse(line);
      dataset.push(body);
      console.log("page " , iter, body.title)
      iter++;
    } catch (err: any) {
      console.log(err)
    }
  }
  console.log("inserting...")
  await db.collections.pages?.insertMany(dataset);
  console.log("Done!")
}
*/

const insert_pages = async () => {
  console.log("---------     insert items start -------------------")
  const txt = fs.readFileSync(json_file);
  const pages: { page: Page[] } = JSON.parse(txt.toString());
  console.log("inserting...")
  console.log("Page size = ", pages.page.length);
  for (let i = 0; i < 5; i++) console.log(pages.page[i].title);

  await db.collections.pages?.insertMany(pages.page);
  console.log("Done!")
}
const main = async () => {
  console.log("Sleeping (waiting for mongoDB connection).......");
  await sleep(2000);
  await db.delete_all_pages();
  await insert_pages();
}

main()

