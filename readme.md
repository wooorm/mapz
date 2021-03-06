# mapz

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

Functional map with sugar.

## Install

This package is ESM only: Node 12+ is needed to use it and it must be `import`ed
instead of `require`d.

[npm][]:

```sh
npm install mapz
```

## Use

```js
import {mapz} from 'mapz'

var map = mapz(fn, {key: 'children', gapless: true})

map({children: [1, 2, 3]}) // => ['Hi, 2', 'Hi, 3']

function fn(value) {
  return value > 1 ? 'Hi, ' + value + '.' : null
}
```

## API

This package exports the following identifiers: `mapz`.
There is no default export.

### `mapz(fn[, options])`

Functional map with sugar (functional, as values are provided as a parameter,
instead of context object).

Wraps the supplied [`fn`][fn], which handles one value, so that it accepts
multiple values, calling `fn` for each and returning all results.

If `options` is a string, it’s treated as `{key: options}`.

###### `options.gapless`

Whether to filter out `null` and `undefined` results (`boolean`, default:
`false`).

###### `options.key`

If a key (`string`, optional) is given, and an object supplied to the wrapped
`fn`, values at that object’s `key` field are mapped and the object, instead
of the values, is given to `fn` as a last parameter.
If a key is given and an array is passed to the wrapped `fn`, no value is given
to `fn` as a last parameter.

###### Returns

`Function` — See [`map(values)`][map]

#### `map(values)`

Call the bound [`fn`][fn] for all values.  If a `key` is bound, `values` can
be an object.
See [`options.key`][key] for more info.

###### Returns

`Array.<*>` — Values returned by `fn`.  If `gapless` is `true`, `null` or
`undefined` results are not returned by `map`.

#### `fn(value, parent?)`

Handle one value.
If `key` is set and an array is given, no `parent` is passed.

###### Returns

`*` — Any value.

## Related

*   [`zwitch`](https://github.com/wooorm/zwitch)
    — Handle values based on a property

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/wooorm/mapz/workflows/main/badge.svg

[build]: https://github.com/wooorm/mapz/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/mapz.svg

[coverage]: https://codecov.io/github/wooorm/mapz

[downloads-badge]: https://img.shields.io/npm/dm/mapz.svg

[downloads]: https://www.npmjs.com/package/mapz

[size-badge]: https://img.shields.io/bundlephobia/minzip/mapz.svg

[size]: https://bundlephobia.com/result?p=mapz

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[map]: #mapvalues

[key]: #optionskey

[fn]: #fnvalue-parent
