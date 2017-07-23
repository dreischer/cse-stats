import GitHub from 'github-api'
import config from '../../../config'
import formatNewData from './formatNewData'

/**
 * Returns all events (issue opened or re-opened) and
 * their labels since a given date
 *
 * @param  {Object} since Date object of last import
 *
 * @return {Object} object containg new data
 *
 */
module.exports = function getNewEvents (since) {
  const issuesApi = new GitHub({
    token: config.github.token
  }).getIssues('qubitdigital', 'cse-code-review')

  return issuesApi.listIssues({
    state: 'all',
    since: since.toISOString()
  }).then(issues => {
    const openedIssues = issues.data

    getAllIssues(openedIssues, issuesApi, 50).then(issueEvents => {
      return formatNewData(openedIssues, issueEvents, since)
    })
  })
}

function getAllIssues (issueList, issuesApi, maxConcurrent = 50) {
  return new Promise((resolve, reject) => {
    const data = []
    request(issueList)

    function request (list) {
      if (!list.length) {
        resolve(data)
      }
      const chunk = list.splice(0, maxConcurrent)
      const issueEventsPromises = chunk.map(issue => issuesApi.listIssueEvents(issue.number))

      Promise.all(issueEventsPromises).then(issueEvents => {
        data.push(issueEvents)
        request(list)
      })
    }
  })
}
