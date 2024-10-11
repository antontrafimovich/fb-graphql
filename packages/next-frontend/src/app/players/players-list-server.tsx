import { getPlayers } from "./api/get-players";
import PlayersList from "./players-list";

export default async function PlayersListServer() {
  try {
    const players = await getPlayers();
    return (
      <div>
        <h1>Players</h1>
        <PlayersList players={players} />
      </div>
    );
  } catch (error) {
    return (
      <div>
        <div>Error has occured</div>
        {(error as Error).stack}
      </div>
    );
  }
}
