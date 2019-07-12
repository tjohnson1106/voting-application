const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/poll", (req, res) => {
  fs.readFile(__dirname + "/poll.json", "utf8", function(err, data) {
    res.send(data);
  });
});

app.post("/vote/new", (req, res) => {
  if (req.body.linux === "on") {
    choosePollOption(req, res, "linux");
  } else if (req.body.macos === "on") {
    choosePollOption(req, res, "macos");
  } else if (req.body.windows === "on") {
    choosePollOption(req, res, "windows");
  } else {
    res.redirect("/?incorrect+input");
  }
});

function choosePollOption(req, res, topic) {
  let poll = {};
  fs.readFile(__dirname + "/poll.json", "utf8", function(err, data) {
    poll = JSON.parse(data);
    poll[topic] += 1;
    console.log(poll);
    fs.writeFile(__dirname + "/poll.json", JSON.stringify(poll), function(
      err,
      data
    ) {
      console.log(err);
      console.log(data);
      res.status(200).send(`want to <a href="/">vote<a/> again`);
    });
  });
  console.log(poll);
}

app.listen(3001, () => {
  console.log("listening on port 3001");
});
