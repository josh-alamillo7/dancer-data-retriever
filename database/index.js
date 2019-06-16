const mongoose = require('mongoose');
const { MONGO_URI } = require('../config/config.js');

<<<<<<< HEAD
// MONGO_URI
=======
>>>>>>> dd71dda67881dddcc9fb4a7d4c5e592c42683835
//  'mongodb://localhost/mvpddr'
mongoose.connect(MONGO_URI);

const songSchema = mongoose.Schema({
  id: Number,
  title: String,
  banner: String,
  levels: [Number],
  scores: {
    beginnerScores: Array,
    basicScores: Array,
    difficultScores: Array,
    expertScores: Array,
    challengeScores: Array,
  },
});

const userSchema = mongoose.Schema({
  username: String,
  scores: [{
    songTitle: String,
    level: Number,
    difficulty: String,
    score: Number,
  }],
});

const levelSchema = mongoose.Schema({
  number: Number,
  songs: Array,
});

const Song = mongoose.model('Song', songSchema);
const User = mongoose.model('User', userSchema);
const Level = mongoose.model('Level', levelSchema);

const clearAllSongs = (callback) => {
  Song.remove({}, (err) => {
    if (err) {
      console.log('could not remove songs');
    } else {
      Level.remove({}, (error) => {
        if (error) {
          console.log('could not remove levels');
        } else {
          callback();
        }
      });
    }
  });
};

const saveSong = (songInfo, callback) => {
  const newSong = new Song({
    id: songInfo.id, title: songInfo.title, levels: songInfo.levels, scores: {},
  });
  newSong.scores.beginnerScores = songInfo.beginnerScores;
  newSong.scores.basicScores = songInfo.basicScores;
  newSong.scores.difficultScores = songInfo.difficultScores;
  newSong.scores.expertScores = songInfo.expertScores;
  newSong.scores.challengeScores = songInfo.challengeScores;

  newSong.save((err) => {
    if (err) {
      console.log('Error, song could not be saved', err);
    }
    else {
      callback();
      console.log(`song info for ${songInfo.title} saved!`);
    }
  });
};

const saveAllSongs = (songInfo, callback) => {
  let saveCount = 0;
  Object.keys(songInfo).forEach((index) => {
    const oneSongInfo = songInfo[index];
    saveSong(oneSongInfo, () => {
      saveCount += 1;
      if (saveCount === Object.keys(songInfo).length) {
        callback();
      }
    });
  });
};

const findAllByLevel = (number, callback) => {
  Level.find({ number }, (err, data) => {
    if (err) {
      console.log('could not complete level fetch');
    } else {
<<<<<<< HEAD
      console.log(data)
      if (data.length > 0) {
        callback(data[0].songs);
      }      
=======
      callback(data[0].songs);
>>>>>>> dd71dda67881dddcc9fb4a7d4c5e592c42683835
    }
  });
};

const saveUser = (username, score, level, difficulty, title) => {
  const newUser = new User({
    username,
    scores: [{
      songTitle: title,
      level,
      difficulty,
      score,
    }],
  });
  newUser.save((err) => {
    if (err) {
      console.log('Error, user could not be saved', err);
    } else {
      console.log('new user made!');
    }
  })
}

const saveLevel = (number, songsForLevel) => {
  const newLevel = new Level({
    number: Number(number),
    songs: songsForLevel,
  });
  newLevel.save((err) => {
    if (err) {
      console.log('The level information could not be saved', err);
    } else {
      console.log(`level ${number} saved.`);
    }
  });
};

const checkIfUserExists = (username, callback) => {
  User.find({ username }, (err, data) => {
    if (err) {
      console.log('Error', err);
    } else {
      if (data.length === 0) {
        callback(false)
      }
      else {
        callback(true)
      }
    }
  });
};

const findById = (tuple, callback) => {
  Song.find({ id: tuple[1] }, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      callback(data);
    }
  });
};

const findByTitle = (title, callback) => {
  Song.find({ title }, (err, data) => {
    if (err) {
      console.log("error", err)
    } else {
      callback(data);
    }
  });
};

const updateScoresForUser = (username, score, level, difficulty, title) => {
  User.find({
    username,
  }, (err, data) => {
    let found = false;
    let foundIndex = null;
    for (let i = 0; i < data[0].scores.length; i += 1) {
      let currentScore = data[0].scores[i];
      if (currentScore.level === level && Number(currentScore.difficulty) === difficulty && currentScore.songTitle === title) {
        found = true;
        foundIndex = i;
        break;
      }
    }
    if (!found) {
      console.log('none found');
      User.update(
        { username },
        {
          $push:
            {
              scores:
              {
                songTitle: title,
                level,
                difficulty,
                score,
              },
            },
        }, (error) => {
          if (error) {
            console.log(error);
          }
        },
      );
    } else {
      const updateEntryString = `scores.${foundIndex}`
      const updateObject = {
        $set: {}
      }
      updateObject.$set[updateEntryString] = {
        songTitle: title,
        level,
        difficulty,
        score,
      };
      User.update(
        { username },
        updateObject, (err) => {
          if (err) {
            console.log("error updating user score", err);
          }
        },
      );
    }
  });
};

const updateLevel = (levels, id) => {
  Song.update({ id },
    {
      levels,
    }, (err) => {
      if (err) {
        console.log("error on update level", err);
      }
    });
};

const getUserInfo = (username, callback) => {
  User.find({ username }, (err, data) => {
    if (err) {
      console.log("error on finding user info");
    } else {
      if (data.length === 0) {
        callback([])
      }
      else {
        callback(data[0].scores)
      }
    }
  });
};

const disconnect = () => {
  mongoose.disconnect();
};

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
module.exports.checkIfUserExists = checkIfUserExists;
module.exports.findAllByLevel = findAllByLevel;
module.exports.saveLevel = saveLevel;
module.exports.clearAllSongs = clearAllSongs;
