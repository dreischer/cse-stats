import Datastore from 'nedb'
import path from 'path'

const dbPath = path.join(__dirname, '../../../datastore')

module.exports = {
  events: new Datastore({
    filename: dbPath + '/events',
    autoload: true
  }),
  imports: new Datastore({
    filename: dbPath + '/imports',
    autoload: true,
    timestampData: true
  }),
  labels: new Datastore({
    filename: dbPath + '/labels',
    autoload: true
  }),
  users: new Datastore({
    filename: dbPath + '/users',
    autoload: true
  }),

  // common set actions
  addLabels: function (labels) {
    return this.upsert(this.labels, labels)
  },
  addEvents: function (events) {
    return this.upsert(this.events, events)
  },
  addUsers: function (users) {
    return this.upsert(this.users, users)
  },
  addImportLog: function (count, sinceDate) {
    return this.insert(this.imports, {
      sinceDate: sinceDate,
      numberEvents: count
    })
  },

  // Promise wrapper for find, findOne and upsert
  insert: function (db, data) {
    return new Promise((resolve, reject) => {
      db.insert(data, function (err, docs) {
        err ? reject(err) : resolve(docs)
      })
    })
  },
  find: function (db, query) {
    query = query || {}
    return new Promise((resolve, reject) => {
      db.find(query, function (err, docs) {
        err ? reject(err) : resolve(docs)
      })
    })
  },
  findOne: function (db, query, sort) {
    query = query || {}
    return new Promise((resolve, reject) => {
      db.findOne(query).sort(sort).exec(function (err, doc) {
        err ? reject(err) : resolve(doc)
      })
    })
  },
  upsert: function (db, data) {
    data = data || []

    const promises = data.map(item => {
      return new Promise((resolve, reject) => {
        db.update({_id: item._id}, item, { upsert: true }, function (err, replaced) {
          err ? reject(err) : resolve()
        })
      })
    })

    return Promise.all(promises).then(() => {
      db.persistence.compactDatafile()
    })
  }
}
