const typeInput = document.getElementById("typing-value");
const wordsOne = document.getElementById("content");
const scoreText = document.getElementById("score");
const humanAlertText = document.querySelector('.human-alert');
const playerinfo = document.querySelector('#player-info');
const scoreForm = document.querySelector('#game-score-form');

let typeValue;
let random;
let score = 0;

getWords();
wordSet();

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