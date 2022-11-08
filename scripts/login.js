const signInForm = document.querySelector('#signinForm');
const signUpForm = document.querySelector('#signupForm');
const loginClass = document.querySelector('.login');
const signInAlertText = document.querySelector('#signinalert');
const signUpAlertText = document.querySelector('#signupalert');
const signUpUsers = document.querySelector('#username');
const signUpIDs = document.querySelector('#signup-id');
const signUpPass = document.querySelector('#signup-password');

let userNameGame = "";
let userIDGame = "";

class gameLogic extends HTMLElement {

    connectedCallback() {
        const h4 = document.createElement('h4');
        const titleDiv = document.createElement('div');
        const contentH1 = document.createElement('h1');
        const hr = document.createElement('hr');
        const typingValueinput = document.createElement('input');
        const score = document.createElement('p');
        const userName = document.createElement('p');
        const playerID = document.createElement('input');
        const form = document.createElement('form');
        const logicDiv = document.createElement('div');
        const gameSceneDiv = document.createElement('div');
        const leaderBoardDiv = document.createElement('div');
        const leaderBoardScoreDiv = document.createElement('div');
        const leaderBoardContainDiv = document.createElement('div');
        const scoreList = document.createElement('ol');
        const leaderSpan = document.createElement('span');
        const leaderExitSpan = document.createElement('span');
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
        titleDiv.className = 'title';
        titleDiv.appendChild(h4);
        contentH1.id = 'content';
        typingValueinput.type = 'text';
        typingValueinput.id = 'typing-value';
        score.id = 'score';
        score.innerText = `0`;
        userName.classList.add('UuserNames');
        userName.innerText = `${userNameGame}`;
        playerID.innerText = '';
        playerID.name = 'playerID';
        playerID.id = 'player-info'
        playerID.value = userIDGame;
        playerID.className = 'hide';
        form.id = 'game-score-form';
        form.appendChild(playerID);
        logicDiv.className = 'logic';
        logicDiv.append(contentH1, hr, typingValueinput, userName, form, score);
        leaderSpan.innerText = '🏆 순위';
        leaderSpan.classList = 'leader-icon';
        leaderExitSpan.innerText = '❌';
        leaderExitSpan.classList = 'leaderExit';
        score1.classList = 'leader1 leaderText';
        score2.classList = 'leader2 leaderText';
        score3.classList = 'leader3 leaderText';
        score4.classList = 'leader4 leaderText';
        score5.classList = 'leader5 leaderText';
        score6.classList = 'leader6 leaderText';
        score7.classList = 'leader7 leaderText';
        score8.classList = 'leader8 leaderText';
        score9.classList = 'leader9 leaderText';
        score10.classList = 'leader10 leaderText';
        scoreList.classList = 'leaderList';
        scoreList.style = "list-style: none";
        scoreList.append(score1, score2, score3, score4, score5, score6, score7, score8, score9, score10);
        leaderBoardContainDiv.classList = 'leaderBoard-Box'
        leaderBoardContainDiv.append(leaderSpan, leaderExitSpan, scoreList);
        leaderBoardScoreDiv.classList = 'leaderContainer hide';
        leaderBoardScoreDiv.append(leaderBoardContainDiv);
        leaderBoardDiv.innerHTML = '<span class="leaderBoardOpen">🏆</span>';
        leaderBoardDiv.className = 'leaderBoard';
        gameSceneDiv.className = 'gameScene';
        gameSceneDiv.append(titleDiv, logicDiv, leaderBoardDiv, leaderBoardScoreDiv);
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

        fetch(`https://port-1-typingback-v1cot24la7q6id3.gksl2.cloudtype.app/confirm`, {
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

        fetch(`https://port-1-typingback-v1cot24la7q6id3.gksl2.cloudtype.app/create`, {
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
                    signUpUsers.value = '';
                    signUpIDs.value = '';
                    signUpPass.value = '';
                }
            })
    }

})

