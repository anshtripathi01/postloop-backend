import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import linkedinRoutes from "./routes/linkedInRoutes.js";
import postRoutes from "./routes/postroutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/linkedin", linkedinRoutes);
app.use("/posts", postRoutes);

export default app;
