const signInForm = document.querySelector('#signinForm');
const signUpForm = document.querySelector('#signupForm');
const loginClass = document.querySelector('.login');
const signInAlertText = document.querySelector('#signinalert');
const signUpAlertText = document.querySelector('#signupalert');

let userNameGame = "";
let userIDGame = "";

class gameLogic extends HTMLElement {

    connectedCallback() {
        const h4 = document.createElement('h4');
        const h1 = document.createElement('h1');
        const titleDiv = document.createElement('div');
        const contentH1 = document.createElement('h1');
        const hr = document.createElement('hr');
        const typingValueinput = document.createElement('input');
        const score = document.createElement('p');
        const playerID = document.createElement('input');
        const form = document.createElement('form');
        const logicDiv = document.createElement('div');
        const gameSceneDiv = document.createElement('div');
        const leaderBoardDiv = document.createElement('div');
        const scoreList = document.createElement('ol');
        const score1 = document.createElement('li');
        const score2 = document.createElement('li');
        const score3 = document.createElement('li');
        const score4 = document.createElement('li');
        const score5 = document.createElement('li');
        const score6 = document.createElement('li');
        const score7 = document.createElement('li');
        const score8 = document.createElement('li');
        const score9 = document.createElement('li');
        const score10 = document.createElement('li');

        h4.innerText = 'Typing Game!';
        h4.className = 'title-text';
        h1.innerText = '';
        h1.className = 'human-alert'
        titleDiv.className = 'title';
        titleDiv.appendChild(h4);
        titleDiv.appendChild(h1);
        contentH1.id = 'content';
        typingValueinput.type = 'text';
        typingValueinput.id = 'typing-value';
        score.id = 'score';
        score.innerText = `${userNameGame} 님의 스코어 : 0`;
        playerID.innerText = '';
        playerID.name = 'playerID';
        playerID.id = 'player-info'
        playerID.value = userIDGame;
        playerID.className = 'hide';
        form.id = 'game-score-form';
        form.appendChild(playerID);
        logicDiv.className = 'logic';
        logicDiv.appendChild(contentH1);
        logicDiv.appendChild(hr);
        logicDiv.appendChild(typingValueinput);
        logicDiv.appendChild(score);
        logicDiv.appendChild(form);
        score1.className = 'leader1';
        score2.className = 'leader2';
        score3.className = 'leader3';
        score4.className = 'leader4';
        score5.className = 'leader5';
        score6.className = 'leader6';
        score7.className = 'leader7';
        score8.className = 'leader8';
        score9.className = 'leader9';
        score10.className = 'leader10';
        leaderBoardDiv.className = 'leaderBoard';
        leaderBoardDiv.append(score1, score2, score3, score4, score5, score6, score7, score8, score9, score10);
        gameSceneDiv.className = 'gameScene';
        gameSceneDiv.appendChild(titleDiv);
        gameSceneDiv.appendChild(logicDiv);
        gameSceneDiv.appendChild(leaderBoardDiv);
        this.appendChild(gameSceneDiv);


    }
}

customElements.define("custom-gamelogic", gameLogic);


document.addEventListener('submit', (e) => {
    if (e.submitter.id === 'signInID') {
        if (e.keyCode === 13) {
            e.preventDefault();
            return;
        }
        e.preventDefault();

        const formDatas = new FormData(signInForm);
        const loginBody = new URLSearchParams(formDatas);

        fetch(`http://localhost:8080/confirm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: loginBody
        })
            .then((response) => response.json())
            .then((data) => {
                if (data?.userStatus === '없는 회원정보입니다.' || data?.userStatus === '비밀번호가 틀렸습니다.' || data?.userStatus === '회원정보를 기입해주세요.') {
                    signInAlertText.innerHTML = data.userStatus;
                } else {
                    signInAlertText.innerHTML = data.userStatus;
                    userIDGame = data.ID;
                    userNameGame = data.userName;
                    loginClass.remove();
                    const gamelogicCST = document.createElement('custom-gamelogic');
                    document.querySelector('.custom').appendChild(gamelogicCST);
                    const script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.src = 'scripts/type.js';
                    document.body.appendChild(script);

                }
            })

    } else if (e.submitter.id === 'signUpID') {
        if (e.keyCode === 13) {
            e.preventDefault();
            return;
        }
        e.preventDefault();

        const formDatass = new FormData(signUpForm);
        const signUpBody = new URLSearchParams(formDatass);

        fetch(`http://localhost:8080/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: signUpBody
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.userStatus === '이미 있는 회원정보입니다.' || data.userStatus === '회원정보를 기입해주세요.') {
                    signUpAlertText.innerHTML = data.userStatus;
                    return;
                } else {
                    signUpAlertText.innerHTML = data.userStatus;
                }
            })
    }

})

