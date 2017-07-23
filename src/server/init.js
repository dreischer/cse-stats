require('babel/register')

const GitHub = require('github-api')
const config = require('../../config')
const db = require('./helper/db')
const formatNewData = require('./helper/formatNewData')

// get issues from 5521 - 7523
const issuesApi = new GitHub({
  token: config.github.token
}).getIssues('qubitdigital', 'cse-code-review')

const promises = []
const issues = []
const issueEvents = []

console.log(`import issue ${config.import.min} to ${config.import.max}`)
console.log(`waiting ${config.import.delay}ms`)

setTimeout(function () {
  console.log(`start import`)
  runLoop(config.import.min, config.import.max)
}, config.import.delay)

function runLoop (current, max) {
  setTimeout(function () {
    if (current <= max) {
      promises.push(getData(current))
      current++
      runLoop(current, max)
    } else {
      Promise.all(promises).then(saveData)
    }
  }, config.import.timeout)
}

function getData (issueID) {
  return issuesApi.getIssue(issueID).then(issue => {
    issues.push(issue.data)

    return issuesApi.listIssueEvents(issueID).then(events => {
      issueEvents.push(events)
    })
  })
}

function saveData () {
  const since = new Date(config.import.logDate)
  const data = formatNewData(issues, issueEvents, since)
  console.log('data:', {
    events: data.events.length,
    users: data.users.length,
    labels: data.labels.length
  })

  const promises = [
    db.addEvents(data.events, data.sinceDate),
    db.addLabels(data.labels),
    db.addUsers(data.users),
    db.addImportLog(data.events.length, data.sinceDate)
  ]

  Promise.all(promises)
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
}
