import { beforeAll, it, expect, afterAll } from "vitest";
import { startServer } from "../server";

let server;
beforeAll(async () => {
  server = await startServer(0);
});

afterAll(async () => {
  await server.close();
});

it("should return a players info when queried", async () => {
  const query = "{ players { id, name } }";

  const response = await fetch(`http://localhost:${server.port}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const result = await response.json();

  console.log(result)

  expect(result).toEqual(
    expect.objectContaining({
      data: {
        players: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
          }),
        ]),
      },
    })
  );
});
