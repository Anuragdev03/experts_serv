import { jobsController } from "../controllers/jobsController.js";


const route = {
    method: "GET",
    url: "/jobs-list",
    handler: jobsController,
    bodyLimit: 12 *1024,
    config: {
        rateLimit: {
            max: 70,
            timeWindow: '1 minute',
        }
    },
    schema: {
        querystring: {
            type: "object", 
            properties: {
                keyword: { type: "string"}
            }
        },
        response: {
            400: {
                type: "object",
                properties: {
                    message: { type: "string" }
                }
            },
            200: {
                type: "object",
                properties: {
                    message: { type: "string"},
                    data: { type: "array",
                        items: {
                            properties: {
                                id: { type: "integer" },
                                name: { type: "string" }
                            }
                        }
                    }
                }
            }
        }
    }
}

export default function jobsRoute(fastify, opts) {
    fastify.route(route);
}