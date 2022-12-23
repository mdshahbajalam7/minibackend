const express = require("express")
const PORT = process.env.PORT || 3000;
const path = require("path");
const jsonServer = require("json-server");
const https = require("https");
const { appendFile } = require("fs");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();
const app = express()

app.get("/fetch-user", async (req, res) => {
    https
      .get("https://randomuser.me/api", (result) => {
        let data = "";
        result.on("data", (chunk) => {
          data += chunk;
        });
        result.on("end", () => {
          data = JSON.parse(data);
          data = data.results[0];
          //   console.log(data);
          res.send(data);
        });
      })
      .on("error", (err) => {
        console.log(err.message);
      });
  });
  


server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use("/api", router);
server.listen(PORT, () => console.log("Running on port 3000"));