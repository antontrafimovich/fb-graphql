import PlayersList from "./players-list";
import { Player } from "./shared/model/player";

const getPlayers = async (): Promise<{
  data: { players: Player[] };
}> => {
  const response = await fetch("http://localhost:4000/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: "{players {id name}}" }),
  });

  return response.json();
};

export default async function PlayersListServer() {
  let players;

  try {
    const response = await getPlayers();
    players = response.data.players;
  } catch (error) {
    
    return <div>{error.stack}</div>;
  }

  return (
    <div>
      <h1>Players</h1>
      <PlayersList players={players} />
    </div>
  );
}
