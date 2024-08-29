import { graphql } from "graphql";
import { createServer } from "node:http";

import { schema } from "./schema/schema.js";
import { db } from "./db/db.js";

createServer((req, res) => {
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
        contextValue: { db },
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
}).listen(3000, "0.0.0.0");
