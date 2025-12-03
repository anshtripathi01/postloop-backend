import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const post = await Post.create({
      userId: req.user.id,
      pageId: req.body.pageId,
      text: req.body.text,
      scheduledFor: req.body.scheduledFor,
    });

    res.json({ success: true, post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getScheduledPosts = async (req, res) => {
  const posts = await Post.find({ userId: req.user.id }).sort("-scheduledFor");
  res.json({ posts });
};
