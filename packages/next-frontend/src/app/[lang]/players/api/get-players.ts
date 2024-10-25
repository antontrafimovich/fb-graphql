import { Player } from "../shared/model/player";

export const getPlayers = async (): Promise<Player[]> => {
  const response = await fetch("http://localhost:4000", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: "{players {id name}}" }),
  });

  const json = await response.json();

  return json.data.players;
};
