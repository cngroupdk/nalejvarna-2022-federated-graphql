import { createServer } from '@graphql-yoga/node';

import { getAllBooks } from './data';

const server = createServer({
  port: 3100,
  schema: {
    typeDefs: /* GraphQL */ `
      type Book {
        id: String!
        title: String!
      }

      type Query {
        books: [Book]
      }
    `,
    resolvers: {
      Query: {
        books: async () => {
          const books = await getAllBooks();

          return books;
        },
      },
    },
  },
});

server.start();
