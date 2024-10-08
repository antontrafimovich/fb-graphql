import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

import authService from "../service/auth-service.js";
import playerService from "../service/player-service.js";
import userService from "../service/user-service.js";
import { Club } from "./club.js";
import { Coach } from "./coach.js";
import { Player } from "./player.js";
import { Position } from "./position.js";
import { User } from "./user.js";

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    user: {
      type: new GraphQLNonNull(User),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (_, { id }, { db }) => {
        return userService.getUserById(db, id);
      },
    },
    player: {
      type: new GraphQLNonNull(Player),
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { name }, { db, user }) => {
        return playerService.getPlayerByName(user, db, name);
      },
    },
    players: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Player))),
      resolve: (_, __, { db, user }) => {
        return playerService.getPlayers(user, db);
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

const LoginResponseType = new GraphQLObjectType({
  name: "LoginResponseType",
  fields: {
    refreshToken: { type: new GraphQLNonNull(GraphQLString) },
    accessToken: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const RefreshTokenResponseType = new GraphQLObjectType({
  name: "RefreshTokenResponseType",
  fields: {
    accessToken: { type: new GraphQLNonNull(GraphQLString) },
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
    login: {
      type: LoginResponseType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, { email, password }, { db }) => {
        const tokens = await authService.login(db, { email, password });

        if (tokens === null) {
          return {
            message: "Invalid email or password",
          };
        }

        return tokens;
      },
    },
    refreshToken: {
      type: RefreshTokenResponseType,
      args: {
        refreshToken: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { refreshToken }) => {
        return {accessToken: authService.refreshToken(refreshToken)};
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Muatation,
});
