const axios = require('axios')
const db = require('../database/index.js')
const titleFixes = require('./titleFixes')

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

let titlePart;
let currId;

const getScoreForSong = (id) => {

  currId = id
  if (currId < 750) {
    if (currId > 0) {
      console.log(`saved ${id}/788 songs`)
    }
    for (let id = currId; id < currId + 50; id++) {
      axios.get(`http://skillattack.com/sa4/music.php?index=${id}`)
      .then((response) => {
        db.saveSong(convertDataIntoSongInfo(id, response), (id) => {
          if (id % 50 === 0) {
            getScoreForSong(id)
          }          
        })
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  else {
    axios.get(`http://skillattack.com/sa4/music.php?index=${id}`)
    .then((response) => {
      db.saveSong(convertDataIntoSongInfo(id, response), (id) => {
        if (id <= 788) {
          getScoreForSong(id)
        } else {
          console.log('...done')
          db.disconnect()
        }
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

    // axios.get(`http://skillattack.com/sa4/music.php?index=${id}`)
    // .then((response) => {




      // songInfo = {}
      // songInfo['id'] = id
      // let splitsArray = response.data.split(';')

      // if (titleFixes[id] !== undefined) {
      //   titlePart = titleFixes[id]
      // }
      // else {
      //   titlePart = splitsArray.filter((item) => {
      //   return item.includes('sMusic')
      //   })[0].split('\'')[1]
      // }

      // console.log('fetching info for song ID: ', id, titlePart)

      // let scoresOnly = splitsArray.filter((item) => {
      //   return item.includes('Array(\'') && item.includes('Score')
      // })


      // songInfo['title'] = titlePart
      // songInfo['levels'] = [null, null, null, null, null]
      // songInfo['beginnerScores'] = getScoreArrayDescending(scoresOnly[0])
      // songInfo['basicScores'] = getScoreArrayDescending(scoresOnly[1])
      // songInfo['difficultScores'] = getScoreArrayDescending(scoresOnly[2])
      // songInfo['expertScores'] = getScoreArrayDescending(scoresOnly[3])
      // songInfo['challengeScores'] = getScoreArrayDescending(scoresOnly[4])

      // db.saveSong(songInfo, (id) => {
      //   if (id <= 788) {
      //     getScoreForSong(id)
      //   } else {
      //     db.disconnect()
      //   }
      // })
    // })
    // .catch((err) => {
    //   console.log(err)
    // })
}

const convertDataIntoSongInfo = (id, response) => {
  songInfo = {}
  songInfo['id'] = id
  let splitsArray = response.data.split(';')

  if (titleFixes[id] !== undefined) {
    titlePart = titleFixes[id]
  } else {
    titlePart = splitsArray.filter((item) => {
      return item.includes('sMusic')
    })[0].split('\'')[1]
  }

  // console.log('fetching info for song ID: ', id, titlePart)

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

  return songInfo

  // db.saveSong(songInfo, (id) => {
  //   if (id <= 788) {
  //     getScoreForSong(id)
  //   } else {
  //     db.disconnect()
  //   }
  // })
}


getScoreForSong(0);

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
