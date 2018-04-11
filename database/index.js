const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mvpddr');

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

let saveSong = (songInfo) => {
  let newSong = new Song({id: songInfo.id, title: songInfo.title, banner: 'https://zenius-i-vanisher.com/simfiles/DDR%202014%20%28BETA%29/EGOISM%20440/EGOISM%20440.png', levels: songInfo.levels, scores: {}})
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
      console.log('song info saved!')
    }
  })
}

let findAllByLevel = (level, callback) => {
  Song.find({"levels": level}, (err, data) => {
    if (err) {
      console.log("Something went wrong")
    } else {
      data.sort((a, b) => {
        return (a - b)
      })
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
  User.find({
    username: username,
    }, (err, data) => {
      let found = false
      for (let i = 0; i < data[0].scores.length; i++) {
        let currentScore = data[0].scores[i]
        if (currentScore.level === level && Number(currentScore.difficulty) === difficulty && currentScore.songTitle === title) {
          found = true
          break
        }
      }
      if (!found) {
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
    } else {
      console.log("this song's levels should be updated now", id)
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