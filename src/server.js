import {
  graphql,
  GraphQLEnumType,
  GraphQLID,
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
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

const Node = new GraphQLInterfaceType({
  name: "Node",
  fields: {
    id: { type: GraphQLID },
  },
});

const Position = new GraphQLEnumType({
  name: "Position",
  values: {
    Defender: { value: "Defender" },
    Midfielder: { value: "Midfielder" },
    Forward: { value: "Forward" },
  },
});

const Coach = new GraphQLObjectType({
  name: "Coach",
  interfaces: [Node],
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    team: { type: new GraphQLNonNull(GraphQLString) },
    teamInfo: {
      type: new GraphQLNonNull(Club),
      resolve: (coach) => {
        return clubs.find((club) => coach.team === club.name);
      },
    },
  }),
});

const Player = new GraphQLObjectType({
  name: "Player",
  interfaces: [Node],
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    position: { type: new GraphQLNonNull(Position) },
    team: { type: new GraphQLNonNull(GraphQLString) },
    teamInfo: {
      type: new GraphQLNonNull(Club),
      resolve: (player) => {
        return clubs.find((club) => club.name === player.team);
      },
    },
  }),
});

const Club = new GraphQLObjectType({
  name: "Club",
  interfaces: [Node],
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: new GraphQLNonNull(GraphQLString) },
    coach: {
      type: new GraphQLNonNull(Coach),
      resolve: (club) => {
        return coaches.find((coach) => coach.team === club.name);
      },
    },
    players: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Player))),
      resolve: (club) => {
        return players.filter((player) => player.team === club.name);
      },
    },
  },
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    player: {
      type: new GraphQLNonNull(Player),
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { name }) => {
        return players.find((player) => player.name === name);
      },
    },
    players: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Player))),
      resolve: () => {
        return players;
      },
    },
    clubs: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Club))),
      resolve: () => {
        return clubs;
      },
    },
    club: {
      type: new GraphQLNonNull(Club),
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { name }) => {
        return clubs.find((club) => club.name === name);
      },
    },
    coach: {
      type: new GraphQLNonNull(Coach),
      args: {
        club: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { club }) => {
        return coaches.find((coach) => coach.team === club);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: Query,
});

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
        // rootValue: rootValue,
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
