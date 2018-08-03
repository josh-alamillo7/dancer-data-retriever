import React from 'react';

const MarvGraph = ({ displayMarvGraph }) => {
  if (!displayMarvGraph) {
    return (<div></div>)
  }

  return (
    <div>Marv graph</div>)
}

export default MarvGraph