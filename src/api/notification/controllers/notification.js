
import { getPagination, getMeta, errorResponse } from "rapidjet"
import Notification from "../models/notification.js";
import { request, response } from "express";

export const create = async (req, res) => {
    try {
        const notification = await Notification.create(req.body);
        return res.status(200).send(notification);
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const find = async (req, res) => {
    try {
        const query = req.query;
        const pagination = await getPagination(query.pagination);
        const notifications = await Notification.findAndCountAll({
            offset: pagination.offset,
            limit: pagination.limit
        });
        const meta = await getMeta(pagination, notifications.count);
        return res.status(200).send({ data: notifications.rows, meta });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByPk(id);
        if (!notification) {
            return res.status(404).send(errorResponse({ status: 404, message: "notification not found!" }));
        }
        return res.status(200).send({ data: notification });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const getNotification = await Notification.findByPk(id);

        if (!getNotification) {
            return res.status(400).send(errorResponse({ message: "Invalid ID" }));
        }

        const [rowCount, [notification]] = await Notification.update(req.body, { where: { id }, returning: true });
        return res.status(200).send({ message: "notification updated!", data: notification });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const getNotification = await Notification.findByPk(id);

        if (getNotification) {
            return res.status(400).send(errorResponse({ message: "Invalid ID" }));
        }

        const notification = Notification.destroy({ where: { id } });
        return res.status(200).send({ message: "notification deleted!" });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};
