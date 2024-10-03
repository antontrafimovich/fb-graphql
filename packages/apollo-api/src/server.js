import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";

// create players using structure described in the schema
const players = [
  {
    id: "1",
    name: "John Doe",
    team: "Team 1",
    age: 21,
    position: "Forward",
  },
  {
    id: "2",
    name: "Jane Doe",
    team: "Team 2",
    age: 26,
    position: "Midfielder",
  },
  {
    id: "3",
    name: "Sam Doe",
    team: "Team 3",
    age: 19,
    position: "Defender",
  },
];

// create coaches using structure described in the schema
const coaches = [
  {
    id: "1",
    name: "Coach 1",
    team: "Team 1",
  },
  {
    id: "2",
    name: "Coach 2",
    team: "Team 2",
  },
  {
    id: "3",
    name: "Coach 3",
    team: "Team 3",
  },
];

const getDbConnection = () => {
  // connect to the database
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        getCoaches: () => coaches,
        getPlayers: () => players,
      });
    }, 3000);
  });
};

export const createServer = async () => {
  const typeDefs = `#graphql
    enum Position {
      Defender
      Midfielder
      Forward
    }

    
    "A player in a team"
    type Player {
      id: ID!
      name: String!
      """
      Team the player belongs to. Maybe his **national** team or club team
      """
      team: String!
      position: Position!
    }

    "A coach in a team"
    type Coach {
      id: ID!
      name: String!
      team: String!
    }

    union TeamStuff = Player | Coach

    input PlayerQueryInput {
      minAge: Int
      position: Position
    }

    type Query {
      teamStuff(team: String!): [TeamStuff!]
      players(q: PlayerQueryInput): [Player!]
    }
  `;

  const resolvers = {
    TeamStuff: {
      __resolveType: (stuff) => {
        if (stuff.position) {
          return "Player";
        }

        return "Coach";
      },
    },
    Query: {
      players: (_, args, { db }) => {
        if (!args || !args.q) {
          return players;
        }

        const { minAge, position } = args.q;

        return db.getPlayers().filter((player) => {
          let pass = true;

          if (minAge !== undefined && minAge !== null) {
            pass = pass && player.age >= minAge;
          }

          if (position !== undefined && position !== null) {
            pass = pass && player.position === position;
          }

          return pass;
        });
      },
      teamStuff: (_, { team }, { db }) => {
        throw new GraphQLError("You are not allowed to access this resource", {
          extensions: {
            code: "UNATHORIZED",
            http: {
              status: 400,
            },
          },
        });
        // });
        // return [...db.getPlayers(), ...db.getCoaches()].filter(
        //   (stuff) => stuff.team === team
        // );
      },
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  console.log("connecting to db");
  let db;
  try {
    db = await getDbConnection();
  } catch (err) {
    console.error("Failed to connect to db", err);
    process.exit(1);
  }

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async () => {
      return {
        db,
      };
    },
  });

  console.log(`Server ready is running at ${url}`);
};
