import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
const PORT = process.env.PORT ?? 6000;
import connectDB from "./mongo/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());

//routess

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

connectDB();
app.listen(PORT, () => {
  console.log(`the app is listening to port ${PORT}`);
});
