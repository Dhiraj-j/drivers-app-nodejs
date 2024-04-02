import { config } from "dotenv"
config()

export const mongo_uri = process.env.MONGO_URI;
export const jwt_secret = process.env.JWT_SECRET;
export const email_user = process.env.EMAIL_USER;
export const email_app_password = process.env.EMAIL_APP_PASSWORD;
export const email_service = process.env.EMAIL_SERVICE;
export const service_id = process.env.serviceId;
export const auth_token = process.env.authToken;
export const account_s_id = process.env.accountSid;
export const node_env = process.env.NODE_ENV;
export const port = process.env.PORT || 8899;
export const otp_expiry_time = 10;// in minutes