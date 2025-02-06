import { getJobsList } from "../models/jobsModal.js";


export async function jobsController(req, reply) {
    const queryParams = req.query;
    console.log(queryParams);

    try {
        const result = await getJobsList(queryParams?.keyword);
        reply.code(200).send({message: "Success", data: result.rows})
    } catch(err) {
        reply.code(400).send({message: "Something went wrong"})
    }
}