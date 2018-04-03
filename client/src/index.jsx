import React from 'react';
import reactDOM from 'react-dom';
import UsernameText from './components/usernametext.jsx';
import LevelClicks from './components/levelclicks.jsx';
import SongList from './components/songlist.jsx';
import ScoreInfo from './components/scoreinfo.jsx';
import SongFilter from './components/songfilter.jsx';
import axiosHelpers from './axiosHelpers.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      songs: [],
      scoreInfo: null,
      percentile: null,
      level: null,
      difficulty: null,
      title: null
    }
    this.handleSubmitUsernameClick = this.handleSubmitUsernameClick.bind(this)
    this.handleLevelChangeClick = this.handleLevelChangeClick.bind(this)
    this.handleSongNameClick = this.handleSongNameClick.bind(this)
    this.handleSubmitScoreClick = this.handleSubmitScoreClick.bind(this)
    this.setPercentilebySong = this.setPercentilebySong.bind(this)
    this.filterSongs = this.filterSongs.bind(this)
  }

  filterSongs(value) {
    let filteredSongs = this.state.songs.filter(song => {
      let lowerCaseSong = song[0].toLowerCase()
      return lowerCaseSong.includes(value.toLowerCase())
    })
    this.setState({songs: filteredSongs})
  }

  handleSubmitUsernameClick(value) {
    this.setState({username: value})
  }

  handleLevelChangeClick(level) {
    const app = this;
    axiosHelpers.fetchByLevel(level, (data) => {
      app.setState({songs: data, level: level})
    })
  }

  handleSongNameClick(song, level) {
    const app = this;
    axiosHelpers.fetchScoreInfo(song, level, (data) => {
      app.setState({scoreInfo: data, difficulty: level, title: song})
    })
  }

  handleSubmitScoreClick(score) {
    this.setPercentilebySong(score)
    axiosHelpers.putScore(this.state.username, score, this.state.level, this.state.difficulty, this.state.title)
    //calculation: compare this score with scoreInfo(since they both correspond to the same song. Set the state percentile to be that)

    //the problem is that this also needs to happen if a song is clicked. But only if score Info is not null.
  }

  setPercentilebySong(score) {
    const totalPlayers = this.state.scoreInfo.length
    let rank = totalPlayers
    for (let scoreIndex = 0; scoreIndex < totalPlayers; scoreIndex++) {
      if (score > this.state.scoreInfo[scoreIndex]) {
        rank = scoreIndex
        break
      }
    }
    const percentile = Math.floor(((totalPlayers - rank) / totalPlayers) * 100);
    this.setState({percentile: percentile})
  }

  render() {
    return(
      <div>
        <h1>Dancer Data Retriever</h1>
        <UsernameText username={this.state.username} handleSubmitUsernameClick={this.handleSubmitUsernameClick} />
        <h2>Choose a level:</h2>
        <LevelClicks handleLevelChangeClick={this.handleLevelChangeClick} />
        <h4>Filter by name:</h4>
        <SongFilter filterSongs={this.filterSongs} />
        <div className = "infoContainer">
          <SongList songs={this.state.songs} handleSongNameClick={this.handleSongNameClick}/>
          <ScoreInfo scores={this.state.scoreInfo} handleSubmitScoreClick={this.handleSubmitScoreClick} percentile={this.state.percentile}/>
        </div>
      </div>
    )
  }
}

reactDOM.render(<App />, document.getElementById('app'))