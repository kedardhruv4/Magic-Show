const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const moongoose = require("mongoose");
// const bcrypt = require('bcryptjs');
const userRoute = require("./controller/userController");
const contentRoute = require("./controller/uploadContoller");
const videoStorage = "uploads/";
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const route = require("./routes/route");
const cors = require("cors");
// const videoUpload = multer({
//     storage: diskStorage(videoStorage),
//     limits: {
//     fileSize: 10000000 // 10000000 Bytes = 10 MB
//     },
//     fileFilter(req, file, cb) {
//       // upload only mp4 and mkv format
//       if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
//          return cb(new Error('Please upload a video'))
//       }
//       cb(undefined, true)
//    }
// })
moongoose.connect("mongodb://localhost:27017/gitapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.post('/api/register',userRoute.register);
// app.put('/api/login',userRoute.login);
app.post("/api/upload/video", upload.single("video"), async (req, res) => {
  try {
    console.log("file", req.file);
    return res.send(req.file);
  } catch (error) {}
});
app.use("/", express.static(path.join(__dirname, "static")));
app.use(bodyParser.urlencoded({ extended: true }));

//initialize route
app.use("/", route);

app.listen(1337, () => {
  console.log("server up at 1337");
});
