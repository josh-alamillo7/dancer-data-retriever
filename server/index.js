const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.listen(7000, () => {
  console.log('listening on port 7000')
})

module.exports = app;
