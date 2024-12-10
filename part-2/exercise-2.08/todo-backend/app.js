const express = require('express');
const parser = require('body-parser');
const app = express();
const { Pool } = require('pg');
const port = process.env.PORT || 3002;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

app.use(parser.json());

let todos = [];
let currentId = 1;

app.post('/todos', async (req, res) => {

  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const result = await pool.query('INSERT INTO todos (title) VALUES ($1) RETURNING *;', [title]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/todos', async (req, res) => {

    try {
        const result = await pool.query('SELECT * FROM todos;');
        res.json(result.rows);
      } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
});


// Start the server
app.listen(port, () => {
    console.log(`Server started in port ${port}`);
});
