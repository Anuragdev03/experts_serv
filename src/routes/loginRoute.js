import { userLogin } from "../controllers/loginController.js"

export const login = {
    method: "POST",
    url: "/login",
    handler: userLogin,
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string"}
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
                email: { type: "string"},
                password: {type: "string"},
            },
            required: ["email", "password"]
        }
    }, 
};

export default async function loginRoute(fastify, opts) {
    fastify.route(login);
}

