import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  orgId: String,
  name: String,
  accessToken: String,
});

export default mongoose.model("LinkedInPage", pageSchema);
