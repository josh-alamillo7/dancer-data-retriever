const axios = require('axios');
const titleFixes = require('./titleFixes')
const fs = require('fs')
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

const storeSongInfo = (id, response, title, totalNumberSongs) => {
  songInfo = {};
  songInfo['id'] = id;
  songInfo['title'] = title;
  // let splitsArray = response.data.split(';');

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

  songInfoArray.push(songInfo)
  console.log(songInfoArray.length, totalNumberSongs)
  if (songInfoArray.length === totalNumberSongs) {
    console.log(songInfoArray)
    console.log(songInfoArray[798])
  }
  
}

const createInfoForSong = (id, totalNumberSongs) => {

  currId = id
  if (currId < 800) {
    for (let id = currId; id < currId + 50; id++) {
      axios.get(`http://skillattack.com/sa4/music.php?index=${id}`)
      .then((response) => {
        if (titleFixes[id] !== undefined) {
          songTitle = titleFixes[id]
        } else {
          songTitle = response.data.match(titleRegex)[1]
        }  
        storeSongInfo(id, response, songTitle, totalNumberSongs)
        if ((id + 1) % 50 === 0) {
          createInfoForSong(id + 1, totalNumberSongs)
        }
      })
      .catch((err) => {
        console.log(`Fetch failed for id ${id}`)
        axios.get(`http://skillattack.com/sa4/music.php?index=${id}`)
        .then((response) => {
          if (titleFixes[id] !== undefined) {
            songTitle = titleFixes[id]
          } else {
            songTitle = response.data.match(titleRegex)[i]
          }
          storeSongInfo(id, response, songTitle, totalNumberSongs)
        })
        .catch((err) => {
          console.log('...fetch failed again')
        })
      })
    }
  }
}

createInfoForSong(0, 800)