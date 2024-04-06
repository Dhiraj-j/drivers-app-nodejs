import twilio from "twilio";
import { account_s_id, auth_token, service_id } from "../../config/config.js";


const client = twilio(account_s_id, auth_token);
/**
 * @param {string} phone containing country code 
 * @returns 
 */
export async function sendSMS(phone) {
    try {
        return await client.verify.v2.services(service_id).verifications.create({ to: phone, channel: "sms" })
    } catch (error) {
        console.log(error)
        return { error }
    }
}
/**
 * @param {string} phone with country code 
 * @param {string} otp otp recieved on phone 
 * @returns  
 */
export async function verifySMS(phone, otp) {
    try {
        return await client.verify.v2.services(service_id).verificationChecks.create({ to: `${phone}`, code: otp })
    } catch (error) {
        console.log(error)
        return { error }
    }
}

