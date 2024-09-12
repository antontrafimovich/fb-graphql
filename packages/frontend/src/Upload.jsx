import { useState } from "react";

export const Upload = () => {
  const [players, setPlayers] = useState([]);

  console.log(players);

  return (
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
  );
};
