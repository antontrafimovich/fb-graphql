import { GraphQLEnumType } from "graphql";

export const Position = new GraphQLEnumType({
  name: "Position",
  values: {
    Defender: { value: "Defender" },
    Midfielder: { value: "Midfielder" },
    Forward: { value: "Forward" },
  },
});
