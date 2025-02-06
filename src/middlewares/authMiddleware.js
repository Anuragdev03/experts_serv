import { verifyToken } from "../utils/utilities.js";


export async function authMiddleware(req, reply, done) {
    const accessToken = req.headers?.authorization;

    try {
        if(!accessToken) {
            return reply.code(404).send({message: "Unauthorized!"})
        }

        if(accessToken) {
            let token;
            if(accessToken && accessToken?.startsWith('Bearer ')) {
                token = accessToken.slice(7)
            }
            const isAuth = verifyToken(token);
            if(!isAuth) {
                return reply.code(404).send({message: "Token expired!"})
            }
            if(isAuth?.id) {
                req.userId = isAuth?.id;
                done();
            }
        }
    } catch(err) {
        console.log(err)
        return reply.code(404).send({message: "Something went wrong. Please try again"});
    }
}