const express = require('express');
const path = require('path');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const app = express();
const Pool = require('pg').Pool;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

const pool = new Pool({
    host: 'usermoney.cshfpbqb4x3z.us-east-1.rds.amazonaws.com',
    database: 'postgres',
    user: 'postgres',
    password: 'Homk0487!',
    port: 5432,
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

app.get('/roulette', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'wheel.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Handle POST request to save user information to the database
app.post('/save-user', (req, res) => {
    const {username, money} = req.body;
    pool.query('INSERT INTO UserMoney (username, money) VALUES ($1, $2)', [username, money], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error saving user information to the database');
        } else {
            res.status(200).send('User information saved to the database');
        }
    });
});

app.post('/check-user', (req, res) => {
    console.log("checking user...");
    const {username} = req.body;
    pool.query('SELECT * FROM UserMoney WHERE username = $1', [username], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send({error: 'Error checking user information in the database'});
        } else {
            if (results.rows.length === 0) {
                console.log("False");
                res.status(200).send(false);
            } else {
                console.log("True");
                res.status(200).send(true);
            }
        }
    });
});

app.post('/get-money', function(req, res) {
  var username = req.body.username;
  var sql = "SELECT money FROM UserMoney WHERE username = $1";
  pool.query(sql, [username], function(err, result) {
    if (err) {
      console.error(err);
      res.status(500).send({error: 'Error getting user money from the database'});
    } else {
      res.status(200).send({ money: result.rows[0].money });
    }
  });
});

app.post('/save-user', (req, res) => {
    const {username, money} = req.body;
    pool.query('INSERT INTO UserMoney (username, money) VALUES ($1, $2)', [username, money], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error saving user information to the database');
        } else {
            res.status(200).send('User information saved to the database');
        }
    });
});

app.post('/remove-money', (req, res) => {
    const {username, amount} = req.body;
    pool.query('UPDATE UserMoney SET money = money - $1 WHERE username = $2', [amount, username], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error removing money from user account');
        } else {
            res.status(200).send('Money removed from user account');
        }
    });
});

app.post('/add-money', (req, res) => {
    const {username, amount} = req.body;
    pool.query('UPDATE UserMoney SET money = money + $1 WHERE username = $2', [amount, username], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error removing money from user account');
        } else {
            res.status(200).send('Money removed from user account');
        }
    });
});

app.post('/all-money', (req, res) => {
    const {amount} = req.body;
    pool.query('UPDATE UserMoney SET money = money + $1', [amount], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error adding money to all accounts');
        } else {
            res.status(200).send('Money added to all accounts');
        }
    });
});


const wss = new WebSocket.Server({ port: 8080 });
console.log(wss);
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
