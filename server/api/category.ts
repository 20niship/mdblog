import * as mongo from "../../backend/mongo";

export default defineEventHandler(async (event) => {
  try {
    const col = mongo.get_collections().pages;
    const pipeline = [
      { $match: {} },
      { $group: { _id: "$tag", count: { $sum: 1 } } }
    ];
    const aggCursor = col.aggregate(pipeline);
    let res = [];
    for await (const doc of aggCursor || []) res.push(doc);
    return { tags: res }
  } catch {
    console.error("JSON Parse error, input = ", event.req.body)
    return {}
  }
})

