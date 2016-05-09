/**
 * Created by Mateen Bhai on 3/8/2016.
 */


var express = require("express");
var api = express.Router();


api.get("/userStatus",function(req,res)
{
    if(req.session.loginUserDetails)
    {
        if(req.query.uid == req.session.loginUserDetails.uid && req.query.name == req.session.loginUserDetails.name && req.query.role == req.session.loginUserDetails.role)
        {
            res.status(200).send(true);
        }
        else
        {
            delete req.session.loginUserDetails;
            res.status(404).send(false);
        }
    }
    else
    {
        delete req.session.loginUserDetails;
        res.status(404).send(false);
    }
})

module.exports = api;