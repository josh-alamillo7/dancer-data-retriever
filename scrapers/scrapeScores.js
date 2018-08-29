const axios = require('axios');
const titleFixes = require('./titleFixes')
const fs = require('fs')
let titlePart;
let currId;

const titleRegex = /sMusic='(.*)'/
const scoreArrayRegex = /dsScore.{1}sp=new Array\(.*\)/g
const scoreRegex = /\((.*)\)/

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

const storeSongInfo = (id, response, title, scoresArray, totalNumberSongs) => {
  songInfo = {};
  songInfo['id'] = id;
  songInfo['title'] = title;
  songInfo['levels'] = [null, null, null, null, null];
  songInfo['beginnerScores'] = scoresArray[0];
  songInfo['basicScores'] = scoresArray[1];
  songInfo['difficultScores'] = scoresArray[2];
  songInfo['expertScores'] = scoresArray[3];
  songInfo['challengeScores'] = scoresArray[4];

  songInfoArray.push(songInfo)
  if (songInfoArray.length > 0 && songInfoArray.length % 50 === 0) {
    console.log(`stored info for ${songInfoArray.length}/totalNumberSongs songs`
  }
  console.log(songInfoArray.length, totalNumberSongs)
  if (songInfoArray.length === totalNumberSongs) {
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
        // songScores = response.data.match(scoreArrayRegex)[1]

        songScoreArrayRaw = response.data.match(scoreArrayRegex)
        songScoreArray = songScoreArrayRaw.map((string) => {
          scores = string.match(scoreRegex)[1].split('\'').filter((entry) => {
            return entry.includes('0')
          }).map((score) => {
            return Number(score.replace(/,/g, ''))
          })
          scores.sort((a, b) => {
            return b - a
          })
          // scoresAsNumbers = scores.map((score) => {
          //   return Number(score.replace(/,/g, ''))
          // })
          return scores
        })


        storeSongInfo(id, response, songTitle, songScoreArray, totalNumberSongs)
        if ((id + 1) % 50 === 0) {
          createInfoForSong(id + 1, totalNumberSongs)
        }
      })
      .catch((err) => {
        console.log(`Fetch failed for id ${id}`)
        console.log(err)
        axios.get(`http://skillattack.com/sa4/music.php?index=${id}`)
        .then((response) => {
          if (titleFixes[id] !== undefined) {
            songTitle = titleFixes[id]
          } else {
            songTitle = response.data.match(titleRegex)[1]
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