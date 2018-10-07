const songInfo = require('../scrapers/songInfo.json')
const db = require('./index')

db.clearAllSongs(function() {
  console.log('cleared all songs')
  let infoByLevel = {};

  db.saveAllSongs(songInfo, function() {
    for (let i = 0; i < Object.keys(songInfo).length; i++) {
      songInfo[i].levels.forEach((level, index) => {
        if (level !== null) {
          let songInfoTuple = [songInfo[i].title, index];
          infoByLevel[level] = infoByLevel[level] ? infoByLevel[level].concat([songInfoTuple]) : [songInfoTuple];
        }  
      }) 
      if (i === Object.keys(songInfo).length - 1) {
        Object.keys(infoByLevel).forEach((level) => {
          db.saveLevel(level, infoByLevel[level])
        })
      }
    }   
  })
})


setTimeout(() => {
  db.disconnect()
}, 35000)