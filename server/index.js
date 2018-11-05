const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config(); 

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + '/../client/dist')));


  axios.get('https://www.buildmyowncabin.com/nec/nec2014_chap9_table4.html')
  .then(({data}) => {
    let $ = cheerio.load(data);
    let conduits = []
    $('tr').children().each((i, ele) => {
      if ($(ele).siblings().length === 0)
      console.log($(ele).text())
    })
  })
  .catch(err => console.log(err))


app.listen(8080, function() {
  console.log('listening on port 8080!');
});