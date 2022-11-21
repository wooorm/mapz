# mapz

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

Functional map with sugar.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`mapz(fn[, options])`](#mapzfn-options)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Related](#related)
*   [Security](#security)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This is a tiny package that, in combination with [`zwitch`][zwitch], helps with
ASTs.

## When should I use this?

You can use this package when you want to map one AST to another, or check an
AST.

## Install

This package is [ESM only][esm].
In Node.js (version 14.14+, 16.0+), install with [npm][]:

```sh
npm install mapz
```

In Deno with [`esm.sh`][esmsh]:

```js
import {mapz} from 'https://esm.sh/mapz@2'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {mapz} from 'https://esm.sh/mapz@2?bundle'
</script>
```

## Use

```js
import {mapz} from 'mapz'

const map = mapz(fn, {key: 'children', gapless: true})

map({type: 'something', children: [1, 2, 3]}) // => ['Hi, 2', 'Hi, 3']

function fn(value) {
  return value > 1 ? 'Hi, ' + value + '.' : null
}
```

## API

This package exports the identifier `mapz`.
There is no default export.

### `mapz(fn[, options])`

Functional map with sugar.

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

See [`map(values)`][map] (`Function`).

#### `map(values)`

Call the bound [`fn`][fn] for all values.
If a `key` is bound, `values` can be an object.
See [`options.key`][key] for more info.

###### Returns

Values returned by `fn` (`Array<unknown>`).
If `gapless` is `true`, `null` or`undefined` results are not returned by `map`.

#### `fn(value, parent?)`

Handle one value.
If `key` is set and an array is given, no `parent` is passed.

###### Returns

Any value (`unknown`).

## Types

This package is fully typed with [TypeScript][].
It exports the additional type `Options`.

## Compatibility

This package is at least compatible with all maintained versions of Node.js.
As of now, that is Node.js 14.14+ and 16.0+.
It also works in Deno and modern browsers.

## Related

*   [`zwitch`][zwitch] — handle values based on a property

## Security

This package is safe.

## Contribute

Yes please!
See [How to Contribute to Open Source][contribute].

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

[esmsh]: https://esm.sh

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[typescript]: https://www.typescriptlang.org

[contribute]: https://opensource.guide/how-to-contribute/

[license]: license

[author]: https://wooorm.com

[map]: #mapvalues

[key]: #optionskey

[fn]: #fnvalue-parent

[zwitch]: https://github.com/wooorm/zwitch
