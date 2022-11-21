/**
 * @typedef Options
 * @property {boolean} [gapless=false] Whether to filter out `null` and `undefined` results
 * @property {string} [key] If a key is given, and an object supplied to the wrapped `fn`, values at that object’s `key` field are mapped and the object, instead of the values, is given to `fn` as a last parameter. If a key is given and an array is passed to the wrapped `fn`, no value is given to `fn` as a last parameter
 */

/**
 * Functional map with sugar (functional, as values are provided as a parameter,
 * instead of context object).
 *
 * Wraps the supplied `fn`, which handles one value, so that it accepts multiple
 * values, calling `fn` for each and returning all results.
 *
 * If `options` is a string, it’s treated as `{key: options}`.
 *
 * @template {unknown} Value
 * @template {Value[]} Values
 * @param {(value: Value, parent: Values|Value?) => unknown} fn
 * @param {string|Options} [options]
 */
export function mapz(fn, options) {
  let gapless = false
  /** @type {string?} */
  let key

  if (typeof options === 'string') {
    key = options
  } else if (options) {
    if (options.key !== undefined && options.key !== null) {
      key = options.key
    }

    if (options.gapless !== undefined && options.gapless !== null) {
      gapless = options.gapless
    }
  }

  return map

  /**
   * Call the bound `fn` for all values.
   * If a `key` is bound, `values` can be an object.
   * See `key` for more info.
   *
   * @this {unknown}
   * @param {Value|Values} values
   * @returns {unknown[]}
   */
  function map(values) {
    /** @type {unknown[]} */
    const results = []
    let index = -1
    const list = Array.isArray(values)
    let parent = values

    if (key) {
      if (list) {
        parent = null
      } else {
        values = values[key]
      }
    }

    if (Array.isArray(values)) {
      while (++index < values.length) {
        const result = fn.call(this, values[index], parent)

        if (gapless ? result !== undefined && result !== null : true) {
          results.push(result)
        }
      }
    }

    return results
  }
}
