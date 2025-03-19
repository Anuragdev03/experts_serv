import { nanoid } from "nanoid";
import { getUserIdByUserName } from "../../models/userModal.js";
import { addCustomerRequest } from "../../models/customerRequestModal.js";
import { sendNotification } from "../../models/notificationModal.js";


export async function customerRequestController(req, reply) {
    const body = req.body;

    try {
        if (body.user_name
            && body.customer_name
            && body.customer_email
            && body.customer_phone
            && body.message) {
            // Validate user name and get user id
                const isValidUser = await getUserIdByUserName(body?.user_name);
                if(isValidUser?.rows[0].id) {
                    const uid = isValidUser?.rows[0].id;
                    const trackingLink = nanoid(10);
                    const payload = {
                        uid,
                        tracking_link: trackingLink,
                        ...body
                    }
                    const result = await addCustomerRequest(payload);
                    if(result?.rows[0].tracking_link) {
                        sendNotification(uid, `Hi, you have received a new request from the user ${body?.customer_name}, Please check it.`)
                        return reply.code(200).send({message: "Request sent successfully", trackingLink: result?.rows[0].tracking_link})
                    }
                }
        } else {
            return reply.code(400).send({ message: "Some required fields are missing!" })
        }
    } catch (err) {
        return reply.code(400).send({ message: "Something went wrong." });
    }
}