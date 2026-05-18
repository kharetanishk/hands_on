import { Server } from "socket.io";
import { Server as HttpServer } from "http";

export let io: Server;

export const initializeSocket = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(`socket connected ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`socket disconnected:  ${socket.id}`);
    });
  });
};
