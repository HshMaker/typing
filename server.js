const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
let words;

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const Users = sequelize.define('Users', {
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
  await Users.sync();
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

app.post("/create", async function (req, res) {
  const { userName, idc, psc } = req.body;

  const userCheck = await Users.findOne({
    where: {
      signinId: idc,
    }
    
  });

  if(userCheck?.signinId === idc) {
    res.json({success : '이미 있는 회원정보입니다.'});
    return;
  }

  else if(userName === '' || idc === '' || psc === '') {
    res.json({success : '회원정보를 기입해주세요.'});
    return;
  }

  const userInfo = await Users.create({ userName: userName
    , signinId: idc
    , passWord: psc});
  
  res.json({success : '회원가입이 완료되었습니다.'});
});

app.post('/confirm', async function (req, res) {
  const {idc, psc} = req.body;

  const userInfo = await Users.findOne({
    where: {
      signinId: idc,
      passWord: psc
    }
  });
  
  if(userInfo?.signinId !== idc) {
    res.json({success : '없는 회원정보입니다.'});
    return;
  }

  console.log(userInfo.userName);
  
  res.json({username : userInfo.userName});
})


app.get("/delete/:id", async function (req, res) {
  console.log(req.params);

  const {id} = req.params;

  //delete문

  await Users.destroy({
    where: {
      id: id
    }
  })

});
