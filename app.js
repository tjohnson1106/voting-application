const express = require("express");
const fs = require("fs");

const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/poll", (req, res) => {
  fs.readFile(__dirname + "/poll.json", "utf8", function(err, data) {
    res.send(data);
  });
});

app.post("/vote/new", (req, res) => {
  console.log(req.body);
});

app.listen(3001, () => {
  console.log("listening on port 3001");
});
