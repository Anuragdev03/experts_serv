import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createResponse } from "../controllers/expertResponse/createResponse.js";
import { viewExpertResponse } from "../controllers/expertResponse/viewResponse.js";
import { updateExpertResponse } from "../controllers/expertResponse/updateResponse.js";


const postRoute = {
    method: "POST",
    url: "/expert-response/create",
    preHandler: authMiddleware,
    handler: createResponse,
    bodyLimit: 100 * 1024,
    config: {
        rateLimit: {
            max: 60,
            timeWindow: '1 minute',
        }
    },
    schema: {
        body: {
            type: "object",
            properties: {
                tracking_link: { type: "string", maxLength: 12 },
                available_date: { type: "string", maxLength: 100 },
                message: { type: "string", maxLength: 500 },
                status: { type: "string", maxLength: 50 }
            },
            required: ["tracking_link", "available_date", "message", "status"]
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
                    message: { type: "string" }
                }
            }
        }
    }
}

const viewRoute = {
    method: "GET",
    url:"/expert-response/view",
    bodyLimit: 100 * 1024,
    config: {
        rateLimit: {
            max: 60,
            timeWindow: '1 minute',
        }
    },
    handler: viewExpertResponse,
    schema: {
        querystring: {
            type: "object",
            properties: {
                url: {type: "string"}
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    message: {type: "string"},
                    data: {
                        type: "object",
                        properties: {
                            available_date: {type: "string"},
                            response_message: {type: "string"},
                            status: {type: "string"}
                        }
                    }
                }
            }
        }
    }
}

const updateRoute = {
    method: "PATCH",
    url: "/expert-response/update",
    preHandler: authMiddleware,
    handler: updateExpertResponse,
    bodyLimit: 100 * 1024,
    config: {
        rateLimit: {
            max: 60,
            timeWindow: '1 minute',
        }
    },
    schema: {
        body: {
            type: "object",
            properties: {
                tracking_link: { type: "string", maxLength: 12 },
                available_date: { type: "string", maxLength: 100 },
                message: { type: "string", maxLength: 500 },
                status: { type: "string", maxLength: 50 },
            },
            required: ["tracking_link"]
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
                    message: { type: "string" }
                }
            }
        }
    }
}

export default function expertResponseRoute(fastify) {
        fastify.route(postRoute);
        fastify.route(viewRoute);
        fastify.route(updateRoute);
}