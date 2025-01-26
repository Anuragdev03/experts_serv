import { registerationController } from "../controllers/registerationController.js";

const registerProps = {
    method: "POST",
    url: "/expert-signup",
    handler: registerationController,
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
                    }
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
                address: { type: "string", maxLength: 255 },
                city: { type: "string", maxLength: 100 },
                state: { type: "string", maxLength: 100 },
                country: { type: "string", maxLength: 100 },
                pincode: { type: "string", maxLength: 10},
                lat: { type: "string", maxLength: 50 },
                lng: { type: "string", maxLength: 50 },
                job_ids: {
                    type: "array",
                    items: { type: "integer" },
                    minItems: 1,
                    uniqueItems: true
                },
                mobile_number: {type: "string", maxLength: 12},
                whatsapp_number: { type: "string", maxLength: 12 },
                role: { type: "string", maxLength: 10}
            },
            required: ["name", "user_name", "password", "address", "city", "state", "country", "pincode", "lat", "lng", "job_ids", "mobile_number", "role"],
        }
    },
}

export default async function registerationRoutes(fastify, opts) {
    fastify.route(registerProps)
}