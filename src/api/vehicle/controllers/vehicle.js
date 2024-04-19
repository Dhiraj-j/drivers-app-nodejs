
import { getPagination, getMeta } from "rapidjet"
import Vehicle from "../models/vehicle.js";
import { request, response } from "express";
import { verify } from "../../../utils/jwt.js";
import { responseHandler } from "../../../utils/responseHandler.js";

export const create = async (req, res) => {
    try {
        const body = req.body;
        const token = verify(req)
        if (token.error) {
            return res.status(401).send(responseHandler({ status: "failure", status_code: 401, message: token.error.message, request_body: body, errors: token.error }))
        }
        let vehiclesArray = body.vehicles.map((item) => {
            return { ...item, UserId: token.id }
        })
        const vehicle = await Vehicle.bulkCreate(vehiclesArray, { updateOnDuplicate: ["number"] });
        return res.status(200).send(responseHandler({ status: "success", "status_code": 200, message: "vehicles registered", data: vehicle, request_body: req.body }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failure", "status_code": 500, message: error.message, errors: error, request_body: req.body }));
    }
};

export const find = async (req, res) => {
    try {
        const query = req.query;
        const pagination = await getPagination(query.pagination);
        const vehicles = await Vehicle.findAndCountAll({
            offset: pagination.offset,
            limit: pagination.limit
        });
        const meta = await getMeta(pagination, vehicles.count);
        return res.status(200).send({ data: vehicles.rows, meta });
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const findMyVehicles = async (req, res) => {
    try {
        const token = verify(req);
        if (token.error) {
            return res.status(401).send(responseHandler({ status: "failure", errors: token.error, message: token.error.message }))
        }
        const vehicles = await Vehicle.findAll({
            where: { UserId: token.id }
        });
        return res.status(200).send(responseHandler({ status: "success", "status_code": 200, data: vehicles }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failure", status_code: 500, message: error.message, errors: error }));
    }
};

export const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const vehicle = await Vehicle.findByPk(id);
        if (!vehicle) {
            return res.status(404).send(responseHandler({ status: 404, message: "vehicle not found!" }));
        }
        return res.status(200).send({ data: vehicle });
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const getVehicle = await Vehicle.findByPk(id);

        if (!getVehicle) {
            return res.status(404).send(responseHandler({ status: "failure", status_code: 404, message: "vehicle id not found!" }));
        }

        const [rowCount, [vehicle]] = await Vehicle.update(req.body, { where: { id }, returning: true });
        return res.status(200).send(responseHandler({ status: "success", status_code: 200, message: "vehicle updated!", data: vehicle }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failure", status_code: 500, message: error.message, errors: error, request_body: req.body }));
    }
};

export const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const getVehicle = await Vehicle.findByPk(id);

        if (!getVehicle) {
            return res.status(400).send(responseHandler({ status: "success", status_code: 404, message: "vehicle id not found!" }));
        }

        const vehicle = await Vehicle.destroy({ where: { id } });
        return res.status(200).send(responseHandler({ status: "success", status_code: 200, message: "vehicle delete sucessfully!" }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: "failure", status_code: 500, message: error.message, errors: error }));
    }
};
