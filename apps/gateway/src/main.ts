import * as cors from 'cors';
import * as express from 'express';
import { createServer } from '@graphql-yoga/node';
import { getGatewaySchema } from './gatewaySchema';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.redirect('/graphql');
});

const PORT = 3000;

app.listen(PORT, async () => {
  const gatewaySchema = await getGatewaySchema();

  const graphQLServer = createServer({
    port: PORT,
    schema: gatewaySchema,
  });

  app.use('/graphql', graphQLServer);

  console.log(
    `💡   🧘 Yoga -   Running GraphQL 🏰 Gateway at http://0.0.0.0:${PORT}/graphql`
  );
});
