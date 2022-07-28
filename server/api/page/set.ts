import * as mongo from "../../../backend/mongo";

export default defineEventHandler(async (event) => {
  let data:string 
  let body: any
  let resMpdel: any
  let statusCode = 201
  let msg = null
  let response = null

  event.req.on('data', chunk => {data = chunk; })

  event.req.on('end', chunk => {
    body = JSON.parse(data);
    console.log(body);
    return {}
  })

  event.res.statusMessage = msg
  event.res.setHeader('Content-Type', 'application/json')
  event.res.end(response)
})

