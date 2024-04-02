import express, { json, urlencoded } from 'express';
// import connectToDb from "./config/db";
// const app = express();
// import { findById } from "./models/userModel";
// import { ChatController } from "./controllers/chatController";
import { WebSocketServer } from "ws";
import { port } from './config/config.js';
import * as jwt from './src/utils/jwt.js';
import app from './app.js';
import { Server } from 'socket.io';
import { createServer } from 'http'
import SocketInit from './src/utils/socket.js';
const server = createServer(app)

app.use(json({ limit: "20mb" }));
SocketInit(server)
app.use(urlencoded({ limit: "20mb", extended: false }));
server.listen(port, () => console.log(`Server started on port ${port}`));
