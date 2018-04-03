const axios = require('axios');

const fetchByLevel = (level, callback) => {
  axios.get(`/songs/${level}`)
  .then((response) => {
    callback(response.data)
  })
  .catch((err) => {
    console.log('Error fetching song info', err)
  })
}

const fetchScoreInfo = (title, difficulty, callback) => {
  axios.get(`/songs/info/${title}/${difficulty}`)
  .then((response) => {
    callback(response.data)
  })
  .catch((err) => {
    console.log('Error fetching score info', err)
  })
}

const putScore = (username, score, level, difficulty, title) => {
  axios.put(`/users/${username}`, {
    score: score,
    level: level,
    difficulty: difficulty,
    title: title
  })
  .then(() => {
    console.log('User/score info saved!')
  })
  .catch((err) => {
    console.log('Something went wrong with putting the score in :(', err)
  })
}

module.exports.fetchByLevel = fetchByLevel;
module.exports.fetchScoreInfo = fetchScoreInfo;
module.exports.putScore = putScore;