var express = require('express');
var passport = require('passport');

var User = require('./models/user');

var router = express.Router();


// Set useful variables for your templates
router.use(function (req,res,next) {
    console.log('test');
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash('error');
    res.locals.infos = req.flash('info');
    next();
});

// Query the users collection, returning the newest users first
router.get('/', function (req,res,next) {

    User.find()
               .sort({ creatAt: 'descending'})
               .exec(function (err,users) {
                   if (err) { return next(err); }
                   res.render('index', { users: users});
               });
});

router.get('/signup', function (req,res) {
    res.render('signup');
});

router.post('/signup', function (req,res,next) {
    
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({ username: username}, function (err,user){
        
        if(err) { return next(err);}
        if (user) {
            req.flash('error', "User already exists");
            return res.redirect('/signup');
        }
        var newUser = new User({
            username: username,
            password: password
        });
        newUser.save(next);
    });
},passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
}));

module.exports = router;