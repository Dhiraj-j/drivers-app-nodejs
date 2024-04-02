import { otp_expiry_time } from "../../config/config.js";


export function getDateTimeLater(time = otp_expiry_time) {
    const currentDate = new Date();
    const tenMinutesLater = new Date(currentDate.getTime() + time * 60000); // 10 minutes * 60 seconds * 1000 milliseconds
    return tenMinutesLater;
}
export function getDateTime() {
    const currentDate = new Date();
    return new Date(currentDate.getTime()); // 10 minutes * 60 seconds * 1000 milliseconds
}