const songInfo = require('../scrapers/songInfo.json')
const db = require('./index')

<<<<<<< HEAD
const SEED_TIMEOUT = 50000;

=======
>>>>>>> dd71dda67881dddcc9fb4a7d4c5e592c42683835
db.clearAllSongs(function() {
  console.log('cleared all songs')
  let infoByLevel = {};

  db.saveAllSongs(songInfo, function() {
    for (let i = 0; i < Object.keys(songInfo).length; i++) {
<<<<<<< HEAD
      if (songInfo[i] === undefined) {
        continue
      }
=======
>>>>>>> dd71dda67881dddcc9fb4a7d4c5e592c42683835
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
<<<<<<< HEAD
}, SEED_TIMEOUT)
=======
}, 35000)
>>>>>>> dd71dda67881dddcc9fb4a7d4c5e592c42683835
