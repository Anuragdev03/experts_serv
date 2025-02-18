import { updateUser } from "../models/userModal.js";


export async function expertProfileController(req, reply) {
    const userId = req?.userId;
    const body = req.body;

    try {
        if(!userId) {
            return reply.code(404).send({message: "Unauthorized"})
        }
        let payload = {...body, id: userId}
        if(body?.jobIds) {
            const job_ids = body.jobIds.split(",");
            payload = {...payload, job_ids}
        }
        const res = await updateUser(payload);
        if(res.rowCount) {
            return reply.code(200).send({message: "Profile updated successfully"});
        }

    } catch(err) {
        return reply.code(400).send({message: "Something went wrong"})
    }
}