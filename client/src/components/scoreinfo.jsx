import React from 'react';
import InfoInput from './infoinput.jsx';
import MarvGraph from './marvgraph.jsx';
import GradeGraph from './gradegraph.jsx';

class ScoreInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      graph: null
    }
    this.toggleGradeGraph = this.toggleGradeGraph.bind(this);
    this.toggleMarvGraph = this.toggleMarvGraph.bind(this);
  }

  toggleGradeGraph() {
    if (this.state.graph === 'grade') {
      this.setState({
        graph: null
      })
    } else {
      this.setState ({ 
        graph: 'grade'
      })
    }
    
  }

  toggleMarvGraph() {
    if (this.state.graph === 'marv') {
      this.setState({
        graph: null
      })
    } else {
      this.setState ({ 
        graph: 'marv'
      })
    }
  }

  render() {

    if (!this.props.scores) {
      return (<span></span>)
    }

    const totalPlayers = this.props.scores.length;
    const aaaNumber = this.props.scores.filter(score => {return score > 990000}).length;
    const aaaPercent = Math.floor((aaaNumber / totalPlayers) * 100);
    const pfcNumber = this.props.scores.filter(score => {return score > 999000}).length;
    const pfcPercent = Math.floor((pfcNumber / totalPlayers) * 100);

    let infoText = `You don't appear to have a score for this song yet. Insert one below!`
    if (this.props.percentile > 90) {
      infoText = `Your score is better than ${this.props.percentile}% of dancers. Wow! Amazing!`
    }
    else if (this.props.percentile > 70) {
      infoText = `Your score is better than ${this.props.percentile}% of dancers. Nice job!`
    }
    else if (this.props.percentile > 50) {
      infoText = `Your score is better than ${this.props.percentile}% of dancers. Great! Keep improving!`
    }
    else if (this.props.percentile !== null) {
      infoText = `Your score is better than ${this.props.percentile}% of dancers. Keep practicing, you can do it!`
    }

    return (
      <div className="graphsAndInfoContainer">
        <span>
          <div className = "firstInfoContainer">
            <div>{totalPlayers} dancers have submitted scores for this song.</div>
            <div>{aaaNumber} dancers have a AAA on this song ({aaaPercent}%).</div>
            <div>{pfcNumber} dancers have a PFC on this song ({pfcPercent}%).</div>
            <div className = "percentileText">{infoText}</div>
          </div>
          <div className = "UserScoreInput">
            <InfoInput handleSubmitScoreClick={this.props.handleSubmitScoreClick}/>
          </div>
        </span>
        <div className = "graphsContainer">
          <button onClick={this.toggleGradeGraph}>Toggle Grade Histogram</button>
          <button onClick={this.toggleMarvGraph}>Toggle Marvelous Attack Histogram </button>
          <GradeGraph displayGraph={this.state.graph} scores={this.props.scores} playerScore={this.props.playerScore}/>
          <MarvGraph displayGraph={this.state.graph} scores={this.props.scores} playerScore={this.props.playerScore} /> 
        </div>
        
      </div>)
  }
}

/*
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
*/

export default ScoreInfo;
