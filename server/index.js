const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

let port = process.env.PORT || 7000

app.listen(7000, () => {
  console.log(`listening on port ${port}`)
})

module.exports = app;
