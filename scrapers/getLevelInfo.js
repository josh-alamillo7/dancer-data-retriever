const axios = require('axios')
const db = require('../database/index.js')

const fetchLevelInfo = (level) => {
  if (level < 20) {
    console.log(`Fetching level info for level ${level}`)
  }

  axios.get(`http://skillattack.com/sa4/dancer_score.php?_=rival&ddrcode=51457120&style=0&difficulty=${level}`)
  .then((response) => {
    let splitsArray = response.data.split(';')
    let levelAndDifficultyInfo = splitsArray.filter((item) => {
      return (item.includes('ddIndex') || item.includes('ddSequence')) && item.includes('new Array')
    })
    let ids = levelAndDifficultyInfo[0].split('(')[1].split(')')[0].split(',')
    let difficulties = levelAndDifficultyInfo[1].split('(')[1].split(')')[0].split(',')
    //for each id, update its difficulty to be this level. Tuple contains level(number), id, difficultyCategory
    idDifficultyMap = ids.map((id, index) => [level, id, difficulties[index]])
    //we are going to have to make idDifficultyMap

    idDifficultyMap.forEach((tuple, idx, map) => {
      db.findById(tuple, (data) => {
        if (data.length === 0) {
          if (level < 20) {
            console.log(`could not FIND any song with id ${tuple[1]}`)
          }
        }
        if (data.length === 1) {
          data[0].levels[tuple[2]] = tuple[0]
          let newLevels = data[0].levels
          db.updateLevel(newLevels, tuple[1])
        }
        if (idx === map.length - 1 && level <= 19) {
          fetchLevelInfo(level + 1)
        } else if (level === 20) {
          console.log('...done.')
          db.disconnect()
        }
        
      })
    })
  })
  .catch((err) => {
    console.log("Error! ", err)
  })
}

fetchLevelInfo(1)