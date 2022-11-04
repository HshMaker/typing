const signInForm = document.querySelector('#signinForm');
const signUpForm = document.querySelector('#signupForm');
const loginClass = document.querySelector('.login');
const alertText = document.querySelector('#alert');
let userNameGame = "";

class gameLogic extends HTMLElement {

    connectedCallback() {
        const h4 = document.createElement('h4');
        const titleDiv = document.createElement('div');
        const contentH1 = document.createElement('h1');
        const hr = document.createElement('hr');
        const typingValueinput = document.createElement('input');
        const score = document.createElement('p');
        const logicDiv = document.createElement('div');
        const gameSceneDiv = document.createElement('div');

        h4.innerText = 'Typing Game!';
        titleDiv.className = 'title';
        titleDiv.appendChild(h4);
        contentH1.id = 'content';
        typingValueinput.type = 'text';
        typingValueinput.id = 'typing-value';
        score.id = 'score';
        score.innerText = 'SCORE : 0';
        logicDiv.className = 'logic';
        logicDiv.appendChild(contentH1);
        logicDiv.appendChild(hr);
        logicDiv.appendChild(typingValueinput);
        logicDiv.appendChild(score);

        gameSceneDiv.className = 'gameScene';
        gameSceneDiv.appendChild(titleDiv);
        gameSceneDiv.appendChild(logicDiv);
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
                    alertText.innerHTML = data.userStatus;
                } else {
                    alertText.innerHTML = data.userStatus;
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
                return;
            })
    }

})

