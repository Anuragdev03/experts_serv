import { deleteExpertAccount, getPasswordByUid } from "../../models/userModal.js";
import { comparePasswordsInWorker } from "../../utils/utilities.js";


export async function deleteExpertController(req, reply) {
    const uid = req?.userId;
    try {
        const password = req?.body?.password;
        if (!password) {
            return reply.code(400).send({ message: "Something went wrong" })
        }
        const hashedPassword = (await getPasswordByUid(uid))?.rows[0]?.password;

        if (!hashedPassword) {
            return reply.code(400).send({ message: "Something went wrong" })
        }

        const isValidUser = await comparePasswordsInWorker(password, hashedPassword);

        if (isValidUser) {
            const res = await deleteExpertAccount(uid);
            if (res.rows[0]?.id) {
                return reply.code(200).send({ message: "Account deleted successfully" });
            }
        } else {
            return reply.code(400).send({ message: "Invalid User" })
        }

    } catch (err) {
        return reply.code(400).send({ message: "Something went wrong" })
    }
}