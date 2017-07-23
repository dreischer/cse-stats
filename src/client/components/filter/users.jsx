import React from 'react'
import axios from 'axios'
const Select = require('react-select')

const GravatarValue = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.object
  },
  render () {
    const style = {
      backgroundImage: `url(${this.props.value.img})`
    }

    return (
      <div className='Select-value' title={this.props.value.title}>
        <span className='Select-value-label'>
          <span className='Select-value-gravatar' style={style} />
          <span>{this.props.children}</span>
        </span>
      </div>
    )
  }
})

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
    axios.get('/users').then(data => {
      const options = data.data.data.map(user => {
        return {
          value: user._id,
          label: user.name || user.login,
          team: user.team || null,
          img: user.img
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
        placeholder='Users'
        name='users-select'
        multi
        valueComponent={GravatarValue}
        options={this.state.options}
        onChange={this.handleEvent}
        value={this.state.value}
      />
    )
  }
})
