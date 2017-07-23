/**
* To be used in .filter() with objects having a key _id
*/
module.exports = function filterUnique (item, i, arr) {
  const index = arr.findIndex(innerItem => {
    return innerItem._id === item._id
  })

  return index === i
}
