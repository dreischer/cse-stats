import config from '../../../config'

module.exports = function getLabelType (label) {
  const isTeam = config.labels.teams.some(regex => new RegExp(regex).test(label.name))

  if (label.color === 'ffffff') {
    return 'client'
  } else if (/^(<|>)/.test(label.name)) {
    return 'size'
  } else if (isTeam) {
    return 'team'
  } else {
    return 'other'
  }
}
