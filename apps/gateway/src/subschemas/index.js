import { getRemoteSchema } from '../utils';

async function getInventorySchema() {
  return await getRemoteSchema({
    name: '📙 Inventory',
    graphqlUrl: 'http://localhost:3100/graphql',
  });
}

async function getMarketingSchema() {
  return await getRemoteSchema({
    name: '🗣️ Marketing',
    graphqlUrl: 'http://localhost:3200/graphql',
  });
}

export async function getSubschemas() {
  const [inventorySchema, marketingSchema] = await Promise.all([
    getInventorySchema(),
    getMarketingSchema(),
  ]);

  return {
    inventorySchema,
    marketingSchema,
  };
}
