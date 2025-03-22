import { updateExpertProfileStatus } from "../models/expertModal.js";


export async function profileStatusController(req, reply) {
    const uid = req?.userId;
    const status = req?.body?.show_profile;

    try {
        const res = await  updateExpertProfileStatus(uid, status);
        console.log(res.rows)
        if(res?.rowCount) {
            return reply.code(200).send({message: "Success", show_profile: res?.rows[0]?.show_profile})
        } else {
            return reply.code(400).send({message: "Something went wrong"});
        }
    } catch(err) {
        console.log(err);
        return reply.code(400).send({message: "Something went wrong"});
    }

}