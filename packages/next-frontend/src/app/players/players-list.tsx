"use client";

import { Player } from "./shared/model/player";

export default function PlayersList({ players }: { players: Player[] }) {
  return (
    <ul>
      {players.map((player) => (
        <li key={player.id}>
          <a href={`/players/${player.id}`}>{player.name}</a>
        </li>
      ))}
    </ul>
  );
}
