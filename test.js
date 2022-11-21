import test from 'tape'
import {mapz} from './index.js'

test('mapz(options?)', function (t) {
  t.deepEqual(
    mapz(fn)([1, 2, 3]),
    [null, 'Hi, 2.', 'Hi, 3.'],
    'should map values'
  )

  t.deepEqual(
    mapz(fn, {gapless: true})([1, 2, 3]),
    ['Hi, 2.', 'Hi, 3.'],
    'should ignore gaps in `gapless: true` mode'
  )

  t.deepEqual(
    mapz(fn, {gapless: true})([1, 2, 3]),
    ['Hi, 2.', 'Hi, 3.'],
    'should ignore gaps in `gapless: true` mode'
  )

  t.deepEqual(mapz(parentsList)([1, 2, 3]), [3, 3, 3], 'should pass a parent')

  t.deepEqual(
    mapz(parentsList, {key: 'foo'})([1, 2, 3]),
    [0, 0, 0],
    'should not pass a parent if a `key` is given and an array passed'
  )

  t.deepEqual(
    mapz(parentsList, 'foo')([1, 2, 3]),
    [0, 0, 0],
    'should support a key instead of `options`'
  )

  t.deepEqual(
    mapz(parentsObject, {key: 'foo'})({
      foo: [1, 2, 3],
      value: 'x'
    }),
    ['x', 'x', 'x'],
    'should pass a parent if a `key` is given and an object passed'
  )

  /**
   * @param {number} value
   * @returns {string|null}
   */
  function fn(value) {
    return value > 1 ? 'Hi, ' + value + '.' : null
  }

  /**
   * @param {number} value
   * @param {Array<number>|null} parent
   * @returns {number}
   */
  function parentsList(value, parent) {
    return parent ? parent.length : 0
  }

  /**
   * @typedef Parent
   * @property {Array<number>} foo
   * @property {string} value
   */

  /**
   * @param {number} value
   * @param {Parent|null} parent
   * @returns {string}
   */
  function parentsObject(value, parent) {
    return parent ? parent.value : 'y'
  }

  t.end()
})
