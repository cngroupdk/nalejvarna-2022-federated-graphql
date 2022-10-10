import { delegateToSchema } from '@graphql-tools/delegate';
import { batchDelegateToSchema } from '@graphql-tools/batch-delegate';
import { stitchSchemas } from '@graphql-tools/stitch';
import { getSubschemas } from './subschemas';

const USE_BATCH_DELEGATE = true;

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

            if (USE_BATCH_DELEGATE) {
              return batchDelegateToSchema({
                schema: marketingSchema,
                operation: 'query',
                fieldName: 'reviewsForObjectIds',
                key: bookId,
                argsFromKeys: (ids) => ({
                  contentType: 'book',
                  objectIds: ids,
                }),
                context,
                info,
              });
            } else {
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
            }
          },
        },
      },
    },
  });

  return gatewaySchema;
}
