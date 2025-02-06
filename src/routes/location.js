import { countriesController, statesController } from "../controllers/countriesController.js";


const countryRoute = {
    method: "GET",
    url: "/location/countries/:name",
    handler: countriesController,
    bodyLimit: 51 * 1024,
    schema: {

    },
    config: {
        rateLimit: {
            max: 100,
            timeWindow: '1 minute',
        }
    }
};
 
const statesRoute = {
    method: "GET",
    url: "/location/states",
    handler: statesController,
    bodyLimit: 51 * 1024,
    schema: {
        querystring: {
            type: "object",
            properties: {
                countryId: { type: "number" },
                state: { type: "string", maxLength: 100 }
            },
            required: ["countryId", "state"]
        }
    },
    config: {
        rateLimit: {
            max: 100,
            timeWindow: '1 minute',
        }
    }
}
export default function locationRoute(fastify, opts) {
    fastify.route(countryRoute);
    fastify.route(statesRoute);
}