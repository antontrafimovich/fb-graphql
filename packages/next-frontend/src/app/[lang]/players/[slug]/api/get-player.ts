import { Player } from "../../shared/model/player";

export const getPlayer = (id: string): Promise<Player> => {
  return fetch("http://localhost:4000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query GetPlayer($id: ID!) {
          player(id: $id) {
            id
            name
            team
            position
          }
        }
      `,
      variables: {
        id,
      },
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json.data.player);
      return json;
    })
    .then((json) => json.data.player);
};
