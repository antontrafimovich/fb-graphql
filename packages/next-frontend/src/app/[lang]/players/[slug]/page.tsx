import { getPlayer } from "./api/get-player";
import { getPlayersIds } from "./api/get-players-ids";

export async function generateStaticParams() {
  const ids = await getPlayersIds();

  return ids.map((id) => ({ slug: id }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    const player = await getPlayer(params.slug);
    return (
      <div>
        <h1>Player: {player.name}</h1>
        <p>Team: {player.team}</p>
        <p>Position: {player.position}</p>
      </div>
    );
  } catch (error) {
    return (
      <div>
        <div>Player not found, Reason:</div>
        <pre>{(error as Error).message}</pre>
      </div>
    );
  }
}
