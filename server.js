const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
let words;

fs.readFile("words/words.dat", "utf8", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    words = data.split(',');
  }
});

app.use(cors());

app.listen(8080, function () {
  console.log("Listening on 8080");
});

app.get("/", function (req, res) {
  res.send("메인 페이지 입니다.");
});

app.get("/words", function (req, res) {
  res.json(words);
});

app.get("/score/:score", function (req, res) {
  const value = req.params;

  console.log(value.score);

  res.json({ value: value.score });
});
