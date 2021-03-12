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

  t.deepEqual(mapz(parents)([1, 2, 3]), [3, 3, 3], 'should pass a parent')

  t.deepEqual(
    mapz(parents, {key: 'foo'})([1, 2, 3]),
    ['-', '-', '-'],
    'should not pass a parent if a `key` is given and an array passed'
  )

  t.deepEqual(
    mapz(parents, 'foo')([1, 2, 3]),
    ['-', '-', '-'],
    'should support a key instead of `options`'
  )

  t.deepEqual(
    mapz(parents, {key: 'foo'})({
      foo: [1, 2, 3],
      length: 5
    }),
    [5, 5, 5],
    'should pass a parent if a `key` is given and an object passed'
  )

  function fn(value) {
    return value > 1 ? 'Hi, ' + value + '.' : null
  }

  function parents(value, parent) {
    return parent ? parent.length : '-'
  }

  t.end()
})
