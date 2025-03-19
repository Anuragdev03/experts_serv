import { getEventList } from "../../models/eventsModal.js";



export async function eventListController(req, reply) {
    let start = req.query?.start;
    let end = req.query?.end
    const uid = req?.userId;

    try {
        if(!start) {
            return reply.code(200).send({message: "Something went wrong"})
        }

        if(!end) {
            return reply.code(200).send({message: "Something went wrong"})
        }

        const res = await getEventList(uid, start, end);
        if(res?.rowCount > 0) {
            return reply.code(200).send({message: "Success", data: res.rows});  
        } else {
            return reply.code(200).send({message: "No Data Found!"})
        }
    } catch(err) {
        return reply.code(200).send({message: "Something went wrong"})
    }
}