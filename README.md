# connect-flash-now

Modern fork of `connect-flash` with a safe `Array.isArray` fallback.

Este pacote aplica uma pequena correção para remover o uso de `util.isArray()`,
que está deprecated em Node.js, mantendo o comportamento original de flash
messages e adicionando compatibilidade com Node.js modernos.

## O que mudou

- O arquivo `lib/flash.js` foi atualizado para usar `Array.isArray()` com
  fallback legível e compatível.
- Os testes foram migrados para um runner moderno que funciona em Node.js atual.
- O pacote foi renomeado para `connect-flash-now` para diferenciar do original.

## Instalação

    $ npm install connect-flash-now

## Uso moderno (Express / Node.js atuais)

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

## Exemplos

Este repositório inclui exemplos de uso para Express 2, 3, 4 e 5 em `examples/`.

- `examples/express2`
- `examples/express3`
- `examples/express4`
- `examples/express5`

## Testes

Execute os testes com:

```bash
npm install
npm test
```

O comando `npm test` executa `test/run-tests.js`.

## Licença

Este pacote está licenciado sob MIT.

> Original License: MIT
> Copyright (c) 2012-2013 Jared Hanson
