import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
const PORT = process.env.PORT ?? 6000;
import connectDB from "./mongo/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import { initializeSocket } from "./websocket/websocket.js";
import http from "http";

const app = express();
const server = http.createServer(app);
//middleware
app.use(express.json());
app.use(cookieParser());

//routess

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/teacher", teacherRoutes);

connectDB();

server.listen(PORT, () => {
  console.log(`the app is listening to port ${PORT}`);
});

//the client connects to port and http server recieves a normal http req
//if req has headers- upgreade websocket , then http-> websocket
//socket.on..
initializeSocket(server);
