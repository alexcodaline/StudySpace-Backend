const socket = io();

const btnName = document.querySelector('.btn-name');
const inputName = document.querySelector('.user-name input');
const userLabel = document.querySelector('.form-msg label');
const login = document.querySelector('.login');
const formMsg = document.querySelector('.form-msg');
const chat = document.querySelector('.chat');
const msg = document.getElementById('msg');
let userName= '';

btnName.addEventListener('click', () => {
  userName = inputName.value;
  userLabel.innerHTML = userName;
    login.style.display = 'none';
    socket.emit('user_connected', userName);
});

formMsg.addEventListener('submit', (e) => {
  e.preventDefault();
  const msgText = msg.value;
  socket.emit('send_msg', { name: userName, msg: msgText });
  msg.value = '';
});

socket.on('new_msg', (message) => {
  const li = document.createElement('li');
  li.innerHTML = `
    <p class="name">${message.name}</p>
    <p class="message">${message.msg}</p>
  `;
  chat.appendChild(li);
});

socket.on('user_connected', (userName) => {
  console.log(`System user "${userName}" is connected`);
});

socket.on('user_disconnected', (userName) => {
  console.log(`System user "${userName}" is disconnected`);
});

const btnSave = document.querySelector('.btn-save');

socket.on('save_completed', () => {
  btnSave.style.backgroundColor = 'green';
  setTimeout(() => {
    btnSave.style.backgroundColor = '#e1821d';
  }, 3000);
});

btnSave.addEventListener('click', () => {
  socket.emit('save_messages');
});