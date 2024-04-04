
import { getPagination, getMeta, errorResponse } from "rapidjet"
import Chat from "../models/chat.js";
import { request, response } from "express";
import Message from "../../message/models/message.js";
import { verify } from "../../../utils/jwt.js";
import sequelize from "../../../../database/index.js";
import User from "../../user/models/user.js";

export const create = async (req, res) => {
    try {
        const chat = await Chat.create(req.body);
        return res.status(200).send(chat);
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const find = async (req, res) => {
    try {
        const query = req.query;
        const pagination = await getPagination(query.pagination);
        const chats = await Chat.findAndCountAll({
            offset: pagination.offset,
            limit: pagination.limit
        });
        const meta = await getMeta(pagination, chats.count);
        return res.status(200).send({ data: chats.rows, meta });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const chat = await Chat.findByPk(id);
        if (!chat) {
            return res.status(404).send(errorResponse({ status: 404, message: "chat not found!" }));
        }
        return res.status(200).send({ data: chat });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};
export const getUsersChat = async (req, res) => {
    try {
        const { id } = req.params;
        const token = verify(req);
        if (token.error) {
            return res.status(401).send(errorResponse({ status: 401, message: "Unauthorized!" }))
        }
        const user = await User.findByPk(token.id, { include: [{ model: Chat, as: "chats", include: ["users"] }] })
        const chats = JSON.parse(JSON.stringify(user.chats)).map(chat => {
            const user = chat.users.find(user => user.id !== token.id);
            delete chat.users
            delete chat.UserChat
            if (user) {
                return { ...chat, name: user.name };
            } else {
                return chat;
            }
        });
        return res.status(200).send({ data: chats });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};
export const getUsersChatMessaages = async (req, res) => {
    try {
        const { id } = req.params;

        const messages = await Message.findAll({
            where: { ChatId: id },
            include: [{ model: User, as: "sender", "attributes": ["name"] }]
        });
        return res.status(200).send({ data: messages });

    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const getChat = await Chat.findByPk(id);

        if (!getChat) {
            return res.status(400).send(errorResponse({ message: "Invalid ID" }));
        }

        const [rowCount, [chat]] = await Chat.update(req.body, { where: { id }, returning: true });
        return res.status(200).send({ message: "chat updated!", data: chat });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const getChat = await Chat.findByPk(id);

        if (getChat) {
            return res.status(400).send(errorResponse({ message: "Invalid ID" }));
        }

        const chat = Chat.destroy({ where: { id } });
        return res.status(200).send({ message: "chat deleted!" });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};
