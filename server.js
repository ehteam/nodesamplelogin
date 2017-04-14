var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var configDB = require('./config/database.js');


//conect to database
mongoose.connect(configDB.url);
//log every request to the console
app.use(morgan('dev'));
app.use(cookieParser()); //read cookies
app.use(bodyParser()); //get information from html forms
//set ejs as route template engine
app.set('view engine','ejs');

//session secret
app.use(session({secret: 'hellofromtheothersideoftheworld'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./config/passport.js')(passport);


//load our routes and pass in our app and fully configured passport
require('./app/routes.js')(app,passport);

app.listen(port);
console.log('we are listening now to port '+port);
