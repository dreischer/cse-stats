import React from 'react'
// import axios from 'axios'

import Filter from '../elements/filter'

export default React.createClass({
  getInitialState () {
    return {
      response: null,
      filter: {
        dateRange: {
          min: null,
          max: null,
          start: null,
          end: null
        }
      }
    }
  },
  componentDidMount () {
    // axios.get('/issues?since=' + thisMonth).then(data => this.setState({
    //   response: data.data.data
    // }))
  },
  filterUpdate: function (data) {
    console.log('filter update: ', data)
  },
  render () {
    const content = this.state.response ? this.renderRows() : <div>Loading...</div>

    return (
      <div className='column'>
        <div className='ui segment'>
          <h1 className='ui header'>
            <span>Title</span>
            <div className='sub header'>Subtitle</div>
          </h1>
          <Filter filterUpdate={this.filterUpdate} />
          {content}
        </div>
      </div>
    )
  }
})
