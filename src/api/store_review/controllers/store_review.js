
import Store_review from "../models/store_review.js";
import { responseHandler } from "../../../utils/responseHandler.js";
import User from "../../user/models/user.js";
import Store from "../../store/models/store.js";
import { verify } from "../../../utils/jwt.js";

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

        const store_review = await Store_review.create({ ...req.body, UserId: token.id });
        return res.status(200).send(responseHandler({
            status: 'success',
            status_code: 200,
            message: "review added successfully",
            data: store_review,
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
        const store_reviews = await Store_review.findAll({ include: ["user", "store"] });
        return res.status(200).send(responseHandler({
            status: 'success',
            status_code: 200,
            data: store_reviews,
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
        const store_review = await Store_review.findByPk(id);
        if (!store_review) {
            return res.status(404).send(responseHandler({
                status: 'failure',
                status_code: 404,
                message: "store review not found!"
            }));
        }
        return res.status(200).send(responseHandler({
            status: 'success',
            status_code: 200,
            data: store_review,
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
        const getStore_review = await Store_review.findByPk(id);

        if (!getStore_review) {
            return res.status(404).send(responseHandler({
                status: 'failure',
                status_code: 404,
                message: "store review not found!"
            }));
        }

        const [rowCount, [store_review]] = await Store_review.update(req.body, { where: { id }, returning: true });
        return res.status(200).send(responseHandler({
            status: 'success',
            status_code: 200,
            data: store_review,
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
        const getStore_review = await Store_review.findByPk(id);

        if (!getStore_review) {
            return res.status(404).send(responseHandler({
                status: 'failure',
                status_code: 404,
                message: "store review not found!"
            }));
        }

        const store_review = Store_review.destroy({ where: { id } });
        return res.status(200).send(responseHandler({
            status: 'success',
            status_code: 200,
            message: "store review deleted"
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

export const findByStoreId = async (req, res) => {
    try {
        const { store_id } = req.params;
        const store_reviews = await Store_review.findAll({
            where: { StoreId: store_id },
            include: [
                { model: User, as: "user", attributes: ["id", "name", "profile_image"] },
                { model: Store, as: "store", attributes: ["id", "name", "description"] }
            ]
        });
        return res.status(200).send(responseHandler({
            status: 'success',
            status_code: 200,
            data: store_reviews,
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