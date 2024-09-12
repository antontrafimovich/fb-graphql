import { useEffect, useState } from "react";
import "./App.css";
import { Login } from "./Login";

const loadPlayers = () => {
  return fetch("http://localhost:3000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query {
        players {
          name
        }
      }
    `,
    }),
  }).then((response) => response.json());
};

function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    loadPlayers()
      .then((data) => data.json())
      .then((data) => setPlayers(data.data.players));
  }, []);

  return (
    <ul>
      <Login />
      <li>
        {players.map((player) => {
          return player.name;
        })}
      </li>
    </ul>
  );
}

export default App;
