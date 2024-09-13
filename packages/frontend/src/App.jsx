import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { Login } from "./Login";

const loadPlayers = () => {
  return fetch("http://localhost:3000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
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

function Players() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    loadPlayers()
      .then((data) => data.json())
      .then((data) => setPlayers(data.data.players));
  }, []);

  return (
    <ul>
      <li>
        {players.map((player) => {
          return player.name;
        })}
      </li>
    </ul>
  );
}

function App() {
  const token = useMemo(() => {
    return localStorage.getItem("token");
  }, []);

  return (
    <>
      {!token && <Login />}

      {token && <Players />}
    </>
  );
}

export default App;
