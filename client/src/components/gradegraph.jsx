import React from 'react';

const GradeGraph = ({ displayGradeGraph }) => {
  if (!displayGradeGraph) {
    return (<div></div>)
  }

  return (
    <div>Grade graph</div>)
}

export default GradeGraph