import cron from "node-cron";
import Post from "../models/Post.js";
import {postOnLinkedIn} from "../middleware/linkedinAPI.js";

cron.schedule("* * * * *", async () => {
  const now = new Date();

  const duePosts = await Post.find({
    status: "pending",
    scheduledFor: { $lte: now }
  });

  for (let post of duePosts) {
    await postOnLinkedIn(post.accessToken, post.userId, post.text);
    post.status = "published";
    await post.save();
  }
});
