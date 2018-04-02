import React from 'react';

class UsernameInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
    this.handleUsernameInputChange = this.handleUsernameInputChange.bind(this)
    this.handleSubmitUsernameClick = this.props.handleSubmitUsernameClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleUsernameInputChange(e) {
    this.setState({value: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.handleSubmitUsernameClick(this.state.value)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="usernameInput">
        <label>
          <input type="text" value={this.state.value} onChange={this.handleUsernameInputChange}/>
        </label>
        <input type="submit" value="Choose this username"/>
      </form>
      )
  }

}

export default UsernameInput