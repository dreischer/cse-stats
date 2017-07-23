import React from 'react'

export default React.createClass({
  render: function (e) {
    const error = JSON.stringify({
      message: e.message,
      status: e.status,
      stack: e.stack
    }, null, 2)

    return (
      <div className='column'>
        <div className='ui segment'>
          <h4 className='ui black header'>Not found</h4>
          <pre><code>
            {error}
          </code></pre>
        </div>
      </div>
    )
  }
})
