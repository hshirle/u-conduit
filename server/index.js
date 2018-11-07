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
  axios.get(process.env.CONDUIT_TABLE)
  .then(({data}) => {
    let $ = cheerio.load(data);
    let conduits = []
    let count = 0
    $('tr').each((i, ele) => {
      let children = $(ele).children()
      let conduit = {}
      if (children.length === 1 && children.text().includes('Article')) {
        let title = $(ele).children().text()
        let type = title.match(/(?<=\-(.*?)(?=\())/)[1]
        let abbrs = title.match(/(?<=\()(.*?)(?=\))/g)
        if (type.includes('Type')) {
          abbrs[0] += ' - ' + type.slice(6, type.indexOf(','))
        }
        conduit.type = type
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
  .catch(err => console.error(err))
))

app.get('/conduits', (req, res) => (
  axios.get(process.env.WIRE_TABLE)
  .then(({data}) => {
    let $ = cheerio.load(data);
    let wires = [{
      type: 'THW/THHW',
      sizes: []
    },{
      type: 'XHH/XHHW',
      sizes: []
    },{
      type: 'THHN/THWN',
      sizes: []
    }]
    $('tr').each((i, ele) => {
      let children = $(ele).children()
      if (children.length === 7 && $(children.get(6)).text() !== '—' ) {
        let measure
        let measureVal = $(children.get(0)).text().replace(/\t|\n/g, '')
        if (measureVal.length === 2 || measureVal.length === 1) {
          measure = 'AWG'
        } else {
          measure = 'kcmil'
        }
        wires[0].sizes.push({
          [measure]: measureVal,
          area: Number($(children.get(2)).text())
        })
        wires[1].sizes.push({
          [measure]: measureVal,
          area: Number($(children.get(4)).text())
        })
        wires[2].sizes.push({
          [measure]: measureVal,
          area: Number($(children.get(6)).text())
        })
      }
    })
    res.send(wires)
  })
  .catch(err => console.error(err))
))


app.listen(8080, function() {
  console.log('listening on port 8080!');
});