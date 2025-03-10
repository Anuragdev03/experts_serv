import { markAllAsRead, maskAsRead } from "../../models/notificationModal.js";


export async function updateNotification(req, reply) {
    const uid = req?.userId;
    const body = req?.body;
    
    try {
        if(body?.type === "mark_as_read") {
            if(!body?.id) {
                return reply.code(400).send({message: "Something went wrong!"})
            }
            const res = await maskAsRead(uid, body?.id);
            if(res) {
                return reply.code(200).send({message: "Notification status updated"})
            }
        } else if(body?.type === "mark_all_as_read") {
            const res = await markAllAsRead(uid);
            if(res) {
                return reply.code(200).send({message: "Notification status updated"})
            }
        }
        
    } catch(err) {
        return reply.code(400).send({message: "Something went wrong!"})
    }
}