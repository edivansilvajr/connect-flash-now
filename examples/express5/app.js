const express = require('express');
const session = require('express-session');
const flash = require('../..');

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));

app.use(flash());

app.get('/', (req, res) => {
  res.render('index', { message: req.flash('info') });
});

app.get('/flash', (req, res) => {
  req.flash('info', 'Hi there!');
  res.redirect('/');
});

app.get('/multiple-flash', (req, res) => {
  req.flash('info', ['Welcome', 'Please Enjoy']);
  res.redirect('/');
});

app.get('/no-flash', (req, res) => {
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Express 5 example running on http://localhost:3000');
});
