const express = require('express');
const path = require('path');
const WebSocket = require('ws');
const app = express();


app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
  });
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
  });

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    console.log('Received message:', message);

    // Broadcast the number to all connected clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});