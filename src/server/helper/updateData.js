import db from './db'
import getNewData from './getNewData'
import getLastImportDate from './getLastImportDate'

module.exports = function getEvents () {
  return getLastImportDate().then(getNewData).then(data => {
    const promises = [
      db.addEvents(data.events, data.sinceDate),
      db.addLabels(data.labels),
      db.addUsers(data.users),
      db.addImportLog(data.events.length, data.sinceDate)
    ]

    return Promise.all(promises).then(() => {
      return {
        numberEvents: data.events.length,
        numberLabels: data.labels.length,
        numberUsers: data.users.length,
        sinceDate: data.sinceDate
      }
    })
  })
}
