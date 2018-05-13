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
      tuples = INSERTiONSort(tuples)
      tuples = tuples.reverse()
      const map = tuples.map((tuple) => {
        return tuple[1]
      })
      resolve(map)
    })
  })
}

const INSERTiONSort = (songs) => {

  let elementOne;
  let currIdx;

  const swapPositions = (array, indexOne, indexTwo) => {
    elementOne = array[indexOne];
    array[indexOne] = array[indexTwo];
    array[indexTwo] = elementOne;
  }

  for (let i = 0; i < songs.length; i++) {
    currIdx = i
    for (let j = i - 1; j >= 0; j--) {
      if (songs[j][0] > songs[currIdx][0]) {
        swapPositions(songs, currIdx, j)
        currIdx--
      }
    }
  }

  return songs

}



module.exports.ABCSort = ABCSort
module.exports.PFCSort = PFCSort