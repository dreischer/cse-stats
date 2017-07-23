require('babel/register')

const port = process.env.PORT || 3000
const express = require('express')
const path = require('path')
const logger = require('morgan')
const debug = require('debug')('server')
const bodyParser = require('body-parser')
const dist = path.join(__dirname, '../..', 'dist')
const app = express()

const getEvents = require('./api/getEvents')
const getLabels = require('./api/getLabels')
const getUsers = require('./api/getUsers')
const update = require('./api/update')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static(dist))

app.get('/events', function (request, response) {
  getEvents(request.query)
  .then(docs => handleApiResponse(response, docs))
  .catch(err => handleApiError(response, err))
})

app.get('/labels', function (request, response) {
  getLabels(request.query)
  .then(docs => handleApiResponse(response, docs))
  .catch(err => handleApiError(response, err))
})

app.get('/users', function (request, response) {
  getUsers(request.query)
  .then(docs => handleApiResponse(response, docs))
  .catch(err => handleApiError(response, err))
})

app.post('/update', function (request, response) {
  update()
  .then(docs => handleApiResponse(response, docs))
  .catch(err => handleApiError(response, err))
})

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../client/index.html'))
})

app.listen(port, function () {
  return debug('Express server listening on port ' + port)
})

function handleApiResponse (response, docs) {
  response.json({
    status: 200,
    data: docs
  })
}

function handleApiError (response, err) {
  response.json({
    status: 500,
    data: JSON.parse(JSON.stringify(err, ['message', 'arguments', 'type', 'name', 'description', 'stack']))
  })
}
