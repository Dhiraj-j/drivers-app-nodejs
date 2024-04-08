
import { getPagination, getMeta, errorResponse } from "rapidjet"
import Menu_item from "../models/menu_item.js";
import { request, response } from "express";

export const create = async (req, res) => {
    try {
        const menu_item = await Menu_item.create(req.body);
        return res.status(200).send(menu_item);
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const find = async (req, res) => {
    try {
        const query = req.query;
        const pagination = await getPagination(query.pagination);
        const menu_items = await Menu_item.findAndCountAll({
            offset: pagination.offset,
            limit: pagination.limit
        });
        const meta = await getMeta(pagination, menu_items.count);
        return res.status(200).send({ data: menu_items.rows, meta });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const menu_item = await Menu_item.findByPk(id);
        if (!menu_item) {
            return res.status(404).send(errorResponse({ status: 404, message: "menu_item not found!" }));
        }
        return res.status(200).send({ data: menu_item });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const getMenu_item = await Menu_item.findByPk(id);

        if (!getMenu_item) {
            return res.status(400).send(errorResponse({ message: "Invalid ID" }));
        }

        const [rowCount, [menu_item]] = await Menu_item.update(req.body, { where: { id }, returning: true });
        return res.status(200).send({ message: "menu_item updated!", data: menu_item });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const getMenu_item = await Menu_item.findByPk(id);

        if (getMenu_item) {
            return res.status(400).send(errorResponse({ message: "Invalid ID" }));
        }

        const menu_item = Menu_item.destroy({ where: { id } });
        return res.status(200).send({ message: "menu_item deleted!" });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};
