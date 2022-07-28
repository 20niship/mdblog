import * as mongo from "../../../backend/mongo";

export default defineEventHandler(async (event) => {
  console.log(event.req.body);
  try {
    const body = JSON.parse(event.req.body) || {};
    let page :any = {};
    console.log(body)
    if (body.url != undefined) { page = await mongo.get_page_by_url(body.url)[0]; }
    if (body.title != undefined) { page = await mongo.get_page_by_title(body.title); }
    if (body.id != undefined) { page = await mongo.get_page_by_id(body.id)[0]; }

    console.log("page = ", page)
    return page[0];
    console.error("Undefined get method! title / id / url")
  }catch{
    console.error("JSON Parse error, input = ", event.req.body)
    return {}
  }
})

