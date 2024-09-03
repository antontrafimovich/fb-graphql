import { GraphQLID, GraphQLInterfaceType } from 'graphql';

export const Node = new GraphQLInterfaceType({
  name: "Node",
  fields: {
    id: { type: GraphQLID },
  },
});
