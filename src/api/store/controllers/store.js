
import { getPagination, getMeta, errorResponse } from "rapidjet"
import Store from "../models/store.js";
import { request, response } from "express";
import { responseHandler } from "../../../utils/responseHandler.js";

export const create = async (req, res) => {
    try {
        const store = await Store.create(req.body);
        return res.status(200).send(responseHandler({
            data: store,
            message: "store created",
            request_body: req.body,
            status: "success",
            status_code: 200
        }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failer", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};

export const find = async (req, res) => {
    try {
        const query = req.query;
        const stores = await Store.findAll({
        });
        return res.status(200).send(responseHandler({ status_code: 200, status: "success", data: stores, request_body: req.body }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failer", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};

export const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const store = await Store.findByPk(id);
        if (!store) {
            return res.status(404).send(responseHandler({
                status_code: 404,
                message: "store not found!",
                status: "failure",
                request_body: req.body
            }));
        }
        return res.status(200).send(responseHandler({ status: "success", status_code: 200, request_body: req.body, data: store }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failer", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const getStore = await Store.findByPk(id);

        if (!getStore) {
            return res.status(404).send(responseHandler({
                status_code: 404,
                message: "store not found!",
                status: "failure",
                request_body: req.body
            }));
        }

        const [rowCount, [store]] = await Store.update(req.body, { where: { id }, returning: true });
        return res.status(200).send(responseHandler({ status: "success", status_code: 200, request_body: req.body, data: store }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failer", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};

export const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const getStore = await Store.findByPk(id);

        if (!getStore) {
            return res.status(404).send(responseHandler({
                status_code: 404,
                message: "store not found!",
                status: "failure",
                request_body: req.body
            }));
        }

        const store = Store.destroy({ where: { id } });
        return res.status(200).send(responseHandler({ status: "success", status_code: 200, request_body: req.body, data: store }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failer", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};
