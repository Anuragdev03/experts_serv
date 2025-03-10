import { authMiddleware } from "../middlewares/authMiddleware.js";
import { notificationCountController } from "../controllers/notificationController/notificationCountController.js"
import { notificationListController } from "../controllers/notificationController/notificationList.js";
import { updateNotification } from "../controllers/notificationController/updateNotification.js";


const countRoute = {
    method: "GET",
    url: "/notification/count",
    preHandler: authMiddleware,
    handler: notificationCountController,
    config: {
        rateLimit: {
            max: 60,
            timeWindow: '1 minute',
        }
    },
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string" },
                    count: { type: "string"}
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

const listRoute = {
    method: "GET",
    url: "/notification/list",
    preHandler: authMiddleware,
    handler: notificationListController,
    config: {
        rateLimit: {
            max: 60,
            timeWindow: '1 minute',
        }
    },
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string" },
                    data: {
                        type: "array",
                        items: {
                            properties: {
                                message: { type: "string"},
                                is_read: { type: "boolean" },
                                id: { type: "number" },
                                created_at: {type: "string"}
                            }
                        }
                    },
                    totalCount: { type: "string"}
                }
            },
            400: {
                type: "object",
                properties: {
                    message: { type: "string" },
                }
            }
        },
        querystring: {
            type: "object",
            properties: {
                page: { type: "integer", minimum: 1, default: 1 },
            }
        }
    }
}

const updateRoute = {
    method: "PATCH",
    url: "/notification/update",
    config: {
        rateLimit: {
            max: 60,
            timeWindow: '1 minute',
        }
    },
    preHandler: authMiddleware,
    handler: updateNotification,
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    message: {type: "string"}
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
                type: {type: "string"},
                id: {type: "string"},
            }
        }
    }
}

export default function notificationRoute(fastify, opts) {
    fastify.route(countRoute);
    fastify.route(listRoute);
    fastify.route(updateRoute);
}