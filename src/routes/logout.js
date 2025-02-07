import { authMiddleware } from "../middlewares/authMiddleware.js";
import {logoutController} from "../controllers/logoutController.js";


const route = {
    method: "GET",
    url: "/logout",
    bodyLimit: 10 * 1024,
    config: {
        rateLimit: {
            max: 60,
            timeWindow: '1 minute',
        }
    },
    preHandler: authMiddleware,
    handler: logoutController,
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string" },
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

export default function logoutRoute(fastify, opts) {
    fastify.route(route);
}