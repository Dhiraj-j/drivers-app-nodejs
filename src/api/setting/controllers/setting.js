
import { getPagination, getMeta, errorResponse } from "rapidjet"
import Setting from "../models/setting.js";
import { responseHandler } from './../../../utils/responseHandler.js';

export const create = async (req, res) => {
    try {
        const isSettingExists = await Setting.findOne();
        if (isSettingExists) {
            const setting = await Setting.update(req.body, { where: { id: isSettingExists.dataValues.id } });
            return res.status(200).send(responseHandler({ status: 'success', status_code: 200, data: setting, request_body: req.body, message: "setting updated successfylly" }));
        } else {
            const setting = await Setting.create(req.body);
            return res.status(200).send(responseHandler({ status: 'success', status_code: 200, data: setting, request_body: req.body, message: "setting created successfylly" }));
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({ status: 'failure', status_code: 500, message: error.message, request_body: req.body, errors: error }))
    }
};

export const find = async (req, res) => {
    try {
        const settings = await Setting.findOne();
        return res.status(200).send(responseHandler({
            status: 'success',
            status_code: 200,
            data: settings
        }));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseHandler({
            status: 'failure',
            status_code: 500,
            message: error.message,
            errors: error
        }))
    }
};

