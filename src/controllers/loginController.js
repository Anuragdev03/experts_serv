import { isEmailExists } from "../models/userModal.js";
import { comparePasswordsInWorker, generateAccessToken, generateRefreshToken } from "../utils/utilities.js";


export async function userLogin(req, reply) {
    const body = req?.body;

    console.log(body, "--------body");

    try {

        const ifUserExists = await isEmailExists(body?.email);

        if (!ifUserExists?.exists) {
            return reply.code(404).send({ message: "User not found, please register an account" })
        }

        const isValidUser = await comparePasswordsInWorker(body?.password, ifUserExists?.data[0]?.password)
        if(isValidUser) {
            const accessToken = generateAccessToken({email: ifUserExists?.data[0].email});
            const refreshToken = generateRefreshToken({email: ifUserExists?.data[0].email});
            console.log(accessToken, refreshToken)
            return reply.code(200).send({message: "Login Successful"})
        } else {
            return reply.code(404).send({message: "User not found!"})
        }

    } catch (err) {
        return reply.code(404).send("Something went wrong please try again!")
    }
}