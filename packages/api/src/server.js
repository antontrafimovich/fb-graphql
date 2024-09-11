import { parse } from "csv-parse";
import { graphql } from "graphql";
import multer from "multer";
import { createServer } from "node:http";
import process from "node:process";

import { db } from "./db/db.js";
import { schema } from "./schema/schema.js";

const upload = multer();
const uploadHandler = upload.fields([{ name: "0" }]);

const parser = parse({ delimiter: ",", columns: true });

const parseCsv = async (csv) => {
  return new Promise((resolve, reject) => {
    let data = [];

    parser.on("data", (row) => {
      console.log(row);
      data.push(row);
    });

    parser.on("error", (err) => {
      reject(err);
    });

    parser.on("end", () => {
      console.log("parse finished", data);
      resolve(data);
    });

    parser.write(csv);
    parser.end();
  });
};

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
            const source = JSON.parse(query);
            graphql({
              schema,
              source: source.query,
              contextValue: { db: connectedDb, res },
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
          uploadHandler(req, res, async (err) => {
            if (err) {
              res.writeHead(500, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              });
              res.end(JSON.stringify({ error: "Failed to parse the file" }));
              return;
            }

            const variables = JSON.parse(req.body.variables);

            const result = await parseCsv(req.files[0][0].buffer);

            const mappedVariables = Object.entries(variables).reduce(
              (acc, [key]) => {
                acc[key] = result;
                return acc;
              },
              {}
            );

            const source = JSON.parse(req.body.operations);

            return graphql({
              source: source.query,
              schema,
              contextValue: { db: connectedDb, res },
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

    return server;
  });
};
