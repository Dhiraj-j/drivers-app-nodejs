const users = {};
import { Server } from "socket.io"
import jwt from "jsonwebtoken"
import User from "../api/user/models/user.js";
import Chat from "../api/chat/models/chat.js";
import sequelize from "../../database/index.js";
import Message from "../api/message/models/message.js";
const cleint_url = "http://localhost:5173"
const chatsObject = {};
export default function SocketInit(server) {

    const io = new Server(server, {
        cors: {
            origin: cleint_url,
            methods: ["GET", "POST"],
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization', "authorization"]
        },
    })

    io.on('connection', async (socket) => {
        const jwtTOken = socket.handshake.headers.authorization.split(' ')[1]; // Extract the JWT token from the Authorization header
        socket.on("user-connected", (id) => {
            users[id] = socket.id
        })
        const token = jwt.verify(jwtTOken, 'secret123');
        if (!token) {
            socket.disconnect(true)
        }
        const user = await User.findByPk(token.id)
        if (user) {
            user.socket_id = socket.id;
            await user.save();
        }

        socket.on("message", async ({ chat_id, message }) => {
            console.log({ chat_id: 2, message });
            const chat = await Chat.findByPk(chat_id, { include: ["users"] })
            const senderId = getSenderId(chat_id, socket.id, chatsObject);
            const createMessage = await Message.create({ UserId: senderId, text: message })
            chatsObject[chat_id] = chat.dataValues
            console.log(chatsObject)
            const sendTo = getSendToSocketId(chat_id, socket.id, chatsObject)
            socket.to(sendTo).emit("receive-message", message);
        });


        socket.on("new-chat", async ({ id }) => {
            const user = await User.findByPk(id)
            if (!user) {
                socket.emit("invalid-user", { error: "User Not Found!" })
            }
            const chat = await Chat.create({ name: user.dataValues.name, type: "private" })
            const userChat = await sequelize.models.UserChat.bulkCreate([token.id, user.dataValues.id].map((item) => {
                return { UserId: item, ChatId: chat.dataValues.id }
            }))
            socket.emit("new-chat-created", { chat_id: chat.dataValues.id, message: "successfully created new chat" })
        })
    })
}


function getSendToSocketId(chat_id, socket_id, chatsObject) {
    // Check if the chat exists
    if (chatsObject.hasOwnProperty(chat_id)) {
        const chat = chatsObject[chat_id];
        // Loop through users of the chat
        for (const user of chat.users) {
            // If the user's socket_id is different from the passed socketId, return it
            console.log(user)
            if (user.socket_id !== socket_id) {
                return user.socket_id;
            }
        }
    }
    // Return null if chat doesn't exist or if no other socket_id found
    return null;
}

function getSenderId(chat_id, socket_id, chatsObject) {
    // Check if the chat exists
    if (chatsObject.hasOwnProperty(chat_id)) {
        const chat = chatsObject[chat_id];
        // Loop through users of the chat
        for (const user of chat.users) {
            // If the user's socket_id is different from the passed socketId, return it
            console.log(user)
            if (user.socket_id === socket_id) {
                return user.id;
            }
        }
    }
    // Return null if chat doesn't exist or if no other socket_id found
    return null;
}