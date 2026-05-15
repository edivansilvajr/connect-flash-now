# connect-flash-now

Modern fork of `connect-flash` with a safe `Array.isArray` fallback.

This package applies a small fix to remove the use of `util.isArray()`,
which is deprecated in Node.js, while preserving the original flash
messages behavior and adding compatibility with modern Node.js versions.

## What Changed

* The `lib/flash.js` file was updated to use `Array.isArray()` with
  a readable and compatible fallback.
* The tests were migrated to a modern runner that works with current Node.js versions.
* The package was renamed to `connect-flash-now` to differentiate it from the original.

## Installation

```
$ npm install connect-flash-now
```

## Modern Usage (Express / Current Node.js Versions)

```js
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash-now');

const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

app.get('/flash', (req, res) => {
  req.flash('info', 'Flash is back!');
  res.redirect('/');
});

app.get('/', (req, res) => {
  const messages = req.flash('info');
  res.send(messages);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

## Examples

This repository includes usage examples for Express 2, 3, 4 and 5 in `examples/`.

* `examples/express2`
* `examples/express3`
* `examples/express4`
* `examples/express5`

## Tests

Run the tests with:

```bash
npm install
npm test
```

The `npm test` command runs `test/run-tests.js`.

## License

This package is licensed under the MIT License.

> Original License: MIT
> Copyright (c) 2012-2013 Jared Hanson
