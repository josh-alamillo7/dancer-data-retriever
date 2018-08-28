const axios = require('axios');
const titleFixes = require('./titleFixes')
let titlePart;
let currId;

const titleRegex = /sMusic='(.*)'/
const songInfoArray = [];

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

const convertDataIntoSongInfo = (id, response, title) => {
  songInfo = {};
  songInfo['id'] = id;
  let splitsArray = response.data.split(';');

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
}

const createInfoForSong = (id) => {

  currId = id
  if (currId < 750) {
    if (currId > 0) {
      console.log(`saved ${id}/799 songs`)
    }
    for (let id = currId; id < currId + 50; id++) {
      axios.get(`http://skillattack.com/sa4/music.php?index=${id}`)
      .then((response) => {
        if (titleFixes[id] !== undefined) {
          songTitle = titleFixes[id]
        } else {
          songTitle = response.data.match(titleRegex)[1]
        }       


        console.log(id, songTitle)
        if ((id + 1) % 50 === 0) {
          getScoreForSong(id + 1)
        }
      })
      .catch((err) => {
        console.log(`Fetch failed for id ${id}`)
      })
    }
  }
}

createInfoForSong(0)