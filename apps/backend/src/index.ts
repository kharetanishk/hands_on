import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./mongo/db.js";
import { Request, Response } from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

//health route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "active",
    message: `the api is listening to port ${PORT}`,
  });
});

//further routes
app.use("/api/auth", authRoutes);
//first we make sure the database is connect then only we listen to the application
connectDB();

app.listen(PORT, () => {
  console.log(`the api is listening to PORT ${PORT}`);
});
