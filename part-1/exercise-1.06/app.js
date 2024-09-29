const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use((req, res, next) =>{
  res.write('<html>');
  res.write('<head><title>K3s demo</title></head>');
  res.write('<body><h1>Kubernetes demo page</h1>');
  res.write('</body>');
  res.write('</html');
  return res.end();
});

app.listen(port, () => {
    console.log(`Server started in port ${port}`);
  });

