const fs = require('fs');
const express = require('express');
const app = express();

const port = process.env.PORT || 3001;


let counter = 0;

app.use((req, res, next)=>{
    
    if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
        return res.sendStatus(204);
    }
    
    counter++;
    next();
});

app.get('/pingpong',(req, res, next) =>{
   
    return res.json({counter: counter});
});


app.listen(port, () => {
    console.log(`Server started in port ${port}`);
  });
