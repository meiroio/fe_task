import fastify from 'fastify';
import labelsRoutes from './labels/routes.js';
import attributesRoutes from './attributes/routes.js';
import cors from '@fastify/cors';

const app = fastify({ logger: true });

app.register(cors, { origin: '*' });
app.register(attributesRoutes, { prefix: '/attributes' });
app.register(labelsRoutes, { prefix: '/labels' });

try {
  await app.listen({ port: 3000 });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
