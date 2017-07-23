module.exports = function flatten (array) {
  return [].concat.apply([], array)
}
