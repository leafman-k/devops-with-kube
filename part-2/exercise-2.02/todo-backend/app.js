const express = require('express');
const parser = require('body-parser');
const app = express();

const port = process.env.PORT || 3002;

app.use(parser.json());

let todos = [];
let currentId = 1;

app.post('/todos', (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required.' });
    }

    const newTodo = {
        id: currentId++,
        title,
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});


// Start the server
app.listen(port, () => {
    console.log(`Server started in port ${port}`);
});
