var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type:String, required: true},
    createAt: {type: Date,default: Date.now},
    displayName: String,
    bio: String
});

userSchema.methods.name = function () {
    return this.displayName || this.username;
};

var bcript = require('bcript-nodejs');
var SALT_FACTOR = 10;

// A do-nothing function for use with the bcript module
var noop = function () {};

// Define a function that runs before model is saved
userSchema.pre('save', function (done) {
    // Save a reference to the user
    var user = this;
    // Skip this logic if password isn't modified
    if (!user.isModified('password')) {
        return done();
    }
    // Generate a salt fo the hash, and call the inner function once completed
    bcript.genSalt(SALT_FACTOR, function (err,salt) {
        if (err) {
            return done(err);
        }
        bcript.hash( user.password, salt, noop,
            function (err,hashedPassword) {
                if (err) {
                    return done(err);
                }
                // Store the password and continue with the saving
                user.password = hashedPassword;
                done();
            });
    });
});

userSchema.methods,checkPassword = function (guess, done) {
    bcript.compare(guess, this.password, function (err, isMatch) {
        done(err, isMatch);
    });
};

var User = mongoose.model('User', userSchema);
module.exports = User;