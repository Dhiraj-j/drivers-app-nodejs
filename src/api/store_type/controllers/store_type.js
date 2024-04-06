
import { getPagination, getMeta, errorResponse } from "rapidjet"
import Store_type from "../models/store_type.js";
import { request, response } from "express";
import { responseHandler } from "../../../utils/responseHandler.js";

export const create = async (req, res) => {
    try {
        const store_type = await Store_type.create(req.body);
        return res.status(200).send(responseHandler({
            status: "success",
            status_code: 200,
            message: "Store Type created",
            data: store_type,
            request_body: req.body
        }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failer", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};

export const find = async (req, res) => {
    try {
        const query = req.query;
        const pagination = await getPagination(query.pagination);
        const store_types = await Store_type.findAll({
        });
        return res.status(200).send(responseHandler({ data: store_types, request_body: req.body, status: "success", status_code: 200 }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failer", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};

export const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const store_type = await Store_type.findByPk(id);
        if (!store_type) {
            return res.status(404).send(errorResponse({ status: 404, message: "store_type not found!" }));
        }
        return res.status(200).send({ data: store_type });
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failer", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const getStore_type = await Store_type.findByPk(id);

        if (!getStore_type) {
            return res.status(400).send(errorResponse({ message: "Invalid ID" }));
        }

        const [rowCount, [store_type]] = await Store_type.update(req.body, { where: { id }, returning: true });
        return res.status(200).send({ message: "store_type updated!", data: store_type });
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failer", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};

export const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const getStore_type = await Store_type.findByPk(id);

        if (!getStore_type) {
            return res.status(400).send(errorResponse({ message: "Invalid ID" }));
        }

        const store_type = Store_type.destroy({ where: { id } });
        return res.status(200).send(responseHandler({
            status: "success",
            status_code: 200,
            request_body: req.body,
            message: "store type deleted"
        }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failer", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};
