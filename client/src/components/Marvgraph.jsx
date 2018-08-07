import React from 'react';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalRectSeries, VerticalRectSeriesCanvas } from 'react-vis'

const MarvGraph = ({ displayMarvGraph, scores, playerScore }) => {
  if (!displayMarvGraph) {
    return (<div></div>)
  }

  let pfcScores = []
  let occurrences = {}
  let playerPerfects = (1000000 - playerScore) / 10

  for (let i = 0; i < scores.length; i++) {
    if (scores[i] < 999000) {
      break
    }
    pfcScores.push(scores[i])
  }

  pfcScores.forEach((score, index) => {
    let numberOfPerfects = (1000000 - score) / 10;
    if (!occurrences[numberOfPerfects]) {
      occurrences[numberOfPerfects] = 1
    } else {
      occurrences[numberOfPerfects] += 1
    }
  })

  let histogramData = []

  for (let idx = 0; idx < 101; idx++) {
    if (idx === playerPerfects) {
      histogramData.push({
        x0: idx,
        x: idx + 1,
        y: occurrences[idx] ? occurrences[idx] : 0,
        color: '#7CFC00',
        stroke: '#fff'
      })
    } else {
      histogramData.push({
      x0: idx,
      x: idx + 1,
      y: occurrences[idx] ? occurrences[idx] : 0,
      color: '#0000ff',
      stroke: '#fff'
    })
  }
  }

  return (
    <XYPlot
      width={500}
      height={300}
      stackBy='y'>
      <HorizontalGridLines />
      <XAxis />
      <YAxis />
      <VerticalRectSeries colorType='literal' data={histogramData} />
    </XYPlot>
  );
}

export default MarvGraph