import twilio from "twilio";
import { account_s_id, auth_token, service_id } from "../../config/config.js";


const client = twilio(account_s_id, auth_token);
// client.verify()
export async function sendSMS({ text, phone, }) {
    try {
        const message = await client.messages.create({ body: text, to: phone, messagingServiceSid: service_id })
        return message
    } catch (error) {
        console.log(error)
        return { error }
    }
}

