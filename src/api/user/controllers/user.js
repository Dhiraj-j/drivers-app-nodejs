
import { getPagination, getMeta, errorResponse } from "rapidjet"
import User from "../models/user.js";
import { Op, where } from "sequelize";
import Vehicle from "../../vehicle/models/vehicle.js";
import { issue, verify } from "../../../utils/jwt.js";
import { compare } from "../../../utils/bcrypt.js";
import Otp from "./../../otp/models/otp.js";
import { getDateTime, getDateTimeLater } from "../../../utils/date.js";
import mailSender from "../../../utils/email.js";
import { sendSMS } from "../../../utils/twilio.js";
import { user_types } from "../../../constants/user.js";


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
            return res.status(409).send(errorResponse({
                message: `User Already Exists with the ${matching_value[0]} ${matching_value[1]}`,
            }));
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
            data: {
                name: user.name,
                email: user.email,
                phone: user.phone
            },
            message: "User Created!"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const find = async (req, res) => {
    try {
        const query = req.query;
        const pagination = await getPagination(query.pagination);
        const whereClause = {};
        if (query.role && Object.values(user_types).includes(query.role.toUpperCase())) {
            whereClause.role = query.role.toUpperCase();
        }
        const users = await User.findAndCountAll({
            offset: pagination.offset,
            limit: pagination.limit,
            attributes: { exclude: ["password"] },
            where: whereClause
        });
        const meta = await getMeta(pagination, users.count);
        return res.status(200).send({ data: users.rows, meta });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: { exclude: ["password"] }
        });
        if (!user) {
            return res.status(404).send(errorResponse({ status: 404, message: "user not found!" }));
        }
        return res.status(200).send({ data: user });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const getUser = await User.findByPk(id);

        if (!getUser) {
            return res.status(404).send(errorResponse({ message: "User Not found", details: "user id seems to be invalid" }));
        }

        const [rowCount, [user]] = await User.update(req.body, { where: { id }, returning: true });
        return res.status(200).send({ message: "user updated!", data: user });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const getUser = await User.findByPk(id);

        if (!getUser) {
            return res.status(404).send(errorResponse({ message: "User Not found", details: "user id seems to be invalid" }));
        }

        const user = User.destroy({ where: { id } });
        return res.status(200).send({ message: "user deleted!" });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const getMe = async (req, res) => {
    try {
        const token = verify(req);
        if (token.error) {
            return res.status(401).send(errorResponse({ status: 401, message: token.error.message }))
        }
        const user = await User.findByPk(token.id, {
            attributes: { exclude: ["password"] }
        })
        return res.status(200).send({ data: user })
    } catch (error) {
        console.log(error)
        return res.status(500).send(errorResponse({ status: 500, message: error.message }))
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(400).send(errorResponse({ message: "No user found associated with email" }))
        }
        const isMatched = await compare(password, user.password)
        if (!isMatched) {
            return res.status(400).send(errorResponse({ message: "Invalid user credential" }))
        }
        const jwt = issue({ id: user.id })
        return res.status(200).send({ data: { jwt }, message: "User Verified!" })
    } catch (error) {
        return res.status(500).send(errorResponse({
            message: error.message,
            status: 500
        }))
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
            whereClause.email = body.email;
        }
        const user = await User.findOne({ where: whereClause })
        if (!user) {
            return res.status(404).send(errorResponse({ status: 404, message: `account not found!` }))
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
                const sendOTPSMS = await sendSMS({ phone: user.dataValues.phone, text: `Hey! ${user.dataValues.name}  One Time Password (OTP) to reset your password is ${123123}` })
                break;

            default:
                break;
        }

        return res.status(200).send({ message: `OTP has been sent to your ${body.email ? "email" : "phone"}!` })
    } catch (error) {
        return res.status(500).send(errorResponse({
            message: error.message,
            status: 500
        }))
    }
}

export const resetPassword = async (req, res) => {
    try {
        const body = req.body;
        const whereClause = {};

        if (body.hasOwnProperty("phone")) {
            whereClause.phone = body.phone;
        }
        if (body.hasOwnProperty("email")) {
            whereClause.email = body.email;
        }
        const user = await User.findOne({ where: whereClause, include: ["otp"] })
        if (!user) {
            return res.status(400).send(errorResponse({ message: "No user found associated with email" }))
        }
        if (!user.otp) {
            return res.status(500).send(errorResponse({ message: "server error please regenerate" }))
        }
        const isMatched = body.otp === user.otp.otp;
        if (!isMatched) {
            return res.status(400).send(errorResponse({ message: "Invalid OTP" }))
        }
        const dateNow = getDateTime()
        if (!user.otp.expires > dateNow) {
            return res.status(400).send(errorResponse({ message: "OTP Expired! please regenerate it" }))
        }
        user.password = body.password;
        await user.save()
        return res.status(200).send({ message: "Password has been updated!" })
    } catch (error) {
        return res.status(500).send(errorResponse({
            message: error.message,
            status: 500
        }))
    }
}
