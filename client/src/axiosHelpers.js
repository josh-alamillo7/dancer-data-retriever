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

module.exports.fetchByLevel = fetchByLevel;
module.exports.fetchScoreInfo = fetchScoreInfo;