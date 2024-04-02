
import { getPagination, getMeta, errorResponse } from "rapidjet"
import Vehicle from "../models/vehicle.js";
import { request, response } from "express";

export const create = async (req, res) => {
    try {
        const vehicle = await Vehicle.create(req.body);
        return res.status(200).send(vehicle);
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
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
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const vehicle = await Vehicle.findByPk(id);
        if (!vehicle) {
            return res.status(404).send(errorResponse({ status: 404, message: "vehicle not found!" }));
        }
        return res.status(200).send({ data: vehicle });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const getVehicle = await Vehicle.findByPk(id);

        if (!getVehicle) {
            return res.status(400).send(errorResponse({ message: "Invalid ID" }));
        }

        const [rowCount, [vehicle]] = await Vehicle.update(req.body, { where: { id }, returning: true });
        return res.status(200).send({ message: "vehicle updated!", data: vehicle });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const getVehicle = await Vehicle.findByPk(id);

        if (getVehicle) {
            return res.status(400).send(errorResponse({ message: "Invalid ID" }));
        }

        const vehicle = Vehicle.destroy({ where: { id } });
        return res.status(200).send({ message: "vehicle deleted!" });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};
