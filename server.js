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

app.set('view engine', 'ejs');

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
  },
  gameScore: {
    type: DataTypes.INTEGER,
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
  res.send('hi');
});

app.get("/dUdLrKeLffLxM", async function (req, res) {
  const ids = await Users.findAll();
  res.render('index', { ids : ids});
});

app.get("/words", function (req, res) {
  res.json(words);
});

app.post("/score", async function (req, res) {
  const { playerID } = req.body;

  const scoreCheck = await Users.findOne({
    where: {
      signinId: playerID
    }
    
  });
  const userScore = scoreCheck.gameScore + 1;
  const playerCheck = await Users.update({gameScore: userScore}, {
    where: {
      signinId: playerID
    }
  })
//여기 새로고침 이번에 한번 따로 나눠봐 백엔드
  res.json({score: playerCheck.gameScore });
});

app.post("/create", async function (req, res) {
  const { userName, idc, psc } = req.body;

  const userCheck = await Users.findOne({
    where: {
      signinId: idc,
    }
    
  });

  if(userCheck?.signinId === idc) {
    res.json({userStatus : '이미 있는 회원정보입니다.'});
    return;
  }

  else if(userName === '' || idc === '' || psc === '') {
    res.json({userStatus : '회원정보를 기입해주세요.'});
    return;
  }

  const userInfo = await Users.create({ userName: userName
    , signinId: idc
    , passWord: psc
    , gameScore: 0});

    setTimeout(function() {
      res.json({userStatus : '회원가입이 완료되었습니다.'});
    }, 1000)
});

app.post('/confirm', async function (req, res) {
  const {idc, psc} = req.body;

  const userInfo = await Users.findOne({
    where: {
      signinId: idc
    }
  });
  if(idc === '' || psc === '') {
    res.json({userStatus : '회원정보를 기입해주세요.'});
    return;
  } else if(userInfo?.signinId !== idc) {
    res.json({userStatus : '없는 회원정보입니다.'});
    return;
  } else if(userInfo?.signinId === idc && userInfo.passWord !== psc) {
    res.json({userStatus : '비밀번호가 틀렸습니다.'});
    return;
  }
  
  res.json({userStatus : '',userName : userInfo.userName, ID : userInfo.signinId});
})


app.post("/wLdNjwLdelete/:id", async function (req, res) {
  console.log(req.params);

  const {id} = req.params;

  //delete문

  await Users.destroy({
    where: {
      id: id
    }
  })

  res.redirect('/dUdLrKeLffLxM');
});
