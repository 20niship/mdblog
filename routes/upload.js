
var router = require("express").Router();
var dbObj = require("../backend/database");
const config = require("../backend/config");
const Fstream = require('fs-extra');             // Classic fs
const multer = require("multer");

// ---------------------  multer settings ---------------------------------
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.dirs.mediaFileDir);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${Date.now()}-${file.originalname}`);
    // cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  }
});

const multerFilter = (req, file, cb) => {
  let re = /(?:\.([^.]+))?$/;
  let ext = re.exec(file.originalname)[1];   // "txt"
  if(ext){
    console.log(ext);
    let ext_l = ext.toLowerCase()
    if(config.dirs.acceptUploadFileExtention.includes(ext_l)){
      cb(null, true);
      return;
    }
  }

  cb(("Not accepted format", 400), false);
}

const uploader = multer({
  storage: multerStorage,
  fileFilter: multerFilter
}).single('file');

router.post("/", uploader, function (req, res) {
  console.log(req.file);

  res.send(JSON.stringify(req.file));
})

// // 単一ファイルアップロード
// router.post('/', uploader.single('file'), function(req, res, next) {
//   console.log(req.file);
//   console.log(req.body);
//   res.send('upload success');
// });

// // 追加
// // 複数ファイルアップロード
// router.post('/multiple', uploader.array('files'), function(req, res, next) {
//   console.log(req.files);
//   console.log(req.body);
//   res.send('multiple upload success');
// });


// ---------------------  multi-busboy settings ---------------------------------
const busboy = require('connect-busboy');
router.use(busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
})); 

Fstream.ensureDir(config.dirs.mediaFileDir); 

router.post('/big', (req, res, next) => {
    req.pipe(req.busboy); // Pipe it trough busboy
    console.log(`Upload of '${req.url}' started`);
 
    req.busboy.on('file', (fieldname, file, filename) => {
      console.log(`Upload of '${filename}' started`);
      const fstream = Fstream.createWriteStream(config.dirs.mediaFileDir + "/" + filename);
      file.pipe(fstream);
      fstream.on('close', () => {
          console.log(`Upload of '${filename}' finished`);
          res.redirect('/test');
      });
    });
});

router.get("/test",  function(req, res) {
  res.type('text/html').send(`
  <!DOCTYPE html>
  <html lang="ja"></html>
  <head>
      <meta charset="UTF-8">
      <title>Express.js File Upload</title>
  </head>
  <body>
      <h1>ファイルアップロード</h1>
      <form action="/upload" method="POST" enctype="multipart/form-data">
          <input type="file" name="file">
          <button type="submit">送信</button>
      </form>


      <h1>ファイルアップロード(大容量)</h1>
      <form action="/upload/big" method="POST" enctype="multipart/form-data">
          <input type="file" name="file">
          <button type="submit">送信</button>
      </form>
  </body>
  </html>
  `)
});

module.exports = router;

