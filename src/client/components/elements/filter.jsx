import React from 'react'

import DatePicker from '../filter/datePicker'
import Labels from '../filter/labels'
import Users from '../filter/users'

export default React.createClass({
  getInitialState () {
    return {
      dateRange: {
        start: null,
        end: null
      },
      users: [],
      labels: []
    }
  },
  propTypes: {
    filterUpdate: React.PropTypes.func.isRequired
  },
  dateChange: function (dateRange) {
    this.setState({dateRange}, () => {
      this.props.filterUpdate(this.state)
    })
  },
  userChange: function (users) {
    this.setState({users}, () => {
      this.props.filterUpdate(this.state)
    })
  },
  labelsChange: function (labels) {
    this.setState({labels}, () => {
      this.props.filterUpdate(this.state)
    })
  },
  render () {
    return (
      <div className='filters'>
        <DatePicker changeEvent={this.dateChange} />
        <Users changeEvent={this.userChange} />
        <Labels changeEvent={this.labelsChange} />
      </div>
    )
  }
})
