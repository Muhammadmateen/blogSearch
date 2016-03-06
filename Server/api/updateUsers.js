/**
 * Created by MUHAMMAD MATEEN on 04-Mar-16.
 */

var express = require("express");
var model = require("../schema/userSignUp.js")
var getUsers_model = model.sign_up_schema;

var api = express.Router();

api.post("/updateUsers",function(req,res)
{
    getUsers_model.update({_id:req.body.id},{$set:{role:req.body.role}},function(err,data)
    {
        if (data)
        {
            // 200 Data found
            res.status(200).send(data);
        }
        else
        {
            // 500 Server Error
            res.status(500).send(err);
        }
    });
})

module.exports = api;