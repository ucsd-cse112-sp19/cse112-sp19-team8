const express = require('express');
const app = express();
const path = require('path');

const server = app.listen(8080, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});
