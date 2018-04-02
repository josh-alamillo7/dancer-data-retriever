import React from 'react';

const LevelClicks = ( {handleLevelChangeClick} ) => {
  let allLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  return (allLevels.map(level => {
    return <span><button onClick={() => {handleLevelChangeClick(level)}}>{level}</button></span>
  }
)
)}

export default LevelClicks