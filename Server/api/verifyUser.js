/**
 * Created by MUHAMMAD MATEEN on 06-Mar-16.
 */



var express = require("express");
var model = require("../schema/userSignUp.js");
var verify_model = model.sign_up_schema;

var api = express.Router();




api.post("/verifyUser",function(req,res)
{
    verify_model.update({_id:req.body.id},{$set:{'verified':'true'}},function(err,data)
    {
        if(data)
        {
            console.log(req.body.id);
            console.log("Data :",data);
            res.send(data);
        }
        else
        {
            console.log("Error :",err);
            res.send(err);
        }
    })
})

module.exports = api;