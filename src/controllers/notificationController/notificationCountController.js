import { getNotificationCount } from "../../models/notificationModal.js";


export async function notificationCountController(req, reply) {
    const uid = req.userId;

    try {
        const res = await getNotificationCount(uid);
        console.log(res)
        if(res.rowCount) {
            return reply.code(200).send({message: "Success", count: res.rows[0].count})
        }
    } catch(err) {
        console.log(err);
        return reply.code(400).send({message: "Something went wrong"});
    }
}