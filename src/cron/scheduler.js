import cron from "node-cron";
import Post from "../models/Post.js";
import linkedinAPI from "../utils/linkedinAPI.js";

cron.schedule("* * * * *", async () => {
  const now = new Date();

  const duePosts = await Post.find({
    status: "pending",
    scheduledFor: { $lte: now }
  });

  for (let post of duePosts) {
    await linkedinAPI.publish(post);
    post.status = "published";
    await post.save();
  }
});
