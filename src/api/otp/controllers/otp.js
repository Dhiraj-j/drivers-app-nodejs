
import { getPagination, getMeta, errorResponse } from "rapidjet"
import Otp from "../models/otp.js";
import { request, response } from "express";

export const create = async (req, res) => {
    try {
        const otp = await Otp.create(req.body);
        return res.status(200).send({ data: otp });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const find = async (req, res) => {
    try {
        const query = req.query;
        const pagination = await getPagination(query.pagination);
        const otps = await Otp.findAndCountAll({
            offset: pagination.offset,
            limit: pagination.limit
        });
        const meta = await getMeta(pagination, otps.count);
        return res.status(200).send({ data: otps.rows, meta });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const otp = await Otp.findByPk(id);
        if (!otp) {
            return res.status(404).send(errorResponse({ status: 404, message: "otp not found!" }));
        }
        return res.status(200).send({ data: otp });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const getOtp = await Otp.findByPk(id);

        if (!getOtp) {
            return res.status(400).send(errorResponse({ message: "Invalid ID" }));
        }

        const [rowCount, [otp]] = await Otp.update(req.body, { where: { id }, returning: true });
        return res.status(200).send({ message: "otp updated!", data: otp });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const getOtp = await Otp.findByPk(id);

        if (!getOtp) {
            return res.status(404).send(errorResponse({ message: "OTP not found" }));
        }

        const otp = Otp.destroy({ where: { id } });
        return res.status(200).send({ message: "otp deleted!" });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};
