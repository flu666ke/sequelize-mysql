const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport')
const config = require('./config/config')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);

//MeSQL Store setup
const options = {
  host: config.db.host,
  port: 3306,
  user: config.db.username,
  password: config.db.password,
  database: config.db.database
};

const sessionStore = new MySQLStore(options);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//session setup
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: config.session_secret,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 365
  }
}))

//passport authentication
app.use(passport.initialize())
app.use(passport.session());

//user identification
app.use(require('./middleware/user_identification'))

require('./API_Gateways/passport')
app.use('/auth', require('./API_Gateways/Auth_Routes'))

// Application Gateways
app.use('/user', require('./API_Gateways/User_Gateway'));

// Logout Route
app.get('/logout', (req, res, next) => {
  sessionStore.destroy(req.sessionID, err => console.log(err))
  req.logout()
  req.session.destroy()
  res.clearCookie('connect.sid')
  return res.status(200).json({ message: "User Logged Out" })
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
