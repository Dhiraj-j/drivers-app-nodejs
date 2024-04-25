
import { verify } from "../../../utils/jwt.js";
import { responseHandler } from "../../../utils/responseHandler.js";
import Menu_item from "../../menu_item/models/menu_item.js";
import User from "../../user/models/user.js";
import Menu_item_review from "../models/menu_item_review.js";

export const create = async (req, res) => {
    try {

        const token = verify(req);
        if (token.error) {
            return res.status(401).send(responseHandler({
                status: 'failure',
                status_code: 401,
                message: token.error.message,
                errors: token.error,
                request_body: req.body
            }))
        }

        const menu_item_review = await Menu_item_review.create({ ...req.body, UserId: token.id });
        return res.status(200).send(responseHandler({
            status: 'success',
            status_code: 200,
            message: "review added successfully",
            data: menu_item_review,
            request_body: req.body
        }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({
            status: "failure",
            message: error.message,
            request_body: req.body,
            errors: error
        }));
    }
};

export const find = async (req, res) => {
    try {
        const menu_item_reviews = await Menu_item_review.findAll({ include: ["user", "store"] });
        return res.status(200).send(responseHandler({
            status: 'success',
            status_code: 200,
            data: menu_item_reviews,
        }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({
            status: "failure",
            message: error.message,
            errors: error
        }));
    }
};

export const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const menu_item_review = await Menu_item_review.findByPk(id);
        if (!menu_item_review) {
            return res.status(404).send(responseHandler({
                status: 'failure',
                status_code: 404,
                message: "menu item review not found!"
            }));
        }
        return res.status(200).send(responseHandler({
            status: 'success',
            status_code: 200,
            data: menu_item_review,
        }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({
            status: "failure",
            message: error.message,
            errors: error
        }));
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const getmenu_item_review = await Menu_item_review.findByPk(id);

        if (!getmenu_item_review) {
            return res.status(404).send(responseHandler({
                status: 'failure',
                status_code: 404,
                message: "menu item review not found!"
            }));
        }

        const [rowCount, [menu_item_review]] = await Menu_item_review.update(req.body, { where: { id }, returning: true });
        return res.status(200).send(responseHandler({
            status: 'success',
            status_code: 200,
            data: menu_item_review,
        }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({
            status: "failure",
            message: error.message,
            request_body: req.body,
            errors: error
        }));
    }
};

export const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const getmenu_item_review = await Menu_item_review.findByPk(id);

        if (!getmenu_item_review) {
            return res.status(404).send(responseHandler({
                status: 'failure',
                status_code: 404,
                message: "menu item review not found!"
            }));
        }

        const menu_item_review = Menu_item_review.destroy({ where: { id } });
        return res.status(200).send(responseHandler({
            status: 'success',
            status_code: 200,
            message: "menu item review deleted"
        }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({
            status: "failure",
            message: error.message,
            errors: error
        }));
    }
};

export const findByMenuItemId = async (req, res) => {
    try {
        const menu_item_reviews = await Menu_item_review.findAll({
            include: [{ model: User, as: "user", attributes: ["id", "name", "profile_image"] }, { model: Menu_item, as: "menu_item", attributes: ["id", "name", "thumbnail"] }]
        });
        return res.status(200).send(responseHandler({
            status: 'success',
            status_code: 200,
            data: menu_item_reviews,
        }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({
            status: "failure",
            message: error.message,
            errors: error
        }));
    }
};