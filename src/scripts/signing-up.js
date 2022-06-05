import { modal } from './main.js';
import { prepareForm } from './fly-details.js';

const form = document.createElement('form');
const errorMsg = document.createElement('div');
const userNameLabel = document.createElement('label');
const userNameInput = document.createElement('input');
const passwordLabel = document.createElement('label');
const passwordInput = document.createElement('input');
const confirmButton = document.createElement('button');
errorMsg.style.color = 'red';

document
    .getElementById('modal-background')
    .addEventListener('click', () => modal.close());
document
    .getElementById('modal-window')
    .addEventListener('click', event => event.stopPropagation());

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
            const insertErrorMsg = () => form.insertAdjacentElement(
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
    userNameLabel.setAttribute('for', 'user-name-input');
    userNameLabel.innerText = 'username:'
    userNameInput.setAttribute('id', 'user-name-input');
    userNameInput.setAttribute('type', 'text');
    passwordLabel.setAttribute('for', 'user-password-input');
    passwordLabel.innerText = 'password:'
    passwordInput.setAttribute('id', 'user-password-input');
    passwordInput.setAttribute('type', 'password');
    form.appendChild(userNameLabel);
    form.appendChild(userNameInput);
    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);
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
