/**
 * Created by MUHAMMAD MATEEN on 02-Mar-16.
 */


var express = require("express");
var bcrypt = require("bcrypt-nodejs");
var model = require("../schema/userSignUp.js")
var login_model = model.sign_up_schema;

var api = express.Router();


api.use("/login",function(req,res,next)
{
    console.log("Api Middleware");
    next();
})

api.post("/login",function(req,res)
{
    login_model.findOne({email:req.body.email},function(err,data)
    {
        if (data)
        {
            bcrypt.compare(req.body.pass,data.pass,function(err,isMatch)
            {
                if(isMatch)
                {
                    if(data.verified)
                    {
                        if(data.role != 3)
                        {
                            var userDetails = {
                                uid:data._id,
                                name:data.firstName+" "+data.lastName,
                                role:data.role
                            }
                            req.session.loginUserDetails = userDetails;
                            //200 authorized user
                            res.status(200).send(userDetails);
                        }
                        else
                        {
                            res.status(401).send("Request is in pending to admin for approval");
                        }

                    }
                    else
                    {
                        res.status(401).send("Your e-mail verification is in pending, Please verify your e-mail.");
                    }
                }
                else
                {
                    //401 unauthorized (password does not match)
                    res.status(401).send("The email and password you entered don't match");
                }

            })
        }
        else
        {
            //404 email not found
            res.status(404).send("Sorry, your email doesn't recognize");
        }
    });
})

module.exports = api;