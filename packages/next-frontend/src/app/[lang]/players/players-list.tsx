import Link from "next/link";
import { Player } from "./shared/model/player";
import { locales } from "../../dictionaries/locales/locales";

export default async function PlayersList({
  players,
  locale,
}: {
  players: Player[];
  locale: "en" | "pl";
}) {
  const { buyButton } = await locales[locale]();

  return (
    <ul>
      {players.map((player) => (
        <li key={player.id}>
          <Link href={`/players/${player.id}`}>{player.name}</Link>
          <button>{buyButton}</button>
        </li>
      ))}
    </ul>
  );
}
