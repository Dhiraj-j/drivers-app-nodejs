
import { getPagination, getMeta, errorResponse } from "rapidjet"
import Role from "../models/role.js";
import { request, response } from "express";
import { responseHandler } from "../../../utils/responseHandler.js";

export const create = async (req, res) => {
    try {
        const role = await Role.create(req.body);
        return res.status(200).send(responseHandler({ status: "success", status_code: 200, request_body: req.body, data: role }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failer", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};

export const find = async (req, res) => {
    try {
        const query = req.query;
        const roles = await Role.findAll({
        });
        return res.status(200).send(responseHandler({ data: roles, status: "success", status_code: 200, request_body: req.body }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failer", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};

export const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Role.findByPk(id);
        if (!role) {
            return res.status(404).send(responseHandler({
                status_code: 404,
                message: "role not found!",
                status: "failure",
                request_body: req.body
            }));
        }
        return res.status(200).send(responseHandler({ status: "success", status_code: 200, request_body: req.body, data: role }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failer", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const getRole = await Role.findByPk(id);

        if (!getRole) {
            return res.status(404).send(responseHandler({
                status_code: 404,
                message: "role not found!",
                status: "failure",
                request_body: req.body
            }));
        }

        const [rowCount, [role]] = await Role.update(req.body, { where: { id }, returning: true });
        return res.status(200).send(responseHandler({ status: "success", status_code: 200, request_body: req.body, data: role }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failer", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};

export const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const getRole = await Role.findByPk(id);

        if (!getRole) {
            return res.status(404).send(responseHandler({
                status_code: 404,
                message: "role not found!",
                status: "failure",
                request_body: req.body
            }));
        }

        const role = Role.destroy({ where: { id } });
        return res.status(200).send(responseHandler({ status: "success", status_code: 200, request_body: req.body, message: "role deleted" }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failer", status_code: 500, message: "Internal Server Error", errors: error, message: error.message, request_body: req.body }));
    }
};
