import React from 'react';

const GradeGraph = ({ displayGraph }) => {
  if (displayGraph !== 'grade') {
    return (<div></div>)
  }

  return (
    <div>Grade graph</div>)
}

export default GradeGraph