import { getExpertDetails } from "../models/expertModal.js";


export async function expertDetailController(req, reply) {
    const userId = req.userId;

    
    try {
        if(!userId) {
            return reply.code(400).send({message: "User not found. please try again"})
        }
        const res = await getExpertDetails(userId);
        return reply.code(200).send({message: "success", data: res.rows[0]})
    } catch(err) {
        return reply.code(400).send({message: "Something went wrong. please try again"})
    }
}