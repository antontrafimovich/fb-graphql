import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

import { Node } from "./utils/node.js";
import { Club } from "./club.js";

export const Coach = new GraphQLObjectType({
  name: "Coach",
  interfaces: [Node],
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    team: {
      type: new GraphQLNonNull(Club),
      resolve: (coach, _, { db }) => {
        const fullCoach = db.coaches.find((coachDb) => coachDb.id === coach.id);
        return db.clubs.find((club) => fullCoach.team === club.name);
      },
    },
  }),
});
