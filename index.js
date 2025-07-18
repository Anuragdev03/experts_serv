"use strict";

import Fastify from 'fastify';
import fastifyHelmet from '@fastify/helmet';
import cors from "@fastify/cors"

import { envVar } from './src/utils/constants.js';
import registerRoutes from './src/routes/index.js';
import fastifyCookie from "@fastify/cookie";

const fastify = Fastify({
  logger: true
})

// fastify.get('/', async (request, reply) => {
//   return { hello: 'world' }
// })

fastify.register(
  fastifyHelmet,
  { contentSecurityPolicy: false }
)

fastify.register(
  cors, {
    // need to add option latter
    origin: ["http://localhost:5173", "http://xpertserv.com", "https://xpertserv.com", "https://www.xpertserv.com"], // When the credential is true the origin should explicitly set
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
    credentials: true
  }
)

fastify.register(fastifyCookie);


fastify.register(import('@fastify/rate-limit'), {
  max: 60,
  timeWindow: '1 minute',
  ban: 2,
  banDuration: "30 minutes"
})

fastify.register(import("@fastify/multipart"))
/**
 * Run the server!
 */
const start = async () => {
  const port = envVar.port || 3000; 
  const host = '0.0.0.0';
  try {
    await fastify.register(registerRoutes);
    await fastify.listen({ port: port, host })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()