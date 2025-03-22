import { updateExpertPassword } from "../models/expertModal.js";
import { getPasswordByUid } from "../models/userModal.js";
import { comparePasswordsInWorker, hashPasswordInWorker } from "../utils/utilities.js";



export async function changePasswordController(req, reply) {
    const uid = req?.userId;
    const body = req?.body;
    try {
        const current_password = body?.current_password;
        const new_password = body?.new_password;

        const hashedPassword = (await getPasswordByUid(uid))?.rows[0]?.password;

        const isValidUser = await comparePasswordsInWorker(current_password, hashedPassword);

        if (!isValidUser) {
            return reply.code(400).send({ message: "Password invalid" })
        }

        const encryptedPassword = await hashPasswordInWorker(new_password, 10);

        const res = await updateExpertPassword(uid, encryptedPassword);

        if(res.rowCount) {
            return reply.code(200).send({message: "Password changed successfully"});
        } else {
            return reply.code(400).send({ message: "Something went wrong" })
        }

    } catch (err) {
        console.log(err);
        return reply.code(400).send({ message: "Something went wrong" })
    }
}