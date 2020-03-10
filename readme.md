# hexoid [![build status](https://badgen.net/github/status/lukeed/hexoid)](https://github.com/lukeed/hexoid/actions) [![codecov](https://badgen.now.sh/codecov/c/github/lukeed/hexoid)](https://codecov.io/gh/lukeed/hexoid)

> A tiny (190B) and [extremely fast](#benchmarks) utility to generate random IDs of fixed length

_**Hexadecimal object IDs.** Available for Node.js and the browser._<br>Generate randomized output strings of fixed length using lowercased hexadecimal pairs.

> **Notice:** Please note that this is not a cryptographically secure (CSPRNG) generator.

Additionally, this module is delivered as:

* **CommonJS**: [`dist/index.js`](https://unpkg.com/hexoid/dist/index.js)
* **ES Module**: [`dist/index.mjs`](https://unpkg.com/hexoid/dist/index.mjs)
* **UMD**: [`dist/index.min.js`](https://unpkg.com/hexoid/dist/index.min.js)

## Install

```
$ npm install --save hexoid
```


## Usage

```js
import hexoid from 'hexoid';

const toID = hexoid();
// length = 16 (default)
toID(); //=> '52032fedb951da00'
toID(); //=> '52032fedb951da01'
toID(); //=> '52032fedb951da02'

// customize length
hexoid(25)(); //=> '065359875047c63a037200e00'
hexoid(32)(); //=> 'ca8e4aec7f139d94fcab9cab2eb89f00'
hexoid(48)(); //=> 'c19a4deb5cdeca68534930e67bd0a2f4ed45988724d8d200'
```


## API

### hexoid(length?)
Returns: `() => string`

Creates the function that will generate strings.

#### length
Type: `Number`<br>
Default: `16`

Then length of the output string.

> **Important:** Your risk of collisions decreases with longer strings!<br>Please be aware of the [Birthday Problem](https://betterexplained.com/articles/understanding-the-birthday-paradox/)! You may need more combinations than you'd expect.

The **maximum combinations** are known given the following formula:

```js
const combos = 256 ** (len/2);
```


## Benchmarks

> Running on Node.js v10.13.0

```
Validation (length = 16):
  ✔ hashids/fixed    (example: "LkQWjnegYbwZ1p0G")
  ✔ nanoid           (example: "k6qi25oosFz_hlPd")
  ✔ uid              (example: "io9bl0ky81phrodn")
  ✔ hexoid           (example: "5bab7810c6878e00")
Benchmark (length = 16):
  hashids/fixed    x     340,277 ops/sec ±1.28% (97 runs sampled)
  nanoid           x     477,956 ops/sec ±0.20% (96 runs sampled)
  uid              x   3,589,929 ops/sec ±0.21% (94 runs sampled)
  hexoid           x  79,801,437 ops/sec ±1.68% (94 runs sampled)


Validation (length = 25):
  ✔ cuid             (example: "ck7bonwek0000zb7c3ujaaku0")
  ✔ hashids/fixed    (example: "r9JOyLkQWjnegYbwZ1p0GDXNm")
  ✔ nanoid           (example: "z7ru45m1JZ_D2Ti47DFhDXtWn")
  ✔ uid              (example: "m8jmnv380cgbt1nn7f7kr4jvy")
  ✔ hexoid           (example: "22ec2432c92aaebb1a26dcd00")
Benchmark (length = 25):
  cuid             x     159,227 ops/sec ±1.36% (91 runs sampled)
  hashids/fixed    x     328,628 ops/sec ±0.16% (98 runs sampled)
  nanoid           x     431,160 ops/sec ±0.17% (97 runs sampled)
  foid             x   2,433,882 ops/sec ±0.14% (96 runs sampled)
  hexoid           x  76,449,294 ops/sec ±0.58% (97 runs sampled)


Validation (length = 36):
  ✔ uuid/v1          (example: "7af0db80-5d30-11ea-b1d7-533043f62f4d")
  ✔ uuid/v4          (example: "18ea9e0e-766e-4c1a-9a4a-3f7ef8bd8063")
  ✔ hashids/fixed    (example: "EVq3Pr9JOyLkQWjnegYbwZ1p0GDXNmRBlAxg")
  ✔ @lukeed/uuid     (example: "d6bbe55a-80a8-4ae4-bad6-936532f293a7")
  ✔ nanoid           (example: "j0mr4IR8InpZC2jDxR6_ZybaiJIYpT21kF1m")
  ✔ uid              (example: "0coxfi3yfc7mscyot1vcxltecj9v36iuszfk")
  ✔ hexoid           (example: "4c93a50e3d9dc569a5a1882166ae9b971400")
Benchmark (length = 36):
  uuid/v1          x   1,520,287 ops/sec ±0.28% (96 runs sampled)
  uuid/v4          x     334,842 ops/sec ±0.77% (91 runs sampled)
  hashids/fixed    x     305,579 ops/sec ±1.97% (96 runs sampled)
  @lukeed/uuid     x   6,332,668 ops/sec ±0.24% (93 runs sampled)
  nanoid           x     401,099 ops/sec ±0.22% (95 runs sampled)
  uid              x   1,766,605 ops/sec ±0.27% (98 runs sampled)
  hexoid           x  72,034,782 ops/sec ±0.31% (95 runs sampled)
```

## Related

- [uid](https://github.com/lukeed/uid) - A smaller (134B) but slower variant of this module with a different API
- [@lukeed/uuid](https://github.com/lukeed/uuid) - A tiny (230B), fast, and cryptographically secure UUID (V4) generator for Node and the browser


## License

MIT © [Luke Edwards](https://lukeed.com)
