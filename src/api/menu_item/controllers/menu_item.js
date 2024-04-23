
import { getPagination, getMeta, errorResponse } from "rapidjet"
import Menu_item from "../models/menu_item.js";
import { responseHandler } from './../../../utils/responseHandler.js';
import Menu_category from "../../menu_category/models/menu_category.js";
import sequelize from "../../../../database/index.js";
import Store from "../../store/models/store.js";

export const create = async (req, res) => {
    try {
        const menu_item = await Menu_item.create(req.body);
        return res.status(200).send(responseHandler({ status: 'success', status_code: 200, request_body: req.body, message: "menu item created", data: menu_item }))
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: 'failure', status_code: 500, request_body: req.body, message: error.message, errors: error }))
    }
};

export const find = async (req, res) => {
    try {
        const menu_items = await Menu_item.findAll({ include: ["menu_category"] });
        return res.status(200).send(responseHandler({ status: 'success', status_code: 200, data: menu_items, request_body: req.body, message: "menu item created", data: menu_items }))
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: 'failure', status_code: 500, request_body: req.body, message: error.message, errors: error }))
    }
};

export const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const menu_item = await Menu_item.findByPk(id);
        if (!menu_item) {
            return res.status(404).send(responseHandler({ status: 'failure', status_code: 404, message: "menu_item not found!" }));
        }
        return res.status(200).send(responseHandler({ status: 'success', status_code: 200, request_body: req.body, message: "menu item created", data: menu_item }))
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: 'failure', status_code: 500, request_body: req.body, message: error.message, errors: error }))
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const getMenu_item = await Menu_item.findByPk(id);

        if (!getMenu_item) {
            return res.status(404).send(responseHandler({ status: 'failure', status_code: 404, message: "menu_item not found!" }));
        }

        const [rowCount, [menu_item]] = await Menu_item.update(req.body, { where: { id }, returning: true });
        return res.status(200).send(responseHandler({ status: 'success', status_code: 200, request_body: req.body, message: "menu item created", data: menu_item }))
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: 'failure', status_code: 500, request_body: req.body, message: error.message, errors: error }))
    }
};

export const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const getMenu_item = await Menu_item.findByPk(id);

        if (!getMenu_item) {
            return res.status(404).send(responseHandler({ status: 'failure', status_code: 404, message: "menu_item not found!" }));
        }

        const menu_item = Menu_item.destroy({ where: { id } });
        return res.status(200).send(responseHandler({ status: 'success', status_code: 200, message: "menu item created" }))
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: 'failure', status_code: 500, message: error.message, errors: error }))
    }
};

export const findStoresMenuItems = async (req, res) => {
    try {
        const { store_id } = req.params;
        // const store = await Store.findByPk(store_id, {
        //     include: [{ model: Menu_category, as: "menu_categories", include: 'menu_items' }]
        // })
        const menu_items = await Menu_item.findAll({
            where: { StoreId: store_id },
            include: [{
                model: Menu_category,
                as: "menu_category",
                attributes: ["name", "id"],
            }],
        });

        const groupedMenuItems = {};

        // Iterate through the menu items and group them by category name
        menu_items.forEach(menu_item => {
            const categoryName = menu_item.menu_category.name;
            if (!groupedMenuItems[categoryName]) {
                groupedMenuItems[categoryName] = [];
            }
            groupedMenuItems[categoryName].push(menu_item);
        });

        return res.status(200).send(responseHandler({
            status: 'success',
            status_code: 200,
            data: groupedMenuItems,
            request_body: req.body,
            message: "menu item created",
        }))
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: 'failure', status_code: 500, request_body: req.body, message: error.message, errors: error }))
    }
};