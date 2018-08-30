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
    console.log(response.data)
    rawIds = response.data.match(idsRegex)
    console.log(rawIds[1])
  })
}

fetchLevelInfo(9)