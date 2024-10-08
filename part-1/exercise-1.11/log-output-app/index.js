const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 3000;

const directory = path.join('/', 'usr', 'src', 'app', 'log');
const filePath = path.join(directory, 'counter.txt');
let counter = 0;

const stringGenerator = (length)=> {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charLength = chars.length;

    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * charLength));
    }

    return result;
}
const randomString = stringGenerator(20);

function getCounter(callback) {
    console.log(filePath);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                callback('File not found.');
            } else {
                callback('Error while reading');
            }
            return;
        }

        const lines = data.trim().split('\n');
        const counter = lines[lines.length - 1]; 

        callback(null, counter);
    });
}


app.get('/', (req, res) => {
    getCounter((err, counter) => {
        if (err) {
            res.status(500).send(err);
        } else {
            const timestamp = new Date().toISOString(); 
            res.write('<html>');
            res.write('<head><title>Persistent Demo</title></head>');
            res.write(`<p>${timestamp}: ${randomString}`);
            res.write(`<p>Ping / Pongs: ${counter}`);
            res.write('</body>');
            res.write('</html');
            return res.end();
        }
    });
});



app.listen(port, () => {
    console.log(`Server started in port ${port}`);
  });
