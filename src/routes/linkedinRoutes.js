import express from "express";
import verifyToken from "../utils/verifyToken.js";
import {
  getLinkedInAuthUrl,
  linkedInCallback,
  getLinkedInPages
} from "../controllers/linkedinController.js";

const router = express.Router();

router.get("/url", verifyToken, getLinkedInAuthUrl);
router.get("/callback", verifyToken, linkedInCallback);
router.get("/pages", verifyToken, getLinkedInPages);

export default router;
