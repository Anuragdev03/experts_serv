import { deleteRefreshTokenFromDb } from "../models/authModal.js";



export async function logoutController(req, reply) {
    try {
        const userId = req.userId;
        reply.clearCookie("refreshToken", {path: "/"});
        const res = await deleteRefreshTokenFromDb(userId);
        return reply.code(200).send({ message: 'Logout successful' });
    } catch(err) {
        return reply.code(400).send({message: "Something went wrong"})
    }
}