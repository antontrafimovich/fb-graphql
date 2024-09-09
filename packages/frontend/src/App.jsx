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
  const [players, setPlayers] = useState([]);

  console.log(players);

  return (
    <>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const formData = new FormData(e.target);

            formData.append(
              "operations",
              JSON.stringify({
                query: `
              mutation AddPlayers($players: [AddPlayerInput!]!) {
                addPlayers(players: $players) {
                  name
                }
              }
            `,
                variables: {
                  players: null, // Placeholder for the file, it will be filled by the file content
                },
              })
            );

            formData.append(
              "variables",
              JSON.stringify({
                players: 0,
              })
            );

            const response = await fetch("http://localhost:3000/graphql", {
              method: "POST",
              body: formData,
            })
              .then((response) => response.json())
              .then((data) => console.log(data));

            const players = await response.json();

            setPlayers(players);
          }}
        >
          <input type="file" id="0" name="0" />
          <button type="Submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;
