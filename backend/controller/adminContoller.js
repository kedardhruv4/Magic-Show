// const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const User = require("../model/user")
const jwt = require("jsonwebtoken")
module.exports = {
 register: async function (req, res) {
  try {
   let data = req.body

   if (!data.username) {
    return res
     .status(400)
     .json({
      status: 400,
      message: "username is required",
      data: {},
      error: {}
     })
   }

   if (!data.email) {
    return res
     .status(400)
     .json({ status: 400, message: "email is required", data: {}, error: {} })
   }

   if (data.password.length < 8 || data.password.length > 16) {
    return res
     .status(400)
     .json({
      status: 400,
      message: "password must be between 8 to 16 characters",
      data: {},
      error: {}
     })
   }

   if (!["A"].includes(data.type)) {
    return res
     .status(400)
     .json({ status: 400, message: "type must be admin!", data: {}, error: {} })
   }

   //find User
   let findUser = await User.findOne({ email: data.email })

   if (findUser) {
    return res
     .status(400)
     .json({ status: 400, data: {}, message: "User Already registerd!" })
   }
   let createData = {
    ...data,
    createdAt: Math.floor(Date.now() / 1000),
    updatedAt: Math.floor(Date.now() / 1000)
   }

   //hasing a password
   bcrypt.hash(data.password, 10, async (err, hash) => {
    if (err) {
     return err
    }
    createData.password = hash // Here is our encrypted password
    //create user
    let user = await User.create(createData)

    return res.status(200).json({ status: 200, data: user })
   })
  } catch (error) {
   return res
    .status(500)
    .json({ status: 500, error: error.msg, message: "server error" })
  }
 },

 login: async function (req, res) {
  try {
   let data = req.body

   let phoneFind = await User.findOne({
    email: data.email,
    type: "A"
   })

   //Check User Exist or not.
   if (!phoneFind) {
    return res.status(400).json({ status: 400, message: "User not exist!" })
   }
   //compare password
   let match = await bcrypt.compare(data.password, phoneFind.password)

   if (!match) {
    return res
     .status(400)
     .json({ status: 400, message: "Please enter valid password!" })
   }

   const token = jwt.sign({ id: phoneFind.id }, "secret")

   let loginUser = await User.updateOne(
    { _id: phoneFind.id },
    { $set: { authToken: token, lastLogin: Math.floor(Date.now() / 1000) } }
   )

   let user = await User.findOne({ _id: phoneFind.id }).exec()

   return res
    .status(200)
    .json({
     status: 200,
     data: user,
     message: "You have logged in successfully!"
    })
  } catch (error) {
   return res.status(500).json({ status: 500, err: error })
  }
 },

 getUsers: async function (req, res) {
  try {
   let users = await User.find({ isDeleted: false, isActive: true })

   return res
    .status(200)
    .json({
     status: 200,
     data: users,
     message: "You have logged in successfully!"
    })
  } catch (error) {
   return res.status(500).json({ status: 500, err: error })
  }
 },

 logout: async function (req, res) {
  try {
   const tokenData = req.headers.decodedToken

   //find and update user
   let finduser = await User.findByIdAndUpdate(
    { _id: tokenData.id, type: "A", isDeleted: false, isActive: true },
    { $set: { authToken: "" } },
    { new: true }
   )

   return res.status(200).json({
    status: 200,
    message: "You have been logged out successfully!",
    data: finduser
   })
  } catch (error) {
   return res.status(500).json({ status: 500, err: error })
  }
 }
}
