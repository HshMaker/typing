const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
let words;
let loginInfo = [];

const { Sequelize, DataTypes } = require('sequelize');
const { table } = require("console");
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const User = sequelize.define('User', {
  // Model attributes are defined here
  userName : {
    type: DataTypes.STRING,
    allowNull: false
  },
  signinId : {
    type: DataTypes.STRING,
    allowNull: false
  },
  passWord: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
});

(async () => {
  await User.sync();
})();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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

app.post("/login", async function (req, res) {
  const { userName, idc, psc } = req.body;

  const userInfo = await User.create({ userName: userName
    , signinId: idc
    , passWord: psc});
  console.log("Jane's auto-generated ID:", userInfo.id);

  res.redirect('http://127.0.0.1:5500/typing/index.html');
});

app.post("/delete/:id", async function (req, res) {
  console.log(req.params);

  const {id} = req.params;

  res.redirect('http://127.0.0.1:5500/typing/index.html');

});

app.get("/userid", async function (req, res) {
  const a = await User.findAll();
  console.log(a.id);
});
