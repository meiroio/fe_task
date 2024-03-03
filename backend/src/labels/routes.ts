import { FastifyInstance } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import { labels } from './data.js';

export default async function labelsRoutes(app: FastifyInstance) {
  const getLabelsQuerySchema = {
    type: 'object',
    properties: {
      offset: { type: 'integer', minimum: 0, default: 0 },
      limit: { type: 'integer', minimum: 0, maximum: 10, default: 10 },
    },
  } as const;

  app.get<{ Querystring: FromSchema<typeof getLabelsQuerySchema> }>(
    '/',
    {
      schema: {
        querystring: getLabelsQuerySchema,
      },
    },
    async (req, res) => {
      const { offset, limit } = req.query;

      res.status(200).send({
        data: labels.slice(offset, offset + limit),
        meta: {
          offset,
          limit,
          hasNextPage: offset + limit < labels.length,
        },
      });
    },
  );
}
