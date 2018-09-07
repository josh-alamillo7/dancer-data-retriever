const songInfo = require('../scrapers/songInfo.json')
const db = require('./index')

db.clearAllSongs(function() {
  console.log('cleared all songs')
  for (let i = 0; i < Object.keys(songInfo).length; i++) {
    db.saveSong(songInfo[i])
  }
})


setTimeout(() => {
  db.disconnect()
}, 20000)