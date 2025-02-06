import { expertsListController } from "../controllers/expertsListController.js";
import { expertProfileController } from "../controllers/expertProfileController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const expertList = {
    method: "GET",
    url: "/experts-list",
    handler: expertsListController,
    bodyLimit: 100 * 1024,
    schema: {
        querystring: {
            type: "object",
            properties: {
                page: { type: "integer", minimum: 1, default: 1 },
                limit: { type: "integer", minimum: 1, default: 15 },
                searchKey: { type: "string", maxLength: 100 },
                city: { type: "string", maxLength: 100 },
                state: { type: "string", maxLength: 100 },
                country: { type: "string", maxLength: 100 },
                job_ids: {
                    type: "string",
                },
                distance: { type: "integer", maximum: 100 },
                lat: { type: "string", maxLength: 50 },
                lng: { type: "string", maxLength: 50 }
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string" },
                    totalCount: { type: "integer" },
                    currentPage: { type: "integer" },
                    limit: { type: "integer" },
                    data: {
                        type: "array",
                        items: {
                            properties: {
                                name: { type: "string" },
                                email: { type: "string" },
                                id: { type: "integer" },
                                address: { type: "string" },
                                job_names: { type: "string" },
                                city: { type: "string" },
                                lat: { type: "string" },
                                lng: { type: "string" }
                            }
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
    },
    config: {
        rateLimit: {
            max: 70,
            timeWindow: '1 minute',
        }
    }
}

const updateExpert = {
    method: "PATCH",
    url: "/expert/update",
    bodyLimit: 100 * 1024,
    config: {
        rateLimit: {
            max: 70,
            timeWindow: '1 minute',
        }
    },
    preHandler: authMiddleware,
    handler: expertProfileController,
    schema: {
        body: {
            type: "object",
            properties: {
                name: { type: "string", maxLength: 100},
                address: {type: "string", maxLength: 250},
                city: { type: "string", maxLength: 100},
                state: { type: "string", maxLength: 100},
                country: { type: "string", maxLength: 100},
                pincode: { type: "string", maxLength: 10},
                lat: {type: "string", maxLength: 50},
                lng: {type: "string", maxLength: 50},
                jobIds: {type: "string", maxLength: 50},
                whatsapp_number: {type: "string", maxLength: 14}
            },
        },
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

export default function expertsRoutes(fastify, opts) {
    fastify.route(expertList);
    fastify.route(updateExpert);
}