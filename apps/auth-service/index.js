const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { gql } = require('graphql-tag');

/**
 * CampusOS X - Auth++ Service
 * Handles Zero-Trust Authentication and User Identity.
 */

const typeDefs = gql`
  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0",
          import: ["@key", "@shareable"])

  type User @key(fields: "id") {
    id: ID!
    email: String! @shareable
    name: String @shareable
    role: Role!
  }

  enum Role {
    STUDENT
    FACULTY
    ADMIN
  }

  type Query {
    me: User
    getUserById(id: ID!): User
  }
`;

const resolvers = {
  Query: {
    me: () => ({ id: "1", email: "admin@university.edu", name: "System Admin", role: "ADMIN" }),
    getUserById: (_, { id }) => ({ id, email: "user@university.edu", name: "Campus User", role: "STUDENT" }),
  },
  User: {
    __resolveReference(user) {
      return { id: user.id, email: "resolved@university.edu", role: "STUDENT" };
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

startStandaloneServer(server, { listen: { port: 4001 } }).then(({ url }) => {
  console.log(`🔐 Auth Service ready at ${url}`);
});
