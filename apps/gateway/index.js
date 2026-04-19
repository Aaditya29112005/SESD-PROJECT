const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { ApolloGateway, IntrospectAndCompose } = require('@apollo/gateway');

/**
 * CampusOS X - Unified GraphQL Federation Gateway
 * The entry point for the entire autonomous ecosystem.
 */

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'auth', url: 'http://localhost:4001/graphql' },
      { name: 'attendance', url: 'http://localhost:4002/graphql' },
      { name: 'assignments', url: 'http://localhost:4003/graphql' },
      { name: 'users', url: 'http://localhost:4004/graphql' },
      { name: 'notifications', url: 'http://localhost:4005/graphql' },
      { name: 'payments', url: 'http://localhost:4006/graphql' },
    ],
  }),
});

const server = new ApolloServer({
  gateway,
  // Allow the dashboard to communicate with the gateway
  introspection: true,
});

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const token = req.headers.authorization || '';
      return { token };
    },
    // CORS Configuration for Production-ready Gateway
    cors: {
      origin: ['http://localhost:5173', 'http://localhost:5174'],
      credentials: true,
    },
  });
  console.log(`
  🚀 CAMPUSOS X — Federated Gateway Operational
  🌍 Entry Point: ${url}
  🔗 Mesh: 6 Subgraphs Online
  `);
}

startServer();
