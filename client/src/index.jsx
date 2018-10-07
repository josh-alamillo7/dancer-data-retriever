import React from 'react';
import reactDOM from 'react-dom';
import UsernameText from './components/usernametext.jsx';
import LevelClicks from './components/levelclicks.jsx';
import SongList from './components/songlist.jsx';
import ScoreInfo from './components/scoreinfo.jsx';
import SongFilter from './components/songfilter.jsx';
import axiosHelpers from './lib/axiosHelpers.js';
import sorts from './lib/sorts.js';
import SongSort from './components/songsort.jsx';
import PageNavigationClicks from './components/pagenavigationclicks.jsx';
import StatsTitle from './components/statstitle.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySongs: [],
      filteredSongs: [],
      level: null,
      percentile: null,
      playerScore: null,
      scoreInfo: null,
      selectedDifficultyIndex: null,
      songs: [],
      title: null,
      username: null
    }
    this.handleSubmitUsernameClick = this.handleSubmitUsernameClick.bind(this)
    this.handleLevelChangeClick = this.handleLevelChangeClick.bind(this)
    this.handleSongNameClick = this.handleSongNameClick.bind(this)
    this.handleSubmitScoreClick = this.handleSubmitScoreClick.bind(this)
    this.setPercentilebyScore = this.setPercentilebyScore.bind(this)
    this.filterSongs = this.filterSongs.bind(this)
    this.sortSongs = this.sortSongs.bind(this)
    this.handleForwardClick = this.handleForwardClick.bind(this)
    this.handleBackwardsClick = this.handleBackwardsClick.bind(this)
  }

  filterSongs(value) {
    if (value === '') {
      this.setState({filteredSongs: [], displaySongs: this.state.songs.slice(0, 20)})
    } else {
        let filteredSongs = this.state.songs.filter(song => {
        let lowerCaseSong = song[0].toLowerCase()
        return lowerCaseSong.includes(value.toLowerCase())
      })
      this.setState({filteredSongs: filteredSongs, displaySongs: filteredSongs.slice(0, 20)})
    }
  }

  handleForwardClick() {
    if (this.state.filteredSongs.length === 0) {
      const firstIndexDisplayed = this.state.songs.indexOf(this.state.displaySongs[0])
      this.setState({displaySongs: this.state.songs.slice(firstIndexDisplayed + 20, firstIndexDisplayed + 40)})
    } else {
      const firstIndexDisplayed = this.state.filteredSongs.indexOf(this.state.displaySongs[0])
      this.setState({displaySongs: this.state.filteredSongs.slice(firstIndexDisplayed + 20, firstIndexDisplayed + 40)})
    }
  }

  handleBackwardsClick() {
    if (this.state.filteredSongs.length === 0) {
      const firstIndexDisplayed = this.state.songs.indexOf(this.state.displaySongs[0])
      this.setState({displaySongs: this.state.songs.slice(firstIndexDisplayed - 20, firstIndexDisplayed)})
    } else {
      const firstIndexDisplayed = this.state.filteredSongs.indexOf(this.state.displaySongs[0])
      this.setState({displaySongs: this.state.filteredSongs.slice(firstIndexDisplayed - 20, firstIndexDisplayed)})
    }
  }

  handleSubmitUsernameClick(value) {
    this.setState({username: value})
  }

  handleLevelChangeClick(level) {
    const app = this;
    axiosHelpers.fetchByLevel(level, (data) => {
      console.log(data)
      app.setState({displaySongs: data.slice(0, 20), filteredSongs: [], songs: data, level: level, scoreInfo: null, percentile: null, playerScore: null, title: null})
    })
  }

  handleSongNameClick(song, level) {
    const app = this;
    axiosHelpers.fetchScoreInfo(song, level, (data) => {
      console.log(data)
      app.setState({scoreInfo: data, selectedDifficultyIndex: level, title: song})
      if (this.state.username !== null) {
        axiosHelpers.getUserScore(app.state.username, song, level, (score) => {
        if (score === null) {
          app.setState({percentile: null, playerScore: null})
        } else {
          app.setPercentilebyScore(Number(score))
        }        
       })
      }
  })
  }

  handleSubmitScoreClick(score) {
    this.setPercentilebyScore(score);
    axiosHelpers.putScore(this.state.username, score, this.state.level, this.state.selectedDifficultyIndex, this.state.title)
    //calculation: compare this score with scoreInfo(since they both correspond to the same song. Set the state percentile to be that)
    //the problem is that this also needs to happen if a song is clicked. But only if score Info is not null.
  }

  setPercentilebyScore(score) {
    const totalPlayers = this.state.scoreInfo.length;
    let rank = totalPlayers;
    for (let scoreIndex = 0; scoreIndex < totalPlayers; scoreIndex++) {
      if (score > this.state.scoreInfo[scoreIndex]) {
        rank = scoreIndex
        break
      }
    }
    const percentile = Math.floor(((totalPlayers - rank) / totalPlayers) * 100);
    this.setState({percentile: percentile, playerScore: score})
  }

  sortSongs(e) {
    const app = this
    switch (e.target.id) {
      case 'ABCSort':
        sorts.ABCSort(this.state.songs)
        app.setState({displaySongs: this.state.songs.slice(0, 20)})
        break;

      case 'PFCSort':
        sorts.gradeSort(this.state.songs, true).then((sortedArray) => {
          app.setState({songs: sortedArray, displaySongs: sortedArray.slice(0, 20)})
        }).catch((err) => {
          console.log(err)
        })
        break;
      case 'AAASort':
        sorts.gradeSort(this.state.songs, false).then((sortedArray) => {
          app.setState({songs: sortedArray, displaySongs: sortedArray.slice(0, 20)})
        }).catch((err) => {
          console.log(err)
        })
        break;
    }
  }

  render() {
    return(
      <div>
        <h1>Dancer Data Retriever ⬅️ ⬇️ ⬆️ ➡️</h1>
        <UsernameText username={this.state.username} handleSubmitUsernameClick={this.handleSubmitUsernameClick} />
        <h2>Choose a level:</h2>
        <LevelClicks handleLevelChangeClick={this.handleLevelChangeClick} selectedLevel={this.state.level} />
        <div className = "filterSortContainer">
          <span>Filter by name: </span>
          <SongFilter filterSongs={this.filterSongs} />
          <span> or sort by: </span>
          <SongSort sortSongs={this.sortSongs} />
        </div>
        <div className = "allInfoContainer">
          <div className = "clicksContainer">
            <SongList songs={this.state.displaySongs} handleSongNameClick={this.handleSongNameClick}/>
            <PageNavigationClicks handleBackwardsClick={this.handleBackwardsClick} handleForwardClick={this.handleForwardClick} 
            filteredSongs={this.state.filteredSongs} songs={this.state.songs} displaySongs={this.state.displaySongs}/> 
          </div>
          <div className = "titleAndScoreInfoContainer">
            <StatsTitle title={this.state.title} />
            <ScoreInfo scores={this.state.scoreInfo} handleSubmitScoreClick={this.handleSubmitScoreClick} percentile={this.state.percentile} playerScore={this.state.playerScore}/>
          </div>
        </div>
      </div>
    )
  }
}

reactDOM.render(<App />, document.getElementById('app'))