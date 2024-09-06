import "./App.css";

import { useEffect, useState } from "react";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

const uploadPlayers = async () => {
  const formData = new FormData();

  // Add the mutation as a string
  formData.append(
    "operations",
    JSON.stringify({
      query: `
    mutation AddPlayers($file: Upload!) {
      addPlayers(file: $file) {
        name
      }
    }
  `,
      variables: {
        file: null, // Placeholder for the file, it will be filled by the file content
      },
    })
  );

  // Add the mapping to link FormData field to the variables in the mutation
  formData.append(
    "variables",
    JSON.stringify({
      file: 0,
    })
  );

  // Add the actual file in FormData
  formData.append(
    "0",
    new Blob(["Hello World"], { type: "text/plain" }),
    "hello.txt"
  );

  const response = await fetch("http://localhost:3000/graphql", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => console.log(data));

  return response.json();
};

function App() {
  const [count, setCount] = useState(0);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    uploadPlayers().then((data) => {
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
