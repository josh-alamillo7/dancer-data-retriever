import axiosHelpers from './axiosHelpers.js'
import Promise from 'bluebird'

const ABCSort = (array) => {
  array.sort()
}

const genPFCMap = (songs) => {
  return new Promise((resolve, reject) => {
    const output = [];
    songs.forEach((song, index, array) => {
      axiosHelpers.fetchScoreInfo(song[0], song[1], (data) => {
        let pfcNumber = data.filter((score) => {
          return score > 999000;
        }).length
        let pfcPercent = (pfcNumber / data.length) * 100.0;
        output.push([pfcPercent, song])
        if (index === array.length - 1) {
          resolve(output)
        }
      })
    })
  })
}

const PFCSort = (songs) => {
  return new Promise((resolve, reject) => {
    genPFCMap(songs).then((tuples) => {
      tuples.sort()
      tuples.reverse()
      const map = tuples.map((tuple) => {
        return tuple[1]
      })
      resolve(map)
    })
  })
}

// const PFCSort = (songs, callback) => {
//   genPFCMap(songs).then((tuples) => {
//     tuples.sort()
//     tuples.reverse()
//     const map = tuples.map((tuple) => {
//       return tuple[1]
//     })
//     callback(map)
//   }).catch((err) => {
//     console.log(err)
//   })
// }



module.exports.ABCSort = ABCSort
module.exports.PFCSort = PFCSort