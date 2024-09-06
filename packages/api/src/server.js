import { graphql } from "graphql";
import { createServer } from "node:http";
import process from "node:process";

import { db } from "./db/db.js";
import { schema } from "./schema/schema.js";
import multer from "multer";

const upload = multer();
const uploadHandler = upload.fields([{ name: "0" }]);

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
        if (req.headers["content-type"] === "application/json") {
          let query = "";

          req.on("data", (chunk) => {
            query += chunk;
          });

          req.on("end", () => {
            console.log(query);
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

        if (req.headers["content-type"].startsWith("multipart/form-data")) {
          uploadHandler(req, res, (err) => {
            if (err) {
              res.writeHead(500, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              });
              res.end(JSON.stringify({ error: "Failed to parse the file" }));
              return;
            }

            const variables = JSON.parse(req.body.variables);

            const mappedVariables = Object.entries(variables).reduce(
              (acc, [key, value]) => {
                acc[key] = req.files[value][0]
                return acc;
              },
              {}
            );

            const source = JSON.parse(req.body.operations);

            console.log(source, mappedVariables.file);

            return graphql({
              source: source.query,
              schema,
              contextValue: { db: connectedDb },
              variableValues: mappedVariables,
            }).then((response) => {
              res.writeHead(200, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              });
              res.end(JSON.stringify(response));
            });
          });

          return;
        }
      }

      if (req.url === "/graphql" && req.method === "OPTIONS") {
        res.writeHead(200, {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        });
        res.end();
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
