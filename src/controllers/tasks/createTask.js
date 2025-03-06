import { createTask } from "../../models/tasksModal.js";


export async function createTaskController(req, reply) {
    const uid = req?.userId;
    const body = req.body;

    try {
        if(!body?.title) {
            return reply.code(200).send({message: "Title is required field "})
        }
        const payload = {
            uid,
            title: body.title,
            description: body?.description,
            due_date: body.due_date,
            priority: body.priority,
            status: body.status
        }

        const res = await createTask(payload);
        if(res.rows[0]?.id) {
            return reply.code(200).send({message: "Task Created Successfully"})
        } else {
            return reply.code(400).send({message: "Something went wrong "})
        }
    } catch(err) {
        return reply.code(400).send({message: "Something went wrong "})
    }
}