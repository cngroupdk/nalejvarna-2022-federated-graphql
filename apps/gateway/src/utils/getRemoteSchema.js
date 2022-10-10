import { introspectSchema, wrapSchema } from '@graphql-tools/wrap';
import { fetch } from '@whatwg-node/fetch';
import { print } from 'graphql';
import * as chalk from 'chalk';

const makeRemoteExecutor = ({ graphqlUrl, name = '' }) =>
  async function remoteExecutor({ document, variables }) {
    const query = print(document);

    console.log(chalk.green('---- sending Query to:'), chalk.red(name));
    console.log(chalk.blue(query));
    console.log(
      chalk.green('-- variables:'),
      chalk.magenta(JSON.stringify(variables))
    );
    console.log('');

    const fetchResult = await fetch(graphqlUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });

    const response = await fetchResult.json();

    return response;
  };

export async function getRemoteSchema({ graphqlUrl, name }) {
  const executor = makeRemoteExecutor({ graphqlUrl, name });
  const schema = await introspectSchema(executor);

  return wrapSchema({
    schema,
    executor,
  });
}
