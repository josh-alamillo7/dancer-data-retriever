import React from 'react';
import UsernameInput from './usernameInput.jsx'

const UsernameText = ({ username , handleSubmitUsernameClick }) => {
  if (username === null) {
    return (
    <div>
      <p className='welcomeText'>Hi there, what's your name?</p>
      <UsernameInput handleSubmitUsernameClick={handleSubmitUsernameClick}/>
    </div>
    )
  }
  else {
    return (
    <div>
      <p className='welcomeText'>Welcome, {username}! Compare your scores here with the DDR community 😃. Let's get dancing! <br/>
      If you meant to choose a different username, please re-enter it below:</p>
      <UsernameInput handleSubmitUsernameClick={handleSubmitUsernameClick}/>
      <p>Otherwise, choose a level and get comparing!</p>
    </div>
    )
  }
  
  
}

export default UsernameText