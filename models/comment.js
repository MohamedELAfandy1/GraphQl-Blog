const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  content: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  postId:{ type: Schema.Types.ObjectId, ref: "post" }
});

const comment = mongoose.model("comment", commentSchema);
module.exports = comment;
