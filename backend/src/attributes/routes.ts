import { FastifyInstance } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import { attributes } from './data.js';
import { labels } from '../labels/data.js';

export default async function attributesRoutes(app: FastifyInstance) {
  const getAttributesQuerySchema = {
    type: 'object',
    properties: {
      offset: { type: 'integer', minimum: 0, default: 0 },
      limit: { type: 'integer', minimum: 0, maximum: 10, default: 10 },
      sortBy: { type: 'string', enum: ['name', 'createdAt'], default: 'name' },
      sortDir: { type: 'string', enum: ['asc', 'desc'], default: 'asc' },
      searchText: { type: 'string', default: '' },
    },
  } as const;

  app.get<{ Querystring: FromSchema<typeof getAttributesQuerySchema> }>(
    '/',
    {
      schema: {
        querystring: getAttributesQuerySchema,
      },
    },
    async (req, res) => {
      const { offset, limit, sortBy, sortDir, searchText } = req.query;

      const data = searchText
        ? attributes.filter(
            (attr) =>
              attr.name
                .toLowerCase()
                .includes(searchText.trim().toLowerCase()) && !attr.deleted,
          )
        : attributes.filter((attr) => !attr.deleted);

      data.sort((a, b) => {
        return sortDir === 'asc'
          ? a[sortBy].localeCompare(b[sortBy])
          : b[sortBy].localeCompare(a[sortBy]);
      });

      res.status(200).send({
        data: data.slice(offset, offset + limit),
        meta: {
          offset,
          limit,
          searchText,
          sortBy,
          sortDir,
          hasNextPage: offset + limit < data.length,
        },
      });
    },
  );

  const postAttributesBodySchema = {
    type: 'object',
    required: ['name'],
    properties: {
      name: {
        type: 'string',
        minLength: 1,
      },
      labelIds: {
        type: 'array',
        items: { type: 'string' },
        uniqueItems: true,
        default: [],
      },
    },
  } as const;

  app.post<{ Body: FromSchema<typeof postAttributesBodySchema> }>(
    '/',
    {
      schema: {
        body: postAttributesBodySchema,
      },
    },
    async (req, res) => {
      const { name, labelIds } = req.body;
      const invalidLabelIds = labelIds.filter(
        (labelId) => !labels.find((label) => label.id === labelId),
      );
      if (invalidLabelIds.length > 0) {
        res.status(400).send({
          error: `Invalid label ids: ${invalidLabelIds.join(', ')}`,
        });
        return;
      }
      const newAttribute = {
        id: (attributes.length + 1).toString(),
        name,
        labelIds,
        createdAt: new Date().toISOString(),
        deleted: false,
      };
      attributes.push(newAttribute);
      res.status(201).send({ data: newAttribute });
    },
  );

  const getAttributeParamsSchema = {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' },
    },
  } as const;

  app.get<{ Params: FromSchema<typeof getAttributeParamsSchema> }>(
    '/:id',
    {
      schema: {
        params: getAttributeParamsSchema,
      },
    },
    async (req, res) => {
      const { id } = req.params;
      const attribute = attributes.find((attr) => attr.id === id);
      if (!attribute || attribute.deleted) {
        res.status(404).send({ error: `Attribute with id ${id} not found.` });
        return;
      }
      res.status(200).send({ data: attribute });
    },
  );

  const patchAttributeParamsSchema = {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' },
    },
  } as const;

  const patchAttributeBodySchema = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 1,
      },
      labelIds: {
        type: 'array',
        items: { type: 'string' },
        uniqueItems: true,
      },
    },
  } as const;

  app.patch<{
    Params: FromSchema<typeof patchAttributeParamsSchema>;
    Body: FromSchema<typeof patchAttributeBodySchema>;
  }>(
    '/:id',
    {
      schema: {
        params: patchAttributeParamsSchema,
        body: patchAttributeBodySchema,
      },
    },
    async (req, res) => {
      const { id } = req.params;
      const attributeIndex = attributes.findIndex((attr) => attr.id === id);
      if (attributeIndex === -1 || attributes[attributeIndex].deleted) {
        res.status(404).send({ error: `Attribute with id ${id} not found.` });
        return;
      }
      if (req.body.labelIds && req.body.labelIds.length > 0) {
        const invalidLabelIds = req.body.labelIds.filter(
          (labelId) => !labels.find((label) => label.id === labelId),
        );
        if (invalidLabelIds.length > 0) {
          res.status(400).send({
            error: `Invalid label ids: ${invalidLabelIds.join(', ')}`,
          });
          return;
        }
      }
      attributes[attributeIndex] = {
        ...attributes[attributeIndex],
        ...req.body,
      };
      res.status(200).send({ data: attributes[attributeIndex] });
    },
  );

  const deleteAttributeParamsSchema = {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' },
    },
  } as const;

  app.delete<{ Params: FromSchema<typeof deleteAttributeParamsSchema> }>(
    '/:id',
    {
      schema: {
        params: deleteAttributeParamsSchema,
      },
    },
    async (req, res) => {
      const { id } = req.params;
      const attributeIndex = attributes.findIndex((attr) => attr.id === id);
      if (attributeIndex === -1 || attributes[attributeIndex].deleted) {
        res.status(404).send({ error: `Attribute with id ${id} not found.` });
        return;
      }
      attributes[attributeIndex] = {
        ...attributes[attributeIndex],
        deleted: true,
      };
      res.status(200).send({ data: attributes[attributeIndex] });
    },
  );
}
