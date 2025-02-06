import { registrationController } from "../controllers/registrationController.js";

const registerProps = {
    method: "POST",
    url: "/expert-signup",
    handler: registrationController,
    bodyLimit: 512 * 1024,
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string" },
                    data: { 
                        type: "object",
                        properties: {
                            email: { type: "string"},
                            id: { type: "integer"},
                            user_name: { type: "string"},
                            name: { type: "string"}
                        }
                    },
                    token: { 
                        type: "object",
                        properties: {
                            accessToken: { type: "string" },
                            refreshToken: {type: "string"}
                        }
                    },
                }
            },
            404: {
                type: "object",
                properties: {
                    message: { type: "string" }
                }
            }
        },
        body: {
            type: "object",
            properties: {
                name: { type: "string", minLength: 3, maxLength: 100 },
                user_name: { type: "string", minLength: 3, maxLength: 100 },
                password: { type: "string", minLength: 12, maxLength: 100 },
                email: { type: "string", maxLength: 150},
                role: { type: "string", maxLength: 10},
                mobile_number: {type: "string", maxLength: 12, minLength: 5}
            },
            required: ["name", "user_name", "email", "password", "role", "mobile_number"],
        }
    },
    config: {
        rateLimit: {
            max: 30,
            timeWindow: '1 minute',
        }
    }
}

export default async function registerationRoutes(fastify, opts) {
    fastify.route(registerProps)
}