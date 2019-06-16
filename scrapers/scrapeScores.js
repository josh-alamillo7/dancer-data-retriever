const axios = require('axios');
const titleFixes = require('./titleFixes')
const fs = require('fs')
const {scrapeLevelInfo} = require('./scrapeLevelInfo')
let titlePart;
let currId;

const titleRegex = /sMusic='(.*)'/
const scoreArrayRegex = /dsScore.{1}sp=new Array\(.*\)/g
const scoreRegex = /\((.*)\)/
const idsRegex = /ddIndex.*=new.{1}Array\((.*)\)/
const levelIndexRegex = /ddSequence=new.{1}Array\((.*)\)/

const songInfoObject = {};
<<<<<<< HEAD
const totalSongCount = 862;
=======
>>>>>>> dd71dda67881dddcc9fb4a7d4c5e592c42683835

const storeSongInfo = (id, response, title, scoresArray, totalNumberSongs) => {
  songInfo = {};
  songInfo['id'] = id.toString();
  songInfo['title'] = title;
  songInfo['levels'] = [null, null, null, null, null];
  songInfo['beginnerScores'] = scoresArray[0];
  songInfo['basicScores'] = scoresArray[1];
  songInfo['difficultScores'] = scoresArray[2];
  songInfo['expertScores'] = scoresArray[3];
  songInfo['challengeScores'] = scoresArray[4];

  songInfoObject[id] = songInfo
  if (Object.keys(songInfoObject).length > 0 && Object.keys(songInfoObject).length % 50 === 0) {
    console.log(`stored info for ${Object.keys(songInfoObject).length}/${totalNumberSongs} songs`)
  }
  if (Object.keys(songInfoObject).length === totalNumberSongs) {
    console.log(songInfoObject[799], 'is last')
    scrapeLevelInfo(0, songInfoObject)
  }
}

const createInfoForSong = (id, totalNumberSongs) => {

  currId = id
  if (currId < totalNumberSongs) {
    for (let id = currId; id < currId + 50; id++) {
      axios.get(`http://skillattack.com/sa4/music.php?index=${id}`)
      .then((response) => {
        if (titleFixes[id] !== undefined) {
          songTitle = titleFixes[id]
        } else {
          songTitle = response.data.match(titleRegex)[1]
        }

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
          return scores
        })

        storeSongInfo(id, response, songTitle, songScoreArray, totalNumberSongs)
        
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
            songTitle = response.data.match(titleRegex)[1]
          }
          storeSongInfo(id, response, songTitle, totalNumberSongs)
        })
        .catch((err) => {
          console.log(`...fetch failed again, song ${id} likely does not exist yet`)
        })
      })
    }
  }
}

<<<<<<< HEAD
createInfoForSong(0, totalSongCount)
=======
createInfoForSong(0, 803)
>>>>>>> dd71dda67881dddcc9fb4a7d4c5e592c42683835
