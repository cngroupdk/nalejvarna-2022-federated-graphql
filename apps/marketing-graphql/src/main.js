import { createServer } from '@graphql-yoga/node';

import { getReviews } from './data';

const server = createServer({
  port: 3200,
  schema: {
    typeDefs: /* GraphQL */ `
      type Review {
        id: String!
        contentType: String!
        objectId: String!

        rating: Int
        text: String!
      }

      type Query {
        reviews(contentType: String!, objectId: String!): [Review]
      }
    `,
    resolvers: {
      Query: {
        reviews: async (_parent, args) => {
          const reviews = await getReviews({
            contentType: args.contentType,
            objectId: args.objectId,
          });

          return reviews;
        },
      },
    },
  },
});

server.start();
