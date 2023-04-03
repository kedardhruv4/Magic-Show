const mongoose = require("mongoose")

const ContentSchema = new mongoose.Schema(
 {
  title: { type: String, required: true },
  description: { type: String, required: true },
  isFree: { type: Boolean, default: true },
  type: { type: String, enum: ["movies", "songs", "games"], required: true },
  coverImg: { type: String },
  userId: { type: String, required: true },
  filePath: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Number },
  createdBy: { type: String },
  updatedAt: { type: Number },
  updatedBy: { type: String },
  deletedAt: { type: Number },
  deletedBy: { type: String },
  isView: { type: Boolean }
 },
 { collection: "content" }
)

const model = mongoose.model("ContentSchema", ContentSchema)

module.exports = model
