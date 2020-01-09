// Require everytihng you need, including Mongoose
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');


var app = express();

// Put all of your routes in another file
var routes = require('./routes');

app.use(bodyParser.urlencoded({ extended: false }));

// Connect to your MongoDB server in the test database
mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



app.set('port',process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use four middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser);
app.use(session({
    secret: 'TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

app.use(routes);

app.listen(app.get('port', function () {
    console.log('Server started on port ' + app.get('port'));
}));