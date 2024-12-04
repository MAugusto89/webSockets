import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

type Message = {
  text: string;
  userName: string;
};

const message: Message[] = [];

export const server = createServer(app);

const webSocket = new Server(server);

webSocket.on("connection", (socket) => {
  console.log("Um novo cliente conectou...");

  socket.on("novaMensagem", (messageObj: Message) => {
    console.log(messageObj);
    message.push(messageObj);
    socket.broadcast.emit("chegouMensagem", messageObj);
  });

  socket.emit("mensagensAnteriores", message);
});
