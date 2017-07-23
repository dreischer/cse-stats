import db from './db'
import config from '../../../config'

module.exports = function getLastImportDate (label) {
  return db.findOne(db.imports, {}, { 'updatedAt': -1 }).then(doc => {
    const date = doc && doc.updatedAt || new Date(config.init.sinceDate)

    return date
  })
}
