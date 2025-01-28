import loginRoute from "./loginRoute.js";
import registrationRoutes from "./registrationRoute.js";
import expertsRoutes from "./experts.js";
import forgotPasswordRoute from "./forgotPassword.js";

export default async function registerRoutes(fastify, opts) {
  await fastify.register(loginRoute); 
  await fastify.register(registrationRoutes);
  await fastify.register(expertsRoutes);
  await fastify.register(forgotPasswordRoute)
}