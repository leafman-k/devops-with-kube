const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 3000;

const directory = path.join('/', 'usr', 'src', 'app', 'log');
const filePath = path.join(directory, 'counter.txt');

if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
}

let counter = 0;

app.use((req, res, next)=>{
    
    if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
        return res.sendStatus(204);
    }
    
    counter++;
    fs.appendFile(filePath, `${counter}\n`, (err) => {
        if (err) {
            console.error('Error while writing to the file:', err);
        }
    });
    next();
});

app.get('/pingpong',(req, res, next) =>{
    res.write('<html>');
    res.write('<head><title>Ping Pong</title></head>');
    res.write('<body><h1>Ping pong page</h1>');
    res.write(`<p>Counter: ${counter}`);
    res.write('</body>');
    res.write('</html');
    return res.end();
});


app.listen(port, () => {
    console.log(`Server started in port ${port}`);
  });
