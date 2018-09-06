import React from 'react';
import UsernameInput from './usernameInput.jsx'

const UsernameText = ({ username , handleSubmitUsernameClick }) => {
  if (username === null) {
    return (
    <div className='welcomeContainer'>
      <div className='welcomeText'>Hi there, what's your name?</div>
      <UsernameInput handleSubmitUsernameClick={handleSubmitUsernameClick}/>
    </div>
    )
  }
  else {
    return (
    <div className='welcomeContainer'>
      <div className='welcomeText'>Welcome, {username}! Compare your scores here with the DDR community 😃. <br/>
      If you meant to choose a different username, please re-enter it below.</div>
      <UsernameInput handleSubmitUsernameClick={handleSubmitUsernameClick}/>
      <div className='welcomeText'>Otherwise, choose a level and get comparing!</div>
    </div>
    )
  }
}

export default UsernameText