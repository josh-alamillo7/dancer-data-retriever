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

let Song = mongoose.model('Song', songSchema);
let User = mongoose.model('User', userSchema);

let clearAllSongs = (callback) => {
  Song.remove({}, function(err) {
    if (err) {
      console.log('could not remove songs')
    } else {
      callback()
    }
  })
}

let saveSong = (songInfo) => {
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
      console.log(`song info for ${songInfo.title} saved!`)
      if (disconnect) {
        mongoose.disconnect()
      }
    }
  })
}

let findAllByLevel = (level, callback) => {
  Song.find({"levels": level}, (err, data) => {
    if (err) {
      console.log("Something went wrong")
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
        console.log(updateObject)
        User.update(
          {username: username},
          updateObject, (err, data) => {
            if (err) {
              console.log("error updating user score", err)
            } else {
              console.log(data)
              console.log('supposedly it was updated')
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
module.exports.saveUser = saveUser;
module.exports.findById = findById;
module.exports.getUserInfo = getUserInfo;
module.exports.findByTitle = findByTitle;
module.exports.updateLevel = updateLevel;
module.exports.checkIfUserExists = checkIfUserExists
module.exports.findAllByLevel = findAllByLevel;
module.exports.clearAllSongs = clearAllSongs;