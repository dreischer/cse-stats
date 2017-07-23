window.$ = window.jQuery = require('jquery')
require('semantic-ui-css/semantic')
import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, IndexRoute, Redirect } from 'react-router'

import App from './components/app'
import Home from './components/views/home'
import Info from './components/views/info'
import NotFound from './components/views/notFound404'
// import Error from './components/error'

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='info' component={Info} />
      <Route path='/404' component={NotFound} />
      <Redirect from='*' to='/404' />
    </Route>
  </Router>
)

render(routes, document.getElementById('app'))
