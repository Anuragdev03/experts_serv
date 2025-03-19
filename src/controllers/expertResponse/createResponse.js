import { checkIsItValidUrl, updateCustomerReqStatus } from "../../models/customerRequestModal.js";
import { addResponse } from "../../models/expertResponse.js";


export async function createResponse(req, reply) {
    const body = req.body;
    const userId = req.userId;
    const statusOption = ["pending", "accepted", "declined"];

    try {
        if(!statusOption.includes(body?.status)) {
            return reply.code(400).send({message: "Status is not valid "});
        }

        if(!body?.tracking_link) {
            return reply.code(400).send({message: "Tracking invalid"})
        }

        const isValid = await checkIsItValidUrl(body?.tracking_link, userId);
        if(isValid.rowCount === 0) {
            return reply.code(400).send({message: "Invalid url"})
        }

        const payload = {
            uid: userId,
            tracking_link: body.tracking_link,
            available_date: body.available_date,
            response_message: body.message,
            status: body.status
        }

        const res = await addResponse(payload);
        // Need to update the status in customer status table
        updateCustomerReqStatus(body.tracking_link, body?.status);
        if(res.rows[0].id) {
            return reply.code(200).send({message: "Success"})
        } else {
            return reply.code(400).send({message: "Something went wrong "})
        }
    } catch(err) {
        return reply.code(400).send({message: "Something went wrong "})
    }
}