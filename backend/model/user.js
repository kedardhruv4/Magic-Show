const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
 {
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  authToken: { type: String, default: "" },
  lastLogin: { type: Number },
  isPaid: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Number },
  createdBy: { type: String },
  updatedAt: { type: Number },
  updatedBy: { type: String },
  deletedAt: { type: Number },
  deletedBy: { type: String },
  cardInput: { type: String },
  cardName: { type: String },
  cvv: { type: String },
  expDate: { type: String }
 },
 { collection: "user" }
)

const model = mongoose.model("UserSchema", UserSchema)

module.exports = model
