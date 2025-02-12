import { customerRequestController } from "../controllers/customerRequestController.js";

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
                customer_phone: {type: "string", maxLength: 12},
                message: {type: "string", maxLength: 1000}
            },
            required: ["user_name", "customer_name", "customer_email", "customer_phone", "message"]
        }
    }
}


export default function customerRequestRoute(fastify, opts) {
    fastify.route(sendRequestRoute)
}