import React from 'react';

const LevelClicks = ( {handleLevelChangeClick, selectedLevel} ) => {
  let allLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  return (allLevels.map(level => {
    const newButtonId = selectedLevel === level ? 'selectedButton' : 'deselectedButton'
    let newButton = <button className='levelButton' id={newButtonId} onClick={() => {handleLevelChangeClick(level)}}>{level}</button>
    let buttonContainer = <span className='levelButtonContainer'>{newButton}</span>
    
    return buttonContainer
  }
)
)}

export default LevelClicks