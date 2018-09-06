import React from 'react';

const PageNavigationClicks = ({ handleBackwardsClick, handleForwardClick, songs, displaySongs }) => {

  const boolNextButton = displaySongs && songs && songs[songs.length - 1] !== displaySongs[displaySongs.length - 1]
  const boolPreviousButton = displaySongs && songs && displaySongs[0] !== songs[0]

  if (boolNextButton && boolPreviousButton) {
    return (
    <div>
      <button onClick={handleBackwardsClick} className="backClickButton">Prev 20 songs</button>
      <button onClick={handleForwardClick} className="forwardClickButton">Next 20 songs</button>
    </div>
  )
  } else if (boolPreviousButton) {
    return (
      <button onClick={handleBackwardsClick} className="backClickButton">Prev 20 songs</button>
      )
  } else if (boolNextButton) {
    return (
      <button onClick={handleForwardClick} className="forwardClickButton">Next 20 songs</button>)
  }
  else {
    return (<div></div>)
  } 
}

export default PageNavigationClicks