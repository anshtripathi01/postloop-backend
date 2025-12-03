import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  createPost,
  getScheduledPosts
} from "../controllers/postController.js";

const router = express.Router();

router.post("/create", verifyToken, createPost);
router.get("/scheduled", verifyToken, getScheduledPosts);

export default router;
