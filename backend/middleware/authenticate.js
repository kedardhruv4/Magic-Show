const jwt = require("jsonwebtoken")
const User = require("../model/user")

module.exports = {
 check: async function (req, res, proceed) {
  // console.log('inside policy authenticate User');

  let response = {}
  response.status = ""
  response.data = ""
  response.error = ""
  response.message = ""

  const headerToken = req.header("authorization")
  if (!headerToken) {
   return res.status(400).json({
    status: 400,
    message: "Token is Required!"
   })
  } else {
   const token = headerToken.split(" ")
   console.log("token", token)
   if (token[1]) {
    console.log("inside")
    jwt.verify(token[1], "secret", async (error, decoded) => {
     if (error) {
      return res.status(400).json({
       status: 400,
       message: "Invalid Token"
      })
     }

     if (decoded) {
      let user = null
      try {
       user = await User.findOne({ authToken:token })
       console.log("user: ", user)
      } catch (error) {
       return res.status(400).json({
        status: 400,
        message: "token",
        error: error
       })
      }

      console.log("user", user)
      if (user) {
       if (user.type !== "A" && user.type !== "U") {
        return res.status(400).json({
         status: 400,
         message: "You are not a user!"
        })
       }

       if (user.isDeleted) {
        return res.status(400).json({
         status: 400,
         message: "You are deleted!"
        })
       }

       req.headers.decodedToken = user
       // console.log(` ID ${req.headers.decodedToken.id}`);

       return proceed()
      } else {
       return res.status(400).json({
        status: 400,
        message: "You Have Been Logged Out!"
       })
      }
     }
    })
   }
  }
 }
}
