
import { getPagination, getMeta, errorResponse } from "rapidjet"
import Menu_category from "../models/menu_category.js";
import { request, response } from "express";

export const create = async (req, res) => {
    try {
        const menu_category = await Menu_category.create(req.body);
        return res.status(200).send(menu_category);
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const find = async (req, res) => {
    try {
        const query = req.query;
        const pagination = await getPagination(query.pagination);
        const menu_categorys = await Menu_category.findAndCountAll({
            offset: pagination.offset,
            limit: pagination.limit
        });
        const meta = await getMeta(pagination, menu_categorys.count);
        return res.status(200).send({ data: menu_categorys.rows, meta });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const menu_category = await Menu_category.findByPk(id);
        if (!menu_category) {
            return res.status(404).send(errorResponse({ status: 404, message: "menu_category not found!" }));
        }
        return res.status(200).send({ data: menu_category });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const getMenu_category = await Menu_category.findByPk(id);

        if (!getMenu_category) {
            return res.status(400).send(errorResponse({ message: "Invalid ID" }));
        }

        const [rowCount, [menu_category]] = await Menu_category.update(req.body, { where: { id }, returning: true });
        return res.status(200).send({ message: "menu_category updated!", data: menu_category });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const getMenu_category = await Menu_category.findByPk(id);

        if (getMenu_category) {
            return res.status(400).send(errorResponse({ message: "Invalid ID" }));
        }

        const menu_category = Menu_category.destroy({ where: { id } });
        return res.status(200).send({ message: "menu_category deleted!" });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};
