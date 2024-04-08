
import Package_category from "../models/package_category.js";
import { responseHandler } from "../../../utils/responseHandler.js";

export const create = async (req, res) => {
    try {
        const package_category = await Package_category.create(req.body);
        return res.status(200).send(responseHandler({ status: "success", status_code: 200, request_body: req.body, data: package_category }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failure", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};

export const find = async (req, res) => {
    try {
        const package_categories = await Package_category.findAll({
        });
        return res.status(200).send(responseHandler({ status: "success", status_code: 200, request_body: req.body, data: package_categories }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failure", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};

export const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const package_category = await Package_category.findByPk(id);
        if (!package_category) {
            return res.status(404).send(responseHandler({
                status_code: 404,
                message: "store not found!",
                status: "failure",
                request_body: req.body
            }));
        }
        return res.status(200).send(responseHandler({ status: "success", status_code: 200, request_body: req.body, data: package_category }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failure", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const getPackage_category = await Package_category.findByPk(id);

        if (!getPackage_category) {
            return res.status(404).send(responseHandler({
                status_code: 404,
                message: "store not found!",
                status: "failure",
                request_body: req.body
            }));
        }

        const [rowCount, [package_category]] = await Package_category.update(req.body, { where: { id }, returning: true });
        return res.status(200).send(responseHandler({ status: "success", status_code: 200, request_body: req.body, data: package_category }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failure", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};

export const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const getPackage_category = await Package_category.findByPk(id);

        if (getPackage_category) {
            return res.status(404).send(responseHandler({
                status_code: 404,
                message: "store not found!",
                status: "failure",
                request_body: req.body
            }));
        }

        const package_category = Package_category.destroy({ where: { id } });
        return res.status(200).send(responseHandler({ status: "success", status_code: 200, request_body: req.body }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failure", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};
