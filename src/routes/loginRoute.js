import { userLogin } from "../controllers/loginController.js"

export const login = {
    method: "POST",
    url: "/login",
    handler: userLogin,
    bodyLimit: 512 * 1024,
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string"},
                    token: { 
                        type: "object",
                        properties: {
                            accessToken: { type: "string" },
                            refreshToken: {type: "string"}
                        }
                    },
                    data: { 
                        type: "object",
                        properties: {
                            email: { type: "string"},
                            id: { type: "integer"},
                            user_name: { type: "string"},
                            name: { type: "string"}
                        }
                    }
                }
            },
            404: {
                type: "object",
                properties: {
                    message: { type: "string"}
                }
            }
        },
        body: {
            type: "object",
            properties: {
                email: { type: "string", maxLength: 150},
                password: {type: "string", minLength: 12, maxLength: 100},
            },
            required: ["email", "password"]
        }
    }, 
    config: {
        rateLimit: {
            max: 30,
            timeWindow: '1 minute',
        }
    }
};

export default async function loginRoute(fastify, opts) {
    fastify.route(login);
}

