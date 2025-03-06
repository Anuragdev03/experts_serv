import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createTaskController } from "../controllers/tasks/createTask.js";
import { deleteTaskController } from "../controllers/tasks/deleteTask.js";
import { tasklistController } from "../controllers/tasks/taskList.js";
import { updateTaskController } from "../controllers/tasks/updateTask.js";

const createRoute = {
    method: "POST",
    url: "/tasks/create",
    bodyLimit: 100 * 1024,
    config: {
        rateLimit: {
            max: 30,
            timeWindow: '1 minute',
        }
    },
    preHandler: authMiddleware,
    handler: createTaskController,
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
                description: { type: "string", maxLength: 256 },
                due_date: { type: "string", maxLength: 256 },
                priority: { type: "string", maxLength: 30 },
                status: { type: "string", maxLength: 30 }
            },
            required: ["title", "due_date", "priority", "status"]
        }
    }
}

const deleteRoute = {
    method: "DELETE",
    url: "/tasks/delete/:id",
    bodyLimit: 100 * 1024,
    config: {
        rateLimit: {
            max: 30,
            timeWindow: '1 minute',
        }
    },
    preHandler: authMiddleware,
    handler: deleteTaskController,
    schema: {
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
        },
    }
}

const listRoute = {
    method: "GET",
    url: "/tasks/list",
    bodyLimit: 100 * 1024,
    config: {
        rateLimit: {
            max: 60,
            timeWindow: '1 minute',
        }
    },
    preHandler: authMiddleware,
    handler: tasklistController,
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
                                id: { type: "integer" },
                                title: { type: "string" },
                                description: { type: "string" },
                                due_date: { type: "string" },
                                priority: { type: "string" },
                                status: { type: "string" }
                            }
                        }
                    },
                    totalCount: { type: "string" }
                }
            },
            400: {
                type: "object",
                properties: {
                    message: { type: "string" }
                }
            }
        },
        querystring: {
            type: "object",
            properties: {
                status: { type: "string" },
                priority: { type: "string" },
                sort: { type: "string", default: "ASC" },
                page: { type: "integer", minimum: 1, default: 1 },
            }
        }
    }
}

const updateRoute = {
    method: "PATCH",
    url: "/tasks/update",
    config: {
        rateLimit: {
            max: 60,
            timeWindow: '1 minute',
        }
    },
    preHandler: authMiddleware,
    handler: updateTaskController,
    schema: {
        body: {
            type: "object",
            properties: {
                id: { type: "number" },
                title: { type: "string", maxLength: 200 },
                description: { type: "string", maxLength: 256 },
                due_date: { type: "string" },
                priority: { type: "string" },
                status: { type: "string" }
            }
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

export default function tasksRoute(fastify) {
    fastify.route(createRoute);
    fastify.route(deleteRoute);
    fastify.route(listRoute);
    fastify.route(updateRoute);
}