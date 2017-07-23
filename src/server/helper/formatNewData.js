import flatten from '../../helper/flatten'
import getLabelType from './getLabelType'
import isUnique from '../../helper/isUnique'
import config from '../../../config'

/**
 * Returns all events (issue opened or re-opened) and
 * their labels since a given date
 *
 * @param  {Array} openedIssues Contains results from listIssues
 * @param  {Array} issueEvents Contains results from listIssueEvents
 * @param  {Object} since Date object since last import
 *
 * @return {Object} object containg: events, labels, users and sinceDate
 *
 */
module.exports = function formatNewData (openedIssues, issueEvents, sinceDate) {
  const events = mergeEvents(openedIssues, issueEvents, sinceDate)
  const data = convertData(events)

  return data

  function mergeEvents (openedIssues, issueEvents) {
    const opened = openedIssues.map(issue => formatEvent(issue, 'opened'))
    const other = issueEvents.map(event => formatOtherEvents(event, opened))
    const allEvents = flatten(opened.concat(other)).filter(event => {
      return new Date(event.date) >= sinceDate
    })

    return allEvents
  }

  function convertData (events) {
    // get labels
    const labels = flatten(events.map(event => event.labels)).filter(isUnique)

    // get users
    const users = events.map(event => event.user).filter(isUnique).map(enrichUser)

    // we only want label and user IDs
    events = events.map(event => {
      event.labels = event.labels.map(label => label._id)
      event.user = event.user._id
      return event
    })

    return {events, labels, users, sinceDate}
  }

  function formatOtherEvents (data, issues) {
    const issueMatch = data.config.url.match(/issues\/(\d+)\/events/)
    const issueID = issueMatch && Number(issueMatch[1])

    return data.data
      .filter(event => event.event === 'reopened')
      .map(event => formatEvent(event, event.event, issueID, issues))
  }

  function formatEvent (event, type, issueID, issues) {
    const labels = event.labels ? event.labels.map(convertLabel) : getLables(issueID, issues)
    const user = event.user || event.actor

    return {
      _id: event.id,
      issueID: event.number || issueID,
      event: type,
      user: {
        _id: user.id,
        login: user.login,
        img: user.avatar_url
      },
      date: new Date(event.created_at),
      labels: labels
    }
  }

  function enrichUser (user) {
    const info = config.labels.users[user.login] || {}
    return Object.assign(user, info)
  }

  function convertLabel (label) {
    const type = getLabelType(label)
    const value = (type === 'size') ? Number(label.name.match(/\d+/)) : label.name
    return {
      _id: label.id,
      type: type,
      value: value
    }
  }

  function getLables (issueID, issues) {
    return issues.find(issue => issue.issueID === issueID).labels
  }
}
