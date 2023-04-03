// const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const User = require("../model/user")
const jwt = require("jsonwebtoken")
module.exports = {
 register: async function (req, res) {
  try {
   console.log(req.body)
   let data = req.body

   if (!data.username) {
    return res.status(400).json({
     status: 400,
     message: "username is required",
     data: {},
     error: {}
    })
   }

   if (!data.email) {
    return res.status(400).json({
     status: 400,
     message: "email is required",
     data: {},
     error: {}
    })
   }

   if (data.password.length < 8 || data.password.length > 16) {
    return res.status(400).json({
     status: 400,
     message: "password must be between 8 to 16 characters",
     data: {},
     error: {}
    })
   }

   //find User
   let findUser = await User.findOne({ email: data.email })

   if (findUser) {
    return res.status(400).json({
     status: 400,
     data: {},
     message: "User Already registerd!"
    })
   }
   let createData = {
    ...data,
    createdAt: Math.floor(Date.now() / 1000),
    updatedAt: Math.floor(Date.now() / 1000)
   }

   //hasing a password
   bcrypt.hash(data.password, 10, async (err, hash) => {
    if (err) {
     console.log("err")
     return err
    }
    createData.password = hash // Here is our encrypted password
    //create user
    let user = await User.create(createData)

    return res.status(200).json({ status: 200, data: user })
   })
  } catch (error) {
   console.log(error)
   return res.status(500).json({
    status: 500,
    error: error.msg,
    message: "server error"
   })
  }
 },

 login: async function (req, res) {
  try {
   console.log(req.body)
   let data = req.body

   let phoneFind = await User.findOne({
    email: data.email
   })

   //Check User Exist or not.
   if (!phoneFind) {
    return res.status(400).json({ status: 400, message: "User not exist!" })
   }
   //compare password
   let match = await bcrypt.compare(data.password, phoneFind.password)

   if (!match) {
    return res.status(400).json({
     status: 400,
     message: "Please enter valid password!"
    })
   }

   const token = jwt.sign({ id: phoneFind.id }, "secret")

   let loginUser = await User.findByIdAndUpdate(
    { _id: phoneFind.id },
    { authToken: token, lastLogin: Math.floor(Date.now() / 1000) },
    { new: true }
   )
   // loginUser = _.omit(loginUser, ['password']);

   return res.status(200).json({
    status: 200,
    data: loginUser,
    message: "You have logged in successfully!"
   })
  } catch (error) {
   console.log(error)
   return res.status(500).json({ status: 500, err: error })
  }
 },

 logout: async function (req, res) {
  try {
   const tokenData = req.headers.decodedToken
   console.log("tokenData: ", tokenData)

   //find and update user
   let finduser = await User.findByIdAndUpdate(
    { _id: tokenData.id, isDeleted: false, isActive: true },
    { $set: { authToken: "" } },
    { new: true }
   )
   console.log("finduser: ", finduser)

   return res.status(200).json({
    status: 200,
    message: "You have been logged out successfully!",
    data: finduser
   })
  } catch (error) {
   console.log(error)
   return res.status(500).json({ status: 500, err: error })
  }
 },
 changePassword: async function (req, res) {
  try {
   console.log(req.body)
   let data = req.body
   const tokenData = req.headers.decodedToken
   if (data.password === data.newPassword) {
    return res.status(400).json({
     status: 400,
     message: "new password can not be same as old password"
    })
   }
   //compare password
   let match = await bcrypt.compare(data.password, tokenData.password)

   if (!match) {
    return res.status(400).json({
     status: 400,
     message: "Please enter valid password!"
    })
   }

   if (data.newPassword.length < 8 || data.newPassword.length > 16) {
    return res.status(400).json({
     status: 400,
     message: "password must be between 8 to 16 characters",
     data: {},
     error: {}
    })
   }

   //hasing a password
   bcrypt.hash(data.newPassword, 10, async (err, hash) => {
    if (err) {
     console.log("err")
     return err
    }
    // Here is our encrypted password
    let updateData = {
     password: hash,
     updatedAt: Math.floor(Date.now() / 1000),
     updatedBy: tokenData.id
    }
    //create user
    let user = await User.findByIdAndUpdate(
     { _id: tokenData.id, isDeleted: false },
     { $set: updateData },
     { new: true }
    )

    return res.status(200).json({
     status: 200,
     data: user,
     message: "Password Changed Successfully!"
    })
   })

   // return res.json({
   //   status: 200,
   //   message: "Password Changed Successfully!",
   //   // data:loginUser
   // });
  } catch (error) {
   console.log(error)
   return res.status(500).json({ status: 500, err: error })
  }
 },

 subscribe: async function (req, res) {
  try {
   const tokenData = req.headers.decodedToken
   const { isPaid, cardInput, cardName, cvv, expDate } = req.query
   console.log(
    "isPaid, cardInput, cardName, cvv, expDate: ",
    isPaid,
    cardInput,
    cardName,
    cvv,
    expDate
   )
   console.log("tokenData: ", tokenData)

   //find and update user
   let finduser = await User.findByIdAndUpdate(
    { _id: tokenData.id, isDeleted: false, isActive: true },
    { $set: { isPaid, cardInput, cardName, cvv, expDate } },
    { new: true }
   )
   console.log("finduser: ", finduser)

   return res.status(200).json({
    status: 200,
    message: "You have been logged out successfully!",
    data: finduser
   })
  } catch (error) {
   console.log(error)
   return res.status(500).json({ status: 500, err: error })
  }
 }
}
