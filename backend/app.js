const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, email TEXT, password TEXT)');
  db.run('CREATE TABLE assessments (id INTEGER PRIMARY KEY, taskName TEXT, description TEXT)');
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], function(err) {
    if (err) {
      return res.status(500).send('Error registering new user');
    }

    const token = jwt.sign({ id: this.lastID }, 'supersecret', { expiresIn: '1h' });
    res.status(201).send({ auth: true, token });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err || !user) {
      return res.status(404).send('User not found');
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }

    const token = jwt.sign({ id: user.id }, 'supersecret', { expiresIn: '1h' });
    res.status(200).send({ auth: true, token });
  });
});

app.post('/assessments', (req, res) => {
  const { taskName, description } = req.body;

  db.run('INSERT INTO assessments (taskName, description) VALUES (?, ?)', [taskName, description], function(err) {
    if (err) {
      return res.status(500).send('Error creating assessment task');
    }

    res.status(201).send({ id: this.lastID });
  });
});

app.get('/assessments', (req, res) => {
  db.all('SELECT * FROM assessments', [], (err, rows) => {
    if (err) {
      return res.status(500).send('Error fetching assessment tasks');
    }

    res.status(200).send(rows);
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
