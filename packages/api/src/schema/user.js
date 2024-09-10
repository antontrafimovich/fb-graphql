import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} from "graphql";

export const User = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLString },
  }),
});
