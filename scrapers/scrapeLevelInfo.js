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
      idsForDifficulty = response.data.match(idsRegex)[1].split(',')
      levelsForDifficulty = response.data.match(levelIndexRegex)[1].split(',').map(string => Number(string))
      idsForDifficulty.forEach((id, index) => {
        songInfoObject[id]['levels'][levelsForDifficulty[index]] = level
      })
      scrapeLevelInfo(level + 1, songInfoObject)
    } else {
      console.log('...done.')
      let dataAsJson = JSON.stringify(songInfoObject)
      fs.writeFileSync('songinfo.json', dataAsJson)
    }
  })
  .catch((err) => {
    console.log('level fetch failed.')
    console.log(err)
  })
}

module.exports.scrapeLevelInfo = scrapeLevelInfo