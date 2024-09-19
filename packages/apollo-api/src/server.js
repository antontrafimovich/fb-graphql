import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// create players using structure described in the schema
const players = [
  {
    id: "1",
    name: "John Doe",
    team: "Team 1",
    position: "Forward",
  },
  {
    id: "2",
    name: "Jane Doe",
    team: "Team 2",
    position: "Midfielder",
  },
  {
    id: "3",
    name: "Sam Doe",
    team: "Team 3",
    position: "Defender",
  },
];

export const createServer = async () => {
  const typeDefs = `#graphql
    type Player {
        id: ID!
        name: String!
        team: String!
        position: String!
    }

    type Query {
        players: [Player!]!
    }
  `;

  const resolvers = {
    Query: {
      players: () => players,
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Server ready is running at ${url}`);
};
