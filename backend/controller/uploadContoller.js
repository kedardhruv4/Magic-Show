const multer = require("multer")
const Content = require("../model/content")
const path = require("path")
const cloudinary = require("cloudinary").v2
const { v4: uuidv4 } = require("uuid")
// const UUID = uuidv4();

module.exports = {
 upload: async function (req, res) {
  try {
   const tokenData = req.headers.decodedToken

   let insertData = req.body

   let pathFile = path.join(__dirname, req.file.path)
   //
   let filePath = req.file.path

   // return res.status(200).json({
   //   status: 200,
   //   message: "Content Uploaded Successfully!",
   //   // data: createContent,
   // });

   // Configuration
   cloudinary.config({
    cloud_name: "dyom5co32",
    api_key: "753479431684459",
    api_secret: "SgyWECDcHuUlTlSJniG2w3bu2Fs"
   })

   // Upload
   cloudinary.uploader
    .upload(filePath, {
     resource_type: "video",
     chunk_size: 6000000,
     //  function(result){
     //

     //  }
     public_id: uuidv4(),
     //  folder: inputs.destinationDir,
     use_filename: true
    })
    .then(async (data) => {
     // Generate
     const url = cloudinary.url(data.public_id, { resource_type: "video" })

     let createData = {
      title: insertData.title,
      description: insertData.description,
      type: insertData.type,
      isFree: insertData.isFree,
      userId: tokenData.id,
      filePath: data.url,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: Math.floor(Date.now() / 1000),
      createdBy: tokenData.id,
      updatedBy: tokenData.id,
      isView: tokenData?.type === "A"
     }

     let pathFile = path.join(__dirname, req.file.path)
     let createContent = await Content.create(createData)

     return res.status(200).json({
      status: 200,
      message: "Content Uploaded Successfully!",
      data: createContent
     })
    })
    .catch((error) => {
     return res.status(500).json({
      status: 500,
      error: error,
      message: "server error"
     })
    })
  } catch (error) {
   return res.status(500).json({
    status: 500,
    error: error.msg,
    message: "server error"
   })
  }
 },
 get: async function (req, res) {
  try {
   const tokenData = req.headers.decodedToken

   let findData = {
    isView: true,
    type: req.query.type,
    isActive: true,
    isDeleted: false
   }
   let { page, limit } = req.query

   if (tokenData.isPaid === false || tokenData.isPaid === "false") {
    findData.isFree = true
   }

   let createContent = await Content.find(findData)
    .limit(limit * 1)
    .skip((page - 1) * limit)
   console.log("createContent: ", createContent)

   // get total documents in the Posts collection
   const count = await Content.countDocuments(findData)

   return res.status(200).json({
    status: 200,
    message: "hey there!",
    count: count,
    data: createContent,
    totalPages: Math.ceil(count / limit),
    currentPage: page
   })
  } catch (error) {
   return res.status(500).json({
    status: 500,
    error: error.msg,
    message: "server error"
   })
  }
 },

 getById: async function (req, res) {
  try {
   const tokenData = req.headers.decodedToken
   let findData = {
    _id: req.query.id,
    isActive: true,
    isDeleted: false
   }

   let createContent = await Content.find(findData)
   if (!createContent.length) {
    return res.status(400).json({
     status: 400,
     message: "Content not found"
    })
   }
   return res.status(200).json({
    status: 200,
    message: "hey there!",
    data: createContent
   })
  } catch (error) {
   return res.status(500).json({
    status: 500,
    error: error.msg,
    message: "server error"
   })
  }
 },

 delete: async function (req, res) {
  try {
   const tokenData = req.headers.decodedToken
   let findData = {
    _id: req.query.id,
    userId: tokenData.id,
    isActive: true,
    isDeleted: false
   }

   let createContent = await Content.findByIdAndUpdate(
    findData,
    { $set: { isActive: false, isDeleted: true } },
    { new: true }
   )

   if (!createContent) {
    return res.status(400).json({
     status: 400,
     message: "Content not found"
    })
   }

   return res.status(200).json({
    status: 200,
    message: "Content Deleted Successfully!",
    data: createContent
   })
  } catch (error) {
   return res.status(500).json({
    status: 500,
    error: error.msg,
    message: "server error"
   })
  }
 },

 update: async function (req, res) {
  try {
   const tokenData = req.headers.decodedToken
   let findData = {
    _id: req.query.id,
    userId: tokenData.id,
    isActive: true,
    isDeleted: false
   }

   //find content
   let findContent = await Content.findById(findData)
   if (!findContent) {
    return res.status(400).json({
     status: 400,
     message: "Content not found"
    })
   }
   let createContent = await Content.findByIdAndUpdate(
    findData,
    { $set: { title: req.body.title, description: req.body.description } },
    { new: true }
   )

   return res.status(200).json({
    status: 200,
    message: "Content Deleted Successfully!",
    data: createContent
   })
  } catch (error) {
   return res.status(500).json({
    status: 500,
    error: error.msg,
    message: "server error"
   })
  }
 },

 coverImg: async function (req, res) {
  try {
   const tokenData = req.headers.decodedToken

   let insertData = req.body
   let filePath = req.file.path

   // return res.status(200).json({
   //   status: 200,
   //   message: "Content Uploaded Successfully!",
   //   // data: createContent,
   // });

   // Configuration
   cloudinary.config({
    cloud_name: "dyom5co32",
    api_key: "753479431684459",
    api_secret: "SgyWECDcHuUlTlSJniG2w3bu2Fs"
   })

   // Upload
   cloudinary.uploader
    .upload(filePath, {
     public_id: uuidv4(),
     use_filename: true
    })
    .then(async (data) => {
     // Generate
     //  const url = cloudinary.url(data.public_id, {})

     let createData = {
      coverImg: data.url,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: Math.floor(Date.now() / 1000),
      createdBy: tokenData.id,
      updatedBy: tokenData.id
     }

     let createContent = await Content.findByIdAndUpdate(
      { _id: insertData.id },
      { $set: createData },
      { new: true }
     )

     return res.status(200).json({
      status: 200,
      message: "Content Uploaded Successfully!",
      data: createContent
     })
    })
    .catch((error) => {
     return res.status(500).json({
      status: 500,
      error: error,
      message: "server error"
     })
    })
  } catch (error) {
   return res.status(500).json({
    status: 500,
    error: error.msg,
    message: "server error"
   })
  }
 }
}
