import { authMiddleware } from "../middlewares/authMiddleware.js";
import { publicProfileController } from "../controllers/publicProfileController.js";
import {getPublicProfileController} from "../controllers/getPublicProfileController.js";
import { viewExpertProfileController } from "../controllers/viewExpertProfileController.js";

const createRoute = {
    method: "POST",
    url: "/public-profile/create",
    bodyLimit: 512 * 1024,
    config: {
        rateLimit: {
            max: 50,
            timeWindow: '1 minute',
        }
    },
    preHandler: authMiddleware,
    handler: publicProfileController,
    schema: {
        body: {
            type: "object",
            properties: {
                website: { type: "string", maxLength: 256 },
                tags: { type: "string", maxLength: 256 },
                description: { type: "string", maxLength: 1500 }
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

const getRoute = {
    method: "GET",
    url: "/public-profile",
    bodyLimit: 12 * 1024,
    config: {
        rateLimit: {
            max: 50,
            timeWindow: '1 minute',
        }
    },
    preHandler: authMiddleware,
    handler: getPublicProfileController,
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string" },
                    data: {
                        type: "object",
                        properties: {
                            website: {type: "string"},
                            tags: {type: "string"},
                            description: {type: "string"},
                            profile_url: {type: "string"}
                        }
                    }
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

const viewProfile = {
    method: "GET",
    url: "/expert/view-profile",
    bodyLimit: 12 * 1024,
    config: {
        rateLimit: {
            max: 50,
            timeWindow: '1 minute',
        }
    },
    handler: viewExpertProfileController,
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string" },
                    data: {
                        type: "object",
                        properties: {
                            website: {type: "string"},
                            user_name: {type: "string"},
                            tags: {type: "string"},
                            description: {type: "string"},
                            name: {type: "string"},
                            city: {type: "string"},
                            state:{type: "string"},
                            country: {type: "string"},
                            lat: {type: "string"},
                            lng: {type: "string"},
                            job_names: {
                                type: "array",
                                items: {
                                    type: "string"
                                }
                            }
                        }
                    }
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
                url: {type: "string", maxLength: 10}
            }
        }
    }
}

export default function publicProfileRoute(fastify, opts) {
    fastify.route(createRoute);
    fastify.route(getRoute);
    fastify.route(viewProfile);
}