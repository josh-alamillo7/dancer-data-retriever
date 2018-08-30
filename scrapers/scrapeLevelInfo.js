const axios = require('axios');
const titleFixes = require('./titleFixes')

const levelInfoArray = [];
const idsRegex = /ddIndex.*=new.{1}Array\((.*)\)/
const levelIndexRegex = /dd/

const fetchLevelInfo = (level) => {
  if (level < 20) {
    console.log(`Fetching level info for level ${level}`)
  }

  axios.get(`http://skillattack.com/sa4/dancer_score.php?_=rival&ddrcode=51457120&style=0&difficulty=${level}`)
  .then((response) => {
    idsForDifficulty = typeof response.data.match(idsRegex)[1].split(',')
    
  })
}

fetchLevelInfo(9)