/**
 * @template {boolean} [Gapless=false]
 * @typedef Options
 *   Configuration (optional).
 * @property {Gapless|undefined} [gapless=false]
 *   Whether to filter out `null` and `undefined` results
 * @property {string|undefined} [key]
 *   If a key is given, and an object supplied to the wrapped `fn`, values at
 *   that object’s `key` field are mapped and the object, instead of the
 *   values, is given to `fn` as a last parameter.
 *   If a key is given and an array is passed to the wrapped `fn`, no value is
 *   given to `fn` as a last parameter.
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
 * @template {unknown} [ChildValue=unknown]
 * @template {unknown} [ParentValue=unknown]
 * @template {unknown} [ReturnValue=unknown]
 * @template {boolean} [Gapless=false]
 * @param {(value: ChildValue, parent: ParentValue) => ReturnValue} fn
 * @param {string|Options<Gapless>|undefined} [options]
 */
export function mapz(fn, options) {
  let gapless = false
  /** @type {string|undefined} */
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
   * @param {Array<ChildValue>|ParentValue} values
   * @returns {Array<Gapless extends true ? NonNullable<ReturnValue> : ReturnValue>}
   *   Values returned by `fn`.
   */
  function map(values) {
    /** @type {Array<Gapless extends true ? NonNullable<ReturnValue> : ReturnValue>} */
    const results = []
    let index = -1
    /** @type {Array<ChildValue>|ParentValue|null} */
    let parent

    if (key) {
      if (Array.isArray(values)) {
        parent = null
      } else {
        parent = values
        // @ts-expect-error: assume indexable.
        values = values[key]
      }
    } else {
      parent = values
    }

    if (Array.isArray(values)) {
      while (++index < values.length) {
        // @ts-expect-error: assume `parent` matches.
        const result = fn.call(this, values[index], parent)

        if (gapless ? result !== undefined && result !== null : true) {
          // @ts-expect-error: `gapless` check is correct.
          results.push(result)
        }
      }
    }

    return results
  }
}
