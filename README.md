[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

# vissuealiser #
___
## Info ##
This app
___
## Architecture ##
### Client ###
- React
- Less
### Server###
- Express Server
- Babel loader
- Gulp + Webpack
- We use [NeDB](https://github.com/louischatriot/nedb) as datastore. There's no setup required, so deploying this app is super easy. NeDB's API is a subset MongoDB's. So should this ever require a more scalable solution it's easy to replace NeDB with MongoDB.
___
## API ##
- GET - `/events`
Returns a list of events - either issues opened or reopened.
- GET - `/labels`
Returns a list of labels.
- GET - `/users`
Returns a list of users.
- POST - `/update`
Updates data from GitHub.
___
## Configuration ##
### Import ###
See [Preload data](#Preload-data)
### Github ###
Set you secret token here ([see docs](https://developer.github.com/v3/oauth/))
### labels.teams ###
This is an array of RegExps which are use to match labels as teams.
### labels.users ###
An object of users. Not required but allows to show clear names for users and assign them to teams.
___
## Start ##
1. Start the dev server by running ```$ gulp```
2. Visit http://localhost:4000
3. Debug tools: http://127.0.0.1:9999/?port=5858

- If node-inspector blocks the port run ```kill -9 $(ps aux | grep '\snode\s' | awk '{print $2}')```
- If Node Inspector doesn't work make sure you're on node <= 6.3.1
___
## Preload data ##
There's a specific operation to load historic data. To make sure you stay within the GitHub API rate limit and you don't trigger their abuse detection you should import issues in batches. These batches should be max ~1000 issues at once.

1. Set the values in `config.js` and update `from/to` for each batch:
```javascipt
import: {
  from: 6200, // issue number
  to: 7000, // issue number
  timeout: 500, // time between requests
  delay: 5000, // time before first request
  logDate: '2016-05-01T00:00:00.000Z' // sinceDate written to import logs
}
```
2. Run ```node --debug src/server/init.js ```
___
## References: ##
- [GitHub API](https://developer.github.com/v3/issues/)
- [Node GitHub API](http://github-tools.github.io/github/docs/2.3.0/index.html)
- [React d3](https://github.com/yang-wei/rd3)
___
## LiveReload ##
Install live reload plugin for your browser (e.g. [RemoteLiveReload for Chrome](https://chrome.google.com/webstore/detail/remotelivereload/jlppknnillhjgiengoigajegdpieppei)) to instantly see your changes in the browser when a client side file (jsx/js/less/css/html) changes.
