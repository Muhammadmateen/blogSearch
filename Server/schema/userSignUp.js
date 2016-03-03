/**
 * Created by MUHAMMAD MATEEN on 02-Mar-16.
 */
//Modules
var bcrypt = require("bcrypt-nodejs");
var mongoose = require("mongoose");
//var connection = mongoose.connect("mongodb://localhost/blogs");


/* Sales Man Schema */
var schema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        validate: function (email) {
            return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
        },
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    verified: {
        type: Boolean,
        default: false
    }
});

//Using to bcrypt the password
var SALT_FACTOR = 10;
var noop = function () {
};

schema.pre("save", function (done) {
    var user = this;
    if (!user.isModified("pass")) {
        return done();
    }
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            return done(err);
        }
        bcrypt.hash(user.pass, salt, noop,
            function (err, hashedPassword) {
                if (err) {
                    return done(err);
                }
                user.pass = hashedPassword;
                done();
            });
    });
});


schema.methods.checkPassword = function (guess, done) {
    bcrypt.compare(guess, this.password, function (err, isMatch) {
        done(err, isMatch);
    });
}


//Export the schema
exports.sign_up_schema = mongoose.model("users", schema);