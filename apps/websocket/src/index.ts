import { WebSocketServer } from "ws";
import prisma from "@repo/db/prisma";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket) => {
  socket.send("Connected.");

  socket.on("message", async (event) => {
    const user = await prisma.user.findFirst();

    socket.send(JSON.stringify(user));
  });
});
