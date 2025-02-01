import { expertsListController } from "../controllers/expertsListController.js";


const expertList = {
    method: "GET",
    url: "/experts-list",
    handler: expertsListController,
    bodyLimit: 512 * 1024,
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
                                id: { type: "integer"},
                                address: { type: "string"},
                                job_names: {type: "string"}
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
    }
}

export default function expertsRoutes(fastify, opts) {
    fastify.route(expertList)
}