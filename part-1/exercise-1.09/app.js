const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

let counter = 0;

app.use((req, res, next)=>{
    
    if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
        return res.sendStatus(204);
    }
    counter++;
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
