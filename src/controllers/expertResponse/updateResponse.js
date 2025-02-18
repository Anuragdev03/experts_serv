import { updateCustomerReqStatus } from "../../models/customerRequestModal.js";
import { isValidExpertUrl, updateExpertRes } from "../../models/expertResponse.js";


export async function updateExpertResponse(req, reply) {
    const body = req.body;
    
    try {
        const uid = req.userId;
        const tracking_link = body.tracking_link;

        // Check if the link exists
        const isValid = await isValidExpertUrl(uid, tracking_link);
        if(!isValid.rows[0].id) {
            return reply.code(400).send({ message: "Something went wrong" })
        }

        const res = await updateExpertRes(body);
        if(body?.status) {
            updateCustomerReqStatus(tracking_link, body.status)
        }
        if(res.rows[0].id) {
            return reply.code(200).send({ message: "Success"})
        } else {
            return reply.code(400).send({ message: "Something went wrong" })
        }

     } catch (err) {
        return reply.code(400).send({ message: "Something went wrong" })
    }
}