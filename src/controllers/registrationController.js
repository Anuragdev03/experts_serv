import { storeRefreshToken } from "../models/authModal.js";
import { checkIfUserExist, createNewUsers, isMobileNumberExists } from "../models/userModal.js";
import { generateAccessToken, generateRefreshToken, isValidEmail } from "../utils/utilities.js";


export async function registrationController(req, reply) {
    const body = req?.body;

    // Checking for errors
    const validEmail = isValidEmail(body?.email);

    if (!validEmail) {
        return reply.code(400).send({ message: "Invalid Email!" })
    }

    const isUserExists = await checkIfUserExist(body?.user_name, body?.email);

    const isMobNoExists = await isMobileNumberExists(body?.mobile_number);

    if (isUserExists?.email) {
        return reply.code(400).send({ message: "Email already exists" })
    }

    if (isUserExists?.user_name) {
        return reply.code(400).send({ message: "User name already exists" })
    }

    if(isMobNoExists.exists) {
        return reply.code(400).send({message: "Mobile number already exists"})
    }

    if (body?.role !== "expert") {
        return reply.code(400).send("Something went wrong!")
    }

    try {

        const created_at = new Date();
        const queryObj = { ...body, created_at };
        const res = await createNewUsers(queryObj);
        if (res?.rows[0]?.email) {
            // Generate token
            const accessToken = generateAccessToken({ id: res?.rows[0]?.id });
            const refreshToken = generateRefreshToken({ id: res?.rows[0]?.id });

            // store the refresh token in db
            await storeRefreshToken(refreshToken, res?.rows[0]?.id);
            reply.setCookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "Strict",
                path: "/"
            })
            return reply.code(200).send({ message: "Registration successful", data: res?.rows[0], token: { accessToken } });
        }

    } catch (err) {
        console.log(err)
        return reply.code(400).send({ message: "Something went wrong please try again" })
    }

}