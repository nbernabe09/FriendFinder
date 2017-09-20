var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var data = require("./app/data/friends.js");

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "app/public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var friends = data.friends;

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

app.get("/friends", function(req, res) {
  res.json(friends);
});

app.get("/api/", function(req, res) {

  return res.json(friends);
})

app.post("/api/new", function(req, res) {
  var newFriend = req.body;

  console.log(newFriend);

  friends.push(newFriend);

  res.json(newFriend);
});

app.listen(port, function() {
  console.log("App listening on PORT " + port);
});
