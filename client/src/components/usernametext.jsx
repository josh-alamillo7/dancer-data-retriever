import React from 'react';
import UsernameInput from './usernameInput.jsx'

const UsernameText = ({ username , handleSubmitUsernameClick }) => {
  if (username === null) {
    return (
    <div>
      <div>Hi there, what's your name?</div>
      <UsernameInput handleSubmitUsernameClick={handleSubmitUsernameClick}/>
    </div>
    )
  }
  else {
    return (
    <div>
      <div>
          <div>Welcome, {username}! Compare your scores here with the DDR community =). Let's get dancing!</div>
          <div>If you meant to choose a different username, please re-enter it below:</div>
          <UsernameInput handleSubmitUsernameClick={handleSubmitUsernameClick}/>
      </div>
        <div>Otherwise, choose a level and get comparing!</div>
    </div>
    )
  }
  
  
}

export default UsernameText