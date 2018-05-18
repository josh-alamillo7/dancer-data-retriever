import React from 'react';
import InfoInput from './infoinput.jsx'

const ScoreInfo = ({ scores, handleSubmitScoreClick, percentile }) => {
  if (scores === null) {
    return (<div>Choose a song!</div>)
  }
  else {
    let infoText = `You don't appear to have a score for this song yet. Insert one below!`
    if (percentile > 90) {
      infoText = `Your score is better than ${percentile}% of dancers. Wow! Amazing!`
    }
    else if (percentile > 70) {
      infoText = `Your score is better than ${percentile}% of dancers. Nice job!`
    }
    else if (percentile > 50) {
      infoText = `Your score is better than ${percentile}% of dancers. Great! Keep improving!`
    }
    else if (percentile !== null) {
      infoText = `Your score is better than ${percentile}% of dancers. Keep practicing, you can do it!`
    }

    const totalPlayers = scores.length;
    const aaaNumber = scores.filter(score => {return score > 990000}).length;
    const aaaPercent = Math.floor((aaaNumber / totalPlayers) * 100);
    const pfcNumber = scores.filter(score => {return score > 999000}).length;
    const pfcPercent = Math.floor((pfcNumber / totalPlayers) * 100);
    return (
      <span>
        <div className = "firstInfoContainer">
          <div>{totalPlayers} dancers have submitted scores for this song.</div>
          <div>{aaaNumber} dancers have a AAA on this song ({aaaPercent}%).</div>
          <div>{pfcNumber} dancers have a PFC on this song ({pfcPercent}%).</div>
          <div className = "percentileText">{infoText}</div>
        </div>
        <div className = "UserScoreInput">
          <InfoInput handleSubmitScoreClick={handleSubmitScoreClick}/>
        </div>
      </span>
    )
  }
}

export default ScoreInfo;