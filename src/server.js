import { graphql } from "graphql";
import { createServer } from "node:http";

import { schema } from "./schema/schema.js";
import { db } from "./db/db.js";
import { process } from "node:process";

let connectedDb;
try {
  connectedDb = await db.connect();
} catch (err) {
  console.error("Failed to connect to the database");
  console.error(err);
  process.exit(1);
}

createServer((req, res) => {
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
}).listen(3000, "0.0.0.0", () => {
  console.log("Server is running on http://localhost:3000");
});
