const fs = require('fs');
const express = require('express');
const { Pool } = require('pg');
const app = express();

const port = process.env.PORT || 3001;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

let counter = 0;


const loadInitValueFromDB = async () => {
    try {
      const result = await pool.query('SELECT counter FROM log_counter WHERE id = 1;');
      if (result.rows.length > 0) {
        counter = result.rows[0].counter;
        console.log(`Counter initialized to ${counter}`);
      } else {
        await pool.query('INSERT INTO log_counter (id, counter) VALUES (1, 0);');
        counter = 0;
        console.log('Counter initialized to 0');
      }
    } catch (error) {
      console.error('Error initializing counter:', error);
    }
  };

app.use((req, res, next)=>{
    
    if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
        return res.sendStatus(204);
    }
    
    counter++;
    next();
});

app.get('/pingpong',async (req, res, next) =>{
   
    try {
        
        await pool.query('UPDATE log_counter SET counter = $1 WHERE id = 1;', [counter]);
    
        res.json({counter: counter});

      } catch (error) {
        console.error('Error updating counter:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
});


app.listen(port, async () => {
    console.log(`Server started in port ${port}`);
    await loadInitValueFromDB();
  });
