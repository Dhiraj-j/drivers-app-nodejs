
import Package from "../models/package.js";
import { responseHandler } from "../../../utils/responseHandler.js";

export const create = async (req, res) => {
    try {
        const packages = await Package.create(req.body);
        return res.status(200).send(responseHandler({ status: "success", status_code: 200, message: "package_created", request_body: req.body, data: packages }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "success", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};

export const find = async (req, res) => {
    try {
        const packages = await Package.findAll({
        });
        return res.status(200).send(responseHandler({ status: "success", status_code: 200, data: packages, request_body: req.body }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failure", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};

export const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const packages = await Package.findByPk(id, { include: ["package_category"] });
        if (!packages) {
            return res.status(404).send(responseHandler({
                status_code: 404,
                message: "store not found!",
                status: "failure",
            }));
        }
        return res.status(200).send(responseHandler({ data: packages, status: "success", status_code: 200 }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failure", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const getPackage = await Package.findByPk(id);

        if (!getPackage) {
            return res.status(404).send(responseHandler({
                status_code: 404,
                message: "store not found!",
                status: "failure",
                request_body: req.body
            }));
        }

        const [rowCount, [packages]] = await Package.update(req.body, { where: { id }, returning: true });
        return res.status(200).send(responseHandler({ status: "success", status_code: 200, message: "package updated!", data: packages, request_body: req.body }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failure", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};

export const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const getPackage = await Package.findByPk(id);

        if (!getPackage) {
            return res.status(404).send(responseHandler({
                status_code: 404,
                message: "store not found!",
                status: "failure",
                // request_body: req.body
            }));
        }
        const packages = Package.destroy({ where: { id } });
        return res.status(200).send(responseHandler({ status: "success", status_code: 200, message: "package deleted!" }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failure", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};
