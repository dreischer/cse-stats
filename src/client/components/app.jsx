import React from 'react'
import Header from './elements/header'

export default React.createClass({
  propTypes: {
    children: React.PropTypes.object.isRequired
  },
  render: function () {
    return (
      <div>
        <Header />
        <div className='ui page grid'>
          {this.props.children}
        </div>
      </div>
    )
  }
})
