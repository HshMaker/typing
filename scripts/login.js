const signInForm = document.querySelector('#signinForm');
const signUpForm = document.querySelector('#signupForm');
let userNameGame = "";



document.addEventListener('submit', (e) => {
    if (e.submitter.id === 'signInID') {
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
                if (data?.success === '없는 회원정보입니다.') {
                    console.log(data);
                } else {
                    userNameGame = data.username;
                    document.querySelector('#welcome').innerHTML = `환영합니다. ${userNameGame}`;

                }
            })

    } else if (e.submitter.id === 'signUpID') {
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
                console.log(data);
            })
    }

})

document.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
    };
}, true);
