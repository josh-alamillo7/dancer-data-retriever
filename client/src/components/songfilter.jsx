import React from 'react';

class SongFilter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
    this.handleFilterInputChange = this.handleFilterInputChange.bind(this)
    this.filterSongs = this.props.filterSongs.bind(this)
  }

  handleFilterInputChange(e) {
    this.setState({value: e.target.value})
    this.filterSongs(e.target.value)
  }

  render() {
    return (
      <input type="text" className="filterInput" value={this.state.value} onChange={this.handleFilterInputChange} />
    )
  }
}

export default SongFilter