import { updateTask } from "../../models/tasksModal.js";


export async function updateTaskController(req, reply) {
    const uid = req.userId;
    const body = req.body;
    try {
        let payload = { uid, id: body?.id };
        if(body?.title) {
            payload = {...payload, title: body.title };
        }
        if(body?.description) {
            payload = {...payload, description: body?.description }
        }
        if(body?.due_date) {
            payload = {...payload, due_date: body.due_date }
        }
        if(body?.status) {
            payload = {...payload, status: body?.status }
        }
        if(body?.priority) {
            payload = {...payload, priority: body?.priority }
        }

        const res = await updateTask(payload);
        if(res.rows[0]?.id) {
            return reply.code(200).send({message: "Task updated successfully"})
        } else {
            return reply.code(400).send({message: "Something went wrong"})
        }
    } catch(err) {
        return reply.code(400).send({message: "Something went wrong"})
    }
}