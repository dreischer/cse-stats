import React from 'react'
import axios from 'axios'
const Select = require('react-select')

export default React.createClass({
  getInitialState () {
    return {
      options: [],
      selected: [],
      value: []
    }
  },
  propTypes: {
    changeEvent: React.PropTypes.func.isRequired
  },
  componentDidMount () {
    axios.get('/labels').then(data => {
      const options = data.data.data.map(label => {
        return {
          value: label._id,
          label: label.value,
          type: label.type
        }
      })
      this.setState({options})
    })
  },
  handleEvent (value) {
    this.setState({value})
    this.props.changeEvent(value)
  },
  render () {
    return (
      <Select
        placeholder='Labels'
        name='users-select'
        multi
        options={this.state.options}
        onChange={this.handleEvent}
        value={this.state.value}
      />
    )
  }
})
