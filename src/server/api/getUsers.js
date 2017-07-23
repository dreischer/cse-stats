import db from '../helper/db'

/**
 * Returns all the labels used
 *
 * @param  {Object} query Standard NeDB query object - not currently used
 * @return {Promise} Resolves an array of users
 *
 */
module.exports = function getUsers (query) {
  return db.find(db.users, query)
}
