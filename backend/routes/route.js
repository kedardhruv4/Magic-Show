const express = require("express")
const route = express.Router()
const auth = require("../middleware/authenticate")
// used for storing product image file
const multer = require("multer")
const upload = multer({ dest: "uploads", limits: 1500000000 })
// const upload = require("../multerConfig");

const userRoute = require("../controller/userController")
const adminRoute = require("../controller/adminContoller")
const preferenceRoute = require("../controller/preferenceController")
const uploadRoute = require("../controller/uploadContoller")

//user routes
route.post("/api/user/register", userRoute.register)
route.post("/api/user/login", userRoute.login)
route.post("/api/user/logout", auth.check, userRoute.logout)
route.post("/api/user/change-psw", auth.check, userRoute.changePassword)
route.put("/api/user/subscribe", auth.check, userRoute.subscribe)

//admin routes
route.post("/api/admin/register", adminRoute.register)
route.post("/api/admin/login", adminRoute.login)
route.post("/api/admin/logout", auth.check, adminRoute.logout)
route.get("/api/users", auth.check, adminRoute.getUsers)

//preference routes
route.post("/api/preference/add", auth.check, preferenceRoute.add)
route.get("/api/preference/get", auth.check, preferenceRoute.get)
route.put("/api/preference/update", auth.check, preferenceRoute.update)

//upload routes
route.post(
 "/api/movies/add",
 upload.single("files"),
 auth.check,
 uploadRoute.upload
)
route.get("/api/content/get", auth.check, uploadRoute.get)
route.get("/api/content/getById", auth.check, uploadRoute.getById)
route.put("/api/content/update", auth.check, uploadRoute.update)
route.delete("/api/content/delete", auth.check, uploadRoute.delete)
route.post(
 "/api/movies/cover",
 upload.single("files"),
 auth.check,
 uploadRoute.coverImg
)

//route export
module.exports = route
