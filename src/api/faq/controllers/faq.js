
import { getPagination, getMeta, errorResponse } from "rapidjet"
import Faq from "../models/faq.js";
import { responseHandler } from "../../../utils/responseHandler.js";

export const create = async (req, res) => {
    try {
        const faq = await Faq.create(req.body);
        return res.status(200).send(responseHandler({ status: 'success', status_code: 200, data: faq, request_body: req.body }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: 'failure', status_code: 500, message: error.message, request_body: req.body, errors: error }))
    }
};

export const find = async (req, res) => {
    try {
        const faqs = await Faq.findAll();
        return res.status(200).send(responseHandler({ status: 'success', status_code: 200, data: faqs, request_body: req.body }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: 'failure', status_code: 500, message: error.message, request_body: req.body, errors: error }))
    }
};

export const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const faq = await Faq.findByPk(id);
        if (!faq) {
            return res.status(404).send(responseHandler({ status: 'failure', status_code: 404, message: "faq not found", errors: { message: "faq not found!" } }));
        }
        return res.status(200).send(responseHandler({ status: 'success', status_code: 200, data: faq, request_body: req.body }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: 'failure', status_code: 500, message: error.message, request_body: req.body, errors: error }))
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const getFaq = await Faq.findByPk(id);
        if (!getFaq) {
            return res.status(404).send(responseHandler({ status: 'failure', status_code: 404, message: "faq not found", errors: { message: "faq not found!" } }));
        }
        const [rowCount, [faq]] = await Faq.update(req.body, { where: { id }, returning: true });
        return res.status(200).send(responseHandler({ status: 'success', status_code: 200, data: faq, request_body: req.body }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: 'failure', status_code: 500, message: error.message, request_body: req.body, errors: error }))
    }
};

export const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const getFaq = await Faq.findByPk(id);

        if (!getFaq) {
            return res.status(404).send(responseHandler({ status: 'failure', status_code: 404, message: "faq not found", errors: { message: "faq not found!" } }));
        }

        const faq = Faq.destroy({ where: { id } });
        return res.status(200).send(responseHandler({ status: 'success', status_code: 200, data: faq, request_body: req.body }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: 'failure', status_code: 500, message: error.message, request_body: req.body, errors: error }))
    }
};
