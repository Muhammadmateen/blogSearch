/**
 * Created by Mateen Bhai on 5/16/2016.
 */

var express = require("express");
var model = require("../schema/userSignUp.js");
var bcrypt = require("bcrypt-nodejs");
var updateUserPass = model.sign_up_schema;
var SALT_FACTOR = 10;

var api = express.Router();

api.put("/updatePass",function(req,res)
{
    updateUserPass.findOne({_id:req.session.loginUserDetails.uid},function(err,data)
    {
        if(data)
        {
            bcrypt.compare(req.body.oldPass, data.pass, function(err,isMatch) {
                if(isMatch)
                {
                    //generate salt factor for change pass
                    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
                        if (err) {
                            return done(err);
                        }
                        else
                        {
                            bcrypt.hash(req.body.newPass, salt, null, function(err, hashedPassword) {
                                if (err) {
                                    return done(err);
                                }
                                updateUserPass.update({_id:req.session.loginUserDetails.uid},{$set: {pass: hashedPassword}},function(err, data) {
                                    if(err)
                                    {
                                        res.send("Error : "+err);
                                    }
                                    else
                                    {
                                        res.send("Password changed successfully");
                                    }

                                });

                            });
                        }
                    });
                }
                else
                {
                    res.send("Old password does not match");
                }

            });
        }
        else
        {
            res.send(err);
        }
    });
});

module.exports = api;