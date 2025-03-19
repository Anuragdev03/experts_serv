import { getJobsList } from "../models/jobsModal.js";


export async function jobsController(req, reply) {
    const queryParams = req.query;

    try {
        const result = await getJobsList(queryParams?.keyword);
        return reply.code(200).send({message: "Success", data: result.rows})
    } catch(err) {
        return reply.code(400).send({message: "Something went wrong"})
    }
}