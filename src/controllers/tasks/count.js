import { tasksCount } from "../../models/tasksModal.js";


export async function getTasksCount(req, reply) {
    const uid = req?.userId;
    try {
        const res = await tasksCount(uid);
        if(res.rowCount) {
            return reply.code(200).send({message: "Success", count: res.rows[0].count})
        }
    } catch(err) {
        return reply.code(400).send({message: "Something went wrong"})
    }
}