import { buildSchema, graphql } from "graphql";
import { createServer } from "node:http";

// create stub array of football players
const players = [
  { id: "222", name: "Anton", position: "Defender", team: "Real Madrid" },
  { id: "333", name: "John", position: "Midfielder", team: "Barcelona" },
  { id: "444", name: "Mike", position: "Forward", team: "Liverpool" },
];

// create stub array of football coaches
const coaches = [
  { id: "qwe", name: "Alex", team: "Real Madrid" },
  { id: "asd", name: "David", team: "Barcelona" },
  { id: "123", name: "Michael", team: "Liverpool" },
  { id: "zxcvzxcv", name: "Sarah", team: "Manchester United" },
  { id: "asdfasdf", name: "Robert", team: "Bayern Munich" },
];

const clubs = [
  {
    id: "1",
    name: "Real Madrid",
    country: "Spain",
  },
  {
    id: "2",
    name: "Barcelona",
    country: "Spain",
  },
  {
    id: "3",
    name: "Liverpool",
    country: "England",
  },
  {
    id: "4",
    name: "Manchester United",
    country: "England",
  },
  {
    id: "5",
    name: "Bayern Munich",
    country: "Germany",
  },
];

const schema = buildSchema(`
    interface Node {
      id: ID!
    }

    type Player implements Node {
      id: ID!
      name: String!
      position: Position!
      team: Club!
    }

    type Club implements Node {
      id: ID!
      name: String!
      country: String!
      coach: Coach!
      players: [Player!]!
    }

    enum Position {
      Defender
      Midfielder
      Forward
    }

    type Coach implements Node {
      id: ID!
      name: String!
      team: Club!
    }

    type Query {
        player(name: String!): Player!
        players: [Player!]!

        clubs: [Club!]!
        club(name: String!): Club!

        coach(club: String!): Coach!
    }

    type Mutation {
      addPlayer(name: String!, position: Position!, team: String!): Player!
    }
`);

class Player {
  constructor(id, { name, position, team }) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.teamName = team;
  }

  team() {
    const club = clubs.find((club) => club.name === this.teamName);
    return new Club(club.id, club);
  }
}

class Club {
  constructor(id, { name, country }) {
    this.id = id;
    this.name = name;
    this.country = country;
  }

  players() {
    return players
      .filter((player) => player.team === this.name)
      .map((player) => new Player(player.id, player));
  }
}

const rootValue = {
  player: (name) => {
    return players.find((player) => player.name === name);
  },
  players: () => {
    return players;
  },
  clubs: () => {
    return clubs.map((club) => new Club(club.id, club));
  },
  club: ({ name }) => {
    return clubs.find((club) => club.name === name);
  },
  coach: ({ club }, ctx, info) => {
    console.log(info);
    return coaches.find((coach) => coach.team === club);
  },
  addPlayer: ({ name, position, team }) => {
    const newPlayer = {
      name,
      position,
      team,
    };
    console.log(newPlayer);
    players.push(newPlayer);
    return newPlayer;
  },
};

createServer((req, res) => {
  if (req.method === "POST" && req.url === "/graphql") {
    let query = "";

    req.on("data", (chunk) => {
      query += chunk;
    });

    req.on("end", () => {
      const source = JSON.parse(query);
      graphql({
        schema,
        rootValue: rootValue,
        source: source.query,
        variableValues: source.variables,
      }).then((response) => {
        res.writeHead(200, {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        });
        res.end(JSON.stringify(response));
      });
    });
  }
}).listen(3000, "0.0.0.0");
