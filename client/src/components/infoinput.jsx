import React from 'react';

class InfoInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
    this.handleScoreInputChange = this.handleScoreInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmitScoreClick = this.props.handleSubmitScoreClick.bind(this)
    
  }

  handleScoreInputChange(e) {
    this.setState({value: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.handleSubmitScoreClick(this.state.value)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" value={this.state.value} onChange={this.handleScoreInputChange} />
        </label>
        <input type="submit" value="Submit my score" />
      </form>
    )
  }
}

export default InfoInput