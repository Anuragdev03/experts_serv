import { forgotPasswordController } from "../controllers/forgotPasswordController.js";
import { resetPasswordController } from "../controllers/resetPasswordController.js";

const route = {
    method: "POST",
    url: "/forgot-password",
    handler: forgotPasswordController,
    bodyLimit: 212 * 1024,
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string" }
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
                email: { type: "string" }
            },
            required: ["email"]
        }
    },
    config: {
        rateLimit: {
            max: 2,
            timeWindow: '1 minute',
        }
    }
}

const resetPassword = {
    method: "POST",
    url: "/reset-password",
    handler: resetPasswordController,
    bodyLimit: 212 * 1024,
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string" }
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
                otp: { type: "string", minLength: 6, maxLength: 6 },
                password: { type: "string", maxLength: 100, minLength: 12 },
                email: { type: "string", maxLength: 150, minLength: 6}
            },
            required: ["otp", "password", "email"]
        }
    },
    config: {
        rateLimit: {
            max: 20,
            timeWindow: '1 minute',
        }
    }
};

export default async function forgotPasswordRoute(fastify, opts) {
    fastify.route(route);
    fastify.route(resetPassword);
}