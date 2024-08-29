import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

import { Club } from "./club.js";
import { Coach } from "./coach.js";
import { Player } from "./player.js";

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    player: {
      type: new GraphQLNonNull(Player),
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { name }, { db }) => {
        return db.players.find((player) => player.name === name);
      },
    },
    players: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Player))),
      resolve: (_, __, { db }) => {
        return db.players;
      },
    },
    clubs: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Club))),
      resolve: (_, __, { db }) => {
        return db.clubs;
      },
    },
    club: {
      type: new GraphQLNonNull(Club),
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { name }, { db }) => {
        return db.clubs.find((club) => club.name === name);
      },
    },
    coach: {
      type: new GraphQLNonNull(Coach),
      args: {
        club: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { club }, { db }) => {
        return db.coaches.find((coach) => coach.team === club);
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: Query,
});
