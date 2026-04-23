const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { gql } = require('graphql-tag');

/**
 * CampusOS X - Auth++ Service
 * Refactored using Object-Oriented Programming (OOP) Principles
 */

class IdentityManager {
  /**
   * Encapsulates user identity logic.
   */
  constructor() {
    this.users = [
      { id: "1", email: "admin@university.edu", name: "System Admin", role: "ADMIN" }
    ];
  }

  getCurrentUser() {
    return this.users[0];
  }

  getUserById(id) {
    return this.users.find(u => u.id === id) || { id, email: "user@university.edu", name: "Campus User", role: "STUDENT" };
  }

  resolveReference(reference) {
    return this.getUserById(reference.id);
  }
}

class AuthServer {
  /**
   * Orchestrates the Apollo Subgraph Server.
   */
  constructor(identityManager) {
    this.identityManager = identityManager;
    this.typeDefs = gql`
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

    this.resolvers = {
      Query: {
        me: () => this.identityManager.getCurrentUser(),
        getUserById: (_, { id }) => this.identityManager.getUserById(id),
      },
      User: {
        __resolveReference: (user) => this.identityManager.resolveReference(user),
      },
    };
  }

  async start(port = 4001) {
    const server = new ApolloServer({
      schema: buildSubgraphSchema({ typeDefs: this.typeDefs, resolvers: this.resolvers }),
    });

    const { url } = await startStandaloneServer(server, { listen: { port } });
    console.log(`🔐 Auth Service (OOP) ready at ${url}`);
  }
}

// Dependency Injection
const identityManager = new IdentityManager();
const authServer = new AuthServer(identityManager);

authServer.start();
