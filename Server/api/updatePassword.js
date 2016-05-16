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

    console.log(req.body);
    console.log("Session : ",req.session.loginUserDetails.uid);
    updateUserPass.findOne({_id:req.session.loginUserDetails.uid},function(err,data)
    {
        if(data)
        {
            bcrypt.compare(req.body.oldPass, data.pass, function(err,isMatch) {
                if(isMatch)
                {
                    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
                        if (err) {
                            console.log("Salt factor failed : ",err);
                            return done(err);
                        }
                        else
                        {
                            bcrypt.hash(req.body.newPass, salt, null, function(err, hashedPassword) {
                                if (err) {
                                    console.log("Hash Password err : ",err);
                                    return done(err);
                                }
                                updateUserPass.update({_id:req.session.loginUserDetails.uid},{$set: {pass: hashedPassword}},function(err, data) {
                                    if(err)
                                    {
                                        res.send(err);
                                        console.log("Error in update : ",err);
                                    }
                                    else
                                    {
                                        console.log("Password Update : ",data);
                                        res.send(data);
                                    }

                                });

                            });
                        }
                    });
                }
                else
                {
                    console.log("Old password does not match : ",err);
                    res.send(err);
                }

            });
        }
        else
        {
            console.log("No record found : ",err);
            res.send(err);
        }
    });
});

module.exports = api;