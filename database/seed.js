const songInfo = require('../scrapers/songInfo.json')
const db = require('./index')

for (let i = 0; i < Object.keys(songInfo).length; i++) {
  db.saveSong(songInfo[i])
}

setTimeout(() => {
  db.disconnect()
}, 20000)