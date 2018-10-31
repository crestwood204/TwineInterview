// include modules for endpoint processing
const express = require('express');
const bodyParser = require('body-parser');

// include modules for view engine
const exphbs = require('express-handlebars');

// include system modules
const path = require('path');

// include debug modules
const logger = require('morgan');

// include routes
const routes = require('./routes');
const helpers = require('./handlebars_helpers');

// create server with express: port defaults to 3000
const app = express();
const port = process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    math: helpers.math,
    compare: helpers.compare
  }
}));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

// add middleware to parse body requests and log requests
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// include routes to use
app.use('/', routes);

app.use('/unauthorized', (req, res) => {
  res.render('error_views/unauthorized', { user: req.user });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  console.log('error handler', err);
  // render the error page
  res.status(err.status || 500);
  res.render('error', { user: req.user });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
