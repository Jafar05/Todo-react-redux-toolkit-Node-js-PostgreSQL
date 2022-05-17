require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Todo } = require('./db/models');

const PORT = process.env.PORT || 3001;
const { User } = require('./db/models');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(422).json({ error: 'please add all the fields' });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "user doesn't exist with that email" });
    }
    const doMatch = await bcrypt.compare(password, user.password);
    if (doMatch) {
      const token = jwt.sign(
        { userId: user.id, name: user.name, email: user.email },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '1h' },
      );
      res.status(201).json({ token, userId: user.id });
    } else {
      return res.status(401).json({ error: 'email or password is invalid' });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post('/api/registration', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(422).json({ error: 'please add all the fields' });
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return res.status(422).json({ error: 'user already exists with that email' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { userId: user.id, name: user.name, email: user.email },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '1h' },
    );
    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
  }
});

app.get('/task/:id', async (req, res) => {
  try {
    const task = await Todo.findAll({ where: { userId: req.params.id } });
    res.json(task);
  } catch (e) {
    console.log(e);
  }
});

app.get('/task', async (req, res) => {
  try {
    const task = await Todo.findAll({ include: User });
    res.json(task);
  } catch (e) {
    console.log(e);
  }
});

app.post('/todo', async (req, res) => {
  const { title, userId } = req.body;
  const newTodo = await Todo.create({
    title, userId, status: false, rename: false,
  });
  res.json(newTodo);
});

app.delete('/:id', async (req, res) => {
  try {
    await Todo.destroy({ where: { id: req.params.id } });
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
});

app.put('/change/:id', async (req, res) => {
  try {
    await Todo.update({ status: req.body.status }, { where: { id: req.params.id } });
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
});

app.put('/new-title/:id', async (req, res) => {
  try {
    await Todo.update({ title: req.body.title, rename: req.body.rename }, { where: { id: req.params.id } });
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log('Server work', PORT);
});
