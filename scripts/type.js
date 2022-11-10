const typeInput = document.getElementById("typing-value");
const wordsOne = document.getElementById("content");
const scoreText = document.getElementById("score");
const humanAlertText = document.querySelector('.human-alert');
const playerinfo = document.querySelector('#player-info');
const scoreForm = document.querySelector('#game-score-form');
const leaderOpen = document.querySelector('.leaderBoardOpen');
const leaderContainer = document.querySelector('.leaderContainer');
const leaderExit = document.querySelector('.leaderExit');
const chainNumSpan = document.querySelector('.chainNum');
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

let chainNum = 0;
let typeValue;
let random;

const pianoSound = [
    new Audio('sounds/piano1.mp3'),
    new Audio('sounds/piano2.mp3'),
    new Audio('sounds/piano3.mp3'),
    new Audio('sounds/piano4.mp3'),
    new Audio('sounds/piano5.mp3'),
    new Audio('sounds/piano6.mp3'),
    new Audio('sounds/piano7.mp3'),
    new Audio('sounds/piano8.mp3'),
    new Audio('sounds/piano9.mp3'),
    new Audio('sounds/piano10.mp3'),
    new Audio('sounds/piano11.mp3'),
    new Audio('sounds/piano12.mp3'),
    new Audio('sounds/piano13.mp3'),
]
let pianoCount = 0;

let scoreData = new FormData(scoreForm);
let scoreBody = new URLSearchParams(scoreData);

getWords();
wordSet();
setTimeout(function () {
    scoreLoad();
}
, 50)

function getWords() {
    fetch(`http://localhost:8080/words`)
        .then((response) => response.json())
        .then((data) => {
            typeValue = data;
        })
}
function wordSet() {
    setTimeout(function () {
        random = Math.floor(Math.random() * typeValue.length);
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
leaderOpen.addEventListener('click', function() {
    leaderBoardLoad();
    leaderContainer.classList.remove('hide');
})

leaderExit.addEventListener('click', function() {
    leaderContainer.classList.add('hide');
})

async function correctValue() {
    if (wordsOne.innerText === typeInput.value) { //correct
        await getValue();
        random = Math.floor(Math.random() * typeValue.length);
        wordsOne.innerText = typeValue[random];
        wordsOne.classList.add('vibration');
        setTimeout(function() {
            wordsOne.classList.remove('vibration');
        }, 100);
        if(pianoCount >= 8) {
            pianoCount = 1;
            pianoSound[0].play();
        } else {
            pianoSound[pianoCount].play();
            pianoCount++;
        }
    } else { //incorrect
        random = Math.floor(Math.random() * 5) + 8;
        pianoSound[random].play();
        wordsOne.classList.add('vibration');
        setTimeout(function() {
            wordsOne.classList.remove('vibration');
        }, 100);
        scoreData = new FormData(scoreForm);
        scoreBody = new URLSearchParams(scoreData);
        await fetch(`http://localhost:8080/chainzero`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: scoreBody
        })
            .then((response) => response.json())
            .then((data) => {
                chainNumSpan.innerText = data.chain;
            });
    }
}

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
            scoreText.innerText = data.score;
            chainNumSpan.innerText = data.chain;
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
                scoreText.innerText = data.score;
                chainNumSpan.innerText = data.chain;
            })
}
function leaderBoardLoad() {
    fetch(`http://localhost:8080/leaderBoard`)
            .then((response) => response.json())
            .then((data) => {
                for(i = 0; i<leaderBoardv.length; i++) {
                    if(data[i]?.userName !== undefined) {
                        if(i+1 === 1) {
                            leaderBoardv[i].innerText = `🥇 ${data[i]?.userName} : ${data[i]?.gameScore}점`;
                        } else if (i+1 === 2) {
                            leaderBoardv[i].innerText = `🥈 ${data[i]?.userName} : ${data[i]?.gameScore}점`;
                        } else if (i+1 === 3) {
                            leaderBoardv[i].innerText = `🥉 ${data[i]?.userName} : ${data[i]?.gameScore}점`;
                        } else {
                            leaderBoardv[i].innerText = `${(i+1)} ${data[i]?.userName} : ${data[i]?.gameScore}점`;
                        }
                    } else {
                        leaderBoardv[i].innerText = `${(i+1)}`;
                    }
                }
            })
}

