import { introspectSchema, wrapSchema } from '@graphql-tools/wrap';
import { fetch } from '@whatwg-node/fetch';
import { print } from 'graphql';

const makeRemoteExecutor = (graphqlUrl) =>
  async function remoteExecutor({ document, variables }) {
    const query = print(document);

    const fetchResult = await fetch(graphqlUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });

    const response = await fetchResult.json();

    return response;
  };

export async function getRemoteSchema(graphqlUrl) {
  const executor = makeRemoteExecutor(graphqlUrl);
  const schema = await introspectSchema(executor);

  return wrapSchema({
    schema,
    executor,
  });
}
