import React from 'react';

const SongSort = ( {sortSongs} ) => {
  return (<span><button id="ABCSort" onClick={sortSongs}>ABC</button>
    <button id="PFCSort" onClick={sortSongs}>PFC %(desc)</button>
    <button id="AAASort" onClick={sortSongs}>AAA %(desc)</button></span>)
}

export default SongSort