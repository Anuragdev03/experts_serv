import { verifyToken } from "../utils/utilities.js";


export async function refreshTokenMiddleware(req, reply, done) {
    try {
        const refreshToken = req?.cookies?.refreshToken;
        // the access toke should be valid but expired
        const accessToken = req.headers?.authorization;
        if (accessToken) {
            let token;
            if (accessToken && accessToken?.startsWith('Bearer ')) {
                token = accessToken.slice(7)
            }
            const isAuth = verifyToken(token);

            if (isAuth?.error && isAuth?.error !== "Token has expired") {
                return reply.code(401).send({ message: isAuth.error })
            }
        }


        if (!refreshToken) {
            return reply.code(401).send({ message: "Unauthorized! please login again" });
        }
        done();
    } catch (err) {
        return reply.code(400).send({ message: "Something went wrong" })
    }
}