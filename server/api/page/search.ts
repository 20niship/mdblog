
import * as mongo from "../../../backend/mongo";

export default defineEventHandler(async (event) => {
  const body = event.req.body;
  const type = body?.type || "list";

  return await mongo.page_list();
})

