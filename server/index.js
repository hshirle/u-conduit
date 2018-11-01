const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config(); 

const app = express();
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname + '/../client/dist')));

app.listen(8080, function() {
  console.log('listening on port 8080!');
});