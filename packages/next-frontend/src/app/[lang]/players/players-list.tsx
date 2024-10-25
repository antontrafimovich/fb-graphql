import Link from 'next/link';

import { getLocale } from '../../dictionaries/locales/locales';
import { Player } from './shared/model/player';

export default async function PlayersList({
  players,
  locale,
}: {
  players: Player[];
  locale: "en" | "pl";
}) {
  const { buyButton } = await getLocale(locale);

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
