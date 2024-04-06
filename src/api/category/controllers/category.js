
import { getPagination, getMeta, errorResponse } from "rapidjet"
import Category from "../models/category.js";
import { request, response } from "express";

export const create = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        return res.status(200).send({
            status: "success",
            status_code: 200,
            message: "Category Created",
            errors: null,
            data: category,
            request_body: req.body
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: "failure",
            status_code: 500,
            message: error.message,
            errors: error,
            request_body: req.body
        });
    }
};

export const find = async (req, res) => {
    try {
        const query = req.query;
        const pagination = await getPagination(query.pagination);
        const category = await Category.findAndCountAll({
            offset: pagination.offset,
            limit: pagination.limit
        });
        const meta = await getMeta(pagination, categorys.count);
        return res.status(200).send({
            status: "success",
            status_code: 200,
            message: null,
            errors: null,
            data: category.rows,
            meta: meta,
            request_body: req.body
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: "failure",
            status_code: 500,
            message: error.message,
            errors: null,
            request_body: req.body
        });
    }
};

export const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).send({
                status: "failure",
                status_code: 404,
                message: "category not found!",
                errors: "Category id seems to be invalid",
            });
        }
        return res.status(200).send({
            status: "success",
            status_code: 200,
            message: null,
            errors: null,
            data: category,
            request_body: req.body
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: "failure",
            status_code: 500,
            message: error.message,
            errors: null,
            request_body: req.body
        });
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const getCategory = await Category.findByPk(id);

        if (!getCategory) {
            return res.status(404).send({
                status: "failure",
                status_code: 404,
                message: "category id seems to be invalid",
                errors: "category not found id seems to be invalid"
            });
        }

        const [rowCount, [category]] = await Category.update(req.body, { where: { id }, returning: true });
        return res.status(200).send({
            status_code: 200,
            status: "success",
            message: "category updated!",
            data: category,
            request_body: req.body
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: "failure",
            status_code: 500,
            message: error.message,
            errors: null,
            request_body: req.body
        });
    }
};

export const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const getCategory = await Category.findByPk(id);

        if (!getCategory) {
            return res.status(404).send({
                status: "failure",
                status_code: 404,
                message: "Category not deleted",
                errors: "category not deleted as Id seems to be invalid"
            });
        }

        const category = Category.destroy({ where: { id } });
        return res.status(200).send({
            status: "success",
            status_code: 200,
            message: "category deleted!"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: "failure",
            status_code: 500,
            message: error.message,
            errors: null,
            request_body: req.body
        });
    }
};
