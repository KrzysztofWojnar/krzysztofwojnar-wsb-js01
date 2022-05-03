import { modal } from './main.js';
import { prepareForm } from './fly-details.js';

const userNameInput = document.createElement('input');
const passwordInput = document.createElement('input');
const errorMsg = document.createElement('div');
errorMsg.style.color = 'red';

const tryToLogin = function (connection) {
    fetch(
        '/signup',
        {
            method: 'POST',
            body: JSON.stringify({
                login: userNameInput.value,
                password: passwordInput.value
            })
        }
    )
        .then(res => {
            const insertErrorMsg = () => modal.modalWindow.insertAdjacentElement(
                'afterbegin',
                errorMsg
            );
            switch (res.status) {
                case 200:
                    res.json().then(data => {
                        modal.close();
                        prepareForm(connection);
                    });
                    break;
                case 401:
                    errorMsg.innerText = "Login data are incorrect!";
                    insertErrorMsg();
                    break;
                case 500:
                    errorMsg.innerText = "Internal Server Error!";
                    insertErrorMsg();
                    break;
                default:
                    errorMsg.innerText = "Unexpected response.";
                    insertErrorMsg();
                    break;
            }
            console.log(res);
            return;
        });
}

export function login(connection) {
    modal.open();
    const userNameLabel = document.createElement('label');
    userNameLabel.setAttribute('for', 'user-name-input');
    userNameLabel.innerText = 'username:'

    userNameInput.setAttribute('id', 'user-name-input');
    userNameInput.setAttribute('type', 'text');
    const passwordLabel = document.createElement('label');
    passwordLabel.setAttribute('for', 'user-name-input');
    passwordLabel.innerText = 'password:'

    passwordInput.setAttribute('id', 'user-name-input');
    passwordInput.setAttribute('type', 'password');
    modal.modalWindow.appendChild(userNameLabel);
    modal.modalWindow.appendChild(userNameInput);
    modal.modalWindow.appendChild(passwordLabel);
    modal.modalWindow.appendChild(passwordInput);
    const confirmButton = document.createElement('button');
    confirmButton.innerText = 'Log in';
    confirmButton.addEventListener('click', () => tryToLogin(connection));
    modal.modalWindow.appendChild(confirmButton);
    userNameInput.focus();
}