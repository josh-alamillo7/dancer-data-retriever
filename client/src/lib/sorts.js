import axiosHelpers from './axiosHelpers.js'
import Promise from 'bluebird'

const ABCSort = (array) => {
  array.sort()
}

const genPercentThresholdMap = (songs, pfcSort) => {
  const scoreThreshold = pfcSort ? 999000 : 990000
  return new Promise((resolve, reject) => {
    const output = [];
    songs.forEach((song, index, array) => {
      axiosHelpers.fetchScoreInfo(song[0], song[1], (data) => {
        let thresholdNumber = data.filter((score) => {
          return score >= scoreThreshold;
        }).length
        let thresholdPercent = (thresholdNumber / data.length) * 100.0;
        output.push([thresholdPercent, song])
        if (index === array.length - 1) {
          resolve(output)
        }
      })
    })
  })
}

const gradeSort = (songs, pfcSort) => {
  return new Promise((resolve, reject) => {
    genPercentThresholdMap(songs, pfcSort).then((tuples) => {
      tuples = mergeSort(tuples)
      const map = tuples.map((tuple) => {
        return tuple[1]
      })
      resolve(map)
    })
  })
}

const mergeSort = (songs) => {

  const merge = (songs, left, middle, right) => {
    let leftPointer = left;
    let rightPointer = middle;
    let result = [];

    while (leftPointer < middle && rightPointer < right) {
      if (songs[leftPointer][0] > songs[rightPointer][0]) {
        result.push(songs[leftPointer]);
        leftPointer++;
      } else {
        result.push(songs[rightPointer]);
        rightPointer++;
      }
    }

    while (leftPointer < middle) {
      result.push(songs[leftPointer]);
      leftPointer++;
    }
    while (rightPointer < right) {
      result.push(songs[rightPointer]);
      rightPointer++;
    }

    for (let i = 0; i < result.length; i++) {
      songs[left + i] = result[i];
    }
  }

  const split = (songs, left, right) => {

    let middle = Math.floor((left + right) / 2)

    if (Math.abs(left - right) < 2) {
      return
    }

    split(songs, left, middle)
    split(songs, middle, right)
    merge(songs, left, middle, right)

  }

  split(songs, 0, songs.length)

  return songs
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
module.exports.gradeSort = gradeSort