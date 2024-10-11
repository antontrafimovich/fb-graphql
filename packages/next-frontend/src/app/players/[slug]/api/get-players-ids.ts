import { getPlayers } from "../../api/get-players";

export const getPlayersIds = async () => {
  const players = await getPlayers();

  return players.map((player) => player.id);
};
