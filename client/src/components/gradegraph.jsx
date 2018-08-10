import React from 'react';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries, VerticalRectSeriesCanvas } from 'react-vis';

const GradeGraph = ({ displayGraph, scores, playerScore }) => {
  if (displayGraph !== 'grade') {
    return (<div></div>)
  }

  let grades = ['MFC', 'PFC', 'AAA', '980K', '970K', '960K', '950K', '900K', '850K', '800K', '750K', '700K', '< 700K']

  let occurrences = {}
  let histogramData = [];

  grades.forEach((grade) => {
    occurrences[grade] = 0
  })

  const convertScoreToGrade = (score) => {
    if (score === 1000000) {
      return 'MFC'
    } else if (score >= 999000) {
      return 'PFC'
    } else if (score >= 990000) {
      return 'AAA'
    } else if (score < 700000) {
      return '< 700K'
    } else if (score >= 950000) {
      return Math.floor(score / 10000) + '0K'
    } else if (score >= 900000) {
      return '900K'
    } else if (score >= 850000) {
      return '850K'
    } else if (score >= 800000) {
      return '800K'
    } else if (score >= 750000) {
      return '750K'
    } else if (score >= 700000) {
      return '700K'
    }
  }

  scores.forEach((score) => {
    occurrences[convertScoreToGrade(score)] += 1
  })

  let playerGrade = convertScoreToGrade(playerScore)

  grades.forEach((grade, index) => {
    if (grade === playerGrade && playerScore > 0) {
      histogramData.push({
        x: grade,
        y: occurrences[grade],
        color: '#7CFC00',
        stroke: '#fff'
      })
    } else {
      histogramData.push({
        x: grade,
        y: occurrences[grade],
        color: '#0000ff',
        stroke: '#fff'
      })
    }
  })

  console.log(histogramData)

  return (
    <XYPlot
      xType='ordinal'
      width={600}
      height={300}
      stackBy='y'>
      <HorizontalGridLines />
      <XAxis />
      <YAxis />

      <VerticalBarSeries colorType='literal' data={histogramData} />
    </XYPlot>)
}

export default GradeGraph