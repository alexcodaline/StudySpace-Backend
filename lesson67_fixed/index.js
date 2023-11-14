import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import fs from 'fs';


const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;

const messages = [];

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
});

io.on('connection', (socket) => {
  let userName = null;

  socket.on('user_connected', (name) => {
    userName = name;
    console.log(`System user "${userName}" is connected`);
    socket.broadcast.emit('user_connected', userName);
  });

  socket.on('disconnect', () => {
    console.log(`System user "${userName}" is disconnected`);
    socket.broadcast.emit('user_disconnected', userName);
  });

  socket.on('send_msg', (data) => {
    console.log(`Message from "${data.name}": ${data.msg}`);
    messages.push({ name: data.name, msg: data.msg });
    io.emit('new_msg', { name: data.name, msg: data.msg });
  });

  socket.on('save_messages', () => {
    const messagesJSON = JSON.stringify(messages);
    fs.writeFile('messages.txt', messagesJSON, (err) => {
      if (err) {
        console.error('Error saving messages:', err);
      } else {
        console.log('Messages saved successfully.');
        socket.emit('save_completed');
      }
    });
  });
});


server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});