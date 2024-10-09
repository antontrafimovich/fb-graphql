import Link from "next/link";
import { Player } from "./shared/model/player";

export default function PlayersList({ players }: { players: Player[] }) {
  return (
    <ul>
      {players.map((player) => (
        <li key={player.id}>
          <Link href={`/players/${player.id}`}>{player.name}</Link>
        </li>
      ))}
    </ul>
  );
}
