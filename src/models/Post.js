import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  pageId: String,
  text: String,
  scheduledFor: Date,
  status: { type: String, default: "pending" }
});

export default mongoose.model("Post", postSchema);
