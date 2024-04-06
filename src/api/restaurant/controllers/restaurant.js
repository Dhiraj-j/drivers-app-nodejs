
import { getPagination, getMeta, errorResponse } from "rapidjet"
import Restaurant from "../models/restaurant.js";
import { responseHandler } from './../../../utils/responseHandler.js';

export const create = async (req, res) => {
    try {
        const restaurant = await Restaurant.create(req.body);
        return res.status(200).send(responseHandler({ status_code: 200, message: "Restaurant Created", data: restaurant, request_body: req.body }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({
            status_code: 500,
            message: "Internal Server Error",
            request_body: req.body,
            errors: error
        }));
    }
};

export const find = async (req, res) => {
    try {
        const query = req.query;
        const pagination = await getPagination(query.pagination);
        const restaurants = await Restaurant.findAndCountAll({
            offset: pagination.offset,
            limit: pagination.limit
        });
        const meta = await getMeta(pagination, restaurants.count);
        return res.status(200).send(responseHandler({ status_code: 200, data: restaurants.rows, meta }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({
            status_code: 500,
            message: "Internal Server Error",
            request_body: req.body,
            errors: error
        }));
    }
};

export const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findByPk(id);
        if (!restaurant) {
            return res.status(404).send(responseHandler({ status_code: 404, message: "restaurant not found!", data: restaurant }));
        }
        return res.status(200).send(responseHandler({ data: restaurant, status_code: 200, }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({
            status_code: 500,
            message: "Internal Server Error",
            request_body: req.body,
            errors: error
        }));
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const getRestaurant = await Restaurant.findByPk(id);

        if (!getRestaurant) {
            return res.status(400).send(errorResponse({ message: "Invalid ID" }));
        }

        const [rowCount, [restaurant]] = await Restaurant.update(req.body, { where: { id }, returning: true });
        return res.status(200).send(responseHandler({ status_code: 200, request_body: req.body, message: "restaurant updated!", data: restaurant }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({
            status_code: 500,
            message: "Internal Server Error",
            request_body: req.body,
            errors: error
        }));
    }
};

export const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const getRestaurant = await Restaurant.findByPk(id);

        if (!getRestaurant) {
            return res.status(404).send(responseHandler({ status_code: 404, message: "Invalid ID", request_body: req.body }));
        }
        const restaurant = Restaurant.destroy({ where: { id } });
        return res.status(200).send(responseHandler({ status_code: 200, request_body: req.body, message: "restaurant deleted!" }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({
            status_code: 500,
            message: "Internal Server Error",
            request_body: req.body,
            errors: error
        }));
    }
};
