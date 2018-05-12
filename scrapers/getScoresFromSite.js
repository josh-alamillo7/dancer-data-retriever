const axios = require('axios')
const db = require('../database/index.js')


let currentIndex = 0;

const getScoreArrayDescending = (string) => {
  let scores = string.split('\'').filter((item) => {
    return item !== '-' && item !== ',' && item !== ')' && item.length < 10
  })
  for (let i = 0; i < scores.length; i++) {
    scores[i] = Number(scores[i].replace(/,/g, ''));
  }  
  if (scores.reduce((acc, score) => {
    return acc + score
  }) === 0) {
    return null
  }
  return scores.sort((a, b) => {
    return b - a
  })
}

// this seeds mongo with score and title info for all 783 songs. Skip ace for aces

const getScoreForHundredSongs = (iteration) => {
  for (let id = iteration * 100; id < (iteration + 1) * 100; id++) {
    axios.get(`http://skillattack.com/sa4/music.php?index=${id}`)
    .then((response) => {
      songInfo = {}
      songInfo['id'] = id
      let splitsArray = response.data.split(';')
      let titlePart = splitsArray.filter((item) => {
        return item.includes('sMusic')
      })[0].split('\'')[1]

      console.log('id', id, titlePart)

      let scoresOnly = splitsArray.filter((item) => {
        return item.includes('Array(\'') && item.includes('Score')
      })
      songInfo['title'] = titlePart
      songInfo['levels'] = [null, null, null, null, null]
      songInfo['beginnerScores'] = getScoreArrayDescending(scoresOnly[0])
      songInfo['basicScores'] = getScoreArrayDescending(scoresOnly[1])
      songInfo['difficultScores'] = getScoreArrayDescending(scoresOnly[2])
      songInfo['expertScores'] = getScoreArrayDescending(scoresOnly[3])
      songInfo['challengeScores'] = getScoreArrayDescending(scoresOnly[4])

      db.saveSong(songInfo)
      if (id % 100 === 99 && iteration < 7) {
        console.log(id)
        getScoreForHundredSongs(iteration + 1)
      }
    })
    .catch((err) => {
      console.log(err)
    })

  }
}

getScoreForHundredSongs(0);

// for (let id = 700; id < 784; id++) {
//   axios.get(`http://skillattack.com/sa4/music.php?index=${id}`)
//   .then((response) => {
//     songInfo = {}
//     songInfo['id'] = id
//     let splitsArray = response.data.split(';')
//     let titlePart = splitsArray.filter((item) => {
//       return item.includes('sMusic')
//     })[0].split('\'')[1]

//     console.log('id', id, titlePart)

//     let scoresOnly = splitsArray.filter((item) => {
//       return item.includes('Array(\'') && item.includes('Score')
//     })
//     songInfo['title'] = titlePart
//     songInfo['levels'] = [null, null, null, null, null]
//     songInfo['beginnerScores'] = getScoreArrayDescending(scoresOnly[0])
//     songInfo['basicScores'] = getScoreArrayDescending(scoresOnly[1])
//     songInfo['difficultScores'] = getScoreArrayDescending(scoresOnly[2])
//     songInfo['expertScores'] = getScoreArrayDescending(scoresOnly[3])
//     songInfo['challengeScores'] = getScoreArrayDescending(scoresOnly[4])

//     db.saveSong(songInfo)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// }

//this adds the correct level info


// for (let level = 17; level <= 17; level++) {
//   axios.get(`http://skillattack.com/sa4/dancer_score.php?_=rival&ddrcode=51457120&style=0&difficulty=${level}`)
//   .then((response) => {
//     let splitsArray = response.data.split(';')
//     let levelAndDifficultyInfo = splitsArray.filter((item) => {
//       return (item.includes('ddIndex') || item.includes('ddSequence')) && item.includes('new Array')
//     })
//     let ids = levelAndDifficultyInfo[0].split('(')[1].split(')')[0].split(',')
//     let difficulties = levelAndDifficultyInfo[1].split('(')[1].split(')')[0].split(',')
//     //for each id, update its difficulty to be this level. Tuple contains level(number), id, difficultyCategory
//     idDifficultyMap = ids.map((id, index) => [level, id, difficulties[index]])

//     idDifficultyMap.forEach((tuple) => {
//       console.log(tuple)
//       db.findById(tuple, (data) => {
//         if (data.length === 0) {
//           console.log(`could not FIND any song with id ${tuple[1]}`)
//         }
//         if (data.length === 1) {
//           data[0].levels[tuple[2]] = tuple[0]
//           let newLevels = data[0].levels
//           db.updateLevel(newLevels, tuple[1])
//         }
        
//       })
//     })
//   })
//   .catch((err) => {
//     console.log("Error! ", err)
//   })
// }





