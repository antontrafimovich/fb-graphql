import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

import { Coach } from "./coach.js";
import { Player } from "./player.js";
import { Node } from "./utils/node.js";

export const Club = new GraphQLObjectType({
  name: "Club",
  interfaces: [Node],
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: new GraphQLNonNull(GraphQLString) },
    coach: {
      type: new GraphQLNonNull(Coach),
      resolve: (club, _, { db }) => {
        return db.coaches.find((coach) => coach.team === club.name);
      },
    },
    players: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Player))),
      resolve: (club, _, { db }) => {
        return db.players.filter((player) => player.team === club.name);
      },
    },
  },
});
