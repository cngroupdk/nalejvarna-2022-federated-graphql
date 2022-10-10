import { delegateToSchema } from '@graphql-tools/delegate';
import { stitchSchemas } from '@graphql-tools/stitch';
import { getSubschemas } from './subschemas';

export async function getGatewaySchema() {
  const { inventorySchema, marketingSchema } = await getSubschemas();

  const gatewaySchema = stitchSchemas({
    subschemas: [inventorySchema, marketingSchema],
    typeDefs: /* GraphQL */ `
      extend type Book {
        reviews: [Review]
      }
    `,
    resolvers: {
      Book: {
        reviews: {
          selectionSet: `{ id }`, // Book.id
          resolve(parent, _args, context, info) {
            const bookId = parent.id;

            return delegateToSchema({
              schema: marketingSchema,
              operation: 'query',
              fieldName: 'reviews',
              args: {
                contentType: 'book',
                objectId: bookId,
              },
              context,
              info,
            });
          },
        },
      },
    },
  });

  return gatewaySchema;
}
