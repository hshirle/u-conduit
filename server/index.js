const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config(); 
const path = require('path');

const app = express();
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname + '/../client/dist')));

app.listen(8080, function() {
  console.log('listening on port 8080!');
});