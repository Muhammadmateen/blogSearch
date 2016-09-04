
var express = require("express");

var schema = require("../schema/userSignUp.js")
var sign_up_schema = schema.sign_up_schema;

var api = express.Router();

api.put("/updateImg",function(req,res)
{
    var save_user = new sign_up_schema(req.body);
    save_user.save(function(err,success)
    {
        if(err)
        {
            res.send(error_romove_user);
        }
        else
        {
            sendMail_func(req.body.email,success._id);
            res.send(confirm_code);
        }
    })
});


api.put("/updateImg",function(req,res)
{
    console.log("Query for update : ",req.body);
    sign_up_schema.update({_id:req.body._id},{$set:{pic:req.body.userImg}},function(err,data) {
        if (data)
        {
            console.log("Success : ",data);
            if(data.nModified == 1)
            {
                res.status(200).send("Data Updated");
            }
            else
            {
                res.send(data);
            }
        }
        else
        {
            console.log("Error : ",err);
            res.status(500).send("Internal Server Error");
        }
    });
});


module.exports = api;