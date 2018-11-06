const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config(); 

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/../client/dist')));

app.get('/conduits', (req, res) => (
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
        let name = title.match(/(?<=\-(.*?)(?=\())/)[1]
        let abbrs = title.match(/(?<=\()(.*?)(?=\))/g)
        if (name.includes('Type')) {
          abbrs[0] += ' - ' + name.slice(6, name.indexOf(','))
        }
        conduit.name = name
        conduit.abbr = abbrs.length > 1 ? abbrs.join(' & ') : abbrs[0]
        conduits.push(conduit)
        if (conduits[count].sizes) {
          count++
        }
      }
      if (children.length > 12 && $(children.get(5)).text() !== '—') {
        conduits[count].sizes ? conduits[count].sizes.push({
          tradeSize: $(children.get(1)).text(),
          area: Number($(children.get(5)).text())
        }) : conduits[count].sizes = [{ 
          tradeSize: $(children.get(1)).text(),
          area: Number($(children.get(5)).text())}]

      }
    })
    res.send(conduits)
  })
  .catch(err => console.log(err))
))


app.listen(8080, function() {
  console.log('listening on port 8080!');
});