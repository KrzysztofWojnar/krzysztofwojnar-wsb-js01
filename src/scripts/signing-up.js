import { modal } from './main.js';
import { prepareForm } from './fly-details.js';

const userNameInput = document.createElement('input');
const passwordInput = document.createElement('input');
const errorMsg = document.createElement('div');
errorMsg.style.color = 'red';

const tryToLogin = function (connection) {
    console.log({
        login: userNameInput.value,
        password: passwordInput.value
    });
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
                    res.json().then(() => {
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
            return;
        });
}

export function login(connection) {
    modal.open();
    const form = document.createElement('form');
    const userNameLabel = document.createElement('label');
    userNameLabel.setAttribute('for', 'user-name-input');
    userNameLabel.innerText = 'username:'

    userNameInput.setAttribute('id', 'user-name-input');
    userNameInput.setAttribute('type', 'text');
    const passwordLabel = document.createElement('label');
    passwordLabel.setAttribute('for', 'user-password-input');
    passwordLabel.innerText = 'password:'

    passwordInput.setAttribute('id', 'user-password-input');
    passwordInput.setAttribute('type', 'password');
    form.appendChild(userNameLabel);
    form.appendChild(userNameInput);
    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);
    const confirmButton = document.createElement('button');
    confirmButton.innerText = 'Log in';
    confirmButton.addEventListener('click', event => {
        event.preventDefault();
        tryToLogin(connection);
    });
    form.appendChild(confirmButton);
    form.appendChild(errorMsg);
    modal.modalWindow.appendChild(form);
    userNameInput.focus();
}