const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const app = express();

const port = process.env.PORT || 3000;

const message = process.env.MESSAGE || 'no messages found';

const filePath = path.join('/', 'usr', 'src', 'app','config', 'information.txt');

let fileContent = 'File not found';
try {
  fileContent = fs.readFileSync(filePath, 'utf8');
} catch (error) {
  console.error('Error reading file:', error.message);
}

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

app.get('/', async (req, res) => {
    try {
      
      const pingpongUrl = 'http://localhost:3001/pingpong'; 
  
      const response = await axios.get(pingpongUrl);
  
      if (response.status === 200 && response.data.counter !== undefined) {
        const counterValue = response.data.counter;
        const timestamp = new Date().toISOString(); 

        const htmlResponse = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>logout pingpong demo</title>
          </head>
          <body>
            <h1>Current Counter Value</h1>
            <p>file content: ${fileContent}</p>
            <p>env variable: MESSAGE=${message}</p>
            <p>${timestamp}: ${randomString}</p>
            <p>Ping / Pongs: ${counterValue}</p>
          </body>
          </html>
        `;
  
        // Send the HTML response to the client
        res.send(htmlResponse);
      } else {
        res.status(500).send('Failed to retrieve counter value.');
      }
    } catch (error) {
      console.error('Error fetching counter value:', error);
      res.status(500).send('An error occurred while fetching the counter value.');
    }
  });



app.listen(port, () => {
    console.log(`Server started in port ${port}`);
  });
