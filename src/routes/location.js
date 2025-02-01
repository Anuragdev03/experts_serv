import { countriesController } from "../controllers/countriesController.js";


const countryRoute = {
    method: "GET",
    url: "/location/countries/:name",
    handler: countriesController,
    bodyLimit: 512 * 1024,
    schema: {

    },
    config: {
        rateLimit: {
            max: 60,
            timeWindow: '1 minute',
        }
    }
};

export default function locationRoute(fastify, opts) {
    fastify.route(countryRoute)
}