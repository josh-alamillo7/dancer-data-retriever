import React from 'react';

const StatsTitle = ( {title} ) => {
  if (title === null) {
    return (<div></div>)
  } else {
    return (
      <div className = "statsInfo">Player data for {title} :</div>
      )
  }
}

module.exports = StatsTitle;