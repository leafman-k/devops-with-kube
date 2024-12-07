const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res, next)=>{
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.listen(port, () => {
    console.log(`Server started in port ${port}`);
  });
