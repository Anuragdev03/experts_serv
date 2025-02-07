import { generateAccessToken, verifyRefreshToken } from "../utils/utilities.js";


export async function refreshTokenController(req, reply) {
    try {
        const refreshToken = req?.cookies?.refreshToken;

        if(refreshToken) {
            const verifyTheToken = verifyRefreshToken(refreshToken);
            if(verifyTheToken.error) {
                return reply.code(401).send({message: "Login Again"})
            }
            if(verifyTheToken?.id) {
                const accessToken = generateAccessToken({id: verifyTheToken.id})
                return reply.code(200).send({ message: "Success", token: accessToken})
            }
        } 
    } catch(err) {
        console.log(err)
    }
}