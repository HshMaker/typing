const typeInput = document.getElementById("typing-value");
const wordsOne = document.getElementById("content");
const scoreText = document.getElementById("score");
let typeValue;
let random;
let score = 0;

fetch(`http://localhost:8080/words`)
    .then((response) => response.json())
    .then((data) => {
        typeValue = data;
        console.log(typeValue.length);
        random = Math.floor(Math.random() * typeValue.length);
        wordsOne.innerText = typeValue[random];
    })

typeInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        correctValue();
        getValue();
        typeInput.value = "";
    }
});

function correctValue() {
    if (wordsOne.innerText === typeInput.value) {
        console.log('correct!');
        score++;
        scoreText.innerText = `SCORE : ${score}`;
        random = Math.floor(Math.random() * typeValue.length);
        wordsOne.innerText = typeValue[random];
    } else {
        console.log('incorrect!');
        return;
    }
}

function getValue() {
    fetch(`http://localhost:8080/score/${score}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
}