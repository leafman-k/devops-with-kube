const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

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

const directory = path.join('/', 'usr', 'src', 'app', 'log');
const filePath = path.join(directory, 'timestamps.txt');

function getLatestTimestamp(callback) {
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
        const latestTimestamp = lines[lines.length - 1]; 

        callback(null, latestTimestamp);
    });
}


app.get('/', (req, res) => {
    getLatestTimestamp((err, timestamp) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(`${timestamp}: ${randomString}`);
        }
    });
});


app.listen(port, () => {
    console.log(`Server started in port ${port}`);
  });
