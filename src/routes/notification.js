import { authMiddleware } from "../middlewares/authMiddleware.js";
import { notificationCountController } from "../controllers/notificationController/notificationCountController.js"


const countRoute = {
    method: "GET",
    url: "/notification/count",
    preHandler: authMiddleware,
    handler: notificationCountController,
    config: {
        rateLimit: {
            max: 60,
            timeWindow: '1 minute',
        }
    },
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string" },
                    count: { type: "string"}
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

export default function notificationRoute(fastify, opts) {
    fastify.route(countRoute);
}