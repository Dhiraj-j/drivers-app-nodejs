
import Menu_category from "../models/menu_category.js";
import { responseHandler } from "../../../utils/responseHandler.js";
import Store from "../../store/models/store.js";

export const create = async (req, res) => {
    try {
        const menu_category = await Menu_category.create(req.body);
        return res.status(200).send(responseHandler({ status: 'success', status_code: 200, message: "menu category created successfully!", data: menu_category, request_body: req.body }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: 'failure', status_code: 500, message: error.message, request_body: req.body, errors: error }));
    }
};

export const find = async (req, res) => {
    try {
        const menu_categories = await Menu_category.findAll();
        return res.status(200).send(responseHandler({ status: 'success', status_code: 200, data: menu_categories }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: 'failure', status_code: 500, message: error.message, request_body: req.body, errors: error }));
    }
};

export const getStoreMenuCategories = async (req, res) => {
    try {
        const { store_id } = req.params;
        const menu_categories = await Menu_category.findAll({ include: [{ model: Store, as: "store", where: { id: store_id } }] });
        return res.status(200).send(responseHandler({ status: 'success', status_code: 200, data: menu_categories }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: 'failure', status_code: 500, message: error.message, request_body: req.body, errors: error }));
    }
};

export const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const menu_category = await Menu_category.findByPk(id);
        if (!menu_category) {
            return res.status(404).send(responseHandler({ status: 'failure', status_code: 404, message: "menu_category not found!" }));
        }
        return res.status(200).send(responseHandler({ status: 'success', status_code: 200, data: menu_category }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: 'failure', status_code: 500, message: error.message, request_body: req.body, errors: error }));
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const getMenu_category = await Menu_category.findByPk(id);

        if (!getMenu_category) {
            return res.status(404).send(responseHandler({ status: 'failure', status_code: 404, message: "menu_category not found!" }));
        }

        const [rowCount, [menu_category]] = await Menu_category.update(req.body, { where: { id }, returning: true });
        return res.status(200).send(responseHandler({ status: 'success', status_code: 200, data: menu_category }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: 'failure', status_code: 500, message: error.message, request_body: req.body, errors: error }));
    }
};

export const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const getMenu_category = await Menu_category.findByPk(id);

        if (!getMenu_category) {
            return res.status(404).send(responseHandler({ status: 'failure', status_code: 404, message: "menu_category not found!" }));
        }
        const menu_category = Menu_category.destroy({ where: { id } });
        return res.status(200).send(responseHandler({ status: 'success', status_code: 200, message: "menu category deleted successfully" }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: 'failure', status_code: 500, message: error.message, request_body: req.body, errors: error }));
    }
};
