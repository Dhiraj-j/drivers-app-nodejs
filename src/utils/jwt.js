import jwt from 'jsonwebtoken'
import { jwt_secret } from "../../config/config.js";

export function issue(payload) {
    try {
        const token = jwt.sign(payload, jwt_secret, { expiresIn: "7d" });
        return token;
    } catch (error) {
        console.log(error);
        return { error };
    }
}
export function verify(req) {
    try {
        if (req.headers.hasOwnProperty("authorization")) {

            const token = req.headers.authorization.split(" ")[1];
            const data = jwt.verify(token, jwt_secret);
            return data;
        } else {
            return { error: "No Bearer token pass in request" };
        }
    } catch (error) {
        console.log(error);
        return { error };
    }
}
