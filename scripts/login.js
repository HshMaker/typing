const title = document.querySelector(".title");
const logic = document.querySelector(".logic");
const loginId = document.querySelector("#login-id");
const loginPass = document.querySelector("#login-password");
const signUpId = document.querySelector("#signup-id");
const signUpPass = document.querySelector("#signup-password");

let loginStatus = false;

function getSignIn() {
    window.open("game.html", "game");
}

async function getUser() {
    await fetch(`http://localhost:8080/login`)
        .then((response) => response.json())
        .then((data) => {
            for(i = 0; i < data.id; i++) {
                const button = document.createElement('button');
                button.type = 'button';
                button.innerText = `delete ${i + 1}`
                
            }
        });
}

