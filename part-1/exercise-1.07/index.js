const express = require('express');
const app = express();

const port = process.env.PORT || 8080;

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


app.use((req, res, next) =>{
    res.write('<html>');
    res.write('<head><title>K3s log output</title></head>');
    res.write('<body><h1>Kubernetes demo page</h1>');
    res.write(`<p>${new Date().toISOString()}: ${randomString}`);
    res.write('</body>');
    res.write('</html');
    return res.end();
});


app.listen(port, () => {
    console.log(`Server started in port ${port}`);
  });
