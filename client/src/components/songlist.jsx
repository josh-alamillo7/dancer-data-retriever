import React from 'react';

const SongList = ({ songs , handleSongNameClick }) => {
  const indexToLevelClass = ['beginnerTitle', 'basicTitle', 'difficultTitle', 'expertTitle', 'challengeTitle'];
  return (<span className="songListContainer">
    {songs.map(song => 
      {
        return <div className={indexToLevelClass[song[1]]} onClick={() => {
          {handleSongNameClick(song[0], song[1])}
        }}>{song[0]}</div>
      })}
    </span>)
  }

module.exports = SongList;