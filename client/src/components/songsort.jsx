import React from 'react';

const SongSort = ( {sortSongs} ) => {
  return (<span><button id="ABCSort" onClick={sortSongs}>ABC</button>
    <button id="PFCSort" onClick={sortSongs}>PFC %</button></span>)
}

export default SongSort