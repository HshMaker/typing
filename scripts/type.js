const typeInput = document.getElementById("typing-value");
const wordsOne = document.getElementById("content");
const scoreText = document.getElementById("score");
const humanAlertText = document.querySelector('.human-alert');
const playerinfo = document.querySelector('#player-info');
const scoreForm = document.querySelector('#game-score-form');
const leaderBoardv = [
    document.querySelector('.leader1'),
    document.querySelector('.leader2'),
    document.querySelector('.leader3'),
    document.querySelector('.leader4'),
    document.querySelector('.leader5'),
    document.querySelector('.leader6'),
    document.querySelector('.leader7'),
    document.querySelector('.leader8'),
    document.querySelector('.leader9'),
    document.querySelector('.leader10'),
]

let typeValue;
let random;
let score = 0;

getWords();
wordSet();
setTimeout(function () {
    scoreLoad();
}
, 50)
leaderBoardLoad();
setInterval(function() {
    leaderBoardLoad();
}, 10000)

function getWords() {
    fetch(`http://localhost:8080/words`)
        .then((response) => response.json())
        .then((data) => {
            typeValue = data;
            console.log(typeValue.length);

        })
}
function wordSet() {
    setTimeout(function () {
        random = Math.floor(Math.random() * typeValue.length);
        console.log(random + typeValue[random]);
        wordsOne.innerText = typeValue[random];
    }, 100);
}


typeInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        correctValue();
        typeInput.value = "";
    }
});
playerinfo.addEventListener('keydown', function (event) {
    event.preventDefault();
    if(playerinfo.value !== userIDGame) {
        playerinfo.value = userIDGame;
    }
})

async function correctValue() {
    if (wordsOne.innerText === typeInput.value) {
        console.log('correct!');
        await getValue();
        random = Math.floor(Math.random() * typeValue.length);
        wordsOne.innerText = typeValue[random];
    } else {
        console.log('incorrect!');
        return;
    }
}

const scoreData = new FormData(scoreForm);
const scoreBody = new URLSearchParams(scoreData);

function getValue() {
    fetch(`http://localhost:8080/score`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: scoreBody
    })
        .then((response) => response.json())
        .then((data) => {
            score = data.score;
            scoreText.innerText = `${userNameGame} 님의 스코어 : ${score}`;

        });
}
function scoreLoad() {
    fetch(`http://localhost:8080/loadscore`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: scoreBody
        })
            .then((response) => response.json())
            .then((data) => {
                score = data.score;
                scoreText.innerText = `${userNameGame} 님의 스코어 : ${score}`;
    
            })
}
function leaderBoardLoad() {
    fetch(`http://localhost:8080/leaderBoard`)
            .then((response) => response.json())
            .then((data) => {
                for(i = 0; i<leaderBoardv.length; i++) {
                    leaderBoardv[i].innerText = `${(i+1)}등 ${data[i]?.userName} : ${data[i]?.gameScore}점`;

                }
            })
}