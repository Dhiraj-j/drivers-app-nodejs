
import { getPagination, getMeta, errorResponse } from "rapidjet"
import Privacy_policy from "../models/privacy_policy.js";
import { responseHandler } from "../../../utils/responseHandler.js";

export const create = async (req, res) => {
    try {
        const isRecordExists = await Privacy_policy.findOne();
        if (isRecordExists) {
            const privacy_policy = await Privacy_policy.update(req.body, { where: { id: isRecordExists.dataValues.id } });
            return res.status(200).send(responseHandler({ status: 'success', status_code: 200, data: privacy_policy, request_body: req.body }));
        } else {
            const privacy_policy = await Privacy_policy.create(req.body);
            return res.status(200).send(responseHandler({ status: 'success', status_code: 200, data: privacy_policy, request_body: req.body }));
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: 'failure', status_code: 500, request_body: req.body, errors: error, message: error.message }))
    }
};

export const find = async (req, res) => {
    try {
        const query = req.query;
        const privacy_policy = await Privacy_policy.findOne();
        return res.status(200).send(responseHandler({ status: 'success', status_code: 200, data: privacy_policy, }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: 'failure', status_code: 500, request_body: req.body, errors: error, message: error.message }))
    }
};
