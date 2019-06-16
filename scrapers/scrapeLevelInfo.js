const axios = require('axios');
const titleFixes = require('./titleFixes');
const fs = require('fs');

const idsRegex = /ddIndex.*=new.{1}Array\((.*)\)/
const levelIndexRegex = /ddSequence=new.{1}Array\((.*)\)/

const scrapeLevelInfo = (level, songInfoObject) => {
  if (level < 20) {
    console.log(`Fetching level info for level ${level}...`)
  }

  axios.get(`http://skillattack.com/sa4/dancer_score.php?_=rival&ddrcode=51457120&style=0&difficulty=${level}`)
  .then((response) => {   
    if (level < 20) {
<<<<<<< HEAD
      // this should return all the song id's that have this diffculty
      idsForDifficulty = response.data.match(idsRegex)[1].split(',')
      // this should return an array of indices (representing the levels) for each song that have this difficulty
      levelsForDifficulty = response.data.match(levelIndexRegex)[1].split(',').map(string => Number(string))

      // for each song ID with this diffculty, 
      idsForDifficulty.forEach((id, index) => {
        if (songInfoObject[id] !== undefined) {
          songInfoObject[id]['levels'][levelsForDifficulty[index]] = level
        } 
=======
      idsForDifficulty = response.data.match(idsRegex)[1].split(',')
      levelsForDifficulty = response.data.match(levelIndexRegex)[1].split(',').map(string => Number(string))
      idsForDifficulty.forEach((id, index) => {
        songInfoObject[id]['levels'][levelsForDifficulty[index]] = level
>>>>>>> dd71dda67881dddcc9fb4a7d4c5e592c42683835
      })
      scrapeLevelInfo(level + 1, songInfoObject)
    } else {
      console.log('...done.')
      let dataAsJson = JSON.stringify(songInfoObject)
      fs.writeFileSync('./scrapers/songinfo.json', dataAsJson)
    }
  })
  .catch((err) => {
    console.log('level fetch failed.')
    console.log(err)
  })
}

module.exports.scrapeLevelInfo = scrapeLevelInfo