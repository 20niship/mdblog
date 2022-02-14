
var router = require("express").Router();
const config = require("../backend/config");

router.post("/", uploader, function (req, res) {
  res.send("");
})
module.exports = router;

