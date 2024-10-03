const getPlayers = async (): Promise<{
  data: { players: { name: string }[] };
}> => {
  const response = await fetch("http://localhost:4000/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: "{players {name}}" }),
  });

  return response.json();
};

const Players = async () => {
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
      <ul>
        {players.map((player) => (
          <li key={player.name}>{player.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Players;
