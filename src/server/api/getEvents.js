import db from '../helper/db'

/**
 * Returns all events (issue opened or re-opened) and
 * their labels since a given date
 *
 * @param  {Object} query Query object:
 * @param  {String} query.from ISO from date
 * @param  {String} query.to ISO to date
 * @param  {Array} query.users User filter
 * @param  {Array} query.labels Label filter
 * @param  {Array} query.action Action filter - can include "opened" and "reopened"
 *
 * @return {Array} Array containing all relevant events
 *
 */
module.exports = function getEvents (query) {
  return db.find(db.events, query)
}
