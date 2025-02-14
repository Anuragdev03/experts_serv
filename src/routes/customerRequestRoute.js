import { getCustomerRequestCount } from "../controllers/customerRequest/customerReqCount.js";
import { customerRequestController } from "../controllers/customerRequest/customerRequestController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const sendRequestRoute = {
    method: "POST",
    url: "/customer-request",
    bodyLimit: 100 * 1024,
    config: {
        rateLimit: {
            max: 30,
            timeWindow: '1 minute',
        }
    },
    handler: customerRequestController,
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string" },
                    trackingLink: { type: "string"}
                }
            },
            400: {
                type: "object",
                properties: {
                    message: { type: "string" },
                }
            }
        },
        body: {
            type: "object",
            properties: {
                user_name: {type: "string", maxLength: 100},
                customer_name: {type: "string", maxLength: 100},
                customer_email: {type: "string", maxLength: 200},
                customer_phone: {type: "string", maxLength: 14},
                message: {type: "string", maxLength: 1000}
            },
            required: ["user_name", "customer_name", "customer_email", "customer_phone", "message"]
        }
    }
}

const getCount = {
    url: "/customer-request/count",
    method: "GET",
    bodyLimit: 100 * 1024,
    config: {
        rateLimit: {
            max: 30,
            timeWindow: '1 minute',
        }
    },
    preHandler: authMiddleware,
    handler: getCustomerRequestCount,
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


export default function customerRequestRoute(fastify, opts) {
    fastify.route(sendRequestRoute);
    fastify.route(getCount);
}