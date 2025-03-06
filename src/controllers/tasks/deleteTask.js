import { deleteTask } from "../../models/tasksModal.js";


export async function deleteTaskController(req, reply) {
    const uid = req.userId;
    const taskId = req?.params?.id;

    try {
        if(!taskId) {
            return reply.code(400).send({message: "Something went wrong"})
        }
        const res = await deleteTask(uid, taskId);
        if(res.rows[0]?.id) {
            return reply.code(200).send({message: "Task deleted successfully"});
        } else {
            return reply.code(400).send({message: "Something went wrong"})
        }
    } catch(err) {
        return reply.code(400).send({message: "Something went wrong"})
    }
}