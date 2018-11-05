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
  let count = 0
  $('tr').each((i, ele) => {
    let children = $(ele).children()
    let conduit = {}
    if (children.length === 1 && children.text().includes('Article')) {

      let title = $(ele).children().text()
      let name = title.match(/(?<=\-(.*?)(?=\())/)
      let abbrs = title.match(/(?<=\()(.*?)(?=\))/g)
      conduit.name = name[1]
      conduit.abbr = abbrs
      conduits.push(conduit)
      if (conduits[count].sizes) {
        count++
      }
    }
    if (children.length > 12) {
      conduits[count].sizes ? conduits[count].sizes[$(children.get(1)).text()] = $(children.get(5)).text() :
      conduits[count].sizes = {
        [$(children.get(1)).text()]: $(children.get(5)).text()
      }
    }
  })
})
.catch(err => console.log(err))


app.listen(8080, function() {
  console.log('listening on port 8080!');
});