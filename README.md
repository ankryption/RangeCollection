# RangeCollection
[![Build Status](https://travis-ci.org/nkshio/RangeCollection.svg?branch=master)](https://travis-ci.org/nkshio/RangeCollection) [![Coverage Status](https://coveralls.io/repos/nkshio/RangeCollection/badge.svg?branch=master)](https://coveralls.io/r/nkshio/RangeCollection?branch=master) [![Issues](https://img.shields.io/github/issues/nkshio/RangeCollection.svg)](https://github.com/nkshio/RangeCollection/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) [![dependencies Status](https://david-dm.org/nkshio/RangeCollection/status.svg)](https://david-dm.org/nkshio/RangeCollection) [![devDependencies Status](https://david-dm.org/nkshio/RangeCollection/dev-status.svg)](https://david-dm.org/nkshio/RangeCollection?type=dev) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![Downloads](https://img.shields.io/npm/dt/@nkshio/rangecollection.svg)](https://www.npmjs.com/package/@nkshio/rangecollection)

A `RangeCollection` class manages a collection of numeric ranges. 

Given, a `Range` is a pair of integers for example: [1, 5). This range includes integers: 1, 2, 3, and 4. 

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install `RangeCollection`.

### Commands
- `npm install` - Install dependencies
- `npm run clean` - Remove `lib/` directory
- `npm test` - Run tests with linting and coverage results.
- `npm run test:examples` - Test written examples on pure JS for better understanding module usage.
- `npm run lint` - Run ESlint with airbnb-config
- `npm run cover` - Get coverage report for your code.
- `npm run build` - Babel will transpile ES6 => ES5 and minify the code.

## Usage
```javascript
const RangeCollection = require('./RangeCollection');

const range = new RangeCollection();

range.add([10, 100])
range.print();
// '[10, 100)'

range.add([200, 300])
range.print();
// '[10, 100) [200, 300)'

range.remove([40, 50])
range.print();
// '[10, 40) [50, 100) [200, 300)'
```


# License
MIT © Ankush Mehta
