import loginRoute from "./loginRoute.js";
import registrationRoutes from "./registrationRoute.js";
import expertsRoutes from "./experts.js";
import forgotPasswordRoute from "./forgotPassword.js";
import locationRoute from "./location.js";
import jobsRoute from "./jobs.js";
import logoutRoute from "./logout.js";
import refreshTokenRoute from "./refreshRoute.js";
import publicProfileRoute from "./publicProfileRoute.js";
import customerRequestRoute from "./customerRequestRoute.js";
import notificationRoute from "./notification.js";
import expertResponseRoute from "./expertResponse.js";
import eventsRoute from "./eventsRoute.js";

export default async function registerRoutes(fastify, opts) {
  await fastify.register(loginRoute); 
  await fastify.register(registrationRoutes);
  await fastify.register(expertsRoutes);
  await fastify.register(forgotPasswordRoute);
  await fastify.register(locationRoute);
  await fastify.register(jobsRoute);
  await fastify.register(logoutRoute);
  await fastify.register(refreshTokenRoute);
  await fastify.register(publicProfileRoute);
  await fastify.register(customerRequestRoute);
  await fastify.register(notificationRoute);
  await fastify.register(expertResponseRoute);
  await fastify.register(eventsRoute);
}