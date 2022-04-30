import { modal } from './main.js';
import { prepareForm } from './fly-details.js';
const logins = require('../users.json');

const userNameInput = document.createElement('input');
const passwordInput = document.createElement('input');
const errorMsg = document.createElement('div');
errorMsg.style.color = 'red';

const tryToLogin = function(connection) {
    const user = logins.find(elem => elem.username === userNameInput.value);
    if (user && user.password === passwordInput.value) {
        modal.close();
        prepareForm(connection);
    } else {
        errorMsg.innerText = "Login data are incorrect!";
        modal.modalWindow.insertAdjacentElement(
            'afterbegin',
            errorMsg
            )
    }
}

export function login(connection) {
    prepareForm(connection);
    return;
    
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
    confirmButton.addEventListener('click', ()=>tryToLogin(connection));
    modal.modalWindow.appendChild(confirmButton);
}