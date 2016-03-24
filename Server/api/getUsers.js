/**
 * Created by MUHAMMAD MATEEN on 04-Mar-16.
 */


var express = require("express");
var model = require("../schema/userSignUp.js")
var getUsers_model = model.sign_up_schema;

var api = express.Router();

api.post("/getUsers",function(req,res)
{
    // role 3 value is user
    getUsers_model.find({},{pass:0},function(err,data)
    {
        if (data)
        {
            if(data.length == 0)
            {
                // 204 No Data Found (No content found)
                res.status(204).send(data);
            }
            else
            {
                console.log("Users data",data)
                // 200 Data Found
                res.status(200).send(data);
            }
        }
        else
        {
            //  Server Error
            res.status(500).send(err);
        }
    });
});

module.exports = api;