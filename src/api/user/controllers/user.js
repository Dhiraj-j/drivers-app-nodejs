
import { getPagination, getMeta, errorResponse } from "rapidjet"
import User from "../models/user.js";
import { Op, where } from "sequelize";
import Vehicle from "../../vehicle/models/vehicle.js";
import { issue, verify } from "../../../utils/jwt.js";
import { compare } from "../../../utils/bcrypt.js";
import Otp from "./../../otp/models/otp.js";
import { getDateTime, getDateTimeLater } from "../../../utils/date.js";
import mailSender from "../../../utils/email.js";
import { sendSMS, verifySMS } from "../../../utils/twilio.js";
import { role } from "../../../constants/user.js";
import { responseHandler } from "../../../utils/responseHandler.js";
import Role from "../../role/models/role.js";


export const create = async (req, res) => {
    try {
        const body = req.body;
        const { email, phone } = body;
        const isUserExists = await User.findOne({
            where: {
                [Op.or]: [{ email: email }, { phone: phone }]
            }
        })
        if (isUserExists) {
            const matching_value = Object.entries(isUserExists.dataValues).find(
                ([key, value]) => value === email || value === phone
            );
            return res.status(409).send({
                status_code: 409,
                status: "Failure",
                message: `User Already Exists with the ${matching_value[0]} ${matching_value[1]}`,
                errors: `User Already Exists with the ${matching_value[0]} ${matching_value[1]}`,
                request_body: req.body
            })
        }
        // create user
        const user = await User.create(body, { attributes: ["id"] });
        // create vehicles 
        if (body.vehicles && body.vehicles.length) {
            const vehiclesArray = body.vehicles.map((item) => {
                return { ...item, UserId: user.dataValues.id }
            })
            await Vehicle.bulkCreate(vehiclesArray)
        }
        return res.status(200).send({
            status: "sucess",
            status_code: 200,
            message: "User Created",
            more_info: null,
            data: user,
            request_body: req.body
        });
    } catch (error) {
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
        const whereClause = {};
        if (query.role && Object.values(role).includes(query.role.toUpperCase())) {
            whereClause.name = query.role.toUpperCase();
        }
        const users = await User.findAndCountAll({
            offset: pagination.offset,
            limit: pagination.limit,
            attributes: { exclude: ["password"] },
            // where: whereClause
            include: { model: Role, as: "role", where: whereClause }
        });
        const meta = await getMeta(pagination, users.count);
        return res.status(200).send({
            status: "success", status_code: 200,
            data: users.rows,
            meta: meta,
            request_body: req.body
        });
    } catch (error) {
        return res.status(500).send({
            status: "failure",
            status_code: 500,
            message: error.message,
            errors: error,
            request_body: req.body
        });
    }
};

export const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: { exclude: ["password"] }
        });
        if (!user) {
            return res.status(404).send(({ status: "failure", message: "user not found!", status_code: 404, errors: "user not found" }));
        }
        return res.status(200).send({ status: "success", status_code: 200, data: user });
    } catch (error) {
        return res.status(500).send({
            status: "failure", status_code: 500, message: error.message, errors: error, request_body: req.body
        });
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const getUser = await User.findByPk(id);

        if (!getUser) {
            return res.status(404).send({
                status: "failure", status_code: 404,
                message: "User Not found",
                details: "user id seems to be invalid"
            });
        }
        const [rowCount, [user]] = await User.update(req.body, { where: { id }, returning: true });
        return res.status(200).send({ status: "success", status_code: 200, message: "user updated!", data: user });
    } catch (error) {
        return res.status(500).send({
            status: "failure",
            status_code: 500,
            message: error.message,
            errors: error,
            request_body: req.body
        });
    }
};

export const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const getUser = await User.findByPk(id);

        if (!getUser) {
            return res.status(404).send({
                status: "failure",
                message: "user not found!",
                status_code: 404,
                errors: "user not found"
            });
        }

        const user = User.destroy({ where: { id } });
        return res.status(200).send({ message: "user deleted!", status_code: 200, status: "success", errors: null });
    } catch (error) {
        return res.status(500).send({
            status: "failure", status_code: 500, message: error.message, errors: error, request_body: req.body
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const token = verify(req);
        if (token.error) {
            return res.status(401).send({
                status: "failure",
                status_code: 401,
                message: token.error.message,
            })
        }
        const user = await User.findByPk(token.id, {
            attributes: { exclude: ["password"] }
        })
        return res.status(200).send({ status_code: 200, status: "success", errors: null, data: user })
    } catch (error) {
        return res.status(500).send({ status: "failure", status_code: 500, message: error.message, errors: error, request_body: req.body });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } })

        if (!user) {
            return res.status(404).send(({ status: "failure", message: "user not found!", status_code: 404, errors: "user not found" }));
        }
        const isMatched = await compare(password, user.dataValues.password)
        if (!isMatched) {
            return res.status(400).send({
                status: "failure",
                status_code: 400,
                message: "Credential Not Matched",
                errors: "Invalid User Credentials",
                request_body: req.body
            })
        }
        const jwt = issue({ id: user.id })
        delete user.dataValues.password
        return res.status(200).send({
            status: "sucess",
            status_code: 200, message: "login success",
            data: { token: jwt, user }, request_body: req.body
        })
    } catch (error) {
        return res.status(500).send({
            status: "failure",
            status_code: 500,
            message: error.message,
            errors: error,
            request_body: req.body
        });
    }
}

export const forgetPassword = async (req, res) => {
    try {
        const body = req.body;
        const sendMethod = body.email ? "EMAIL" : "PHONE"
        const whereClause = {};
        if (body.hasOwnProperty("phone")) {
            whereClause.phone = body.phone;
        }
        if (body.hasOwnProperty("email")) {
            whereClause.email = body?.email;
        }
        console.log(whereClause)
        const user = await User.findOne({ where: whereClause })
        if (!user) {
            return res.status(400).send({
                status: "failure",
                status_code: 400,
                message: "no account found!",
                errors: "No accound found with the given details",
                request_body: body
            });
        }
        const expiryTime = getDateTimeLater()
        const createOtp = await Otp.create({ otp: 123123, expires: expiryTime, UserId: user.dataValues.id })
        switch (sendMethod) {
            case "EMAIL":
                const sendOTP = await mailSender({
                    to: user.dataValues.email,
                    subject: "Regarding forget password",
                    text: `Hey! ${user.dataValues.name} One Time Password (OTP) to reset your password is ${123123}`
                })
                break;
            case "PHONE":
                const sendOTPSMS = await sendSMS("+91" + user.dataValues.phone)
                if (sendOTPSMS.error) {
                    return res.status(500).send(responseHandler({
                        status: "failure",
                        status_code: 500,
                        errors: sendOTPSMS.error,
                        message: "some error occured",
                        request_body: req.body
                    }))
                }
                break;

            default:
                break;
        }

        return res.status(200).send({
            status: "success",
            status_code: 200,
            message: `OTP has been sent to your ${body.email ? "email" : "phone"}!`,
            request_body: req.body
        })
    } catch (error) {
        return res.status(500).send({ status: "failure", status_code: 500, message: error.message, errors: error, request_body: req.body });

    }
}

export const resetPassword = async (req, res) => {
    try {
        const body = req.body;
        const whereClause = {};
        const sendMethod = body.email ? "EMAIL" : "PHONE"

        if (body.hasOwnProperty("phone")) {
            whereClause.phone = body.phone;
        }
        if (body.hasOwnProperty("email")) {
            whereClause.email = body.email;
        }
        const user = await User.findOne({ where: whereClause, include: ["otp"] })

        if (sendMethod === "EMAIL") {
            if (!user) {
                return res.status(404).send({ status: "failure", status_code: 404, errors: "No user found", message: "No user found associated with email" })
            }
            if (!user.otp) {
                return res.status(400).send({ status: "failure", status_code: 400, errors: "server error", message: "some internal server error occured" })
            }
            const isMatched = body.otp === user.otp.otp;
            if (!isMatched) {
                return res.status(400).send({
                    status: "failure",
                    status_code: 400,
                    message: "Invalid Credentials"
                })
            }
            const dateNow = getDateTime()
            if (!user.otp.expires > dateNow) {
                return res.status(400).send({
                    status: "failure",
                    status_code: 400,
                    message: "OTP has been expired ! please regenerate it"
                })
            }
            user.password = body.password;
            await user.save()
            return res.status(200).send({
                message: "Password has been updated!", status: "success", status_code: 200, request_body: req.body
            })
        } else {
            const verify = await verifySMS("+91" + body.phone, body.otp)
            if (verify.valid && verify.status === "approved") {
                return res.status(200).send(responseHandler({ data: verify, status: "success", message: "password reset successfully", request_body: req.body, status_code: 200 }))
            } else {
                return res.status(200).send(responseHandler({ data: verify, status: "failure", message: verify.error, request_body: req.body, status_code: 400 }))
            }
        }

    } catch (error) {
        return res.status(500).send({
            status: "failure", status_code: 500, message: error.message, errors: error, request_body: req.body
        });
    }
}
