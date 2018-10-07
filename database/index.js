const mongoose = require('mongoose');
const {MONGO_URI} = require('../config/config.js')

//'mongodb://localhost/mvpddr'
mongoose.connect(MONGO_URI);

let songSchema = mongoose.Schema({
  id: Number,
  title: String,
  banner: String,
  levels: [Number],
  scores: {
    beginnerScores: Array,
    basicScores: Array,
    difficultScores: Array,
    expertScores: Array,
    challengeScores: Array
  }
})

let userSchema = mongoose.Schema({
  username: String,
  scores: [{
    songTitle: String,
    level: Number,
    difficulty: String,
    score: Number
  }]
})

let levelSchema = mongoose.Schema({
  number: Number,
  songs: Array
})

let Song = mongoose.model('Song', songSchema);
let User = mongoose.model('User', userSchema);
let Level = mongoose.model('Level', levelSchema);

let clearAllSongs = (callback) => {
  Song.remove({}, function(err) {
    if (err) {
      console.log('could not remove songs')
    } else {
      Level.remove({}, function(err) {
        if (err) {
          console.log('could not remove levels')
        } else {
          callback()
        }
      }) 
    }
  })
}

let saveSong = (songInfo, callback) => {
  let newSong = new Song({id: songInfo.id, title: songInfo.title, levels: songInfo.levels, scores: {}})
  newSong.scores.beginnerScores = songInfo.beginnerScores
  newSong.scores.basicScores = songInfo.basicScores
  newSong.scores.difficultScores = songInfo.difficultScores
  newSong.scores.expertScores = songInfo.expertScores
  newSong.scores.challengeScores = songInfo.challengeScores

  newSong.save((err) => {
    if (err) {
      console.log('Error, song could not be saved', err)
    }
    else { 
      callback();    
      console.log(`song info for ${songInfo.title} saved!`)
    }
  })
}

let saveAllSongs = (songInfo, callback) => {
  let saveCount = 0;
  Object.keys(songInfo).forEach((index) => {
    let oneSongInfo = songInfo[index];
    saveSong(oneSongInfo, () => {
      saveCount++;
      if (saveCount === Object.keys(songInfo).length) {
        callback()
      }
    })
  })
}

let findAllByLevel = (level, callback) => {
  Song.find({"levels": level}, (err, data) => {
    if (err) {
      console.log("Something went wrong, could not complete level fetch")
    } else {
      callback(data)
    }
  })
}

let saveUser = (username, score, level, difficulty, title) => {
  let newUser = new User({
    username: username,
    scores: [{
      songTitle: title,
      level: level,
      difficulty: difficulty,
      score: score
    }]
  })
  newUser.save((err) => {
    if (err) {
      console.log('Error, user could not be saved', err)
    } else {
      console.log('new user made!')
    }
  })
}

let saveLevel = (number, songsForLevel) => {
  let newLevel = new Level({
    number: number,
    songs: songsForLevel
  })
  newLevel.save((err) => {
    if (err) {
      console.log('The level information could not be saved', err)
    } else {
      console.log('level saved.')
    }
  })
}

let checkIfUserExists = (username, callback) => {
  User.find({"username": username}, (err, data) => {
    if (err) {
      console.log("Error", err)
    } else {
      if (data.length === 0) {
        callback(false)
      }
      else {
        callback(true)
      }
    }
  })
}

let findById = (tuple, callback) => {
  Song.find({"id": tuple[1]}, (err, data) => {
    if (err) {
      console.log("Error", err)
    } else {
      callback(data)
    }
  })
}

let findByTitle = (title, callback) => {
  Song.find({"title": title}, (err, data) => {
    if (err) {
      console.log("error", err)
    } else {
      callback(data)
    }
  })
}

let updateScoresForUser = (username, score, level, difficulty, title) => {
  //not getting rid of the old score
  User.find({
    username: username,
    }, (err, data) => {
      let found = false
      let foundIndex = null
      for (let i = 0; i < data[0].scores.length; i++) {
        let currentScore = data[0].scores[i]
        if (currentScore.level === level && Number(currentScore.difficulty) === difficulty && currentScore.songTitle === title) {
          found = true
          foundIndex = i
          break
        }
      }
      if (!found) {
        console.log('none found')
        User.update(
          {username: username},
          { $push: 
            { scores: 
              {
                songTitle: title,
                level: level,
                difficulty: difficulty,
                score: score
              }
            }
          }, (err) => {
            if (err) {
              console.log(err)
            }
          })
      } else {
        const updateEntryString = `scores.${foundIndex}`
        const updateObject = {
          $set: {}
        }
        updateObject.$set[updateEntryString] = {
          songTitle: title,
          level: level,
          difficulty: difficulty,
          score: score
        }
        User.update(
          {username: username},
          updateObject, (err, data) => {
            if (err) {
              console.log("error updating user score", err)
            } else {
              console.log(data)
            }
          }
        )
      }  
    })
}

let updateLevel = (levels, id) => {
  Song.update({'id': id},
  {
    levels: levels
  }, (err, data) => {
    if (err) {
      console.log("error on update level", err)
    }
  })
}

let getUserInfo = (username, callback) => {
  User.find({"username": username}, (err, data) => {
    if (err) {
      console.log("error on finding user info")
    } else {
      if (data.length === 0) {
        callback([])
      }
      else {
        callback(data[0].scores)
      }
      
    }
  })
}

let disconnect = () => {
  mongoose.disconnect()
}

module.exports.disconnect = disconnect;
module.exports.Song = Song;
module.exports.User = User;
module.exports.updateScoresForUser = updateScoresForUser;
module.exports.saveSong = saveSong;
module.exports.saveAllSongs = saveAllSongs;
module.exports.saveUser = saveUser;
module.exports.findById = findById;
module.exports.getUserInfo = getUserInfo;
module.exports.findByTitle = findByTitle;
module.exports.updateLevel = updateLevel;
module.exports.checkIfUserExists = checkIfUserExists
module.exports.findAllByLevel = findAllByLevel;
module.exports.saveLevel = saveLevel;
module.exports.clearAllSongs = clearAllSongs;