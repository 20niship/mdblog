import * as mongo from "../../../backend/mongo";

export default defineEventHandler(async (event) => {
  const body = JSON.parse(event.req?.body) || {};

  if (body.url != undefined) { return mongo.get_page_by_url(body.url); }

  if (body.title != undefined) { return await mongo.get_page_by_title(body.title);  }

  if (body.id != undefined) { return await mongo.get_page_by_id(body.id); }

  console.error("Undefined get method! title / id / url")
  return {};
})

