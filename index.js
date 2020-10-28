'use strict'

var array = require('x-is-array')

module.exports = factory

// Functional map with sugar.
function factory(fn, options) {
  var settings = options || {}
  var indices = settings.indices == null ? true : settings.indices
  var key = typeof settings === 'string' ? settings : settings.key

  return all

  function all(values) {
    var results = []
    var index = -1
    var parent = values
    var result

    if (key) {
      if (array(values)) {
        parent = null
      } else {
        values = parent[key]
      }
    }

    while (++index < values.length) {
      result = indices
        ? fn.call(this, values[index], index, parent)
        : fn.call(this, values[index], parent)

      if (!settings.gapless || result != null) {
        results.push(result)
      }
    }

    return results
  }
}
