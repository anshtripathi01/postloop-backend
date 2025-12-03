import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import linkedinRoutes from "./routes/linkedinRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/linkedin", linkedinRoutes);
app.use("/posts", postRoutes);

export default app;
