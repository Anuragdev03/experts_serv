import { deleteOtpData, getOtpData } from "../models/otpModal.js";
import { isEmailExists, updateExpertPassword } from "../models/userModal.js";
import { hashPasswordInWorker, isOtpExpired } from "../utils/utilities.js";


export async function resetPasswordController(req, reply) {
    const body = req.body;

    try {
        const userData = await isEmailExists(body?.email);
        if(!userData.exists) {
            return reply.code(404).send({ message: "User not found. Please check you email" });
        }
        const otpData = await getOtpData(userData.data[0]?.id);
        // For some reason the data is not needed in table
        if(!otpData?.rowCount) {
            return reply.code(400).send({message: "Something went wrong please try again with new otp"})
        }
        // Check the otp is expired
        const isExpired = isOtpExpired(otpData[0]?.expiry_time);
        if(isExpired) {
            return reply.code(400).send({message: "OTP expired. Please request new OTP"})
        }

        if(body.otp === otpData?.rows[0].otp) {
            const newPassword = await hashPasswordInWorker(body.password, 10);
            const result = await updateExpertPassword(newPassword, body?.email);
            if(result.rowCount) {
                await deleteOtpData(otpData?.rows[0].id);
                return reply.code(200).send({ message: "Password changed successfully "});
            }
        } else {
            return reply.code(400).send({ message: "The OTP is wrong"})
        }

    } catch(err) {
        console.log(err);
        return reply.code(400).send({message: "Something went wrong please try again"});
    }
}