import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

import { Club } from "./club.js";
import { Coach } from "./coach.js";
import { Player } from "./player.js";
import { Position } from "./position.js";

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    player: {
      type: new GraphQLNonNull(Player),
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { name }, { db }) => {
        return db.players.getPlayerByName(name);
      },
    },
    players: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Player))),
      resolve: (_, __, { db }) => {
        return db.players.getPlayers();
      },
    },
    clubs: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Club))),
      resolve: (_, __, { db }) => {
        return db.clubs.getClubs();
      },
    },
    club: {
      type: new GraphQLNonNull(Club),
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { name }, { db }) => {
        return db.clubs.getClubByName(name);
      },
    },
    coach: {
      type: new GraphQLNonNull(Coach),
      args: {
        club: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, { club: clubName }, { db }) => {
        const club = await db.clubs.getClubByName(clubName);
        return db.coaches.getCoachByClubId(club.id);
      },
    },
  },
});

const Muatation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPlayers: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Player))),
      args: {
        players: {
          type: new GraphQLNonNull(
            new GraphQLList(
              new GraphQLNonNull(
                new GraphQLInputObjectType({
                  name: "AddPlayerInput",
                  fields: {
                    name: { type: new GraphQLNonNull(GraphQLString) },
                    position: { type: new GraphQLNonNull(Position) },
                    club: { type: new GraphQLNonNull(GraphQLString) },
                  },
                })
              )
            )
          ),
        },
      },
      resolve: (_, { players }, { db }) => {
        return db.players.addPlayers(players);
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Muatation,
});
