import { storeRefreshToken } from "../models/authModal.js";
import { isEmailExists } from "../models/userModal.js";
import { comparePasswordsInWorker, generateAccessToken, generateRefreshToken } from "../utils/utilities.js";


export async function userLogin(req, reply) {
    const body = req?.body;

    try {

        const ifUserExists = await isEmailExists(body?.email);

        if (!ifUserExists?.exists) {
            return reply.code(404).send({ message: "User not found, please register an account" })
        }

        const isValidUser = await comparePasswordsInWorker(body?.password, ifUserExists?.data[0]?.password)
        if(isValidUser) {
            const accessToken = generateAccessToken({id: ifUserExists?.data[0].id});
            const refreshToken = generateRefreshToken({id: ifUserExists?.data[0].id});

            await storeRefreshToken(refreshToken, ifUserExists?.data[0].id);
            reply.setCookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true, // should be true in production
                sameSite: "Strict",
                path: "/",
                maxAge: 60 * 60 * 24 * 7
            })
            return reply.code(200).send({message: "Login Successful", token: { accessToken }, data: ifUserExists?.data[0] })
        } else {
            return reply.code(404).send({message: "User or password not found!"})
        }

    } catch (err) {
        console.log(err)
        return reply.code(404).send("Something went wrong please try again!")
    }
}