import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createEventController } from "../controllers/eventsController/createEvent.js";
import { eventListController } from "../controllers/eventsController/eventList.js";

const createRoute = {
    method: "POST",
    url: "/events/create",
    bodyLimit: 100 * 1024,
    config: {
        rateLimit: {
            max: 30,
            timeWindow: '1 minute',
        }
    },
    preHandler: authMiddleware,
    handler: createEventController,
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string" },
                    trackingLink: { type: "string" }
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
                title: { type: "string", maxLength: 100 },
                start_date: { type: "string", maxLength: 100 },
                end_date: { type: "string", maxLength: 100 },
                description: { type: "string", maxLength: 100 },
                link: { type: "string", maxLength: 100 },
                all_day: { type: "boolean", maxLength: 100  }
            },
            required: ["title", "start_date", "end_date"]
        }
    }
}

const listRoute = {
    method: "GET",
    url: "/events/list",
    bodyLimit: 100 * 1024,
    config: {
        rateLimit: {
            max: 30,
            timeWindow: '1 minute',
        }
    },
    preHandler: authMiddleware,
    handler: eventListController,
    schema: {
        querystring: {
            type: "object",
            properties: {
                start: { type: "string" },
                end: { type: "string" },
            }
        },
        response: {
            200: {
                type: "object",
            properties: {
                message: { type: "string"},
                data: {
                    type: "array",
                    items: {
                        properties: {
                            all_day: { type: "string"},
                            description: { type: "string"},
                            end_date: { type: "string"},
                            start_date: { type: "string"},
                            id: { type: "number"},
                            title: { type: "string"},
                            link: { type: "string"},
                        }
                    }
                }
            }
            }
        }
    }
}

export default function eventsRoute(fastify) {
    fastify.route(createRoute);
    fastify.route(listRoute)
}