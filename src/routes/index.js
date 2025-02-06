import loginRoute from "./loginRoute.js";
import registrationRoutes from "./registrationRoute.js";
import expertsRoutes from "./experts.js";
import forgotPasswordRoute from "./forgotPassword.js";
import locationRoute from "./location.js";
import jobsRoute from "./jobs.js";

export default async function registerRoutes(fastify, opts) {
  await fastify.register(loginRoute); 
  await fastify.register(registrationRoutes);
  await fastify.register(expertsRoutes);
  await fastify.register(forgotPasswordRoute);
  await fastify.register(locationRoute);
  await fastify.register(jobsRoute);
}