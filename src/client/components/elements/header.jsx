import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render: function () {
    return <div className='ui pointing menu'>
      <div className='ui page grid'>
        <div className='column' style={{paddingBottom: 0}}>
          <div className='title item'><b>Title</b></div>
          <Link className='item' to='/'>Home</Link>
          <Link className='item' to='/info'>Info</Link>
          <div className='right floated item'>
            <i className='setting icon' />
          </div>
        </div>
      </div>
    </div>
  }
})
