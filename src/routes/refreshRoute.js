import { refreshTokenMiddleware } from "../middlewares/refreshTokenMiddleware.js";
import { refreshTokenController } from "../controllers/refreshTokenController.js";


const route = {
    method: "GET",
    url: "/refresh-token",
    bodyLimit: 10 * 1024,
    config: {
        rateLimit: {
            max: 60,
            timeWindow: '1 minute',
        }
    },
    preHandler: refreshTokenMiddleware,
    handler: refreshTokenController,
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string" },
                    token: { type: "string"}
                }
            },
            400: {
                type: "object",
                properties: {
                    message: { type: "string" },
                }
            }
        }
    }
}

export default function refreshTokenRoute(fastify, opts) {
    fastify.route(route)
}