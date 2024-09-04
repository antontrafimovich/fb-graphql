import "./App.css";

import { useEffect, useState } from "react";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

const getPlayers = async () => {
  const response = await fetch("http://localhost:3000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          players {
            id
            name
            
          }
        }
      `,
    }),
  });

  return response.json();
};

function App() {
  const [count, setCount] = useState(0);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getPlayers().then((data) => {
      setPlayers(data);
    });
  }, []);

  console.log(players);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
