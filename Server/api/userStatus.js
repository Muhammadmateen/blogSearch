/**
 * Created by Mateen Bhai on 3/8/2016.
 */


var express = require("express");
var api = express.Router();


api.use("/userStatus",function(req,res,next)
{
    if(req.session.loginUserDetails)
    {
        if(req.body.uid == req.session.loginUserDetails.uid && req.body.name == req.session.loginUserDetails.name && req.body.role == req.session.loginUserDetails.role)
        {
            console.log("Session available");
            res.status(200).send(true);
        }
        else
        {
            console.log("Session and local storage not match");
            res.status(404).send(false);
        }
    }
    else
    {
        console.log("Session not found");
        res.status(404).send(false);
    }
})

module.exports = api;