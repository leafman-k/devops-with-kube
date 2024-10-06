const fs = require('fs');
const path = require('path');


const directory = path.join('/', 'usr', 'src', 'app', 'log');
const filePath = path.join(directory, 'timestamps.txt');

if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
}

function createTimestamp() {
    const timestamp = new Date().toISOString(); 
    fs.appendFile(filePath, `${timestamp}\n`, (err) => {
        if (err) {
            console.error('Error while writing to the file:', err);
        } else {
            console.log(`Timestamp added: ${timestamp}`);
        }
    });
}

setInterval(createTimestamp, 5000);
