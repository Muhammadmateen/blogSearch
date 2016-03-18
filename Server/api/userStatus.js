/**
 * Created by Mateen Bhai on 3/8/2016.
 */


var express = require("express");
var api = express.Router();


api.post("/userStatus",function(req,res)
{
    console.log("Request come on checking userstatus");
    if(req.session.loginUserDetails)
    {
        if(req.body.uid == req.session.loginUserDetails.uid && req.body.name == req.session.loginUserDetails.name && req.body.role == req.session.loginUserDetails.role)
        {
            console.log("Session available and all data matched successfully");
            res.status(200).send(true);
        }
        else
        {
            delete req.session.loginUserDetails;
            console.log("Session and local storage data not match");
            res.status(404).send(false);
        }
    }
    else
    {
        delete req.session.loginUserDetails;
        console.log("Session not found on server");
        res.status(404).send(false);
    }
})

module.exports = api;