import { verifyToken } from "../utils/utilities.js";


export async function authMiddleware(req, reply) {
    const accessToken = req.headers?.authorization;    
    
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!accessToken) {
            return reply.code(401).send({message: "Unauthorized!"})
        }

        if(!refreshToken) {
            return reply.code(401).send({message: "Please login again"})
        }
        if(accessToken) {
            let token;
            if(accessToken && accessToken?.startsWith('Bearer ')) {
                token = accessToken.slice(7)
            }
            const isAuth = verifyToken(token);
            if(isAuth?.error) {
                return reply.code(401).send({message: isAuth.error})
            }
            if(isAuth?.id) {
                req.userId = isAuth?.id;
            }
        }
    } catch(err) {
        console.log(err)
        return reply.code(404).send({message: "Something went wrong. Please try again"});
    }
}