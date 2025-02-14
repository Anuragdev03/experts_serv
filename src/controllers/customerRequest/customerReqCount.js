import { requestCount } from "../../models/customerRequestModal.js";



export async function getCustomerRequestCount(req, reply) {
    const uid = req.userId;

    try {
        const res = await requestCount(uid, "pending");
        if(res.rowCount) {
            return reply.code(200).send({message: "Success", count: res.rows[0].count})
        }
    } catch(err) {
        return reply.code(400).send({message: "Something went wrong."})
    }
}