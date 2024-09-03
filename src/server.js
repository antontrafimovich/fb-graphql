import { graphql } from "graphql";
import { createServer } from "node:http";
import process from "node:process";

import { db } from "./db/db.js";
import { schema } from "./schema/schema.js";

export const startServer = async (port = 3000) => {
  let connectedDb;
  try {
    connectedDb = await db.connect();
  } catch (err) {
    console.error("Failed to connect to the database");
    console.error(err);
    process.exit(1);
  }

  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      if (!connectedDb) {
        res.writeHead(500, {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        });
        res.end(JSON.stringify({ error: "Failed to connect to the database" }));
        return;
      }

      if (req.method === "POST" && req.url === "/graphql") {
        let query = "";

        req.on("data", (chunk) => {
          query += chunk;
        });

        req.on("end", () => {
          const source = JSON.parse(query);
          graphql({
            schema,
            source: source.query,
            contextValue: { db: connectedDb },
            variableValues: source.variables,
          }).then((response) => {
            res.writeHead(200, {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            });
            res.end(JSON.stringify(response));
          });
        });
      }
    });

    server.listen(port, "0.0.0.0", () => {
      console.log(`Server is running on http://localhost:${port}`);

      resolve({
        close: () => {
          server.close();
        },
        port: server.address().port,
      });
    });
  });
};
