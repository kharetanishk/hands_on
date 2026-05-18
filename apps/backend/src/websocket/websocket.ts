import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { SessionService } from "../sessions/sessions.service.js";
import { redisClient } from "../config/redisClient.js";

interface MarkAttendancePayload {
  classId: string;
  studentId: string;
  status: "present" | "absent";
}

export let io: Server;

export const initializeSocket = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  //connection establish
  io.on("connection", (socket) => {
    console.log(`socket connected ${socket.id}`);

    //join class
    socket.on("join-class", async (classId: string) => {
      socket.join(classId);
      console.log(`${socket.id}  joined  ${classId}`);
      socket.emit("joined-class", {
        classId,
      });
    });

    //mark attendance

    socket.on("mark-attendace", async (data: MarkAttendancePayload) => {
      /* */
      const session = await SessionService.getSession(data.classId);
      session.attendance[data.studentId] = data.status;
      await redisClient.set(`session:${data.classId}`, JSON.stringify(session));
      //sends only to a specific room
      //io.emit - all
      //socket.emit - sends only to current client
      //socket.broadcast.emit - sends to evryone exvept current socket
      io.to(data.classId).emit("attendance-updated", {
        classId: data.classId,
        studentId: data.studentId,
        status: data.status,
        updaatedAt: new Date(),
      });
    });

    //disconnect
    socket.on("disconnect", () => {
      console.log(`socket disconnected:  ${socket.id}`);
    });
  });
};
