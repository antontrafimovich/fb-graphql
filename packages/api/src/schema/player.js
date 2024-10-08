import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

import { Node } from "./utils/node.js";
import { Club } from "./club.js";
import { Position } from "./position.js";

export const Player = new GraphQLObjectType({
  name: "Player",
  interfaces: [Node],
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    position: { type: new GraphQLNonNull(Position) },
    club: {
      type: new GraphQLNonNull(Club),
      resolve: (player, _, { db }) => {
        return db.clubs.getClubById(player.clubId);
      },
    },
  }),
});
