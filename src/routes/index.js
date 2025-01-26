import loginRoute from "./loginRoute.js";
import registerationRoutes from "./registerationRoute.js";

export default async function registerRoutes(fastify, opts) {
  await fastify.register(loginRoute); 
  await fastify.register(registerationRoutes)
}