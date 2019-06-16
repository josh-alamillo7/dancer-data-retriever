import React from 'react';

const PageNavigationClicks = ({ handleBackwardsClick, handleForwardClick, songs, displaySongs, filteredSongs }) => {
  let boolNextButton;
  let boolPreviousButton;

  if (filteredSongs.length > 0) {
    boolNextButton = filteredSongs.length && displaySongs.length && displaySongs[displaySongs.length - 1] !== filteredSongs[filteredSongs.length - 1];
    boolPreviousButton = filteredSongs.length && displaySongs.length && displaySongs[0] !== filteredSongs[0];
  } else {
    boolNextButton = displaySongs.length && songs.length && songs[songs.length - 1] !== displaySongs[displaySongs.length - 1];
    boolPreviousButton = displaySongs.length && songs.length && displaySongs[0] !== songs[0];
  }
  

  if (boolNextButton && boolPreviousButton) {
    return (
    <div className='navClicks'>
      <button onClick={handleBackwardsClick} className="backClickButton">Prev 20 songs</button>
      <button onClick={handleForwardClick} className="forwardClickButton">Next 20 songs</button>
    </div>
  )
  } else if (boolPreviousButton) {
    return (
      <div className='navClicks'>
      <button onClick={handleBackwardsClick} className="backClickButton">Prev 20 songs</button>
      </div>
      )
  } else if (boolNextButton) {
    return (
      <div className='navClicks'>
      <button onClick={handleForwardClick} className="forwardClickButton">Next 20 songs</button>
      </div>)
  }
  else {
    return (<div></div>)
  } 
}

export default PageNavigationClicks