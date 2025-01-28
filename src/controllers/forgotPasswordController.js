import { checkOtpExists, storeOtp, updateOtp } from "../models/otpModal.js";
import { isEmailExists } from "../models/userModal.js";
import { generateOTP } from "../utils/utilities.js";


export async function forgotPasswordController(req, reply) {

    const userEmail = req?.body?.email;
    const ifUserExists = await isEmailExists(userEmail);

    try {

        if (!ifUserExists?.exists) {
            return reply.code(404).send({ message: "User not found, please register an account" })
        }

        // Generate OTP and sent it through email.
        const otp = generateOTP();
        const created_at = new Date();
        const expiry_time = new Date().setHours(created_at.getHours() + 1);
        const formatExp = new Date(expiry_time); 

        // Before storing the otp to db need to check if the user already requested for otp in that case need to update otp
        // Due to email limit and security user can generate otp once in a data
        const today = new Date();
        today.setHours(0,0,0,0);
        const latestOtpData = await checkOtpExists(ifUserExists.data[0]?.id);

        if(latestOtpData.rows?.length) {
            const latestExpTime = latestOtpData?.rows[0]?.expiry_time;
            // if(latestExpTime && new Date(latestExpTime).getTime() >= today.getTime()) {
            //     return reply.code(400).send({ message: "User can request otp once in a day. Please try again tomorrow"})
            // }

            // If user requesting the otp the next day
            const res = await updateOtp(otp, created_at, formatExp, ifUserExists.data[0]?.id);
            if(res.rowCount) {
                return reply.code(200).send({message: "OTP has been sent to you email"})
            } 
        }
        // Store otp to DB
        const res = await storeOtp(ifUserExists.data[0]?.id, otp, created_at, formatExp);
        // After storing the otp in db successfully
        if(res.rowCount) {
            // Call the send email function after 
            return reply.code(200).send({message: "OTP has been sent to you email"})
        }

    } catch (err) {
        console.log(err)
        return reply.code(400).send({message: "Something went wrong"})
    }
}